'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

const SESSION_OPTIONS = {
  consultancy: [
    { duration: 30, label: 'Quick Clarity — 30 min', price: 800 },
    { duration: 60, label: 'Deep Dive — 60 min', price: 1400 },
    { duration: 90, label: 'Full Session — 90 min', price: 1900 },
  ],
  astrology: [
    { duration: 60, label: 'Birth Chart Reading — 60 min', price: 1800 },
    { duration: 90, label: 'Chart + Life Guidance — 90 min', price: 2400 },
  ],
}

const TIME_SLOTS = [
  '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30',
]

function BookingForm() {
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [sessionType, setSessionType] = useState<'consultancy' | 'astrology'>(
    (searchParams.get('type') as 'consultancy' | 'astrology') || 'consultancy'
  )
  const [selectedOption, setSelectedOption] = useState(SESSION_OPTIONS.consultancy[1])
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [takenTimes, setTakenTimes] = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [bookingId, setBookingId] = useState('')
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  // Get min date (tomorrow)
  const minDate = new Date()
  minDate.setDate(minDate.getDate() + 1)
  const minDateStr = minDate.toISOString().split('T')[0]

  // Get max date (60 days out)
  const maxDate = new Date()
  maxDate.setDate(maxDate.getDate() + 60)
  const maxDateStr = maxDate.toISOString().split('T')[0]

  useEffect(() => {
    const opts = SESSION_OPTIONS[sessionType]
    setSelectedOption(opts[1] || opts[0])
  }, [sessionType])

  useEffect(() => {
    if (!selectedDate) return
    setLoadingSlots(true)
    setSelectedTime('')
    fetch(`/api/availability?date=${selectedDate}`)
      .then(r => r.json())
      .then(d => { setTakenTimes(d.takenTimes || []); setLoadingSlots(false) })
      .catch(() => setLoadingSlots(false))
  }, [selectedDate])

  const handleBooking = async () => {
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          session_type: sessionType,
          duration: selectedOption.duration,
          price: selectedOption.price,
          date: selectedDate,
          time: selectedTime,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setBookingId(data.booking.id)
      setStep(4)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handlePayment = async () => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, amount: selectedOption.price }),
      })
      const { orderId } = await res.json()

      const rzp = new (window as unknown as { Razorpay: new (opts: unknown) => { open: () => void } }).Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: selectedOption.price * 100,
        currency: 'INR',
        order_id: orderId,
        name: 'Serenova',
        description: selectedOption.label,
        prefill: { name: form.name, email: form.email, contact: form.phone },
        theme: { color: '#C4956A' },
        handler: () => setDone(true),
      })
      rzp.open()
    } catch {
      setError('Payment setup failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '13px 16px',
    borderRadius: '10px', border: '1px solid #E8D5B7',
    backgroundColor: '#fff', color: '#2C3E50',
    fontSize: '15px', fontFamily: 'var(--font-body)', outline: 'none',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '11px', letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    color: '#8A7968', marginBottom: '8px', display: 'block',
  }

  if (done) return (
    <div style={{ textAlign: 'center', padding: '48px 24px' }}>
      <div style={{ fontSize: '48px', marginBottom: '24px' }}>✨</div>
      <h2 style={{
        fontFamily: 'var(--font-display)', fontSize: '32px',
        fontWeight: 500, color: '#0D0D0D', marginBottom: '16px',
      }}>
        You're all set.
      </h2>
      <p style={{ fontSize: '16px', color: '#4A5F74', lineHeight: 1.8, marginBottom: '8px' }}>
        Your session is confirmed for <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong>.
      </p>
      <p style={{ fontSize: '15px', color: '#8A7968' }}>
        A confirmation will be sent to {form.email}. See you soon.
      </p>
    </div>
  )

  return (
    <div>
      {/* Progress bar */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '48px' }}>
        {['Session', 'Date & Time', 'Your Details', 'Payment'].map((label, i) => (
          <div key={label} style={{ flex: 1 }}>
            <div style={{
              height: '3px', borderRadius: '999px',
              backgroundColor: step > i + 1 ? '#C4956A' : step === i + 1 ? '#C4956A' : '#E8D5B7',
              marginBottom: '8px',
              opacity: step === i + 1 ? 1 : step > i + 1 ? 0.6 : 0.3,
            }} />
            <p style={{
              fontSize: '11px', color: step >= i + 1 ? '#C4956A' : '#8A7968',
              textAlign: 'center', letterSpacing: '0.05em',
            }}>
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Step 1 — Choose session */}
      {step === 1 && (
        <div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: '26px',
            fontWeight: 500, color: '#0D0D0D', marginBottom: '8px',
          }}>
            Choose your session
          </h2>
          <p style={{ fontSize: '14px', color: '#8A7968', marginBottom: '32px' }}>
            What kind of support are you looking for?
          </p>

          {/* Type toggle */}
          <div style={{
            display: 'flex', backgroundColor: '#F7F2EA',
            borderRadius: '999px', padding: '4px',
            width: 'fit-content', marginBottom: '32px',
            border: '1px solid #E8D5B7',
          }}>
            {(['consultancy', 'astrology'] as const).map(t => (
              <button key={t} onClick={() => setSessionType(t)} style={{
                padding: '9px 22px', borderRadius: '999px',
                border: 'none', cursor: 'pointer',
                fontSize: '13px', fontWeight: 500,
                backgroundColor: sessionType === t ? '#C4956A' : 'transparent',
                color: sessionType === t ? '#fff' : '#8A7968',
                fontFamily: 'var(--font-body)', transition: 'all 0.2s',
              }}>
                {t === 'consultancy' ? 'Consultancy' : 'Astrology'}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
            {SESSION_OPTIONS[sessionType].map(opt => (
              <div key={opt.duration} onClick={() => setSelectedOption(opt)} style={{
                padding: '20px 24px', borderRadius: '14px', cursor: 'pointer',
                border: selectedOption.duration === opt.duration
                  ? '2px solid #C4956A' : '1px solid #E8D5B7',
                backgroundColor: selectedOption.duration === opt.duration ? '#FDF6EE' : '#fff',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                transition: 'all 0.15s',
              }}>
                <div>
                  <p style={{ fontSize: '15px', fontWeight: 500, color: '#0D0D0D' }}>{opt.label}</p>
                </div>
                <p style={{
                  fontFamily: 'var(--font-mono)', fontSize: '18px',
                  color: '#C4956A', fontWeight: 400,
                }}>
                  ₹{opt.price.toLocaleString('en-IN')}
                </p>
              </div>
            ))}
          </div>

          <button onClick={() => setStep(2)} style={{
            width: '100%', padding: '15px',
            borderRadius: '999px', border: 'none',
            backgroundColor: '#C4956A', color: '#fff',
            fontSize: '15px', fontWeight: 500,
            cursor: 'pointer', fontFamily: 'var(--font-body)',
          }}>
            Continue →
          </button>
        </div>
      )}

      {/* Step 2 — Date & Time */}
      {step === 2 && (
        <div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: '26px',
            fontWeight: 500, color: '#0D0D0D', marginBottom: '8px',
          }}>
            Pick a date & time
          </h2>
          <p style={{ fontSize: '14px', color: '#8A7968', marginBottom: '32px' }}>
            All times are in IST (India Standard Time).
          </p>

          <div style={{ marginBottom: '28px' }}>
            <label style={labelStyle}>Select date</label>
            <input
              type="date" value={selectedDate}
              min={minDateStr} max={maxDateStr}
              onChange={(e: { target: { value: any } }) => setSelectedDate(e.target.value)}
              style={inputStyle}
            />
          </div>

          {selectedDate && (
            <div style={{ marginBottom: '32px' }}>
              <label style={labelStyle}>
                {loadingSlots ? 'Loading available slots...' : 'Select time'}
              </label>
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px',
              }}>
                {TIME_SLOTS.map(slot => {
                  const taken = takenTimes.includes(slot)
                  const selected = selectedTime === slot
                  return (
                    <button key={slot} disabled={taken || loadingSlots}
                      onClick={() => setSelectedTime(slot)} style={{
                        padding: '11px 0', borderRadius: '10px',
                        border: selected ? '2px solid #C4956A' : '1px solid #E8D5B7',
                        backgroundColor: taken ? '#F5F5F5' : selected ? '#FDF6EE' : '#fff',
                        color: taken ? '#ccc' : selected ? '#C4956A' : '#2C3E50',
                        fontSize: '13px', fontWeight: 500,
                        cursor: taken ? 'not-allowed' : 'pointer',
                        fontFamily: 'var(--font-body)',
                        textDecoration: taken ? 'line-through' : 'none',
                      }}>
                      {slot}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => setStep(1)} style={{
              flex: 1, padding: '15px', borderRadius: '999px',
              border: '1.5px solid #E8D5B7', backgroundColor: 'transparent',
              color: '#8A7968', fontSize: '15px', cursor: 'pointer',
              fontFamily: 'var(--font-body)',
            }}>
              ← Back
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!selectedDate || !selectedTime}
              style={{
                flex: 2, padding: '15px', borderRadius: '999px',
                border: 'none',
                backgroundColor: selectedDate && selectedTime ? '#C4956A' : '#E8D5B7',
                color: '#fff', fontSize: '15px', fontWeight: 500,
                cursor: selectedDate && selectedTime ? 'pointer' : 'not-allowed',
                fontFamily: 'var(--font-body)',
              }}>
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* Step 3 — Details */}
      {step === 3 && (
        <div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: '26px',
            fontWeight: 500, color: '#0D0D0D', marginBottom: '8px',
          }}>
            Your details
          </h2>
          <p style={{ fontSize: '14px', color: '#8A7968', marginBottom: '32px' }}>
            All information is kept confidential.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '28px' }}>
            <div>
              <label style={labelStyle}>Full name</label>
              <input value={form.name} onChange={(e: { target: { value: any } }) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Email address</label>
              <input type="email" value={form.email} onChange={(e: { target: { value: any } }) => setForm({ ...form, email: e.target.value })}
                placeholder="you@email.com" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>WhatsApp / Phone</label>
              <input value={form.phone} onChange={(e: { target: { value: any } }) => setForm({ ...form, phone: e.target.value })}
                placeholder="+91 98765 43210" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Anything you'd like her to know beforehand <span style={{ color: '#C4956A' }}>(optional)</span></label>
              <textarea value={form.message} onChange={(e: { target: { value: any } }) => setForm({ ...form, message: e.target.value })}
                rows={3} placeholder="Context, concerns, what's been on your mind..."
                style={{ ...inputStyle, resize: 'vertical' }} />
            </div>
          </div>

          {/* Summary */}
          <div style={{
            backgroundColor: '#F7F2EA', borderRadius: '14px',
            padding: '20px 24px', marginBottom: '28px',
            border: '1px solid #E8D5B7',
          }}>
            <p style={{ fontSize: '12px', color: '#8A7968', marginBottom: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Booking summary
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                ['Session', selectedOption.label],
                ['Date', selectedDate],
                ['Time', `${selectedTime} IST`],
                ['Total', `₹${selectedOption.price.toLocaleString('en-IN')}`],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px', color: '#8A7968' }}>{k}</span>
                  <span style={{ fontSize: '13px', color: '#0D0D0D', fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {error && <p style={{ color: '#E53E3E', fontSize: '13px', marginBottom: '16px' }}>{error}</p>}

          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => setStep(2)} style={{
              flex: 1, padding: '15px', borderRadius: '999px',
              border: '1.5px solid #E8D5B7', backgroundColor: 'transparent',
              color: '#8A7968', fontSize: '15px', cursor: 'pointer',
              fontFamily: 'var(--font-body)',
            }}>
              ← Back
            </button>
            <button
              onClick={handleBooking}
              disabled={!form.name || !form.email || !form.phone || submitting}
              style={{
                flex: 2, padding: '15px', borderRadius: '999px', border: 'none',
                backgroundColor: form.name && form.email && form.phone ? '#C4956A' : '#E8D5B7',
                color: '#fff', fontSize: '15px', fontWeight: 500,
                cursor: form.name && form.email && form.phone ? 'pointer' : 'not-allowed',
                fontFamily: 'var(--font-body)',
              }}>
              {submitting ? 'Saving...' : 'Confirm & Pay →'}
            </button>
          </div>
        </div>
      )}

      {/* Step 4 — Payment */}
      {step === 4 && (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '40px', marginBottom: '20px' }}>🔒</div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: '26px',
            fontWeight: 500, color: '#0D0D0D', marginBottom: '12px',
          }}>
            One last step
          </h2>
          <p style={{ fontSize: '15px', color: '#4A5F74', lineHeight: 1.8, marginBottom: '32px' }}>
            Your slot is held for 10 minutes. Complete payment to confirm your session.
          </p>

          <div style={{
            backgroundColor: '#F7F2EA', borderRadius: '14px',
            padding: '24px', marginBottom: '32px',
            border: '1px solid #E8D5B7', textAlign: 'left',
          }}>
            {[
              ['Session', selectedOption.label],
              ['Date', selectedDate],
              ['Time', `${selectedTime} IST`],
              ['Amount', `₹${selectedOption.price.toLocaleString('en-IN')}`],
            ].map(([k, v]) => (
              <div key={k} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '8px 0', borderBottom: '1px solid #E8D5B7',
              }}>
                <span style={{ fontSize: '13px', color: '#8A7968' }}>{k}</span>
                <span style={{ fontSize: '13px', color: '#0D0D0D', fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>

          {error && <p style={{ color: '#E53E3E', fontSize: '13px', marginBottom: '16px' }}>{error}</p>}

          <button onClick={handlePayment} disabled={submitting} style={{
            width: '100%', padding: '16px', borderRadius: '999px',
            border: 'none', backgroundColor: '#C4956A', color: '#fff',
            fontSize: '16px', fontWeight: 500, cursor: 'pointer',
            fontFamily: 'var(--font-body)',
          }}>
            {submitting ? 'Opening payment...' : `Pay ₹${selectedOption.price.toLocaleString('en-IN')} →`}
          </button>
          <p style={{ fontSize: '12px', color: '#8A7968', marginTop: '12px' }}>
            Secured by Razorpay · UPI, Cards, Net Banking accepted
          </p>
        </div>
      )}
    </div>
  )
}

export default function BookPage() {
  return (
    <div style={{ backgroundColor: 'var(--parchment)', minHeight: '100vh' }}>
      <div style={{
        maxWidth: '560px', margin: '0 auto',
        padding: '120px 24px 80px',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{
            fontSize: '11px', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#C4956A', marginBottom: '12px',
          }}>
            Book a Session
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(30px, 4vw, 44px)',
            fontWeight: 500, color: '#0D0D0D', lineHeight: 1.2,
          }}>
            Reserve your time
          </h1>
        </div>

        <div style={{
          backgroundColor: '#fff', borderRadius: '24px',
          padding: '40px', border: '1px solid #E8D5B7',
          boxShadow: '0 4px 40px rgba(0,0,0,0.04)',
        }}>
          <Suspense fallback={<p style={{ color: '#8A7968', textAlign: 'center' }}>Loading...</p>}>
            <BookingForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}