'use client'

import { ArrowRight, CheckCircle2, Compass, MapPinned, MessageCircle, ShieldCheck, UserRoundCheck } from 'lucide-react'
import { useState } from 'react'
import { SerenovaBrandPanel } from '@/components/brand/SerenovaBrand'

const included = [
  ['Pre-trip planning', 'Itinerary, stay, activities, emergency contacts, and expectations agreed with the family.'],
  ['Regular check-ins', 'WhatsApp updates throughout the trip: photos, status, location, and quick notes.'],
  ['Safety-first supervision', 'A trusted adult presence with backup plans and calm handling when plans change.'],
  ['Child-paced travel', 'The trip moves around the child, not a rushed adult schedule.'],
]

const travelSteps = [
  ['Inquiry', 'Share child age, destination, dates, and what kind of support you need.'],
  ['Discovery call', 'A free call to understand the family, child personality, safety needs, and budget.'],
  ['Trip plan', 'You approve itinerary, travel mode, accommodation, check-in rhythm, and boundaries.'],
  ['Travel support', 'She travels with your child and keeps the family updated along the way.'],
  ['Safe return', 'A closing update after the trip with notes, highlights, and anything parents should know.'],
]

export default function TravelPage() {
  const [form, setForm] = useState({ name: '', phone: '', age: '', destination: '', dates: '', message: '' })

  const sendInquiry = () => {
    const params = new URLSearchParams({
      text: `Hi! Companion Travel enquiry.\n\nParent: ${form.name}\nPhone: ${form.phone}\nChild age: ${form.age}\nDestination: ${form.destination}\nDates: ${form.dates}\nDetails: ${form.message}`,
    })
    window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?${params}`, '_blank')
  }

  return (
    <div className="page-shell">
      <section className="hero" style={{ minHeight: '82vh', backgroundPosition: 'center 35%' }}>
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">Companion Travel</span>
            <h1>
              Your child explores freely. <em>You stay reassured.</em>
            </h1>
            <p>
              A trusted adult companion for children and young travellers, designed for families who want independence, safety, communication, and a calmer way to say yes to travel.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 34 }}>
              <a href="#inquire" className="btn btn-primary">
                Start an Inquiry
                <ArrowRight size={17} />
              </a>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I would like to ask about Companion Travel.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <MessageCircle size={18} />
                Ask on WhatsApp
              </a>
            </div>
          </div>

          <div className="visual-board">
            <div className="board-content">
              <div style={{ marginBottom: 16 }}>
                <SerenovaBrandPanel />
              </div>
              <div className="signal-card">
                <p style={{ color: 'var(--gold-light)', marginBottom: 18 }}>Family travel command center</p>
                {[
                  ['Route approved', 'Before departure'],
                  ['Parent updates', 'During travel'],
                  ['Return summary', 'After arrival'],
                ].map(([label, timing]) => (
                  <div className="signal-row" key={label}>
                    <MapPinned size={18} />
                    <span>{label}</span>
                    <strong>{timing}</strong>
                  </div>
                ))}
              </div>
              <div className="pulse-line" style={{ marginTop: 18 }} />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">What is included</span>
            <h2>More than a chaperone. A calm adult system around the trip.</h2>
            <p>Companion travel works when parents know the plan and children feel supported without feeling controlled.</p>
          </div>

          <div className="grid-4">
            {included.map(([title, copy], index) => {
              const icons = [Compass, MessageCircle, ShieldCheck, UserRoundCheck]
              const Icon = icons[index]
              return (
                <article className="service-card" key={title}>
                  <span className="icon-tile">
                    <Icon size={20} />
                  </span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--paper)' }}>
        <div className="container split">
          <div className="section-heading" style={{ marginBottom: 0 }}>
            <span className="eyebrow">Best fit</span>
            <h2>For parents who want to say yes, but need the right support.</h2>
            <p>
              Useful for busy parents, single-parent families, solo young travellers, school trips, heritage tours, camps, and first independent travel experiences.
            </p>
          </div>
          <div className="card">
            <ul className="list-clean">
              {[
                'Child is ready to explore but needs adult supervision.',
                'Parents cannot travel because of work or family responsibilities.',
                'The destination needs planning, local navigation, and steady check-ins.',
                'The family wants independence without losing safety visibility.',
              ].map((item) => (
                <li key={item}>
                  <CheckCircle2 size={18} color="var(--clay)" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section dark-band">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">The process</span>
            <h2>From inquiry to safe return.</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 1, background: 'rgba(255,250,242,0.12)', borderRadius: 8, overflow: 'hidden' }}>
            {travelSteps.map(([title, copy], index) => (
              <div key={title} style={{ padding: 24, background: 'rgba(255,250,242,0.08)' }}>
                <p style={{ color: 'var(--gold-light)', fontFamily: 'var(--font-mono)', marginBottom: 16 }}>0{index + 1}</p>
                <h3 style={{ fontSize: 26, marginBottom: 10 }}>{title}</h3>
                <p>{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="card">
            <span className="eyebrow">Pricing</span>
            <h2 style={{ fontSize: 'var(--fs-display-sm)', marginBottom: 14 }}>Every trip is priced individually.</h2>
            <p style={{ color: 'var(--muted)', marginBottom: 18 }}>
              Companion fee typically ranges from <strong style={{ color: 'var(--ink)' }}>Rs. 1,500-3,000 per day</strong>, depending on the trip. Travel expenses are covered separately by the family.
            </p>
            <p style={{ color: 'var(--soft)' }}>The discovery call is free. No commitment until the plan feels right.</p>
          </div>

          <div id="inquire" className="form-panel">
            <span className="eyebrow">Start an inquiry</span>
            <h2 style={{ fontSize: 'var(--fs-display-sm)', marginBottom: 24 }}>Tell us about the trip.</h2>
            <div style={{ display: 'grid', gap: 16 }}>
              <div className="grid-2">
                <div className="field">
                  <label>Your name *</label>
                  <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Rahul Sharma" />
                </div>
                <div className="field">
                  <label>WhatsApp *</label>
                  <input className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" />
                </div>
              </div>
              <div className="grid-2">
                <div className="field">
                  <label>Child&apos;s age *</label>
                  <input className="input" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} placeholder="10 years" />
                </div>
                <div className="field">
                  <label>Destination *</label>
                  <input className="input" value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} placeholder="Manali" />
                </div>
              </div>
              <div className="field">
                <label>Travel dates</label>
                <input className="input" value={form.dates} onChange={(e) => setForm({ ...form, dates: e.target.value })} placeholder="July 15-20, 2026" />
              </div>
              <div className="field">
                <label>Anything else we should know</label>
                <textarea className="textarea" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Number of children, special needs, budget, questions..." />
              </div>
              <button onClick={sendInquiry} className="btn btn-whatsapp" style={{ width: '100%' }}>
                <MessageCircle size={18} />
                Send Enquiry via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
