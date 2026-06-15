'use client'

import { Calendar, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SerenovaLockup } from '@/components/brand/SerenovaBrand'

const links = [
  { href: '/', label: 'Home' },
  { href: '/sessions', label: 'Sessions' },
  { href: '/travel', label: 'Travel' },
  { href: '/about', label: 'About' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = scrolled || open || pathname === '/book'

  return (
    <header className={`nav-shell ${solid ? 'scrolled' : ''} ${open ? 'open' : ''}`}>
      <div className="nav-inner">
        <Link href="/" className="brand-mark" onClick={() => setOpen(false)} aria-label="Serenova home">
          <SerenovaLockup compact />
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className={`nav-link ${pathname === href ? 'active' : ''}`}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="desktop-nav">
          <Link href="/book" className={solid ? 'btn btn-primary' : 'btn btn-ghost'}>
            <Calendar size={17} />
            Book
          </Link>
        </div>

        <button
          className="mobile-nav"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="mobile-drawer">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <Link href="/book" className="btn btn-primary" onClick={() => setOpen(false)}>
            <Calendar size={17} />
            Book a Session
          </Link>
        </div>
      )}
    </header>
  )
}
