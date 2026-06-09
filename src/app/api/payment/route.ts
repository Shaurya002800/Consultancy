import { NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { createClient } from '@supabase/supabase-js'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const { bookingId, amount } = await req.json()

  const order = await razorpay.orders.create({
    amount: amount * 100, // paise
    currency: 'INR',
    receipt: bookingId,
  })

  await supabase
    .from('bookings')
    .update({ razorpay_order_id: order.id })
    .eq('id', bookingId)

  return NextResponse.json({ orderId: order.id })
}