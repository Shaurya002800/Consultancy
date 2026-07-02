import { NextResponse } from 'next/server'
import { sendEmailBookingAlert } from '@/lib/bookingNotification'

function maskEmail(email: string) {
  const [name, domain] = email.split('@')
  if (!name || !domain) return 'configured'
  return `${name.slice(0, 2)}***@${domain}`
}

function emailTargets() {
  return (process.env.BOOKING_ALERT_EMAIL_TO || '')
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean)
}

function getConfigStatus() {
  const targets = emailTargets()

  return {
    resendApiKey: Boolean(process.env.RESEND_API_KEY),
    bookingAlertEmailTo: targets.length ? targets.map(maskEmail) : [],
    bookingAlertEmailFrom: Boolean(process.env.BOOKING_ALERT_EMAIL_FROM),
    bookingAlertEmailReplyTo: Boolean(process.env.BOOKING_ALERT_EMAIL_REPLY_TO),
  }
}

export async function POST(req: Request) {
  const secret = req.headers.get('x-test-secret')

  if (!process.env.BOOKING_ALERT_TEST_SECRET) {
    return NextResponse.json(
      {
        ok: false,
        error: 'BOOKING_ALERT_TEST_SECRET is not configured.',
        config: getConfigStatus(),
      },
      { status: 500 }
    )
  }

  if (!secret || secret !== process.env.BOOKING_ALERT_TEST_SECRET) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 })
  }

  try {
    const result = await sendEmailBookingAlert({
      id: 'test-email',
      name: 'Serenova Test Booking',
      email: process.env.BOOKING_ALERT_EMAIL_REPLY_TO || emailTargets()[0] || 'test@example.com',
      phone: '9876543210',
      session_type: 'consultancy',
      duration: 30,
      price: 800,
      date: new Date().toISOString().slice(0, 10),
      time: '5:30 PM',
      message: 'This is a test booking alert from Serenova.',
      payment_status: 'paid',
      notification_sent_at: null,
    })

    return NextResponse.json({
      ok: true,
      sent: result.configured,
      config: getConfigStatus(),
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown email test error'

    return NextResponse.json(
      {
        ok: false,
        error: message,
        config: getConfigStatus(),
      },
      { status: 500 }
    )
  }
}
