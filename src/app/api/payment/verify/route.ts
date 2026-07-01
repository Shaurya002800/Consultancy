import { NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { createClient } from '@supabase/supabase-js'
import { markBookingPaidAndNotify, notifyPaidBooking } from '@/lib/bookingLifecycle'
import { verifyCheckoutSignature } from '@/lib/razorpayVerification'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const {
      bookingId,
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature,
    } = await req.json()

    if (!bookingId || !orderId || !paymentId || !signature) {
      return NextResponse.json({ error: 'Missing payment verification fields.' }, { status: 400 })
    }

    const { data: booking, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .single()

    if (error || !booking) {
      return NextResponse.json({ error: 'Booking not found.' }, { status: 404 })
    }

    if (booking.razorpay_order_id !== orderId) {
      return NextResponse.json({ error: 'Payment order does not match this booking.' }, { status: 400 })
    }

    if (booking.payment_status === 'paid') {
      const result = await notifyPaidBooking(supabase, booking)
      return NextResponse.json({
        confirmed: true,
        notificationSent: result.notification.sent,
      })
    }

    if (!verifyCheckoutSignature(orderId, paymentId, signature)) {
      return NextResponse.json({ error: 'Payment signature verification failed.' }, { status: 400 })
    }

    const payment = await razorpay.payments.fetch(paymentId)
    const expectedAmount = booking.price * 100

    if (
      payment.order_id !== orderId ||
      payment.amount !== expectedAmount ||
      payment.currency !== 'INR' ||
      !['authorized', 'captured'].includes(payment.status)
    ) {
      return NextResponse.json({ error: 'Payment details could not be validated.' }, { status: 400 })
    }

    const result = await markBookingPaidAndNotify(supabase, bookingId, paymentId)
    return NextResponse.json({
      confirmed: true,
      notificationSent: result.notification.sent,
    })
  } catch (error) {
    console.error('Payment verification failed:', error)
    return NextResponse.json({ error: 'Could not verify the payment.' }, { status: 500 })
  }
}
