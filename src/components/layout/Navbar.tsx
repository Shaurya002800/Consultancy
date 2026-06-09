'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

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
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 50,
      transition: 'all 0.3s ease',
      backgroundColor: scrolled ? 'rgba(247,242,234,0.96)' : 'transparent',
      backdropFilter: scrolled ? 'blur(8px)' : 'none',
      boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.06)' : 'none',
    }}>
      <div style={{
        maxWidth: '1120px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '72px',
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, textDecoration: 'none' }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '22px',
            fontWeight: 500,
            color: '#0D0D0D',
          }}>
            Serenova
          </span>
          <span style={{
            fontSize: '10px',
            letterSpacing: '0.15em',
            color: '#C4956A',
            textTransform: 'uppercase',
            fontWeight: 300,
            marginTop: '2px',
          }}>
            Guidance & Astrology
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '36px' }} className="desktop-nav">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} style={{
              fontSize: '14px',
              fontWeight: 500,
              color: pathname === href ? '#C4956A' : '#2C3E50',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}>
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="desktop-nav">
          <Link href="/book" style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '10px 24px',
            borderRadius: '999px',
            border: '1.5px solid #C4956A',
            color: '#C4956A',
            fontSize: '14px',
            fontWeight: 500,
            textDecoration: 'none',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.backgroundColor = '#C4956A'
            ;(e.currentTarget as HTMLElement).style.color = '#fff'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
            ;(e.currentTarget as HTMLElement).style.color = '#C4956A'
          }}>
            Book a Session
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="mobile-nav"
          onClick={() => setOpen(!open)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2C3E50' }}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div style={{
          backgroundColor: '#F7F2EA',
          borderTop: '1px solid #E8D5B7',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
          {links.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} style={{
              fontSize: '16px',
              fontWeight: 500,
              color: '#2C3E50',
              textDecoration: 'none',
            }}>
              {label}
            </Link>
          ))}
          <Link href="/book" onClick={() => setOpen(false)} style={{
            display: 'inline-flex',
            justifyContent: 'center',
            padding: '12px 24px',
            borderRadius: '999px',
            backgroundColor: '#C4956A',
            color: '#fff',
            fontSize: '15px',
            fontWeight: 500,
            textDecoration: 'none',
          }}>
            Book a Session
          </Link>
        </div>
      )}
    </header>
  )
}