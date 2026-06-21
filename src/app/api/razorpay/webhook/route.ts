import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { markBookingPaidAndNotify } from '@/lib/bookingLifecycle'
import { verifyWebhookSignature } from '@/lib/razorpayVerification'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const rawBody = await req.text()
  const signature = req.headers.get('x-razorpay-signature') || ''

  try {
    if (!verifyWebhookSignature(rawBody, signature)) {
      return NextResponse.json({ error: 'Invalid webhook signature.' }, { status: 400 })
    }

    const event = JSON.parse(rawBody)
    if (event.event !== 'payment.captured') {
      return NextResponse.json({ received: true })
    }

    const payment = event.payload?.payment?.entity
    const orderId = payment?.order_id
    const paymentId = payment?.id

    if (!orderId || !paymentId) {
      return NextResponse.json({ received: true })
    }

    const { data: booking } = await supabase
      .from('bookings')
      .select('*')
      .eq('razorpay_order_id', orderId)
      .single()

    if (!booking || booking.payment_status === 'paid') {
      return NextResponse.json({ received: true })
    }

    await markBookingPaidAndNotify(supabase, booking.id, paymentId)
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Razorpay webhook failed:', error)
    return NextResponse.json({ error: 'Webhook processing failed.' }, { status: 500 })
  }
}
