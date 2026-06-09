'use client'

import { useState } from 'react'
import Link from 'next/link'

const consultancyPlans = [
  {
    duration: '30 min',
    price: '₹800',
    priceNum: 800,
    label: 'Quick Clarity',
    desc: 'Best for a focused question, a decision you\'re stuck on, or a check-in session.',
    features: ['One focused topic', 'Actionable guidance', 'Follow-up summary via WhatsApp'],
  },
  {
    duration: '60 min',
    price: '₹1,400',
    priceNum: 1400,
    label: 'Deep Dive',
    desc: 'Space to explore a situation fully — relationships, career, grief, life direction.',
    features: ['Open-ended exploration', 'Root cause discussion', 'Practical next steps', 'Follow-up summary'],
    popular: true,
  },
  {
    duration: '90 min',
    price: '₹1,900',
    priceNum: 1900,
    label: 'Full Session',
    desc: 'For complex situations that need time and depth. Often chosen for major life transitions.',
    features: ['Comprehensive exploration', 'Multiple topics welcome', 'Detailed action plan', 'Priority WhatsApp access for 48hrs'],
  },
]

const astrologyPlans = [
  {
    duration: '60 min',
    price: '₹1,800',
    priceNum: 1800,
    label: 'Birth Chart Reading',
    desc: 'Your natal chart decoded — personality, strengths, karmic patterns, and life themes.',
    features: ['Full birth chart analysis', 'Current planetary transits', 'Guidance on present situation', 'Written chart summary'],
  },
  {
    duration: '90 min',
    price: '₹2,400',
    priceNum: 2400,
    label: 'Chart + Life Guidance',
    desc: 'The complete experience — astrology reading followed by a full consultancy session.',
    features: ['Birth chart + transit analysis', 'Personalized life guidance', 'Remedies & suggestions', 'Detailed written summary', 'Priority WhatsApp access for 48hrs'],
    popular: true,
  },
]

const packages = [
  {
    name: '3-Session Pack',
    type: 'Consultancy',
    price: '₹3,600',
    original: '₹4,200',
    saving: 'Save ₹600',
    desc: 'Three 60-min consultancy sessions. Best for ongoing support through a difficult period.',
  },
  {
    name: '5-Session Pack',
    type: 'Consultancy',
    price: '₹5,500',
    original: '₹7,000',
    saving: 'Save ₹1,500',
    desc: 'Five sessions at a significant discount. Ideal for sustained guidance over 1–2 months.',
  },
  {
    name: 'Astro + Consult Bundle',
    type: 'Astrology',
    price: '₹4,200',
    original: '₹5,000',
    saving: 'Save ₹800',
    desc: 'One full astrology session + two 60-min consultancy sessions. The most popular bundle.',
  },
]

export default function SessionsPage() {
  const [activeTab, setActiveTab] = useState<'consultancy' | 'astrology'>('consultancy')

  return (
    <div style={{ backgroundColor: 'var(--parchment)' }}>

      {/* ── HERO ── */}
      <section style={{
        padding: '160px 24px 96px',
        textAlign: 'center',
        backgroundColor: 'var(--parchment)',
      }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <p style={{
            fontSize: '11px', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#C4956A', marginBottom: '20px',
          }}>
            Sessions & Pricing
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 5vw, 58px)',
            fontWeight: 500, color: '#0D0D0D',
            lineHeight: 1.15, marginBottom: '20px',
          }}>
            Find the session<br />
            <em style={{ color: '#C4956A' }}>that fits where you are.</em>
          </h1>
          <p style={{ fontSize: '16px', color: '#4A5F74', lineHeight: 1.8 }}>
            All sessions are available online or in-person.
            No preparation needed — just show up as you are.
          </p>
        </div>
      </section>

      {/* ── TABS ── */}
      <section style={{ padding: '0 24px 96px' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>

          {/* Tab switcher */}
          <div style={{
            display: 'flex',
            backgroundColor: '#fff',
            borderRadius: '999px',
            padding: '6px',
            width: 'fit-content',
            margin: '0 auto 64px',
            border: '1px solid #E8D5B7',
          }}>
            {(['consultancy', 'astrology'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                padding: '10px 28px',
                borderRadius: '999px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'all 0.2s',
                backgroundColor: activeTab === tab ? '#C4956A' : 'transparent',
                color: activeTab === tab ? '#fff' : '#8A7968',
                fontFamily: 'var(--font-body)',
              }}>
                {tab === 'consultancy' ? 'Personal Consultancy' : 'Astrology + Guidance'}
              </button>
            ))}
          </div>

          {/* Consultancy plans */}
          {activeTab === 'consultancy' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}>
              {consultancyPlans.map(({ duration, price, label, desc, features, popular }) => (
                <div key={duration} style={{
                  backgroundColor: popular ? '#0D0D0D' : '#fff',
                  borderRadius: '20px',
                  padding: '40px 36px',
                  border: popular ? 'none' : '1px solid #E8D5B7',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  position: 'relative',
                }}>
                  {popular && (
                    <span style={{
                      position: 'absolute', top: '-12px', left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: '#C4956A', color: '#fff',
                      fontSize: '10px', letterSpacing: '0.1em',
                      textTransform: 'uppercase', padding: '4px 16px',
                      borderRadius: '999px', whiteSpace: 'nowrap',
                      fontWeight: 500,
                    }}>
                      Most Popular
                    </span>
                  )}

                  <div>
                    <p style={{
                      fontSize: '11px', letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: '#C4956A', marginBottom: '8px',
                    }}>
                      {duration}
                    </p>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '24px', fontWeight: 500,
                      color: popular ? '#F7F2EA' : '#0D0D0D',
                    }}>
                      {label}
                    </h3>
                  </div>

                  <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '32px', fontWeight: 400,
                    color: '#C4956A', lineHeight: 1,
                  }}>
                    {price}
                  </p>

                  <p style={{ fontSize: '14px', color: popular ? '#8A7968' : '#4A5F74', lineHeight: 1.7 }}>
                    {desc}
                  </p>

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                    {features.map(f => (
                      <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <span style={{ color: '#C4956A', fontSize: '14px', marginTop: '2px', flexShrink: 0 }}>✓</span>
                        <span style={{ fontSize: '14px', color: popular ? '#8A7968' : '#4A5F74' }}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={`/book?type=consultancy&duration=${duration}`} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '14px 28px', borderRadius: '999px',
                    backgroundColor: popular ? '#C4956A' : 'transparent',
                    border: popular ? 'none' : '1.5px solid #C4956A',
                    color: popular ? '#fff' : '#C4956A',
                    fontSize: '14px', fontWeight: 500,
                    textDecoration: 'none', marginTop: 'auto',
                    transition: 'all 0.2s',
                  }}>
                    Book this session
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* Astrology plans */}
          {activeTab === 'astrology' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
              maxWidth: '760px',
              margin: '0 auto',
            }}>
              {astrologyPlans.map(({ duration, price, label, desc, features, popular }) => (
                <div key={duration} style={{
                  backgroundColor: popular ? '#0D0D0D' : '#fff',
                  borderRadius: '20px',
                  padding: '40px 36px',
                  border: popular ? 'none' : '1px solid #E8D5B7',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  position: 'relative',
                }}>
                  {popular && (
                    <span style={{
                      position: 'absolute', top: '-12px', left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: '#C4956A', color: '#fff',
                      fontSize: '10px', letterSpacing: '0.1em',
                      textTransform: 'uppercase', padding: '4px 16px',
                      borderRadius: '999px', whiteSpace: 'nowrap', fontWeight: 500,
                    }}>
                      Signature Session
                    </span>
                  )}

                  <div>
                    <p style={{
                      fontSize: '11px', letterSpacing: '0.15em',
                      textTransform: 'uppercase', color: '#C4956A', marginBottom: '8px',
                    }}>
                      {duration}
                    </p>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '24px', fontWeight: 500,
                      color: popular ? '#F7F2EA' : '#0D0D0D',
                    }}>
                      {label}
                    </h3>
                  </div>

                  <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '32px', fontWeight: 400,
                    color: '#C4956A', lineHeight: 1,
                  }}>
                    {price}
                  </p>

                  <p style={{ fontSize: '14px', color: popular ? '#8A7968' : '#4A5F74', lineHeight: 1.7 }}>
                    {desc}
                  </p>

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                    {features.map(f => (
                      <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <span style={{ color: '#C4956A', fontSize: '14px', marginTop: '2px', flexShrink: 0 }}>✓</span>
                        <span style={{ fontSize: '14px', color: popular ? '#8A7968' : '#4A5F74' }}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={`/book?type=astrology&duration=${duration}`} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '14px 28px', borderRadius: '999px',
                    backgroundColor: popular ? '#C4956A' : 'transparent',
                    border: popular ? 'none' : '1.5px solid #C4956A',
                    color: popular ? '#fff' : '#C4956A',
                    fontSize: '14px', fontWeight: 500,
                    textDecoration: 'none', marginTop: 'auto',
                  }}>
                    Book this session
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section style={{ padding: '96px 24px', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{
              fontSize: '11px', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#C4956A', marginBottom: '16px',
            }}>
              Better value
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(26px, 3.5vw, 40px)',
              fontWeight: 500, color: '#0D0D0D', marginBottom: '12px',
            }}>
              Session packages
            </h2>
            <p style={{ fontSize: '15px', color: '#4A5F74' }}>
              Commit to the process and save. All packages valid for 60 days from purchase.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            {packages.map(({ name, type, price, original, saving, desc }) => (
              <div key={name} style={{
                backgroundColor: 'var(--parchment)',
                borderRadius: '20px',
                padding: '36px 32px',
                border: '1px solid #E8D5B7',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <span style={{
                      fontSize: '10px', letterSpacing: '0.12em',
                      textTransform: 'uppercase', color: '#C4956A',
                      backgroundColor: '#FDF6EE', padding: '3px 10px',
                      borderRadius: '999px', display: 'inline-block', marginBottom: '10px',
                    }}>
                      {type}
                    </span>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '20px', fontWeight: 500, color: '#0D0D0D',
                    }}>
                      {name}
                    </h3>
                  </div>
                  <span style={{
                    backgroundColor: '#0D0D0D', color: '#C4956A',
                    fontSize: '11px', padding: '4px 10px',
                    borderRadius: '999px', whiteSpace: 'nowrap',
                    fontWeight: 500,
                  }}>
                    {saving}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '12px' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '28px', color: '#0D0D0D', fontWeight: 400,
                  }}>
                    {price}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '14px', color: '#8A7968',
                    textDecoration: 'line-through',
                  }}>
                    {original}
                  </span>
                </div>

                <p style={{ fontSize: '14px', color: '#4A5F74', lineHeight: 1.7, marginBottom: '24px' }}>
                  {desc}
                </p>

                <Link href="/book" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '12px 24px', borderRadius: '999px',
                  border: '1.5px solid #C4956A', color: '#C4956A',
                  fontSize: '14px', fontWeight: 500, textDecoration: 'none',
                }}>
                  Get this package
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '96px 24px', backgroundColor: 'var(--parchment)' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{
              fontSize: '11px', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#C4956A', marginBottom: '16px',
            }}>
              Common questions
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(26px, 3.5vw, 40px)',
              fontWeight: 500, color: '#0D0D0D',
            }}>
              Before you book
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              { q: 'Is my session completely confidential?', a: 'Yes, always. Everything shared in a session stays between you and her. No notes are shared externally, ever.' },
              { q: 'Can I reschedule or cancel?', a: 'Yes. You can reschedule up to 24 hours before your session at no charge. Cancellations within 24 hours are non-refundable but can be converted to credit.' },
              { q: 'What do I need to prepare for an astrology session?', a: 'Just your date, time, and place of birth. If you don\'t have your exact birth time, an approximate time works — she\'ll let you know during the session.' },
              { q: 'Are sessions available in Hindi?', a: 'Yes, sessions are available in both Hindi and English. You can switch between languages mid-session too.' },
              { q: 'How do I pay?', a: 'Payment is collected at the time of booking via Razorpay — UPI, cards, net banking, and wallets are all accepted.' },
            ].map(({ q, a }, i) => (
              <div key={i} style={{
                borderBottom: '1px solid #E8D5B7',
                padding: '24px 0',
              }}>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '17px', fontWeight: 500,
                  color: '#0D0D0D', marginBottom: '10px',
                }}>
                  {q}
                </p>
                <p style={{ fontSize: '14px', color: '#4A5F74', lineHeight: 1.8 }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        padding: '96px 24px',
        backgroundColor: '#0D0D0D',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 500, color: '#F7F2EA',
            lineHeight: 1.2, marginBottom: '20px',
          }}>
            Still unsure which session is right?
          </h2>
          <p style={{ fontSize: '15px', color: '#8A7968', lineHeight: 1.8, marginBottom: '36px' }}>
            Send a WhatsApp message — she'll help you figure out what fits before you commit to anything.
          </p>
          
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I'd like to know which session is right for me.")}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '14px 32px', borderRadius: '999px',
              backgroundColor: '#25D366', color: '#fff',
              fontSize: '15px', fontWeight: 500, textDecoration: 'none',
            }}
          >
            Chat on WhatsApp →
          </a>
        </div>
      </section>

    </div>
  )
}