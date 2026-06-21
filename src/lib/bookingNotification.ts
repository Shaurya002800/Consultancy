import type { SupabaseClient } from '@supabase/supabase-js'

type BookingAlert = {
  id: string
  name: string
  email: string
  phone: string
  session_type: string
  duration: number
  price: number
  date: string
  time: string
  message?: string | null
  payment_status?: string | null
  notification_sent_at?: string | null
}

function cleanRecipient(phone: string) {
  return phone.replace(/[^\d]/g, '')
}

function sessionLabel(booking: BookingAlert) {
  return booking.session_type === 'astrology'
    ? `Astrology + Guidance (${booking.duration} min)`
    : `Personal Guidance (${booking.duration} min)`
}

export async function sendPrivateBookingAlert(
  supabase: SupabaseClient,
  booking: BookingAlert
) {
  if (booking.notification_sent_at) return { sent: false, reason: 'already_sent' as const }

  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN
  const recipient = process.env.BOOKING_ALERT_WHATSAPP_NUMBER
  const templateName = process.env.WHATSAPP_BOOKING_TEMPLATE_NAME
  const languageCode = process.env.WHATSAPP_BOOKING_TEMPLATE_LANGUAGE || 'en'
  const graphVersion = process.env.WHATSAPP_GRAPH_API_VERSION || 'v23.0'

  if (!phoneNumberId || !accessToken || !recipient || !templateName) {
    console.error('Booking alert was not sent because WhatsApp Cloud API is not fully configured.')
    return { sent: false, reason: 'not_configured' as const }
  }

  const { data: claimed, error: claimError } = await supabase
    .rpc('claim_booking_notification', { p_booking_id: booking.id })

  if (claimError) throw new Error(`Could not claim booking notification: ${claimError.message}`)
  if (!claimed) return { sent: false, reason: 'already_sent' as const }

  const parameters = [
    booking.name,
    booking.phone,
    booking.email,
    sessionLabel(booking),
    booking.date,
    `${booking.time} IST`,
    `Rs. ${booking.price.toLocaleString('en-IN')}`,
    booking.message?.trim() || 'No additional notes',
  ].map((text) => ({ type: 'text', text }))

  try {
    const response = await fetch(`https://graph.facebook.com/${graphVersion}/${phoneNumberId}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: cleanRecipient(recipient),
        type: 'template',
        template: {
          name: templateName,
          language: { code: languageCode },
          components: [{ type: 'body', parameters }],
        },
      }),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      throw new Error(`WhatsApp Cloud API returned ${response.status}: ${errorBody}`)
    }

    return { sent: true as const }
  } catch (error) {
    await supabase
      .from('bookings')
      .update({ notification_sent_at: null })
      .eq('id', booking.id)

    throw error
  }
}
