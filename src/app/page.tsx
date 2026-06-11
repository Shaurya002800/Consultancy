'use client'

import Link from 'next/link'

// ── Ink Divider SVGs ────────────────────────────────────
function InkDivider({ variant = 'A' }: { variant?: 'A' | 'B' | 'C' }) {
  const paths = {
    A: 'M0,12 C150,9 300,15 450,12 C600,9 750,15 900,12 C1050,9 1150,14 1200,12',
    B: 'M0,12 C200,15 350,9 500,13 C650,17 800,8 950,12 C1050,14 1150,10 1200,12',
    C: 'M0,12 C100,8 250,16 400,11 C550,6 700,16 850,12 C1000,8 1100,15 1200,12',
  }
  return (
    <svg width="100%" height="24" viewBox="0 0 1200 24"
      preserveAspectRatio="none" style={{ display: 'block', margin: '64px 0' }}>
      <path d={paths[variant]} stroke="#C9956A" strokeOpacity="0.35"
        strokeWidth="0.8" fill="none" />
    </svg>
  )
}

// ── Shared styles ───────────────────────────────────────
const eyebrow: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'var(--gold)',
  marginBottom: '16px',
  display: 'block',
}

export default function Home() {
  return (
    <div>

      {/* ══ 1. HERO ══════════════════════════════════════ */}
      <section style={{
        minHeight: '100vh',
        backgroundColor: 'var(--dusk-indigo)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
        padding: 'var(--sp-20) var(--gutter) var(--sp-16)',
      }}>
        {/* Breathing glow */}
        <div className="hero-glow" style={{
          position: 'absolute',
          top: '40%', left: '50%',
          width: '600px', height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,149,106,0.18) 0%, rgba(201,149,106,0) 70%)',
          pointerEvents: 'none', zIndex: 0,
          transform: 'translate(-50%, -40%)',
        }} />

        <div style={{
          position: 'relative', zIndex: 1,
          maxWidth: '800px', width: '100%',
        }}>
          <span style={eyebrow}>Serenova · Guidance & Astrology</span>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--fs-display-xl)',
            fontWeight: 300,
            color: 'var(--ghost-white)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: '28px',
          }}>
            You don't have to<br />
            <em style={{
              fontStyle: 'italic',
              color: 'var(--gold-pale)',
              fontWeight: 300,
            }}>
              figure it out alone.
            </em>
          </h1>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-body-lg)',
            color: 'var(--dusty)',
            lineHeight: 1.7,
            marginBottom: '48px',
            maxWidth: '520px',
          }}>
            One conversation can change everything.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '72px' }}>
            <Link href="/book" className="btn btn-primary">
              Book a Session
            </Link>
            <Link href="/sessions" className="btn btn-ghost">
              Learn About Sessions
            </Link>
          </div>

          {/* Credibility bar */}
          <div style={{
            paddingTop: '32px',
            borderTop: '1px solid rgba(226,216,200,0.15)',
            display: 'flex', gap: '48px', flexWrap: 'wrap',
          }}>
            {[
              { num: '200+', label: 'Sessions completed' },
              { num: '8+ yrs', label: 'In practice' },
              { num: '100%', label: 'Strictly private' },
            ].map(({ num, label }) => (
              <div key={label}>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '18px',
                  color: 'var(--gold)',
                  lineHeight: 1,
                  marginBottom: '4px',
                }}>{num}</p>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  color: 'var(--bone)',
                  letterSpacing: '0.03em',
                }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 2. PAIN POINTS ═══════════════════════════════ */}
      <section style={{
        backgroundColor: 'var(--parchment)',
        padding: 'var(--sp-12) var(--gutter)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <span style={eyebrow}>Sound familiar?</span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--fs-display-md)',
            fontWeight: 400,
            color: 'var(--ink)',
            marginBottom: '0',
            maxWidth: '640px',
          }}>
            You don't have to carry this alone.
          </h2>

          <InkDivider variant="A" />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
          }}>
            {[
              { icon: '◌', text: 'I can\'t stop worrying — the same thoughts loop and I can\'t find the off switch.' },
              { icon: '◌', text: 'There\'s a big decision ahead and I don\'t know who to talk to about it honestly.' },
              { icon: '◌', text: 'I feel lost in a life transition and need someone to help me find direction.' },
              { icon: '◌', text: 'I don\'t know who to trust with something this personal.' },
            ].map(({ icon, text }, i) => (
              <div key={i} style={{
                backgroundColor: 'var(--warm-sand)',
                borderLeft: '3px solid var(--gold)',
                borderRadius: 'var(--radius)',
                padding: '32px 28px',
                transition: 'transform var(--dur-medium) var(--ease-warm), box-shadow var(--dur-medium) var(--ease-warm)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(201,149,106,0.12)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
              }}>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--fs-body-md)',
                  color: 'var(--violet-grey)',
                  lineHeight: 1.7,
                }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. SERVICES ══════════════════════════════════ */}
      <section style={{
        backgroundColor: 'var(--warm-white)',
        padding: 'var(--sp-12) var(--gutter)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <span style={eyebrow}>What Serenova Offers</span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--fs-display-md)',
            fontWeight: 400,
            color: 'var(--ink)',
            marginBottom: '0',
          }}>
            Three ways to find your way forward.
          </h2>

          <InkDivider variant="B" />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '48px',
          }}>
            {[
              {
                icon: '◈',
                title: 'Personal Consultancy',
                desc: 'A one-on-one space to be heard without judgment. For relationships, career, grief, or anything weighing on your mind.',
                price: '800',
                href: '/sessions',
              },
              {
                icon: '◈',
                title: 'Astrology + Guidance',
                desc: 'Your birth chart decoded and then worked through together. Cosmic perspective meets lived wisdom.',
                price: '1,800',
                href: '/sessions',
              },
              {
                icon: '◈',
                title: 'Companion Travel',
                desc: 'A trusted adult companion for your child\'s journey. You stay home. They explore freely. You have peace of mind.',
                price: null,
                href: '/travel',
              },
            ].map(({ icon, title, desc, price, href }) => (
              <div key={title} style={{
                backgroundColor: 'var(--parchment)',
                border: '1px solid var(--bone)',
                borderRadius: 'var(--radius)',
                padding: '32px',
                display: 'flex', flexDirection: 'column', gap: '16px',
                transition: 'all var(--dur-medium) var(--ease-warm)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--warm-sand)'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--gold)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(201,149,106,0.12)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--parchment)'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--bone)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
              }}>
                <span style={{ fontSize: '32px', color: 'var(--gold)' }}>{icon}</span>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--fs-display-sm)',
                  fontWeight: 400,
                  color: 'var(--ink)',
                  lineHeight: 1.2,
                }}>{title}</h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--fs-body-md)',
                  color: 'var(--violet-grey)',
                  lineHeight: 1.7,
                  flex: 1,
                }}>{desc}</p>
                <div style={{
                  paddingTop: '16px',
                  borderTop: '1px solid var(--bone)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    color: 'var(--dusty)',
                  }}>Starting from</span>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '18px',
                    color: 'var(--gold)',
                  }}>
                    {price ? `Rs. ${price}` : 'Enquire'}
                  </span>
                </div>
                <Link href={href} style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--gold)',
                  textDecoration: 'none',
                  letterSpacing: '0.05em',
                }}>
                  Learn more →
                </Link>
              </div>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <div style={{ textAlign: 'center' }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fs-body-md)',
              color: 'var(--violet-grey)',
              marginBottom: '16px',
            }}>
              Unsure which is right for you?
            </p>
            
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
              target="_blank" rel="noopener noreferrer"
              className="btn btn-whatsapp">
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ══ 4. HOW IT WORKS ══════════════════════════════ */}
      <section style={{
        backgroundColor: 'var(--parchment)',
        padding: 'var(--sp-10) var(--gutter)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <span style={eyebrow}>Your first step is easy</span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--fs-display-md)',
            fontWeight: 400,
            color: 'var(--ink)',
            marginBottom: '64px',
          }}>
            Three steps, then you're heard.
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '0',
            position: 'relative',
          }}>
            {[
              { num: '01', title: 'Choose your session', desc: 'Pick the type of support that speaks to where you are right now.' },
              { num: '02', title: 'Pick a time that works', desc: 'Browse available slots and book directly. Confirmation arrives immediately.' },
              { num: '03', title: 'Show up as you are', desc: 'No preparation needed. Just come as you are. She meets you there.' },
            ].map(({ num, title, desc }, i) => (
              <div key={num} style={{
                padding: '0 40px 0 0',
                borderRight: i < 2 ? '1px solid var(--bone)' : 'none',
                paddingRight: i < 2 ? '40px' : '0',
                paddingLeft: i > 0 ? '40px' : '0',
              }}>
                {/* Ghost number */}
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '72px',
                  fontWeight: 300,
                  color: 'var(--bone)',
                  lineHeight: 1,
                  marginBottom: '-16px',
                  letterSpacing: '-0.03em',
                }}>
                  {num}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--fs-heading-lg)',
                  fontWeight: 500,
                  color: 'var(--ink)',
                  marginBottom: '12px',
                  position: 'relative',
                  zIndex: 1,
                }}>{title}</h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--fs-body-md)',
                  color: 'var(--violet-grey)',
                  lineHeight: 1.7,
                }}>{desc}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '56px' }}>
            <Link href="/book" className="btn btn-primary">
              Book Your First Session
            </Link>
          </div>
        </div>
      </section>

      {/* ══ 5. TESTIMONIALS ══════════════════════════════ */}
      <section style={{
        backgroundColor: 'var(--dusk-indigo)',
        padding: 'var(--sp-12) var(--gutter)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <span style={eyebrow}>What clients say</span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--fs-display-md)',
            fontWeight: 400,
            color: 'var(--gold-pale)',
            marginBottom: '64px',
          }}>
            Real people. Real change.
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            {[
              { quote: 'I came in feeling completely lost. After one session, I had a direction. She doesn\'t just listen — she helps you see what you already know.', name: 'R.M.', city: 'Delhi' },
              { quote: 'The astrology session was unlike anything I expected. It felt like someone had read my entire life and handed me a map forward.', name: 'A.S.', city: 'Mumbai' },
              { quote: 'My son traveled with her companion service. She kept him safe, engaged — he came back with stories I\'ll never forget.', name: 'M.R.', city: 'Bangalore' },
            ].map(({ quote, name, city }) => (
              <div key={name} style={{
                backgroundColor: 'var(--twilight)',
                borderLeft: '3px solid var(--gold)',
                borderRadius: 'var(--radius)',
                padding: '32px',
              }}>
                {/* Opening quote mark */}
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '48px',
                  color: 'var(--gold)',
                  lineHeight: 0.8,
                  marginBottom: '16px',
                  opacity: 0.6,
                }}>"</div>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '20px',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: 'var(--ghost-white)',
                  lineHeight: 1.7,
                  marginBottom: '28px',
                }}>{quote}</p>
                <div style={{
                  width: '40px', height: '2px',
                  backgroundColor: 'var(--gold)',
                  marginBottom: '16px',
                  opacity: 0.5,
                }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    backgroundColor: 'var(--gold)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-display)',
                    fontSize: '14px', fontWeight: 500,
                    color: 'var(--warm-white)',
                    flexShrink: 0,
                  }}>
                    {name[0]}
                  </div>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: 'var(--dusty)',
                  }}>{name}, {city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. CTA BANNER ════════════════════════════════ */}
      <section style={{
        backgroundColor: 'var(--gold-pale)',
        padding: 'var(--sp-10) var(--gutter)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--fs-display-md)',
            fontWeight: 400,
            color: 'var(--ink)',
            lineHeight: 1.2,
            marginBottom: '24px',
          }}>
            Your next chapter starts with<br />one conversation.
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-body-md)',
            color: 'var(--slate)',
            lineHeight: 1.7,
            marginBottom: '40px',
          }}>
            No judgment. No scripts. Just you and someone who genuinely listens.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/book" className="btn btn-primary">Book a Session</Link>
            
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
              target="_blank" rel="noopener noreferrer"
              className="btn btn-whatsapp">
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}