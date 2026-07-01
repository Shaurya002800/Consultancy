import type { SupabaseClient } from '@supabase/supabase-js'
import { sendPrivateBookingAlert } from '@/lib/bookingNotification'

export const PENDING_BOOKING_HOLD_MINUTES = 15

export function getPendingBookingCutoff() {
  return new Date(Date.now() - PENDING_BOOKING_HOLD_MINUTES * 60 * 1000).toISOString()
}

export async function removeExpiredPendingBookings(supabase: SupabaseClient, date?: string) {
  let query = supabase
    .from('bookings')
    .delete()
    .eq('payment_status', 'pending')
    .lt('created_at', getPendingBookingCutoff())

  if (date) query = query.eq('date', date)

  const { error } = await query
  if (error) throw new Error(`Could not clear expired booking holds: ${error.message}`)
}

function notificationErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Unknown booking notification error'
}

export async function notifyPaidBooking(
  supabase: SupabaseClient,
  booking: Parameters<typeof sendPrivateBookingAlert>[1]
) {
  if (booking.payment_status !== 'paid') {
    return { booking, notification: { sent: false, reason: 'not_paid' as const } }
  }

  try {
    const notification = await sendPrivateBookingAlert(supabase, booking)
    return { booking, notification }
  } catch (error) {
    const message = notificationErrorMessage(error)
    console.error('Booking notification failed:', {
      bookingId: booking.id,
      paymentStatus: booking.payment_status,
      error: message,
    })

    return {
      booking,
      notification: {
        sent: false,
        reason: 'send_failed' as const,
        error: message,
      },
    }
  }
}

export async function markBookingPaidAndNotify(
  supabase: SupabaseClient,
  bookingId: string,
  paymentId: string
) {
  const { data: booking, error } = await supabase
    .from('bookings')
    .update({
      payment_status: 'paid',
      razorpay_payment_id: paymentId,
    })
    .eq('id', bookingId)
    .select('*')
    .single()

  if (error || !booking) {
    throw new Error(error?.message || 'Could not confirm the booking.')
  }

  return notifyPaidBooking(supabase, booking)
}
