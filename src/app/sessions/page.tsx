'use client'

import { ArrowRight, Check, HelpCircle, MessageCircle, MoonStar, Sparkles, Timer } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { SerenovaBrandPanel } from '@/components/brand/SerenovaBrand'

const consultancyPlans = [
  { duration: 30, label: 'Quick Clarity', price: 800, features: ['One focused topic', 'Actionable guidance', 'WhatsApp follow-up summary'], popular: false },
  { duration: 60, label: 'Deep Dive', price: 1400, features: ['Full situation exploration', 'Root cause discussion', 'Practical next steps', 'WhatsApp follow-up summary'], popular: true },
  { duration: 90, label: 'Full Session', price: 1900, features: ['Complex or multi-topic situations', 'Comprehensive action plan', 'WhatsApp follow-up summary', 'Priority access for 48 hours'], popular: false },
]

const astrologyPlans = [
  { duration: 60, label: 'Birth Chart Reading', price: 1800, features: ['Full natal chart analysis', 'Current planetary transits', 'Guidance on present situation', 'Written chart summary'], popular: false },
  { duration: 90, label: 'Chart + Life Guidance', price: 2400, features: ['Complete birth chart + transits', 'Personalized life guidance', 'Remedies and suggestions', 'Detailed written summary', 'Priority access for 48 hours'], popular: true },
]

const packages = [
  { name: '3-Session Pack', type: 'Consultancy', price: 3600, original: 4200, desc: 'Three 60-minute sessions for ongoing support through a difficult period.' },
  { name: '5-Session Pack', type: 'Consultancy', price: 5500, original: 7000, desc: 'Five sessions for sustained guidance over one to two months.' },
  { name: 'Astro + Consult Bundle', type: 'Mixed', price: 4200, original: 5000, desc: 'One astrology session plus two 60-minute consultancy sessions.' },
]

const faqs = [
  ['Is everything confidential?', 'Yes. What you share in a session stays private. Nothing is recorded, shared, or posted.'],
  ['Can I reschedule?', 'Yes, up to 24 hours before the session at no charge. Last-minute cancellations can be converted into credit.'],
  ['What do I need for astrology?', 'Date, time, and place of birth are ideal. An approximate birth time can still be useful.'],
  ['Can sessions happen in Hindi?', 'Yes. Sessions are available in Hindi and English, and you can switch languages naturally.'],
  ['How does payment work?', 'Payment is collected at booking through Razorpay with UPI, cards, net banking, and wallets.'],
]

export default function SessionsPage() {
  const [activeTab, setActiveTab] = useState<'consultancy' | 'astrology'>('consultancy')
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const plans = activeTab === 'consultancy' ? consultancyPlans : astrologyPlans

  return (
    <div className="page-shell">
      <section className="hero" style={{ minHeight: '74vh' }}>
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">Sessions & Pricing</span>
            <h1>
              Choose the depth of support that matches <em>today.</em>
            </h1>
            <p>
              Transparent session options for personal guidance and astrology-backed clarity. Start small, go deeper, or build a pack for ongoing support.
            </p>
          </div>

          <div className="visual-board">
            <div className="board-content">
              <div style={{ marginBottom: 16 }}>
                <SerenovaBrandPanel />
              </div>
              <div className="signal-card">
                <p style={{ color: 'var(--gold-light)', marginBottom: 16 }}>Session fit check</p>
                {[
                  ['Need to talk it through', 'Consultancy'],
                  ['Need timing and patterns', 'Astrology'],
                  ['Need support over weeks', 'Packages'],
                ].map(([need, fit]) => (
                  <div className="signal-row" key={need}>
                    <HelpCircle size={18} />
                    <span>{need}</span>
                    <strong>{fit}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24, alignItems: 'end', flexWrap: 'wrap', marginBottom: 36 }}>
            <div className="section-heading" style={{ marginBottom: 0 }}>
              <span className="eyebrow">Bookable sessions</span>
              <h2>Two service lines, multiple levels of depth.</h2>
            </div>
            <div className="tabs" role="tablist" aria-label="Session type">
              <button className={`tab ${activeTab === 'consultancy' ? 'active' : ''}`} onClick={() => setActiveTab('consultancy')}>
                Personal Consultancy
              </button>
              <button className={`tab ${activeTab === 'astrology' ? 'active' : ''}`} onClick={() => setActiveTab('astrology')}>
                Astrology + Guidance
              </button>
            </div>
          </div>

          <div className="grid-3">
            {plans.map((plan) => (
              <article className="price-card" key={plan.label} style={{ background: plan.popular ? 'var(--teal-dark)' : undefined }}>
                {plan.popular && (
                  <span className="eyebrow" style={{ color: 'var(--gold-light)' }}>Most chosen</span>
                )}
                <span className="icon-tile" style={{ background: plan.popular ? 'rgba(255,250,242,0.12)' : undefined, color: plan.popular ? 'var(--gold-light)' : undefined }}>
                  {activeTab === 'consultancy' ? <Sparkles size={20} /> : <MoonStar size={20} />}
                </span>
                <h3 style={{ color: plan.popular ? 'var(--ivory)' : undefined }}>{plan.label}</h3>
                <p style={{ color: plan.popular ? 'rgba(255,250,242,0.72)' : undefined }}>
                  <Timer size={15} style={{ display: 'inline', marginRight: 6 }} />
                  {plan.duration} minutes
                </p>
                <div style={{ margin: '22px 0' }}>
                  <strong style={{ color: plan.popular ? 'var(--gold-light)' : 'var(--teal-dark)', fontFamily: 'var(--font-mono)', fontSize: 30 }}>
                    Rs. {plan.price.toLocaleString('en-IN')}
                  </strong>
                </div>
                <ul className="list-clean" style={{ marginBottom: 26 }}>
                  {plan.features.map((feature) => (
                    <li key={feature} style={{ color: plan.popular ? 'rgba(255,250,242,0.76)' : undefined }}>
                      <Check size={17} color="var(--clay)" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={`/book?type=${activeTab}&duration=${plan.duration}`} className={plan.popular ? 'btn btn-primary' : 'btn btn-secondary'}>
                  Book this session
                  <ArrowRight size={17} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--paper)' }}>
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Ongoing support</span>
            <h2>Packages when one conversation is not enough.</h2>
            <p>For longer transitions, repeated decisions, or when you want a steady support rhythm.</p>
          </div>
          <div className="grid-3">
            {packages.map((pack) => (
              <article className="card" key={pack.name}>
                <span className="eyebrow">{pack.type}</span>
                <h3 style={{ fontSize: 30, marginBottom: 12 }}>{pack.name}</h3>
                <p style={{ color: 'var(--muted)', marginBottom: 22 }}>{pack.desc}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 22 }}>
                  <strong style={{ color: 'var(--teal-dark)', fontFamily: 'var(--font-mono)', fontSize: 28 }}>
                    Rs. {pack.price.toLocaleString('en-IN')}
                  </strong>
                  <span style={{ color: 'var(--soft)', textDecoration: 'line-through' }}>
                    Rs. {pack.original.toLocaleString('en-IN')}
                  </span>
                </div>
                <Link href="/book" className="btn btn-secondary">
                  Start package
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split" style={{ alignItems: 'start' }}>
          <div className="section-heading">
            <span className="eyebrow">Common questions</span>
            <h2>Answered before you book.</h2>
            <p>Still unsure which session fits? Ask first. That is part of the service.</p>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I would like to know which Serenova session is right for me.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ marginTop: 24 }}
            >
              <MessageCircle size={18} />
              Ask on WhatsApp
            </a>
          </div>

          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {faqs.map(([q, a], index) => (
              <div key={q} style={{ borderBottom: index < faqs.length - 1 ? '1px solid rgba(29,36,48,0.1)' : 0 }}>
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  style={{ width: '100%', padding: 22, display: 'flex', justifyContent: 'space-between', gap: 18, background: 'transparent', textAlign: 'left' }}
                >
                  <strong>{q}</strong>
                  <span>{openFaq === index ? '-' : '+'}</span>
                </button>
                {openFaq === index && (
                  <p style={{ padding: '0 22px 22px', color: 'var(--muted)' }}>{a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
