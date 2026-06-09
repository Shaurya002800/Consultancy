export default function AboutPage() {
  return (
    <div style={{ backgroundColor: 'var(--parchment)' }}>

      {/* ── HERO ── */}
      <section style={{
        padding: '160px 24px 96px',
        backgroundColor: '#0D0D0D',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <p style={{
            fontSize: '11px', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#C4956A', marginBottom: '24px',
          }}>
            The person behind Serenova
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(38px, 6vw, 64px)',
            fontWeight: 500, color: '#F7F2EA',
            lineHeight: 1.15, marginBottom: '28px',
          }}>
            She's been where<br />
            <em style={{ color: '#C4956A' }}>you are now.</em>
          </h1>
          <p style={{
            fontSize: '17px', color: '#8A7968',
            lineHeight: 1.8, maxWidth: '520px', margin: '0 auto',
          }}>
            Over 8 years of guiding people through life's hardest moments —
            with warmth, honesty, and a perspective that goes beyond the ordinary.
          </p>
        </div>
      </section>

      {/* ── STORY ── */}
      <section style={{ padding: '96px 24px', backgroundColor: '#fff' }}>
        <div style={{
          maxWidth: '1120px', margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '80px',
          alignItems: 'center',
        }}>
          {/* Photo placeholder */}
          <div style={{
            aspectRatio: '4/5',
            backgroundColor: '#F7F2EA',
            borderRadius: '20px',
            border: '1px solid #E8D5B7',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              backgroundColor: '#E8D5B7',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)',
              fontSize: '28px', color: '#C4956A',
            }}>
              S
            </div>
            <p style={{ fontSize: '13px', color: '#8A7968' }}>Add your photo here</p>
          </div>

          {/* Story text */}
          <div>
            <p style={{
              fontSize: '11px', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#C4956A', marginBottom: '20px',
            }}>
              Her story
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(26px, 3.5vw, 36px)',
              fontWeight: 500, color: '#0D0D0D',
              lineHeight: 1.3, marginBottom: '28px',
            }}>
              Listening has always been her gift.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                'She grew up watching people carry burdens in silence — and decided early on that she wanted to be the person who helped lift them.',
                'With a background in counselling and a lifelong study of Vedic astrology, she brings together two worlds that most people keep separate: the deeply personal and the cosmically guided.',
                'Over 200 people have sat across from her. Some came with grief. Some with confusion. Some with nothing but a feeling that something had to change. All of them left with more clarity than they arrived with.',
                'Her approach is simple: she listens first, judges never, and speaks only when her words will genuinely help.',
              ].map((para, i) => (
                <p key={i} style={{ fontSize: '15px', color: '#4A5F74', lineHeight: 1.9 }}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CREDENTIALS ── */}
      <section style={{ padding: '96px 24px', backgroundColor: 'var(--parchment)' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{
              fontSize: '11px', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#C4956A', marginBottom: '16px',
            }}>
              Experience & background
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(26px, 3.5vw, 40px)',
              fontWeight: 500, color: '#0D0D0D',
            }}>
              What she brings to every session
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px',
          }}>
            {[
              { icon: '🎓', title: '8+ Years', sub: 'Active practice in personal consultancy and life guidance' },
              { icon: '🌙', title: 'Vedic Astrology', sub: 'Deep study of Jyotish — birth charts, transits, and remedies' },
              { icon: '🤝', title: '200+ Sessions', sub: 'Across relationships, career crossroads, grief, and transitions' },
              { icon: '🧳', title: 'Companion Travel', sub: 'Trusted by families across India for child-accompanied journeys' },
            ].map(({ icon, title, sub }) => (
              <div key={title} style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                padding: '32px 28px',
                border: '1px solid #E8D5B7',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>{icon}</div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '20px', fontWeight: 500,
                  color: '#0D0D0D', marginBottom: '10px',
                }}>
                  {title}
                </h3>
                <p style={{ fontSize: '14px', color: '#8A7968', lineHeight: 1.7 }}>{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUCCESS STORIES ── */}
      <section style={{ padding: '96px 24px', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{
              fontSize: '11px', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#C4956A', marginBottom: '16px',
            }}>
              Transformation stories
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(26px, 3.5vw, 40px)',
              fontWeight: 500, color: '#0D0D0D',
            }}>
              Lives that shifted after one conversation
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {[
              {
                label: 'Career & Direction',
                story: 'A 29-year-old engineer came in certain he needed to quit his job. After two sessions exploring what he actually wanted — not just what he was running from — he negotiated a role change instead. Last we heard, he leads a team he loves.',
              },
              {
                label: 'Relationship & Loss',
                story: 'A woman processing a broken engagement found it impossible to talk to family without spiralling. Three sessions gave her a language for her grief and the courage to take it one day at a time. She started her own small business six months later.',
              },
              {
                label: 'Astrology & Clarity',
                story: 'A couple at a crossroads about relocating abroad used an astrology + guidance session to understand the timing of their decision. The birth chart confirmed what their gut already knew. They moved. They\'re thriving.',
              },
            ].map(({ label, story }, i) => (
              <div key={i} style={{
                display: 'flex', gap: '32px',
                paddingBottom: i < 2 ? '32px' : '0',
                borderBottom: i < 2 ? '1px solid #E8D5B7' : 'none',
              }}>
                <div style={{ flexShrink: 0, paddingTop: '4px' }}>
                  <span style={{
                    display: 'inline-block',
                    width: '8px', height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#C4956A',
                    marginTop: '8px',
                  }} />
                </div>
                <div>
                  <p style={{
                    fontSize: '10px', letterSpacing: '0.15em',
                    textTransform: 'uppercase', color: '#C4956A',
                    marginBottom: '10px', fontWeight: 500,
                  }}>
                    {label}
                  </p>
                  <p style={{ fontSize: '15px', color: '#4A5F74', lineHeight: 1.9 }}>{story}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section style={{
        padding: '96px 24px',
        backgroundColor: '#0D0D0D',
      }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontSize: '11px', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#C4956A', marginBottom: '16px',
          }}>
            How she works
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(26px, 3.5vw, 40px)',
            fontWeight: 500, color: '#F7F2EA', marginBottom: '64px',
          }}>
            The principles behind every session
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2px',
            backgroundColor: '#1A1A1A',
            borderRadius: '20px',
            overflow: 'hidden',
          }}>
            {[
              { title: 'No judgment', desc: 'Whatever you bring into the room stays in the room — heard without verdict.' },
              { title: 'No scripts', desc: 'Every session is shaped by you. There is no standard template or fixed agenda.' },
              { title: 'No false hope', desc: 'Honesty is kindness here. You\'ll always get the truth, delivered with care.' },
              { title: 'Full presence', desc: 'When you\'re in a session, you have her complete, undivided attention.' },
            ].map(({ title, desc }) => (
              <div key={title} style={{
                backgroundColor: '#111',
                padding: '40px 32px',
                textAlign: 'left',
              }}>
                <div style={{
                  width: '32px', height: '2px',
                  backgroundColor: '#C4956A', marginBottom: '24px',
                }} />
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '20px', fontWeight: 500,
                  color: '#F7F2EA', marginBottom: '12px',
                }}>
                  {title}
                </h3>
                <p style={{ fontSize: '14px', color: '#8A7968', lineHeight: 1.8 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        padding: '96px 24px',
        backgroundColor: 'var(--parchment)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 500, color: '#0D0D0D',
            lineHeight: 1.2, marginBottom: '20px',
          }}>
            Curious if this is right for you?
          </h2>
          <p style={{
            fontSize: '16px', color: '#4A5F74',
            lineHeight: 1.8, marginBottom: '36px',
          }}>
            Browse the sessions to find what fits, or book directly — the first step is always the hardest, and she'll meet you right there.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/sessions" style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '14px 32px', borderRadius: '999px',
              backgroundColor: '#C4956A', color: '#fff',
              fontSize: '15px', fontWeight: 500, textDecoration: 'none',
            }}>
              View Sessions
            </a>
            <a href="/book" style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '14px 32px', borderRadius: '999px',
              border: '1.5px solid #2C3E50', color: '#2C3E50',
              fontSize: '15px', fontWeight: 500, textDecoration: 'none',
            }}>
              Book Now
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}