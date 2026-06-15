import { ArrowRight, BookOpen, Heart, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { SerenovaBrandPanel } from '@/components/brand/SerenovaBrand'

const values = [
  ['Private by default', 'No recordings, no public case studies without consent, no performance.'],
  ['Practical after insight', 'Every reading or conversation is translated into a next step.'],
  ['Warm honesty', 'The truth is useful only when it is delivered with care.'],
  ['Family-aware support', 'Guidance considers relationships, responsibilities, culture, and timing.'],
]

const stories = [
  ['Career Crossroads', 'A client came in certain they needed to quit. The work revealed they needed a role change, not an exit.'],
  ['Relationship & Loss', 'A difficult ending became easier to process once the emotion had language and a plan.'],
  ['Astrology & Timing', 'A chart session gave a family confidence around relocation timing and communication.'],
]

export default function AboutPage() {
  return (
    <div className="page-shell">
      <section className="hero" style={{ minHeight: '78vh' }}>
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">About Serenova</span>
            <h1>
              Guidance with intuition, structure, and <em>lived care.</em>
            </h1>
            <p>
              Serenova brings personal consultancy, astrology, and family travel support into one trust-led studio. The work is calm, direct, and centered on helping people feel less alone with decisions that matter.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 34 }}>
              <Link href="/sessions" className="btn btn-primary">
                View Sessions
                <ArrowRight size={17} />
              </Link>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <MessageCircle size={18} />
                Start with a question
              </a>
            </div>
          </div>

          <div className="visual-board">
            <div className="board-content">
              <SerenovaBrandPanel />
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="metric-strip">
            {[
              ['8+', 'years in practice'],
              ['200+', 'sessions completed'],
              ['100%', 'private sessions'],
            ].map(([value, label]) => (
              <div className="metric" key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <span className="eyebrow">The approach</span>
            <h2 style={{ fontSize: 'var(--fs-display-md)', fontWeight: 500, marginBottom: 22 }}>
              Serenova is built for the quiet, complicated moments people usually carry alone.
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: 'var(--fs-body-lg)' }}>
              The method is not rigid. A session can be emotional, strategic, astrological, practical, or all of those at once. What stays consistent is the quality of attention: listen deeply, name the pattern, and help the client choose the next right move.
            </p>
          </div>
          <div className="card">
            <blockquote style={{ borderLeft: '4px solid var(--clay)', paddingLeft: 22 }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 30, color: 'var(--teal-dark)', lineHeight: 1.25 }}>
                The goal is not to tell someone what to do. The goal is to help them hear themselves clearly.
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--paper)' }}>
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Working values</span>
            <h2>Trust is the product.</h2>
            <p>The UI now reflects the actual business: private service, clear options, and thoughtful guidance.</p>
          </div>
          <div className="grid-4">
            {values.map(([title, copy], index) => {
              const icons = [ShieldCheck, Sparkles, Heart, BookOpen]
              const Icon = icons[index]
              return (
                <article className="service-card" key={title}>
                  <span className="icon-tile">
                    <Icon size={20} />
                  </span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section dark-band">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">What clients bring</span>
            <h2>Real situations, not neat categories.</h2>
          </div>
          <div style={{ display: 'grid', gap: 1, background: 'rgba(255,250,242,0.12)', borderRadius: 8, overflow: 'hidden' }}>
            {stories.map(([label, story], index) => (
              <div key={label} style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 24, padding: 28, background: 'rgba(255,250,242,0.08)' }}>
                <div>
                  <p style={{ color: 'var(--gold-light)', fontFamily: 'var(--font-mono)' }}>0{index + 1}</p>
                  <h3 style={{ fontSize: 28 }}>{label}</h3>
                </div>
                <p>{story}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="section-heading" style={{ marginBottom: 0 }}>
            <span className="eyebrow">Begin gently</span>
            <h2>You can compare first or book directly.</h2>
            <p>The first step can be as simple as asking which service fits your situation.</p>
          </div>
          <div className="card" style={{ display: 'grid', gap: 14 }}>
            <Link href="/sessions" className="btn btn-primary">
              View Sessions
            </Link>
            <Link href="/book" className="btn btn-secondary">
              Book Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
