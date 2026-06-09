export type SessionType = 'consultancy' | 'astrology'

export interface Session {
  id: string
  type: SessionType
  duration: number // minutes
  price: number    // INR
  label: string
  description: string
}

export interface TimeSlot {
  id: string
  date: string      // YYYY-MM-DD
  time: string      // HH:MM
  available: boolean
}

export interface Booking {
  id: string
  name: string
  email: string
  phone: string
  session_type: SessionType
  duration: number
  date: string
  time: string
  message?: string
  payment_status: 'pending' | 'paid' | 'failed'
  razorpay_order_id?: string
  created_at: string
}