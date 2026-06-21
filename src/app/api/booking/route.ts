import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getAvailableTimesForDate, isDateWithinBookingWindow } from '@/lib/bookingRules'
import { buildBookingMessage, validateBookingDetails } from '@/lib/bookingValidation'
import { removeExpiredPendingBookings } from '@/lib/bookingLifecycle'
import { getSessionOption } from '@/lib/sessionCatalog'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, session_type, duration, date, time, message, dob, pob, tob } = body

    if (!name || !email || !phone || !session_type || !duration || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const sessionOption = getSessionOption(session_type, duration)
    if (!sessionOption) {
      return NextResponse.json({ error: 'Invalid session type or duration.' }, { status: 400 })
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

    await removeExpiredPendingBookings(supabase, date)

    const [existingBookings, blockedSlots] = await Promise.all([
      supabase
        .from('bookings')
        .select('time')
        .eq('date', date)
        .in('payment_status', ['pending', 'paid']),
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
        duration: sessionOption.duration,
        price: sessionOption.price,
        date,
        time,
        message: buildBookingMessage(details, session_type),
        payment_status: 'pending',
      }])
      .select()
      .single()

    if (error?.code === '23505') {
      return NextResponse.json({ error: 'This time was just reserved. Please choose another slot.' }, { status: 409 })
    }
    if (error) throw error

    return NextResponse.json({ booking: data })
  } catch (error) {
    console.error('Booking creation failed:', error)
    return NextResponse.json({ error: 'Could not create the booking. Please try again.' }, { status: 500 })
  }
}
