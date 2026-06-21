import { NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { createClient } from '@supabase/supabase-js'
import { getSessionOption } from '@/lib/sessionCatalog'

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
    const { bookingId } = await req.json()
    if (!bookingId) {
      return NextResponse.json({ error: 'Booking ID is required.' }, { status: 400 })
    }

    const { data: booking, error } = await supabase
      .from('bookings')
      .select('id, session_type, duration, price, payment_status, razorpay_order_id')
      .eq('id', bookingId)
      .single()

    if (error || !booking) {
      return NextResponse.json({ error: 'Booking not found.' }, { status: 404 })
    }

    if (booking.payment_status === 'paid') {
      return NextResponse.json({ error: 'This booking has already been paid.' }, { status: 409 })
    }

    const sessionOption = getSessionOption(booking.session_type, booking.duration)
    if (!sessionOption || booking.price !== sessionOption.price) {
      return NextResponse.json({ error: 'Booking price validation failed.' }, { status: 400 })
    }

    if (booking.razorpay_order_id) {
      return NextResponse.json({
        orderId: booking.razorpay_order_id,
        amount: sessionOption.price * 100,
      })
    }

    const order = await razorpay.orders.create({
      amount: sessionOption.price * 100,
      currency: 'INR',
      receipt: bookingId,
      notes: { booking_id: bookingId },
    })

    const { error: updateError } = await supabase
      .from('bookings')
      .update({ razorpay_order_id: order.id })
      .eq('id', bookingId)

    if (updateError) throw updateError

    return NextResponse.json({ orderId: order.id, amount: order.amount })
  } catch (error) {
    console.error('Payment order creation failed:', error)
    return NextResponse.json({ error: 'Could not start payment.' }, { status: 500 })
  }
}
