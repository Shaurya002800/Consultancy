'use client'

import Link from 'next/link'

function InkDivider({ variant = 'A' }: { variant?: 'A' | 'B' | 'C' }) {
  const paths = {
    A: 'M0,12 C150,9 300,15 450,12 C600,9 750,15 900,12 C1050,9 1150,14 1200,12',
    B: 'M0,12 C200,15 350,9 500,13 C650,17 800,8 950,12 C1050,14 1150,10 1200,12',
    C: 'M0,12 C100,8 250,16 400,11 C550,6 700,16 850,12 C1000,8 1100,15 1200,12',
  }
  return (
    <svg width="100%" height="24" viewBox="0 0 1200 24" preserveAspectRatio="none"
      style={{ display: 'block', margin: '64px 0' }}>
      <path d={paths[variant]} stroke="#C9956A" strokeOpacity="0.35" strokeWidth="0.8" fill="none" />
    </svg>
  )
}

const eyebrow: React.CSSProperties = {
  fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600,
  letterSpacing: '0.15em', textTransform: 'uppercase',
  color: 'var(--gold)', marginBottom: '16px', display: 'block',
}

export default function AboutPage() {
  return (
    <div>

      {/* ── HERO ── */}
      <section style={{
        backgroundColor: 'var(--dusk-indigo)',
        padding: '120px 48px 96px',
      }}>
        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '7fr 5fr',
          gap: '80px', alignItems: 'center',
        }}>
          <div>
            <span style={eyebrow}>About Serenova</span>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--fs-display-lg)',
              fontWeight: 300, color: 'var(--gold-pale)',
              lineHeight: 1.1, marginBottom: '28px',
            }}>
              She's been where<br />
              <em style={{ fontStyle: 'italic' }}>you are now.</em>
            </h1>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fs-body-lg)',
              color: 'var(--bone)', lineHeight: 1.7,
              maxWidth: '480px',
            }}>
              Over eight years of guiding people through life's hardest moments — with warmth, honesty, and a perspective that goes beyond the ordinary.
            </p>
          </div>

          {/* Photo placeholder */}
          <div style={{
            aspectRatio: '4/5',
            backgroundColor: 'var(--twilight)',
            borderRadius: 'var(--radius)',
            border: '2px solid var(--gold)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '12px',
          }}>
            <div style={{
              width: '72px', height: '72px', borderRadius: '50%',
              backgroundColor: 'var(--gold)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontSize: '28px',
              color: 'var(--warm-white)',
            }}>S</div>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '12px',
              fontStyle: 'italic', color: 'var(--dusty)',
            }}>Add your photo here</p>
          </div>
        </div>
      </section>

      {/* ── CREDENTIAL BAR ── */}
      <section style={{
        backgroundColor: 'var(--gold-pale)',
        padding: '40px 48px',
      }}>
        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0',
        }}>
          {[
            { num: '8+', label: 'Years in practice' },
            { num: '200+', label: 'Sessions completed' },
            { num: '3', label: 'Services offered' },
            { num: '100%', label: 'Private, every session' },
          ].map(({ num, label }, i) => (
            <div key={label} style={{
              textAlign: 'center', padding: '16px 24px',
              borderRight: i < 3 ? '1px solid var(--bone)' : 'none',
            }}>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '28px',
                color: 'var(--gold)', lineHeight: 1, marginBottom: '6px',
              }}>{num}</p>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '12px',
                color: 'var(--slate)',
              }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── STORY ── */}
      <section style={{ backgroundColor: 'var(--warm-white)', padding: '96px 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <span style={eyebrow}>Her Story</span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--fs-display-md)',
              fontWeight: 400, color: 'var(--ink)', marginBottom: '0',
            }}>
              Guidance born from lived experience.
            </h2>

            <InkDivider variant="A" />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '48px' }}>
              {[
                'She grew up watching people carry burdens in silence — and decided early on that she wanted to be the person who helped lift them.',
                'With a background in counselling and a lifelong study of Vedic astrology, she brings together two worlds that most people keep separate: the deeply personal and the cosmically guided.',
                'Over 200 people have sat across from her. Some came with grief. Some with confusion. Some with nothing but a feeling that something had to change. All of them left with more clarity than they arrived with.',
              ].map((para, i) => (
                <p key={i} style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--fs-body-lg)',
                  color: 'var(--ink)', lineHeight: 1.8,
                }}>{para}</p>
              ))}
            </div>

            {/* Pull quote */}
            <blockquote style={{
              borderLeft: '3px solid var(--gold)',
              paddingLeft: '28px', margin: '48px 0',
            }}>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: '26px', fontStyle: 'italic',
                fontWeight: 400, color: 'var(--gold)',
                lineHeight: 1.5,
              }}>
                "Her approach is simple: she listens first, judges never, and speaks only when her words will genuinely help."
              </p>
            </blockquote>
          </div>

          {/* Values row */}
          <InkDivider variant="B" />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '32px',
          }}>
            {[
              { icon: '◌', title: 'No Judgment', desc: 'Whatever you bring into the room stays in the room — heard without verdict.' },
              { icon: '◌', title: 'No Scripts', desc: 'Every session is shaped by you. There is no standard template or fixed agenda.' },
              { icon: '◌', title: 'No False Hope', desc: 'Honesty is kindness here. You\'ll always get the truth, delivered with care.' },
              { icon: '◌', title: 'Full Presence', desc: 'When you\'re in a session, you have her complete, undivided attention.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '24px', color: 'var(--gold)',
                  marginBottom: '12px',
                }}>{icon}</div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--fs-heading-lg)',
                  fontWeight: 500, color: 'var(--ink)',
                  marginBottom: '8px',
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

      {/* ── TRANSFORMATION STORIES ── */}
      <section style={{ backgroundColor: 'var(--parchment)', padding: '80px 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <span style={eyebrow}>Transformations</span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--fs-display-md)',
            fontWeight: 400, color: 'var(--ink)',
            marginBottom: '64px',
          }}>
            What changes after one session.
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              {
                label: 'Career Crossroads',
                headline: 'He came in certain he needed to quit.',
                story: 'A 29-year-old engineer came in certain he needed to quit his job. After two sessions exploring what he actually wanted — not just what he was running from — he negotiated a role change instead. Last we heard, he leads a team he loves.',
                attr: 'R.M., 34, Delhi',
              },
              {
                label: 'Relationship & Loss',
                headline: 'Three sessions gave her a language for grief.',
                story: 'A woman processing a broken engagement found it impossible to talk to family without spiralling. Three sessions gave her a language for her grief and the courage to take it one day at a time. She started her own small business six months later.',
                attr: 'P.S., 28, Mumbai',
              },
              {
                label: 'Astrology & Clarity',
                headline: 'The chart confirmed what their gut already knew.',
                story: 'A couple at a crossroads about relocating abroad used an astrology + guidance session to understand the timing of their decision. The birth chart confirmed what their gut already knew. They moved. They\'re thriving.',
                attr: 'A. & N., Pune',
              },
            ].map(({ label, headline, story, attr }, i) => (
              <div key={i}>
                <div style={{
                  padding: '48px 0',
                  display: 'grid',
                  gridTemplateColumns: '1fr 2fr',
                  gap: '64px', alignItems: 'start',
                }}>
                  <div>
                    <span style={{
                      fontFamily: 'var(--font-body)', fontSize: '10px',
                      fontWeight: 600, letterSpacing: '0.15em',
                      textTransform: 'uppercase', color: 'var(--gold)',
                      display: 'block', marginBottom: '12px',
                    }}>{label}</span>
                    <p style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '24px', fontStyle: 'italic',
                      fontWeight: 400, color: 'var(--ink)',
                      lineHeight: 1.4,
                    }}>{headline}</p>
                  </div>
                  <div>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--fs-body-md)',
                      color: 'var(--violet-grey)', lineHeight: 1.8,
                      marginBottom: '16px',
                    }}>{story}</p>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--fs-body-sm)',
                      color: 'var(--dusty)',
                    }}>— {attr}</p>
                  </div>
                </div>
                {i < 2 && <InkDivider variant="C" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        backgroundColor: 'var(--gold-pale)',
        padding: '80px 48px', textAlign: 'center',
      }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--fs-display-sm)',
            fontWeight: 400, color: 'var(--ink)',
            lineHeight: 1.2, marginBottom: '20px',
          }}>
            Curious if this is right for you?
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-body-md)',
            color: 'var(--slate)', lineHeight: 1.8, marginBottom: '36px',
          }}>
            Browse the sessions to find what fits — or book directly. The first step is always the hardest, and she'll meet you right there.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/sessions" className="btn btn-primary">View Sessions</Link>
            <Link href="/book" className="btn btn-secondary">Book Now</Link>
          </div>
        </div>
      </section>

    </div>
  )
}