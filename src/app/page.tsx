'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function Home() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let scale = 1
    let growing = true
    let frame: number

    const pulse = () => {
      if (growing) {
        scale += 0.002
        if (scale >= 1.15) growing = false
      } else {
        scale -= 0.002
        if (scale <= 1) growing = true
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`
      }
      frame = requestAnimationFrame(pulse)
    }

    frame = requestAnimationFrame(pulse)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div style={{ backgroundColor: 'var(--parchment)' }}>

      {/* ── HERO ── */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '120px 24px 80px',
      }}>
        {/* Breathing glow */}
        <div ref={glowRef} style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(196,149,106,0.18) 0%, rgba(196,149,106,0.06) 50%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        <div style={{
          position: 'relative', zIndex: 1,
          maxWidth: '760px',
          textAlign: 'center',
        }}>
          <p style={{
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#C4956A',
            fontWeight: 400,
            marginBottom: '28px',
          }}>
            Personal Guidance · Astrology · Companion Travel
          </p>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(42px, 7vw, 80px)',
            fontWeight: 500,
            color: '#0D0D0D',
            lineHeight: 1.1,
            marginBottom: '28px',
            letterSpacing: '-0.02em',
          }}>
            You don't have to<br />
            <em style={{ fontStyle: 'italic', color: '#C4956A' }}>figure it out alone.</em>
          </h1>

          <p style={{
            fontSize: '18px',
            color: '#4A5F74',
            lineHeight: 1.8,
            marginBottom: '48px',
            maxWidth: '520px',
            margin: '0 auto 48px',
          }}>
            A safe space to be heard, understood, and guided — through life's
            crossroads, cosmic questions, and everything in between.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/book" style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '14px 36px',
              borderRadius: '999px',
              backgroundColor: '#C4956A',
              color: '#fff',
              fontSize: '15px',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = '#A67B52'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = '#C4956A'}>
              Book a Session
            </Link>
            <Link href="/about" style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '14px 36px',
              borderRadius: '999px',
              border: '1.5px solid #2C3E50',
              color: '#2C3E50',
              fontSize: '15px',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.backgroundColor = '#2C3E50'
              ;(e.currentTarget as HTMLElement).style.color = '#fff'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
              ;(e.currentTarget as HTMLElement).style.color = '#2C3E50'
            }}>
              Meet Serenova
            </Link>
          </div>

          {/* Trust bar */}
          <div style={{
            marginTop: '72px',
            display: 'flex',
            gap: '48px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            {[
              { num: '200+', label: 'Lives Touched' },
              { num: '8 yrs', label: 'Experience' },
              { num: '98%', label: 'Feel Heard' },
            ].map(({ num, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '28px',
                  fontWeight: 500,
                  color: '#0D0D0D',
                  lineHeight: 1,
                }}>{num}</p>
                <p style={{ fontSize: '12px', color: '#8A7968', marginTop: '6px', letterSpacing: '0.05em' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAIN POINTS ── */}
      <section style={{
        padding: '96px 24px',
        backgroundColor: '#fff',
      }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4956A', marginBottom: '16px' }}>
              You are not alone
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 500,
              color: '#0D0D0D',
            }}>
              Does any of this feel familiar?
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
          }}>
            {[
              { icon: '🌀', text: 'Feeling stuck in the same patterns, unable to move forward' },
              { icon: '💬', text: 'Needing someone to talk to — really talk to, without judgment' },
              { icon: '✨', text: 'Seeking clarity about your path using cosmic perspective' },
              { icon: '🧳', text: 'Wanting a trusted companion for your child\'s journey' },
            ].map(({ icon, text }) => (
              <div key={text} style={{
                backgroundColor: '#F7F2EA',
                borderRadius: '16px',
                padding: '32px 28px',
                border: '1px solid #E8D5B7',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e: { currentTarget: HTMLElement }) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(196,149,106,0.12)'
              }}
              onMouseLeave={(e: { currentTarget: HTMLElement }) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
              }}>
                <div style={{ fontSize: '28px', marginBottom: '16px' }}>{icon}</div>
                <p style={{ fontSize: '15px', color: '#2C3E50', lineHeight: 1.7 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ padding: '96px 24px', backgroundColor: 'var(--parchment)' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4956A', marginBottom: '16px' }}>
              What we offer
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 500,
              color: '#0D0D0D',
            }}>
              Three ways to find your way
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
            {[
              {
                tag: 'Most Popular',
                title: 'Personal Consultancy',
                desc: 'A one-on-one conversation built entirely around you. Share what\'s weighing on you, explore your options, and leave with clarity and direction.',
                price: 'From ₹800',
                href: '/sessions',
                accent: false,
              },
              {
                tag: 'Signature',
                title: 'Astrology + Guidance',
                desc: 'Your birth chart meets lived experience. Understand the cosmic forces shaping your present, then work through them with personalized guidance.',
                price: 'From ₹1,200',
                href: '/sessions',
                accent: true,
              },
              {
                tag: 'Unique Service',
                title: 'Companion Travel',
                desc: 'A caring, experienced companion for your child\'s trips — so they explore freely and you have peace of mind.',
                price: 'Custom pricing',
                href: '/travel',
                accent: false,
              },
            ].map(({ tag, title, desc, price, href, accent }) => (
              <div key={title} style={{
                backgroundColor: accent ? '#0D0D0D' : '#fff',
                borderRadius: '20px',
                padding: '40px 36px',
                border: accent ? 'none' : '1px solid #E8D5B7',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e: { currentTarget: HTMLElement }) => (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'}
              onMouseLeave={(e: { currentTarget: HTMLElement }) => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}>
                <span style={{
                  display: 'inline-block',
                  fontSize: '10px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#C4956A',
                  backgroundColor: accent ? 'rgba(196,149,106,0.15)' : '#FDF6EE',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  width: 'fit-content',
                }}>
                  {tag}
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '22px',
                  fontWeight: 500,
                  color: accent ? '#F7F2EA' : '#0D0D0D',
                }}>
                  {title}
                </h3>
                <p style={{ fontSize: '14px', color: accent ? '#8A7968' : '#4A5F74', lineHeight: 1.8, flex: 1 }}>
                  {desc}
                </p>
                <div style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '16px',
                  borderTop: `1px solid ${accent ? '#1E1E1E' : '#E8D5B7'}`,
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    color: '#C4956A',
                    fontWeight: 500,
                  }}>
                    {price}
                  </span>
                  <Link href={href} style={{
                    fontSize: '13px',
                    color: accent ? '#C4956A' : '#2C3E50',
                    textDecoration: 'none',
                    fontWeight: 500,
                  }}>
                    Learn more →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '96px 24px', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4956A', marginBottom: '16px' }}>
            Simple process
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 500,
            color: '#0D0D0D',
            marginBottom: '64px',
          }}>
            From first visit to feeling better
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              { step: '01', title: 'Choose your session', desc: 'Pick the type of support that speaks to where you are right now — consultancy, astrology, or travel companionship.' },
              { step: '02', title: 'Pick a time that works', desc: 'Browse available slots and book directly. You\'ll get a confirmation and a gentle reminder before your session.' },
              { step: '03', title: 'Show up as you are', desc: 'No preparation needed. Just come as you are. Your session is a judgment-free space built entirely for you.' },
            ].map(({ step, title, desc }, i) => (
              <div key={step} style={{
                display: 'flex',
                gap: '32px',
                textAlign: 'left',
                paddingBottom: i < 2 ? '48px' : '0',
                marginBottom: i < 2 ? '48px' : '0',
                borderBottom: i < 2 ? '1px solid #E8D5B7' : 'none',
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '36px',
                  fontWeight: 400,
                  color: '#E8D5B7',
                  lineHeight: 1,
                  flexShrink: 0,
                  width: '56px',
                }}>
                  {step}
                </span>
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '20px',
                    fontWeight: 500,
                    color: '#0D0D0D',
                    marginBottom: '8px',
                  }}>
                    {title}
                  </h3>
                  <p style={{ fontSize: '15px', color: '#4A5F74', lineHeight: 1.8 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: '96px 24px', backgroundColor: 'var(--parchment)' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4956A', marginBottom: '16px' }}>
              Real stories
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 500,
              color: '#0D0D0D',
            }}>
              What people say
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              { quote: 'I came in feeling completely lost. After one session, I had a direction. She doesn\'t just listen — she helps you see what you already know.', name: 'Priya M.', location: 'Delhi' },
              { quote: 'The astrology session was unlike anything I expected. It felt like someone had read my entire life and handed me a map forward.', name: 'Arjun S.', location: 'Mumbai' },
              { quote: 'My son traveled with her companion service for the first time. She kept him safe, engaged, and came back with stories I\'ll never forget.', name: 'Meera R.', location: 'Bangalore' },
            ].map(({ quote, name, location }) => (
              <div key={name} style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                padding: '36px 32px',
                border: '1px solid #E8D5B7',
              }}>
                <p style={{
                  fontSize: '15px',
                  color: '#2C3E50',
                  lineHeight: 1.8,
                  marginBottom: '28px',
                  fontStyle: 'italic',
                  fontFamily: 'var(--font-display)',
                }}>
                  "{quote}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px', height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#F7F2EA',
                    border: '1px solid #E8D5B7',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#C4956A',
                    fontFamily: 'var(--font-display)',
                  }}>
                    {name[0]}
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 500, color: '#0D0D0D' }}>{name}</p>
                    <p style={{ fontSize: '12px', color: '#8A7968' }}>{location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{
        padding: '96px 24px',
        backgroundColor: '#0D0D0D',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4956A', marginBottom: '24px' }}>
            Ready when you are
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(30px, 5vw, 52px)',
            fontWeight: 500,
            color: '#F7F2EA',
            lineHeight: 1.2,
            marginBottom: '24px',
          }}>
            Your next chapter<br />
            <em style={{ color: '#C4956A' }}>starts with one conversation.</em>
          </h2>
          <p style={{ fontSize: '16px', color: '#8A7968', lineHeight: 1.8, marginBottom: '40px' }}>
            Sessions are available online and in-person. Slots fill up quickly — book yours today.
          </p>
          <Link href="/book" style={{
            display: 'inline-flex', alignItems: 'center',
            padding: '16px 40px',
            borderRadius: '999px',
            backgroundColor: '#C4956A',
            color: '#fff',
            fontSize: '16px',
            fontWeight: 500,
            textDecoration: 'none',
          }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = '#A67B52'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = '#C4956A'}>
            Book a Session
          </Link>
        </div>
      </section>

    </div>
  )
}