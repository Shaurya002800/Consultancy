'use client'

import Link from 'next/link'
// ... rest of the file stays exactly the same


export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--dusk-indigo)', color: 'var(--bone)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 48px 40px' }}>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '48px',
          marginBottom: '64px',
        }}>
          {/* Brand */}
          <div>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: '24px', fontWeight: 400,
              color: 'var(--gold-pale)',
              marginBottom: '4px',
            }}>Serenova</p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '9px', fontWeight: 600,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--dusty)', marginBottom: '20px',
            }}>Guidance & Astrology</p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px', color: 'var(--dusty)',
              lineHeight: 1.7, maxWidth: '240px',
            }}>
              A safe space to be heard, guided, and understood.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px', fontWeight: 600,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'var(--gold)', marginBottom: '20px',
            }}>Navigate</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About' },
                { href: '/sessions', label: 'Sessions & Pricing' },
                { href: '/book', label: 'Book a Session' },
                { href: '/travel', label: 'Companion Travel' },
              ].map(({ href, label }) => (
                <Link key={href} href={href} style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: 'var(--dusty)',
                  textDecoration: 'none',
                  transition: 'color 150ms ease',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--gold)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--dusty)'}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px', fontWeight: 600,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'var(--gold)', marginBottom: '20px',
            }}>Reach Out</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px', color: 'var(--dusty)',
                  textDecoration: 'none', transition: 'color 150ms ease',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#25D366'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--dusty)'}>
                WhatsApp →
              </a>
              <p style={{ fontSize: '13px', color: 'var(--dusty)', fontFamily: 'var(--font-body)' }}>
                Mon–Sat, 10am–7pm IST
              </p>
              <p style={{ fontSize: '13px', color: 'var(--dusty)', fontFamily: 'var(--font-body)' }}>
                Online & In-person sessions
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(226,216,200,0.12)',
          paddingTop: '32px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '12px',
        }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--dusty)' }}>
            © {new Date().getFullYear()} Serenova. All rights reserved.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--dusty)' }}>
            Strictly private · Every session
          </p>
        </div>
      </div>
    </footer>
  )
}