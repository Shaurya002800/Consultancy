'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/sessions', label: 'Sessions' },
  { href: '/travel', label: 'Travel' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      height: scrolled ? '64px' : '72px',
      transition: 'all 300ms ease',
      backgroundColor: scrolled ? 'rgba(253,250,246,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px) saturate(180%)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(226,216,200,0.6)' : 'none',
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto', padding: '0 48px',
        height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '22px',
            fontWeight: 500,
            color: scrolled ? 'var(--gold)' : 'var(--pale-gold-text)',
            letterSpacing: '0.02em',
            lineHeight: 1,
          }}>
            Serenova
          </div>
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: '9px',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: scrolled ? 'var(--dusty)' : 'rgba(226,216,200,0.7)',
            marginTop: '3px',
          }}>
            Guidance & Astrology
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav" style={{ alignItems: 'center', gap: '40px' }}>
          {links.map(({ href, label }) => (
            <Link key={href} href={href} style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 400,
              color: scrolled
                ? (pathname === href ? 'var(--ink)' : 'var(--violet-grey)')
                : (pathname === href ? 'var(--pale-gold-text)' : 'var(--bone)'),
              textDecoration: 'none',
              transition: 'color 150ms ease',
              paddingBottom: '2px',
              borderBottom: pathname === href ? '2px solid var(--gold)' : '2px solid transparent',
            }}>
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="desktop-nav">
          <Link href="/book" className={scrolled ? 'btn btn-primary' : 'btn btn-ghost'}
            style={{ fontSize: '13px', padding: '10px 22px' }}>
            Book a Session
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="mobile-nav" onClick={() => setOpen(!open)}
          style={{ color: scrolled ? 'var(--ink)' : 'var(--bone)', fontSize: '22px', background: 'none', border: 'none' }}>
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, width: '280px',
          backgroundColor: 'var(--dusk-indigo)',
          padding: '80px 32px 40px',
          display: 'flex', flexDirection: 'column', gap: '0',
          boxShadow: '-8px 0 40px rgba(0,0,0,0.4)',
          zIndex: 100,
        }}>
          <button onClick={() => setOpen(false)} style={{
            position: 'absolute', top: '24px', right: '24px',
            color: 'var(--bone)', fontSize: '20px', background: 'none', border: 'none',
          }}>✕</button>
          {links.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px', fontWeight: 400,
              color: 'var(--bone)',
              padding: '18px 0',
              borderBottom: '1px solid rgba(226,216,200,0.1)',
              textDecoration: 'none',
            }}>
              {label}
            </Link>
          ))}
          <div style={{ marginTop: 'auto' }}>
            <Link href="/book" onClick={() => setOpen(false)} className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
              Book a Session
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}