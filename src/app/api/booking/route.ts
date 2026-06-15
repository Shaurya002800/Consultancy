import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getAvailableTimesForDate, isDateWithinBookingWindow } from '@/lib/bookingRules'
import { buildBookingMessage, validateBookingDetails } from '@/lib/bookingValidation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const body = await req.json()
  const { name, email, phone, session_type, duration, price, date, time, message, dob, pob, tob } = body

  if (!name || !email || !phone || !session_type || !duration || !price || !date || !time) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const detailsValidation = validateBookingDetails({ name, email, phone, dob, pob, tob, message }, session_type)
  if (!detailsValidation.success) {
    return NextResponse.json(
      { error: 'Please enter valid booking details.', fieldErrors: detailsValidation.errors },
      { status: 400 }
    )
  }

  if (!isDateWithinBookingWindow(date)) {
    return NextResponse.json({ error: 'Bookings are only available from today through the next 7 days.' }, { status: 400 })
  }

  const [existingBookings, blockedSlots] = await Promise.all([
    supabase.from('bookings').select('time').eq('date', date),
    supabase.from('blocked_slots').select('time').eq('date', date),
  ])

  const takenTimes = [
    ...(existingBookings.data || []).map((booking) => booking.time),
    ...(blockedSlots.data || []).map((slot) => slot.time),
  ]

  if (!getAvailableTimesForDate(date, takenTimes).includes(time)) {
    return NextResponse.json({ error: 'This time is not available. Please choose another slot.' }, { status: 409 })
  }

  const details = detailsValidation.data
  const { data, error } = await supabase
    .from('bookings')
    .insert([{
      name: details.name,
      email: details.email,
      phone: details.phone,
      session_type,
      duration,
      price,
      date,
      time,
      message: buildBookingMessage(details, session_type),
    }])
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ booking: data })
}
