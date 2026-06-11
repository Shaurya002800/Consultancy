'use client'

import { useState } from 'react'
import Link from 'next/link'

function InkDivider() {
  return (
    <svg width="100%" height="24" viewBox="0 0 1200 24" preserveAspectRatio="none"
      style={{ display: 'block', margin: '64px 0' }}>
      <path d="M0,12 C150,9 300,15 450,12 C600,9 750,15 900,12 C1050,9 1150,14 1200,12"
        stroke="#C9956A" strokeOpacity="0.35" strokeWidth="0.8" fill="none" />
    </svg>
  )
}

const eyebrow: React.CSSProperties = {
  fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600,
  letterSpacing: '0.15em', textTransform: 'uppercase',
  color: 'var(--gold)', marginBottom: '16px', display: 'block',
}

const consultancyPlans = [
  { duration: '30 min', label: 'Quick Clarity', price: 800, features: ['One focused topic', 'Actionable guidance', 'WhatsApp follow-up summary'], popular: false },
  { duration: '60 min', label: 'Deep Dive', price: 1400, features: ['Full situation exploration', 'Root cause discussion', 'Practical next steps', 'WhatsApp follow-up summary'], popular: true },
  { duration: '90 min', label: 'Full Session', price: 1900, features: ['Complex or multi-topic situations', 'Comprehensive action plan', 'WhatsApp follow-up summary', 'Priority access for 48hrs'], popular: false },
]

const astrologyPlans = [
  { duration: '60 min', label: 'Birth Chart Reading', price: 1800, features: ['Full natal chart analysis', 'Current planetary transits', 'Guidance on present situation', 'Written chart summary'], popular: false },
  { duration: '90 min', label: 'Chart + Life Guidance', price: 2400, features: ['Complete birth chart + transits', 'Personalized life guidance', 'Remedies & suggestions', 'Detailed written summary', 'Priority access for 48hrs'], popular: true },
]

const packages = [
  { name: '3-Session Pack', type: 'Consultancy', price: 3600, original: 4200, saving: 600, desc: 'Three 60-min consultancy sessions. Best for ongoing support through a difficult period. Valid 60 days.' },
  { name: '5-Session Pack', type: 'Consultancy', price: 5500, original: 7000, saving: 1500, desc: 'Five sessions at a significant discount. Ideal for sustained guidance over 1–2 months. Valid 60 days.' },
  { name: 'Astro + Consult Bundle', type: 'Mixed', price: 4200, original: 5000, saving: 800, desc: 'One full astrology session + two 60-min consultancy sessions. The most complete bundle. Valid 60 days.' },
]

const faqs = [
  { q: 'Is everything I share confidential?', a: 'Yes, completely. What you share in a session stays between you and your practitioner. Nothing is recorded, shared, or stored externally — ever.' },
  { q: 'Can I reschedule or cancel?', a: 'You can reschedule up to 24 hours before your session at no charge. Cancellations within 24 hours are non-refundable but can be converted to credit for a future session.' },
  { q: 'What do I need for an astrology session?', a: 'Just your date, time, and place of birth. An approximate birth time works fine — she\'ll let you know if it affects the reading.' },
  { q: 'Are sessions available in Hindi?', a: 'Yes, sessions are available in both Hindi and English. You can switch between languages mid-session too.' },
  { q: 'How do I pay?', a: 'Payment is collected at the time of booking via Razorpay — UPI, cards, net banking, and wallets all accepted.' },
]

export default function SessionsPage() {
  const [activeTab, setActiveTab] = useState<'consultancy' | 'astrology'>('consultancy')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const plans = activeTab === 'consultancy' ? consultancyPlans : astrologyPlans

  return (
    <div>

      {/* ── HERO ── */}
      <section style={{
        backgroundColor: 'var(--dusk-indigo)',
        padding: '120px 48px 80px', textAlign: 'center',
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <span style={{ ...eyebrow, color: 'var(--gold)' }}>Book a Session</span>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--fs-display-lg)',
            fontWeight: 300, color: 'var(--gold-pale)',
            lineHeight: 1.1, marginBottom: '20px',
          }}>
            Transparent pricing.<br />
            <em>No pressure.</em>
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-body-lg)',
            color: 'var(--bone)', lineHeight: 1.7,
          }}>
            All sessions are one-on-one and completely private. Online or in-person.
          </p>
        </div>
      </section>

      {/* ── TAB SWITCHER ── */}
      <div style={{
        backgroundColor: 'var(--warm-white)',
        borderBottom: '1px solid var(--bone)',
        position: 'sticky', top: '64px', zIndex: 40,
      }}>
        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          padding: '0 48px',
          display: 'flex', gap: '0',
        }}>
          {(['consultancy', 'astrology'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fs-body-md)',
              fontWeight: activeTab === tab ? 600 : 400,
              color: activeTab === tab ? 'var(--ink)' : 'var(--dusty)',
              padding: '20px 0',
              marginRight: '40px',
              background: 'none', border: 'none', cursor: 'pointer',
              borderBottom: activeTab === tab ? '2px solid var(--gold)' : '2px solid transparent',
              transition: 'all var(--dur-fast) var(--ease-warm)',
            }}>
              {tab === 'consultancy' ? 'Personal Consultancy' : 'Astrology + Guidance'}
            </button>
          ))}
        </div>
      </div>

      {/* ── PRICING CARDS ── */}
      <section style={{ backgroundColor: 'var(--warm-white)', padding: '80px 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            {plans.map(({ duration, label, price, features, popular }) => (
              <div key={duration} style={{
                backgroundColor: popular ? 'var(--dusk-indigo)' : 'var(--warm-white)',
                border: popular ? '1px solid var(--gold)' : '1px solid var(--bone)',
                borderRadius: 'var(--radius)',
                padding: '40px 36px',
                display: 'flex', flexDirection: 'column', gap: '20px',
                position: 'relative',
              }}>
                {popular && (
                  <span style={{
                    position: 'absolute', top: '-1px', right: '-1px',
                    backgroundColor: 'var(--gold)',
                    color: 'var(--warm-white)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '10px', fontWeight: 600,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    padding: '6px 12px',
                    borderRadius: '0 var(--radius) 0 var(--radius)',
                  }}>Most Popular</span>
                )}

                <div>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: '11px',
                    fontWeight: 600, letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--dusty)', marginBottom: '8px',
                  }}>{duration}</p>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '32px', fontWeight: 400,
                    color: popular ? 'var(--gold-pale)' : 'var(--ink)',
                  }}>{label}</h3>
                </div>

                <div>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '28px', color: 'var(--gold)',
                  }}>
                    Rs. {price.toLocaleString('en-IN')}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-body)', fontSize: '14px',
                    color: 'var(--dusty)', marginLeft: '6px',
                  }}>/ session</span>
                </div>

                <div style={{
                  width: '100%', height: '1px',
                  backgroundColor: popular ? 'rgba(226,216,200,0.15)' : 'var(--bone)',
                }} />

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                  {features.map(f => (
                    <li key={f} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--gold)', fontSize: '13px', marginTop: '2px', flexShrink: 0 }}>✓</span>
                      <span style={{
                        fontFamily: 'var(--font-body)', fontSize: '14px',
                        color: popular ? 'var(--bone)' : 'var(--violet-grey)',
                        lineHeight: 1.5,
                      }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/book?type=${activeTab}&duration=${duration}`}
                  className={popular ? 'btn btn-primary' : 'btn btn-secondary'}
                  style={{ textAlign: 'center', display: 'block' }}>
                  Book this session
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section style={{ backgroundColor: 'var(--parchment)', padding: '80px 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <span style={eyebrow}>Commit & Save</span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--fs-display-md)',
            fontWeight: 400, color: 'var(--ink)',
            marginBottom: '48px',
          }}>
            Packages for ongoing support.
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            {packages.map(({ name, type, price, original, saving, desc }) => (
              <div key={name} style={{
                backgroundColor: 'var(--warm-white)',
                border: '1px solid var(--bone)',
                borderRadius: 'var(--radius)',
                padding: '36px 32px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <span style={{
                      fontFamily: 'var(--font-body)', fontSize: '10px',
                      fontWeight: 600, letterSpacing: '0.12em',
                      textTransform: 'uppercase', color: 'var(--gold)',
                      display: 'block', marginBottom: '8px',
                    }}>{type}</span>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--fs-heading-xl)',
                      fontWeight: 500, color: 'var(--ink)',
                    }}>{name}</h3>
                  </div>
                  <span style={{
                    backgroundColor: 'var(--gold-pale)',
                    border: '1px solid var(--gold)',
                    color: 'var(--gold)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px', fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: 'var(--radius)',
                    whiteSpace: 'nowrap',
                  }}>
                    Save Rs. {saving.toLocaleString('en-IN')}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '12px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '28px', color: 'var(--ink)' }}>
                    Rs. {price.toLocaleString('en-IN')}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '14px',
                    color: 'var(--dusty)', textDecoration: 'line-through',
                  }}>
                    Rs. {original.toLocaleString('en-IN')}
                  </span>
                </div>

                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body-sm)',
                  color: 'var(--violet-grey)', lineHeight: 1.7, marginBottom: '24px',
                }}>{desc}</p>

                <Link href="/book" className="btn btn-secondary"
                  style={{ display: 'block', textAlign: 'center' }}>
                  Get this package
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ backgroundColor: 'var(--warm-white)', padding: '80px 48px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <span style={eyebrow}>Common Questions</span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--fs-display-md)',
            fontWeight: 400, color: 'var(--ink)',
            marginBottom: '48px',
          }}>
            Answered honestly.
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {faqs.map(({ q, a }, i) => (
              <div key={i} style={{ borderBottom: '1px solid var(--bone)' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                  width: '100%', display: 'flex',
                  justifyContent: 'space-between', alignItems: 'center',
                  padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer',
                  textAlign: 'left',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--fs-heading-md)',
                    fontWeight: 600,
                    color: openFaq === i ? 'var(--gold)' : 'var(--ink)',
                    transition: 'color var(--dur-fast)',
                  }}>{q}</span>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '20px', color: 'var(--gold)',
                    transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)',
                    transition: 'transform var(--dur-medium)',
                    flexShrink: 0, marginLeft: '16px',
                  }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ paddingBottom: '20px' }}>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--fs-body-md)',
                      color: 'var(--violet-grey)', lineHeight: 1.8,
                    }}>{a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ marginTop: '48px', textAlign: 'center' }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fs-body-md)',
              color: 'var(--violet-grey)', marginBottom: '16px',
            }}>
              Still unsure? Ask anything on WhatsApp →
            </p>
            
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hi, I'd like to know which session is right for me.`}
              target="_blank" rel="noopener noreferrer"
              className="btn btn-whatsapp">
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}