'use client'

import {
  ArrowRight,
  Calendar,
  Compass,
  HeartHandshake,
  Map,
  MessageCircle,
  MoonStar,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { SerenovaBrandPanel } from '@/components/brand/SerenovaBrand'

const pathways = [
  {
    key: 'clarity',
    label: 'I need clarity',
    title: 'Personal Consultancy',
    copy: 'Private one-on-one guidance for relationships, career crossroads, grief, family pressure, and life transitions.',
    price: 'From Rs. 800',
    href: '/sessions',
    icon: HeartHandshake,
  },
  {
    key: 'timing',
    label: 'I need timing',
    title: 'Astrology + Guidance',
    copy: 'A birth-chart reading paired with practical counsel, so the insight becomes a decision you can actually act on.',
    price: 'From Rs. 1,800',
    href: '/sessions',
    icon: MoonStar,
  },
  {
    key: 'travel',
    label: 'My child needs support',
    title: 'Companion Travel',
    copy: 'A trusted adult companion for children and young travellers, with planning, safety check-ins, and family communication.',
    price: 'Custom quote',
    href: '/travel',
    icon: Map,
  },
]

const proof = [
  { value: '200+', label: 'private sessions completed' },
  { value: '8+', label: 'years of guidance practice' },
  { value: '3', label: 'ways to work with Serenova' },
]

export default function Home() {
  const [active, setActive] = useState(pathways[0])
  const ActiveIcon = active.icon

  return (
    <div className="page-shell">
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">Serenova Guidance Studio</span>
            <h1>
              A calmer way to make your <em>next decision.</em>
            </h1>
            <p>
              Book private guidance, astrology-backed counsel, or family travel support from one trusted place. The experience is personal, practical, and built around what you are actually trying to solve.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 34 }}>
              <Link href="/book" className="btn btn-primary">
                <Calendar size={18} />
                Book a Session
              </Link>
              <Link href="/travel" className="btn btn-ghost">
                <Compass size={18} />
                Plan Companion Travel
              </Link>
            </div>
          </div>

          <div className="visual-board" aria-label="Serenova service pathways">
            <div className="board-content">
              <div style={{ marginBottom: 16 }}>
                <SerenovaBrandPanel />
              </div>
              <div className="signal-card" style={{ marginBottom: 16 }}>
                <p style={{ color: 'rgba(255,250,242,0.62)', fontSize: 12, marginBottom: 10 }}>Live guidance map</p>
                <div className="signal-row">
                  <ShieldCheck size={19} />
                  <span>Private intake</span>
                  <span>01</span>
                </div>
                <div className="signal-row">
                  <MessageCircle size={19} />
                  <span>Focused conversation</span>
                  <span>02</span>
                </div>
                <div className="signal-row">
                  <Sparkles size={19} />
                  <span>Clear next step</span>
                  <span>03</span>
                </div>
              </div>
              <div className="pulse-line" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
                <div className="signal-card">
                  <strong style={{ display: 'block', fontSize: 24 }}>24h</strong>
                  <span style={{ color: 'rgba(255,250,242,0.64)', fontSize: 12 }}>booking response</span>
                </div>
                <div className="signal-card">
                  <strong style={{ display: 'block', fontSize: 24 }}>100%</strong>
                  <span style={{ color: 'rgba(255,250,242,0.64)', fontSize: 12 }}>confidential</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="metric-strip">
            {proof.map((item) => (
              <div className="metric" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <span className="eyebrow">Choose your starting point</span>
            <h2 style={{ fontSize: 'var(--fs-display-md)', fontWeight: 500, marginBottom: 18 }}>
              The business is simple: people come with uncertainty, Serenova helps them leave with direction.
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: 'var(--fs-body-lg)' }}>
              Some decisions need a listening ear. Some need astrology and timing. Some need a responsible adult your family can trust. Pick the path that fits today.
            </p>
          </div>

          <div className="journey-panel" style={{ padding: 10 }}>
            {pathways.map((item) => {
              const Icon = item.icon
              const selected = active.key === item.key
              return (
                <button
                  key={item.key}
                  className={`option-card ${selected ? 'active' : ''}`}
                  onClick={() => setActive(item)}
                  style={{ marginBottom: 10 }}
                >
                  <span className="icon-tile">
                    <Icon size={20} />
                  </span>
                  <span style={{ flex: 1 }}>
                    <strong style={{ display: 'block', color: 'var(--ink)' }}>{item.label}</strong>
                    <span style={{ color: 'var(--muted)', fontSize: 13 }}>{item.title}</span>
                  </span>
                  <ArrowRight size={18} />
                </button>
              )
            })}
          </div>
        </div>

        <div className="container" style={{ marginTop: 34 }}>
          <div className="service-card" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 22, alignItems: 'center' }}>
            <span className="icon-tile">
              <ActiveIcon size={22} />
            </span>
            <div>
              <span className="eyebrow" style={{ marginBottom: 8 }}>{active.price}</span>
              <h3 style={{ margin: 0 }}>{active.title}</h3>
              <p style={{ marginTop: 8 }}>{active.copy}</p>
            </div>
            <Link href={active.href} className="btn btn-primary">
              Explore
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section dark-band">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">What changes here</span>
            <h2>From scattered thoughts to a practical next step.</h2>
            <p>
              Every offer is structured around one outcome: you should finish with more clarity than you arrived with.
            </p>
          </div>

          <div className="grid-3">
            {[
              ['Listen', 'A private space where the full situation can come out without performance or judgment.'],
              ['Decode', 'Patterns, timing, emotional context, and practical constraints are brought into one frame.'],
              ['Act', 'You leave with a next step: a conversation to have, a boundary to hold, a trip plan, or a decision window.'],
            ].map(([title, copy], index) => (
              <div className="signal-card" key={title}>
                <p style={{ color: 'var(--gold-light)', fontFamily: 'var(--font-mono)', marginBottom: 18 }}>0{index + 1}</p>
                <h3 style={{ fontSize: 30, marginBottom: 10 }}>{title}</h3>
                <p>{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="section-heading" style={{ marginBottom: 0 }}>
            <span className="eyebrow">Ready when you are</span>
            <h2>Book directly, compare sessions, or ask a question first.</h2>
            <p>
              No funnel pressure. Choose the route that gives you enough confidence to begin.
            </p>
          </div>
          <div className="card" style={{ display: 'grid', gap: 14 }}>
            <Link href="/book" className="btn btn-primary">
              <Calendar size={18} />
              Book a Session
            </Link>
            <Link href="/sessions" className="btn btn-secondary">
              Compare Sessions
              <ArrowRight size={17} />
            </Link>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I am not sure which Serenova service is right for me.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <MessageCircle size={18} />
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
