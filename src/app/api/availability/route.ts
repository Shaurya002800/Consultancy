import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const date = searchParams.get('date')
  if (!date) return NextResponse.json({ error: 'Date required' }, { status: 400 })

  const [bookings, blocked] = await Promise.all([
    supabase.from('bookings').select('time').eq('date', date).eq('payment_status', 'paid'),
    supabase.from('blocked_slots').select('time').eq('date', date),
  ])

  const takenTimes = [
    ...(bookings.data || []).map(b => b.time),
    ...(blocked.data || []).map(b => b.time),
  ]

  return NextResponse.json({ takenTimes })
}