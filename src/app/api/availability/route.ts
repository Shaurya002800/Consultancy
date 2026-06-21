import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getAvailableTimesForDate, isDateWithinBookingWindow } from '@/lib/bookingRules'
import { removeExpiredPendingBookings } from '@/lib/bookingLifecycle'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const date = searchParams.get('date')
    if (!date) return NextResponse.json({ error: 'Date required' }, { status: 400 })
    if (!isDateWithinBookingWindow(date)) {
      return NextResponse.json({ error: 'Date must be within the next 7 days.', takenTimes: [], availableTimes: [] }, { status: 400 })
    }

    await removeExpiredPendingBookings(supabase, date)

    const [bookings, blocked] = await Promise.all([
      supabase
        .from('bookings')
        .select('time')
        .eq('date', date)
        .in('payment_status', ['pending', 'paid']),
      supabase.from('blocked_slots').select('time').eq('date', date),
    ])

    const takenTimes = [
      ...(bookings.data || []).map((booking) => booking.time),
      ...(blocked.data || []).map((slot) => slot.time),
    ]

    return NextResponse.json({ takenTimes, availableTimes: getAvailableTimesForDate(date, takenTimes) })
  } catch (error) {
    console.error('Availability lookup failed:', error)
    return NextResponse.json(
      { error: 'Could not load availability.', takenTimes: [], availableTimes: [] },
      { status: 500 }
    )
  }
}
