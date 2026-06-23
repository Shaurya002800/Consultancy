'use client'

import { ArrowRight, CheckCircle2, Compass, MessageCircle, ShieldCheck, UserRoundCheck } from 'lucide-react'
import { useState } from 'react'
import EditorialHero from '@/components/layout/EditorialHero'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

const included = [
  ['Pre-trip planning', 'Itinerary, stay, activities, emergency contacts, accessibility, and expectations agreed before departure.'],
  ['Regular check-ins', 'WhatsApp updates throughout the trip: photos, status, location, and quick notes.'],
  ['Safety-first support', 'A trusted companion presence with backup plans and calm handling when plans change.'],
  ['Traveller-paced journeys', 'The trip moves around the traveller’s comfort, energy, mobility, and interests.'],
]

const travelSteps = [
  ['Inquiry', 'Share the traveller’s age group, destination, dates, and the kind of companionship required.'],
  ['Discovery call', 'A free call to understand the traveller, comfort needs, safety considerations, and budget.'],
  ['Trip plan', 'Agree on itinerary, travel mode, accommodation, check-in rhythm, assistance, and boundaries.'],
  ['Travel support', 'She travels alongside the traveller and keeps the chosen contacts updated along the way.'],
  ['Safe return', 'A closing update after the trip with notes, highlights, and anything the family should know.'],
]

export default function TravelPage() {
  const [form, setForm] = useState({ name: '', phone: '', traveller: '', destination: '', dates: '', message: '' })

  const sendInquiry = () => {
    const params = new URLSearchParams({
      text: `Hi! Companion Travel enquiry.\n\nContact name: ${form.name}\nPhone: ${form.phone}\nTraveller age/group: ${form.traveller}\nDestination: ${form.destination}\nDates: ${form.dates}\nDetails: ${form.message}`,
    })
    window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?${params}`, '_blank')
  }

  return (
    <div className="page-shell editorial-page travel-page">
      <EditorialHero
        variant="travel"
        eyebrow="Companion Travel"
        title={<>Travel with freedom. <em>Never without support.</em></>}
        copy="Thoughtful travel companionship for people of any age, with the planning, safety, assistance, and communication that make a journey feel possible."
        noteLabel="The promise"
        note="The traveller feels independent, respected, and supported. Their chosen people stay informed, never left wondering."
        actions={(
          <>
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
          </>
        )}
      />

      <section className="section">
        <div className="container">
          <RevealOnScroll>
            <div className="section-heading">
              <span className="eyebrow">What is included</span>
              <h2>More than company. A calm support system around the journey.</h2>
              <p>Companion travel works when the plan is clear and the traveller feels supported without feeling controlled.</p>
            </div>
          </RevealOnScroll>

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
            <h2>For anyone who wants to travel, but needs the right person beside them.</h2>
            <p>
              Useful for children, first-time solo travellers, senior citizens, people who need mobility or language support, and families who cannot accompany a loved one.
            </p>
          </div>
          <div className="card">
            <ul className="list-clean">
              {[
                'A young traveller is ready to explore but still needs responsible supervision.',
                'A senior or adult traveller would feel safer with practical assistance and company.',
                'The destination needs planning, local navigation, and steady check-ins.',
                'Family or friends cannot travel, but want reliable updates and peace of mind.',
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

          <div className="travel-process-grid">
            {travelSteps.map(([title, copy], index) => (
              <div className="travel-process-step" key={title}>
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
          <div className="travel-pricing-panel">
            <span className="eyebrow">Pricing</span>
            <h2 style={{ fontSize: 'var(--fs-display-sm)', marginBottom: 14 }}>Every trip is priced individually.</h2>
            <p style={{ color: 'var(--muted)', marginBottom: 18 }}>
              Companion fee typically ranges from <strong style={{ color: 'var(--ink)' }}>Rs. 1,500-3,000 per day</strong>, depending on the trip. Travel expenses are covered separately by the family.
            </p>
            <p style={{ color: 'var(--soft)' }}>The discovery call is free. No commitment until the plan feels right.</p>
          </div>

          <div id="inquire" className="form-panel travel-inquiry-panel">
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
                  <label>Traveller age / group *</label>
                  <input className="input" value={form.traveller} onChange={(e) => setForm({ ...form, traveller: e.target.value })} placeholder="Senior, adult, or 10 years" />
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
                <textarea className="textarea" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Number of travellers, mobility or health needs, language support, budget, questions..." />
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
