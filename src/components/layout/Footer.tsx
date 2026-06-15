'use client'

import { Calendar, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { SerenovaLockup } from '@/components/brand/SerenovaBrand'

const navLinks = [
  { href: '/sessions', label: 'Sessions & pricing' },
  { href: '/book', label: 'Book a session' },
  { href: '/travel', label: 'Companion travel' },
  { href: '/about', label: 'About Serenova' },
]

export default function Footer() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <div style={{ marginBottom: 18 }}>
              <SerenovaLockup />
            </div>
            <p style={{ maxWidth: 320 }}>
              A private guidance studio for clarity sessions, astrology-backed counsel, and trusted companion travel for families.
            </p>
          </div>

          <div>
            <p className="footer-label">Explore</p>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>

          <div>
            <p className="footer-label">Reach</p>
            <a href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <p>Mon-Sat, 10am-7pm IST</p>
            <p>Online and in-person sessions</p>
          </div>

          <div>
            <p className="footer-label">Start</p>
            <div style={{ display: 'grid', gap: 12 }}>
              <Link href="/book" className="btn btn-primary">
                <Calendar size={17} />
                Book
              </Link>
              <a href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <MessageCircle size={17} />
                Ask first
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Serenova. All rights reserved.</p>
          <p>Private by default. Human first. No pressure.</p>
        </div>
      </div>
    </footer>
  )
}
