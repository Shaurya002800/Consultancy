'use client'

import { ArrowLeft, ArrowRight, Calendar, Check, Clock, CreditCard, Lock, UserRound } from 'lucide-react'
import Link from 'next/link'
import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getAvailableTimesForDate, getBookingDateWindow, isDateWithinBookingWindow } from '@/lib/bookingRules'
import {
  buildBookingMessage,
  validateBookingDetails,
  type BookingDetailsErrors,
} from '@/lib/bookingValidation'

const SESSION_OPTIONS = {
  consultancy: [
    { duration: 30, label: '30 min', price: 800 },
    { duration: 60, label: '60 min', price: 1400 },
    { duration: 90, label: '90 min', price: 1900 },
  ],
  astrology: [
    { duration: 60, label: '60 min', price: 1800 },
    { duration: 90, label: '90 min', price: 2400 },
  ],
}

const STEPS = ['Session', 'Time', 'Details', 'Payment']

function ProgressIndicator({ step }: { step: number }) {
  return (
    <nav className="progress-shell" aria-label="Booking progress">
      <div className="progress-inner">
        {STEPS.map((label, index) => {
          const number = index + 1
          return (
            <div key={label} className={`progress-step ${step > number ? 'done' : ''} ${step === number ? 'active' : ''}`}>
              <span>{label}</span>
            </div>
          )
        })}
      </div>
    </nav>
  )
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="field-error">{message}</p>
}

function BookingForm() {
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [sessionType, setSessionType] = useState<'consultancy' | 'astrology' | null>(
    (searchParams.get('type') as 'consultancy' | 'astrology') || null
  )
  const [duration, setDuration] = useState<number | null>(() => {
    const d = searchParams.get('duration')
    return d ? parseInt(d) : null
  })
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [takenTimes, setTakenTimes] = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [dateError, setDateError] = useState('')
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    dob: '', pob: '', tob: '', message: '',
  })
  const [formErrors, setFormErrors] = useState<BookingDetailsErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [bookingId, setBookingId] = useState('')
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const { minDateStr, maxDateStr } = getBookingDateWindow()
  const dateIsValid = selectedDate ? isDateWithinBookingWindow(selectedDate) : false
  const availableTimes = selectedDate ? getAvailableTimesForDate(selectedDate, takenTimes) : []

  const loadSlotsForDate = (date: string) => {
    setSelectedDate(date)
    setSelectedTime('')
    setTakenTimes([])
    setDateError('')

    if (!date) return

    if (!isDateWithinBookingWindow(date)) {
      setDateError(`Please choose a date between ${minDateStr} and ${maxDateStr}.`)
      return
    }

    setLoadingSlots(true)
    fetch(`/api/availability?date=${date}`)
      .then((response) => response.json())
      .then((data) => {
        setTakenTimes(data.takenTimes || [])
        if (data.error) setDateError(data.error)
        setLoadingSlots(false)
      })
      .catch(() => {
        setDateError('Could not load available times. Please try again.')
        setLoadingSlots(false)
      })
  }

  const selectedOption = sessionType && duration
    ? SESSION_OPTIONS[sessionType].find((option) => option.duration === duration)
    : null
  const detailsPreview = validateBookingDetails(form, sessionType)

  const updateForm = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    setFormErrors((current) => ({ ...current, [field]: undefined }))
    setError('')
  }

  const handleBooking = async () => {
    const validation = validateBookingDetails(form, sessionType)
    if (!validation.success) {
      setFormErrors(validation.errors)
      setError('Please fix the highlighted details before continuing.')
      return
    }

    setSubmitting(true)
    setError('')
    try {
      if (!isDateWithinBookingWindow(selectedDate) || !availableTimes.includes(selectedTime)) {
        throw new Error('Please choose an available date and time.')
      }

      const details = validation.data
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: details.name,
          email: details.email,
          phone: details.phone,
          session_type: sessionType,
          duration: selectedOption?.duration,
          price: selectedOption?.price,
          date: selectedDate,
          time: selectedTime,
          dob: details.dob,
          pob: details.pob,
          tob: details.tob,
          message: buildBookingMessage(details, sessionType),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setBookingId(data.booking.id)
      setStep(4)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Please enter your name, email and phone number.')
    } finally {
      setSubmitting(false)
    }
  }

  const handlePayment = async () => {
    const validation = validateBookingDetails(form, sessionType)
    if (!validation.success) {
      setFormErrors(validation.errors)
      setStep(3)
      setError('Please fix the highlighted details before payment.')
      return
    }

    setSubmitting(true)
    setError('')
    try {
      const details = validation.data
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, amount: selectedOption?.price }),
      })
      const { orderId } = await res.json()
      const rzp = new (window as unknown as { Razorpay: new (opts: unknown) => { open: () => void } }).Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: (selectedOption?.price || 0) * 100,
        currency: 'INR',
        order_id: orderId,
        name: 'Serenova',
        description: `${sessionType} session - ${selectedOption?.label}`,
        prefill: { name: details.name, email: details.email, contact: details.phone },
        method: 'upi',
        theme: { color: '#c36b50' },
        readonly: { email: true, contact: true },
        modal: {
          ondismiss: () => setSubmitting(false),
        },
        handler: () => setDone(true),
      })
      rzp.open()
    } catch {
      setError("Payment couldn't be completed. Nothing was charged. Please try again or reach out on WhatsApp.")
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="container booking-success" style={{ padding: '128px var(--gutter)', maxWidth: 760 }}>
        <div className="form-panel" style={{ textAlign: 'center' }}>
          <span className="icon-tile" style={{ width: 64, height: 64, margin: '0 auto 22px', color: 'var(--success)' }}>
            <Check size={34} />
          </span>
          <span className="eyebrow">Booking confirmed</span>
          <h1 style={{ fontSize: 'var(--fs-display-sm)', marginBottom: 14 }}>Your session is reserved.</h1>
          <p style={{ color: 'var(--muted)', marginBottom: 26 }}>
            You will receive a WhatsApp message shortly with session details.
          </p>
          <div className="card" style={{ boxShadow: 'none', marginBottom: 24 }}>
            {selectedDate} at {selectedTime} IST - {sessionType === 'consultancy' ? 'Personal Consultancy' : 'Astrology + Guidance'} ({selectedOption?.label})
          </div>
          <Link href="/" className="btn btn-primary">Return home</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <ProgressIndicator step={step} />
      <section className="section booking-workspace">
        <div className="container booking-layout">
          <aside className="booking-intro-panel">
            <div className="booking-intro-copy">
              <span className="eyebrow">A quiet beginning</span>
              <h1>Reserve time that is entirely yours.</h1>
              <p>
                Choose the support you need. Everything you share is held privately, and you can move through the booking at your own pace.
              </p>
            </div>
            <div className="booking-assurances">
              <div className="signal-row">
                <Lock size={18} />
                <span>Private details</span>
                <strong>Confidential</strong>
              </div>
              <div className="signal-row">
                <Clock size={18} />
                <span>Times shown</span>
                <strong>IST</strong>
              </div>
              <div className="signal-row">
                <CreditCard size={18} />
                <span>Secure payment</span>
                <strong>Razorpay</strong>
              </div>
            </div>
          </aside>

          <div className="form-panel booking-form-panel">
            {step === 1 && (
              <div style={{ display: 'grid', gap: 24 }}>
                <div>
                  <span className="eyebrow">Step 1</span>
                  <h2 style={{ fontSize: 'var(--fs-display-sm)' }}>What kind of session are you looking for?</h2>
                </div>

                <div style={{ display: 'grid', gap: 12 }}>
                  {[
                    { type: 'consultancy' as const, title: 'Personal Consultancy', desc: 'Relationships, career, family, grief, or life transitions' },
                    { type: 'astrology' as const, title: 'Astrology + Guidance', desc: 'Birth chart reading with practical life guidance' },
                  ].map((item) => (
                    <button
                      key={item.type}
                      onClick={() => {
                        setSessionType(item.type)
                        setDuration(null)
                      }}
                      className={`option-card ${sessionType === item.type ? 'active' : ''}`}
                    >
                      <span className="icon-tile">
                        {item.type === 'consultancy' ? <UserRound size={20} /> : <Calendar size={20} />}
                      </span>
                      <span style={{ flex: 1 }}>
                        <strong style={{ display: 'block' }}>{item.title}</strong>
                        <span style={{ color: 'var(--muted)', fontSize: 13 }}>{item.desc}</span>
                      </span>
                    </button>
                  ))}
                </div>

                {sessionType && (
                  <div>
                    <p className="field-label" style={{ marginBottom: 10 }}>Choose duration</p>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      {SESSION_OPTIONS[sessionType].map((option) => (
                        <button
                          key={option.duration}
                          onClick={() => setDuration(option.duration)}
                          className={`tab ${duration === option.duration ? 'active' : ''}`}
                        >
                          {option.label} - Rs. {option.price.toLocaleString('en-IN')}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <button onClick={() => setStep(2)} disabled={!sessionType || !duration} className="btn btn-primary">
                  Continue
                  <ArrowRight size={17} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div style={{ display: 'grid', gap: 24 }}>
                <div>
                  <span className="eyebrow">Step 2</span>
                  <h2 style={{ fontSize: 'var(--fs-display-sm)' }}>Pick a date and time.</h2>
                  <p style={{ color: 'var(--muted)', marginTop: 8 }}>
                    All times are in IST. You can book from {minDateStr} to {maxDateStr}.
                  </p>
                </div>

                <div className="field">
                  <label>Select date</label>
                  <input className="input" type="date" value={selectedDate} min={minDateStr} max={maxDateStr} onChange={(e) => loadSlotsForDate(e.target.value)} />
                  {dateError && <p style={{ color: 'var(--error)', fontSize: 13 }}>{dateError}</p>}
                </div>

                {selectedDate && dateIsValid && (
                  <div>
                    <p className="field-label" style={{ marginBottom: 10 }}>
                      {loadingSlots ? 'Loading available times' : `Available times for ${selectedDate}`}
                    </p>
                    {loadingSlots ? (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10 }}>
                        {[1, 2, 3].map((item) => (
                          <button
                            key={item}
                            disabled
                            className="tab"
                            style={{ opacity: 0.45 }}
                          >
                            Loading
                          </button>
                        ))}
                      </div>
                    ) : availableTimes.length > 0 ? (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10 }}>
                        {availableTimes.map((slot) => {
                          const selected = selectedTime === slot
                          return (
                            <button
                              key={slot}
                              disabled={loadingSlots}
                              onClick={() => setSelectedTime(slot)}
                              className={`tab ${selected ? 'active' : ''}`}
                            >
                              {slot}
                            </button>
                          )
                        })}
                      </div>
                    ) : (
                      <p style={{ color: 'var(--muted)' }}>
                        No available times for this date. Please choose another date in the booking window.
                      </p>
                    )}
                  </div>
                )}

                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={() => setStep(1)} className="btn btn-secondary" style={{ flex: 1 }}>
                    <ArrowLeft size={17} />
                    Back
                  </button>
                  <button onClick={() => setStep(3)} disabled={!dateIsValid || !selectedTime || !availableTimes.includes(selectedTime)} className="btn btn-primary" style={{ flex: 2 }}>
                    Continue
                    <ArrowRight size={17} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div style={{ display: 'grid', gap: 22 }}>
                <div>
                  <span className="eyebrow">Step 3</span>
                  <h2 style={{ fontSize: 'var(--fs-display-sm)' }}>Your details.</h2>
                </div>

                <div className="field">
                  <label>Full name *</label>
                  <input
                    className="input"
                    value={form.name}
                    onChange={(e) => updateForm('name', e.target.value)}
                    placeholder="Your full name"
                    autoComplete="name"
                    maxLength={80}
                  />
                  <FieldError message={formErrors.name} />
                </div>
                <div className="field">
                  <label>Email address *</label>
                  <input
                    className="input"
                    type="email"
                    value={form.email}
                    onChange={(e) => updateForm('email', e.target.value)}
                    placeholder="you@email.com"
                    autoComplete="email"
                  />
                  <FieldError message={formErrors.email} />
                </div>
                <div className="field">
                  <label>Phone number *</label>
                  <input
                    className="input"
                    type="tel"
                    inputMode="numeric"
                    value={form.phone}
                    onChange={(e) => updateForm('phone', e.target.value)}
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    maxLength={14}
                  />
                  <FieldError message={formErrors.phone} />
                </div>

                {sessionType === 'astrology' && (
                  <div className="card" style={{ boxShadow: 'none', display: 'grid', gap: 16 }}>
                    <p style={{ color: 'var(--muted)' }}>Birth details help prepare your chart.</p>
                    <div className="grid-2">
                      <div className="field">
                        <label>Date of birth</label>
                        <input className="input" type="date" value={form.dob} max={minDateStr} onChange={(e) => updateForm('dob', e.target.value)} />
                        <FieldError message={formErrors.dob} />
                      </div>
                      <div className="field">
                        <label>Time of birth</label>
                        <input className="input" type="time" value={form.tob} onChange={(e) => updateForm('tob', e.target.value)} />
                        <FieldError message={formErrors.tob} />
                      </div>
                    </div>
                    <div className="field">
                      <label>Place of birth</label>
                      <input className="input" value={form.pob} onChange={(e) => updateForm('pob', e.target.value)} placeholder="City, State" maxLength={80} />
                      <FieldError message={formErrors.pob} />
                    </div>
                  </div>
                )}

                <div className="field">
                  <label>Anything you would like her to know?</label>
                  <textarea
                    className="textarea"
                    value={form.message}
                    onChange={(e) => updateForm('message', e.target.value)}
                    placeholder="Optional - share as little or as much as feels right."
                    maxLength={500}
                  />
                  <FieldError message={formErrors.message} />
                </div>

                <p style={{ color: 'var(--soft)', fontSize: 13, display: 'flex', gap: 8, alignItems: 'center' }}>
                  <Lock size={15} />
                  Your details are never shared. Sessions are strictly private.
                </p>

                {error && <p style={{ color: 'var(--error)' }}>{error}</p>}

                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={() => setStep(2)} className="btn btn-secondary" style={{ flex: 1 }}>
                    <ArrowLeft size={17} />
                    Back
                  </button>
                  <button onClick={handleBooking} disabled={!form.name || !form.email || !form.phone || submitting} className="btn btn-primary" style={{ flex: 2 }}>
                    {submitting ? 'Saving...' : 'Continue to Payment'}
                    <ArrowRight size={17} />
                  </button>
                </div>
              </div>
            )}

            {step === 4 && selectedOption && (
              <div style={{ display: 'grid', gap: 22 }}>
                <button onClick={() => setStep(3)} className="btn btn-secondary" style={{ justifySelf: 'start' }}>
                  <ArrowLeft size={17} />
                  Edit details
                </button>
                <div>
                  <span className="eyebrow">Step 4</span>
                  <h2 style={{ fontSize: 'var(--fs-display-sm)' }}>Confirm and pay.</h2>
                </div>

                <div className="card" style={{ boxShadow: 'none' }}>
                  <div style={{ display: 'grid', gap: 12, marginBottom: 22 }}>
                    {[
                      ['Session', `${sessionType === 'consultancy' ? 'Personal Consultancy' : 'Astrology + Guidance'} (${selectedOption.label})`],
                      ['Date', selectedDate],
                      ['Time', `${selectedTime} IST`],
                      ['Name', detailsPreview.success ? detailsPreview.data.name : form.name],
                    ].map(([label, value]) => (
                      <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
                        <span style={{ color: 'var(--muted)' }}>{label}</span>
                        <strong style={{ textAlign: 'right' }}>{value}</strong>
                      </div>
                    ))}
                  </div>

                  <div style={{ height: 1, background: 'rgba(29,36,48,0.1)', margin: '22px 0' }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
                    <strong>Total</strong>
                    <strong style={{ color: 'var(--teal-dark)', fontFamily: 'var(--font-mono)', fontSize: 30 }}>
                      Rs. {selectedOption.price.toLocaleString('en-IN')}
                    </strong>
                  </div>

                  {error && <p style={{ color: 'var(--error)', marginBottom: 16 }}>{error}</p>}

                  <button onClick={handlePayment} disabled={submitting} className="btn btn-primary" style={{ width: '100%' }}>
                    <CreditCard size={18} />
                    {submitting ? 'Opening payment...' : `Pay Rs. ${selectedOption.price.toLocaleString('en-IN')} Securely`}
                  </button>
                  <p style={{ color: 'var(--soft)', textAlign: 'center', fontSize: 12, marginTop: 14 }}>
                    Powered by Razorpay. UPI opens first; cards, net banking, and wallets remain available.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default function BookPage() {
  return (
    <div className="page-shell booking-page" style={{ paddingTop: 74 }}>
      <Suspense fallback={<p style={{ textAlign: 'center', padding: 80, color: 'var(--muted)' }}>Loading...</p>}>
        <BookingForm />
      </Suspense>
    </div>
  )
}
