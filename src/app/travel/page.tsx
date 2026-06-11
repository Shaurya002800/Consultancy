'use client'

import Link from 'next/link'
import { useState } from 'react'

const eyebrow: React.CSSProperties = {
  fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600,
  letterSpacing: '0.15em', textTransform: 'uppercase',
  color: 'var(--gold)', marginBottom: '16px', display: 'block',
}

export default function TravelPage() {
  const [form, setForm] = useState({ name: '', phone: '', age: '', destination: '', dates: '', message: '' })

  const inputStyle: React.CSSProperties = {
    width: '100%', height: '48px',
    padding: '12px 16px',
    borderRadius: 'var(--radius)',
    border: '1px solid var(--bone)',
    backgroundColor: 'var(--warm-white)',
    color: 'var(--ink)',
    fontFamily: 'var(--font-body)', fontSize: '15px',
    outline: 'none',
    transition: 'border-color var(--dur-fast)',
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)', fontSize: '12px',
    fontWeight: 600, letterSpacing: '0.08em',
    textTransform: 'uppercase', color: 'var(--violet-grey)',
    marginBottom: '6px', display: 'block',
  }

  return (
    <div>

      {/* ── HERO ── */}
      <section style={{
        background: 'linear-gradient(135deg, var(--dusk-indigo) 0%, var(--twilight) 100%)',
        padding: '120px 48px 96px', textAlign: 'center',
      }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <span style={eyebrow}>Companion Travel</span>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--fs-display-lg)',
            fontWeight: 300, color: 'var(--gold-pale)',
            lineHeight: 1.1, marginBottom: '24px',
          }}>
            Your child explores freely.<br />
            <em>You have peace of mind.</em>
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-body-lg)',
            color: 'var(--bone)', lineHeight: 1.7, marginBottom: '40px',
          }}>
            A trusted, caring adult companion who travels with your child — keeping them safe, engaged, and coming home with stories worth telling.
          </p>
          <a href="#inquire" className="btn btn-primary">Enquire About a Trip</a>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ── */}
      <section style={{ backgroundColor: 'var(--warm-white)', padding: '80px 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <span style={eyebrow}>What's included</span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--fs-display-md)',
            fontWeight: 400, color: 'var(--ink)',
            marginBottom: '56px',
          }}>
            More than a chaperone.<br />A genuine companion.
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
          }}>
            {[
              { icon: '◌', title: 'Pre-Trip Planning', desc: 'Full itinerary agreed with the family before departure. No surprises.' },
              { icon: '◌', title: 'Regular Check-ins', desc: 'Updates via WhatsApp throughout — photos, location, status.' },
              { icon: '◌', title: 'Safety First', desc: 'First-aid trained. Always has emergency contacts and a backup plan.' },
              { icon: '◌', title: 'Child\'s Pace', desc: 'Trips move at the child\'s pace — never rushed, always present.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{
                backgroundColor: 'var(--parchment)',
                borderLeft: '3px solid var(--gold)',
                borderRadius: 'var(--radius)',
                padding: '32px 28px',
              }}>
                <div style={{ fontSize: '24px', color: 'var(--gold)', marginBottom: '12px' }}>{icon}</div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--fs-heading-lg)',
                  fontWeight: 500, color: 'var(--ink)', marginBottom: '8px',
                }}>{title}</h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--fs-body-sm)',
                  color: 'var(--violet-grey)', lineHeight: 1.7,
                }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section style={{ backgroundColor: 'var(--parchment)', padding: '80px 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <span style={eyebrow}>Who this is for</span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--fs-display-md)',
            fontWeight: 400, color: 'var(--ink)', marginBottom: '56px',
          }}>
            Built for families like yours.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {[
              { title: 'Busy parents', desc: 'You want your child to travel — but work makes it impossible to go yourself.' },
              { title: 'Solo young travellers', desc: 'Your child is ready to explore but you\'d feel better with a trusted adult alongside.' },
              { title: 'Single-parent families', desc: 'Having a companion takes the weight off without taking away the experience.' },
              { title: 'Educational trips', desc: 'Heritage tours, nature camps, school excursions — she knows how to make them meaningful.' },
            ].map(({ title, desc }) => (
              <div key={title} style={{
                backgroundColor: 'var(--warm-white)',
                border: '1px solid var(--bone)',
                borderRadius: 'var(--radius)',
                padding: '32px 28px',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--fs-heading-lg)',
                  fontWeight: 500, color: 'var(--ink)', marginBottom: '10px',
                }}>{title}</h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--fs-body-sm)',
                  color: 'var(--violet-grey)', lineHeight: 1.7,
                }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ backgroundColor: 'var(--warm-white)', padding: '80px 48px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <span style={eyebrow}>The process</span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--fs-display-md)',
            fontWeight: 400, color: 'var(--ink)', marginBottom: '64px',
          }}>
            From inquiry to adventure.
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { step: '01', title: 'Send an inquiry', desc: 'Fill in the form below or message on WhatsApp with your child\'s age, destination, and travel dates.' },
              { step: '02', title: 'Discovery call', desc: 'A free 20-minute call to understand your family\'s needs, your child\'s personality, and what you\'re hoping for.' },
              { step: '03', title: 'Trip planning', desc: 'Itinerary, accommodation, activities, and safety protocols planned together. You approve everything.' },
              { step: '04', title: 'Travel & updates', desc: 'She travels with your child, sends regular updates, and handles anything that comes up along the way.' },
              { step: '05', title: 'Safe return', desc: 'Your child comes home safe, full of stories, and probably asking to go again.' },
            ].map(({ step, title, desc }, i) => (
              <div key={step} style={{
                display: 'flex', gap: '28px',
                paddingBottom: i < 4 ? '40px' : '0',
                marginBottom: i < 4 ? '40px' : '0',
                borderBottom: i < 4 ? '1px solid var(--bone)' : 'none',
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '36px', fontWeight: 300,
                  color: 'var(--bone)', lineHeight: 1, flexShrink: 0, width: '52px',
                }}>{step}</span>
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--fs-heading-lg)',
                    fontWeight: 500, color: 'var(--ink)', marginBottom: '8px',
                  }}>{title}</h3>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--fs-body-md)',
                    color: 'var(--violet-grey)', lineHeight: 1.8,
                  }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING NOTE ── */}
      <section style={{ backgroundColor: 'var(--parchment)', padding: '64px 48px' }}>
        <div style={{
          maxWidth: '680px', margin: '0 auto',
          backgroundColor: 'var(--warm-white)',
          border: '1px solid var(--bone)',
          borderRadius: 'var(--radius)',
          padding: '48px', textAlign: 'center',
        }}>
          <span style={eyebrow}>Pricing</span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--fs-display-sm)',
            fontWeight: 400, color: 'var(--ink)', marginBottom: '16px',
          }}>Every trip is priced individually.</h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-body-md)',
            color: 'var(--violet-grey)', lineHeight: 1.8, marginBottom: '12px',
          }}>
            Companion fee typically ranges from{' '}
            <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>Rs. 1,500–3,000 per day</strong>,
            depending on the nature of the trip. Travel expenses are covered separately by the family.
          </p>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-body-sm)',
            color: 'var(--dusty)', marginBottom: '32px',
          }}>
            A discovery call is always free — no commitment until you're ready.
          </p>
          
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I'd like to enquire about Companion Travel.")}`}
            target="_blank" rel="noopener noreferrer"
            className="btn btn-whatsapp">
            Chat on WhatsApp →
          </a>
        </div>
      </section>

      {/* ── INQUIRY FORM ── */}
      <section id="inquire" style={{ backgroundColor: 'var(--dusk-indigo)', padding: '96px 48px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <span style={eyebrow}>Get in touch</span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--fs-display-md)',
            fontWeight: 300, color: 'var(--gold-pale)',
            marginBottom: '12px',
          }}>Tell us about the trip.</h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-body-md)',
            color: 'var(--bone)', marginBottom: '48px',
          }}>
            Fill this in and she'll get back to you within 24 hours.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ ...labelStyle, color: 'var(--dusty)' }}>Your name *</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Rahul Sharma"
                  style={{ ...inputStyle, backgroundColor: 'var(--twilight)', border: '1px solid rgba(226,216,200,0.2)', color: 'var(--ghost-white)' }} />
              </div>
              <div>
                <label style={{ ...labelStyle, color: 'var(--dusty)' }}>WhatsApp *</label>
                <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  style={{ ...inputStyle, backgroundColor: 'var(--twilight)', border: '1px solid rgba(226,216,200,0.2)', color: 'var(--ghost-white)' }} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ ...labelStyle, color: 'var(--dusty)' }}>Child's age *</label>
                <input value={form.age} onChange={e => setForm({ ...form, age: e.target.value })}
                  placeholder="e.g. 10 years"
                  style={{ ...inputStyle, backgroundColor: 'var(--twilight)', border: '1px solid rgba(226,216,200,0.2)', color: 'var(--ghost-white)' }} />
              </div>
              <div>
                <label style={{ ...labelStyle, color: 'var(--dusty)' }}>Destination *</label>
                <input value={form.destination} onChange={e => setForm({ ...form, destination: e.target.value })}
                  placeholder="e.g. Manali"
                  style={{ ...inputStyle, backgroundColor: 'var(--twilight)', border: '1px solid rgba(226,216,200,0.2)', color: 'var(--ghost-white)' }} />
              </div>
            </div>
            <div>
              <label style={{ ...labelStyle, color: 'var(--dusty)' }}>Travel dates</label>
              <input value={form.dates} onChange={e => setForm({ ...form, dates: e.target.value })}
                placeholder="e.g. July 15–20, 2026"
                style={{ ...inputStyle, backgroundColor: 'var(--twilight)', border: '1px solid rgba(226,216,200,0.2)', color: 'var(--ghost-white)' }} />
            </div>
            <div>
              <label style={{ ...labelStyle, color: 'var(--dusty)' }}>Anything else we should know</label>
              <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                rows={4} placeholder="Number of children, special needs, budget, questions..."
                style={{
                  ...inputStyle, height: 'auto', resize: 'vertical',
                  backgroundColor: 'var(--twilight)', border: '1px solid rgba(226,216,200,0.2)',
                  color: 'var(--ghost-white)',
                }} />
            </div>
            <button
              onClick={() => {
                const params = new URLSearchParams({
                  text: `Hi! Companion Travel enquiry.\n\nParent: ${form.name}\nPhone: ${form.phone}\nChild age: ${form.age}\nDestination: ${form.destination}\nDates: ${form.dates}\nDetails: ${form.message}`,
                })
                window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?${params}`, '_blank')
              }}
              className="btn btn-whatsapp"
              style={{ width: '100%', justifyContent: 'center' }}>
              Send Enquiry via WhatsApp →
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}