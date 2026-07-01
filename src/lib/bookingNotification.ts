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

type BookingAlertMethod = 'email' | 'whatsapp'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function cleanRecipient(phone: string) {
  return phone.replace(/[^\d]/g, '')
}

function sessionLabel(booking: BookingAlert) {
  return booking.session_type === 'astrology'
    ? `Astrology + Guidance (${booking.duration} min)`
    : `Personal Guidance (${booking.duration} min)`
}

function bookingAlertDetails(booking: BookingAlert) {
  return [
    ['Name', booking.name],
    ['Phone', booking.phone],
    ['Email', booking.email],
    ['Session', sessionLabel(booking)],
    ['Date', booking.date],
    ['Time', `${booking.time} IST`],
    ['Amount', `Rs. ${booking.price.toLocaleString('en-IN')}`],
    ['Notes', booking.message?.trim() || 'No additional notes'],
  ] as const
}

function bookingAlertText(booking: BookingAlert) {
  return [
    'New paid Serenova booking',
    '',
    ...bookingAlertDetails(booking).map(([label, value]) => `${label}: ${value}`),
  ].join('\n')
}

function bookingAlertHtml(booking: BookingAlert) {
  const rows = bookingAlertDetails(booking)
    .map(([label, value]) => `
      <tr>
        <td style="padding:10px 14px;border-bottom:1px solid #ece6dd;color:#6b7280;">${escapeHtml(label)}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #ece6dd;color:#1d2430;font-weight:600;">${escapeHtml(value)}</td>
      </tr>
    `)
    .join('')

  return `
    <div style="font-family:Arial,sans-serif;background:#fbf7ef;padding:24px;">
      <div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #ece6dd;border-radius:10px;overflow:hidden;">
        <div style="background:#0f302d;color:#ffffff;padding:20px 24px;">
          <p style="margin:0 0 4px;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#e4bd83;">Serenova booking</p>
          <h1 style="margin:0;font-size:24px;line-height:1.25;">New paid session booking</h1>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:15px;">
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>
  `
}

async function claimNotification(supabase: SupabaseClient, booking: BookingAlert) {
  const { data: claimed, error: claimError } = await supabase
    .rpc('claim_booking_notification', { p_booking_id: booking.id })

  if (claimError) throw new Error(`Could not claim booking notification: ${claimError.message}`)
  return Boolean(claimed)
}

async function resetNotificationClaim(supabase: SupabaseClient, booking: BookingAlert) {
  await supabase
    .from('bookings')
    .update({ notification_sent_at: null })
    .eq('id', booking.id)
}

function getEmailAlertConfig(booking: BookingAlert) {
  if (!process.env.RESEND_API_KEY || !process.env.BOOKING_ALERT_EMAIL_TO || !process.env.BOOKING_ALERT_EMAIL_FROM) {
    return null
  }

  const to = process.env.BOOKING_ALERT_EMAIL_TO
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean)

  if (!to.length) return null

  return {
    apiKey: process.env.RESEND_API_KEY,
    to,
    from: process.env.BOOKING_ALERT_EMAIL_FROM,
    replyTo: process.env.BOOKING_ALERT_EMAIL_REPLY_TO || booking.email,
  }
}

async function sendEmailBookingAlert(booking: BookingAlert) {
  const config = getEmailAlertConfig(booking)
  if (!config) return { configured: false as const }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: config.from,
      to: config.to,
      reply_to: config.replyTo,
      subject: `New paid booking: ${booking.name} on ${booking.date}`,
      text: bookingAlertText(booking),
      html: bookingAlertHtml(booking),
    }),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`Resend returned ${response.status}: ${errorBody}`)
  }

  return { configured: true as const }
}

export async function sendPrivateBookingAlert(
  supabase: SupabaseClient,
  booking: BookingAlert
) {
  if (booking.notification_sent_at) return { sent: false, reason: 'already_sent' as const }

  if (getEmailAlertConfig(booking)) {
    const claimed = await claimNotification(supabase, booking)
    if (!claimed) return { sent: false, reason: 'already_sent' as const }

    try {
      await sendEmailBookingAlert(booking)
      return { sent: true as const, method: 'email' as BookingAlertMethod }
    } catch (error) {
      await resetNotificationClaim(supabase, booking)
      throw error
    }
  }

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

  const claimed = await claimNotification(supabase, booking)
  if (!claimed) return { sent: false, reason: 'already_sent' as const }

  const parameters = bookingAlertDetails(booking).map(([, text]) => ({ type: 'text', text }))

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

    return { sent: true as const, method: 'whatsapp' as BookingAlertMethod }
  } catch (error) {
    await resetNotificationClaim(supabase, booking)
    throw error
  }
}
