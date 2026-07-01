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

export async function notifyPaidBooking(
  supabase: SupabaseClient,
  booking: Parameters<typeof sendPrivateBookingAlert>[1]
) {
  if (booking.payment_status !== 'paid') {
    return { booking, notification: { sent: false, reason: 'not_paid' as const } }
  }

  const notification = await sendPrivateBookingAlert(supabase, booking)
  return { booking, notification }
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

  const notification = await sendPrivateBookingAlert(supabase, booking)
  return { booking, notification }
}
