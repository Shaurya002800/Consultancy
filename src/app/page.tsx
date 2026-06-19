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
import RevealOnScroll from '@/components/ui/RevealOnScroll'

const pathways = [
  {
    key: 'clarity',
    prompt: 'I need someone to talk to',
    title: 'Personal Guidance',
    copy: 'A private one-to-one conversation for the thoughts, feelings, relationships, grief, pressure, or life changes that have become difficult to carry alone.',
    price: 'From Rs. 800',
    href: '/book?type=consultancy',
    icon: HeartHandshake,
  },
  {
    key: 'timing',
    prompt: 'I am looking for deeper insight',
    title: 'Astrology + Guidance',
    copy: 'A thoughtful birth-chart reading paired with grounded conversation, helping you understand patterns and approach your next decision with greater clarity.',
    price: 'From Rs. 1,800',
    href: '/book?type=astrology',
    icon: MoonStar,
  },
  {
    key: 'travel',
    prompt: 'My child needs a trusted companion',
    title: 'Companion Travel',
    copy: 'Calm, responsible travel support for children and young travellers, with thoughtful planning, regular family communication, and care throughout the journey.',
    price: 'Custom quote',
    href: '/travel',
    icon: Map,
  },
]

const moments = [
  ['When no one seems to understand', 'You can speak without having to explain why your feelings matter.'],
  ['When your thoughts feel too heavy', 'We slow the noise down and look at one thing at a time.'],
  ['When joy or grief needs a witness', 'Not every conversation has to begin with a problem.'],
  ['When the way forward feels unclear', 'A steady conversation can help the next step come into view.'],
]

const guidanceSteps = [
  {
    number: '01',
    title: 'Speak freely',
    copy: 'Come as you are. There is no perfect way to tell your story and no need to have the right words ready.',
    icon: MessageCircle,
  },
  {
    number: '02',
    title: 'Feel understood',
    copy: 'Your situation is heard with patience, empathy, and thoughtful, psychology-informed reflection.',
    icon: HeartHandshake,
  },
  {
    number: '03',
    title: 'Find a steadier next step',
    copy: 'Together, we make the situation clearer and identify a practical, gentler way forward.',
    icon: Sparkles,
  },
]

export default function Home() {
  const [active, setActive] = useState(pathways[0])
  const ActiveIcon = active.icon
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi, I would like to talk, but I am not sure which session is right for me.')}`

  return (
    <div className="page-shell home-page">
      <section className="home-hero">
        <div className="home-hero-inner">
          <div className="home-hero-copy">
            <span className="eyebrow">Private, one-to-one guidance</span>
            <h1>A private space to be <em>heard.</em></h1>
            <p className="home-hero-lead">
              Whatever you are carrying, you do not have to carry it alone.
            </p>
            <p className="home-hero-support">
              Come with your sorrow or your joy, your confusion, loneliness, or the thoughts you have not been able to share. Sometimes, being truly heard is where calm begins.
            </p>
            <div className="home-hero-actions">
              <Link href="/book?type=consultancy" className="btn btn-primary">
                <MessageCircle size={18} />
                Book a Private Conversation
              </Link>
              <a href="#how-it-works" className="btn btn-ghost">
                How It Works
                <ArrowRight size={17} />
              </a>
            </div>
            <div className="home-trust-line" aria-label="Service assurances">
              <span><ShieldCheck size={16} /> Confidential</span>
              <span><HeartHandshake size={16} /> Without judgment</span>
              <span><Compass size={16} /> At your pace</span>
            </div>
          </div>

          <aside className="home-welcome-note">
            <span className="home-note-mark">“</span>
            <p>
              If your heart has been waiting for a place to speak, you are welcome here.
            </p>
            <span>Serenova Guidance Studio</span>
          </aside>
        </div>
      </section>

      <section className="home-assurance-band">
        <div className="container home-assurance-grid">
          <div>
            <span className="eyebrow">You may come as you are</span>
            <h2>Some things become lighter when they are spoken.</h2>
          </div>
          <div className="home-letter">
            <p>
              If you feel that no one understands, if you want to speak what is in your heart, or if the days have begun to feel too heavy, you are welcome to talk.
            </p>
            <p>
              There is nothing wrong in asking to be heard. A kind conversation can quiet the mind, help us see more clearly, and remind us that another way forward is possible.
            </p>
            <p className="home-letter-signoff">
              I will listen with empathy, help you understand what you are feeling, and walk beside you toward a steadier path, like a trusted friend.
            </p>
          </div>
        </div>
      </section>

      <section className="section home-moments-section">
        <div className="container">
          <RevealOnScroll>
            <div className="section-heading">
              <span className="eyebrow">A conversation can begin anywhere</span>
              <h2>You do not need a crisis to need support.</h2>
              <p>
                You can talk when life hurts, when something beautiful has happened, or simply when your mind needs room to breathe.
              </p>
            </div>
          </RevealOnScroll>

          <div className="home-moments-grid">
            {moments.map(([title, copy], index) => (
              <RevealOnScroll key={title}>
                <article className="home-moment">
                  <span>0{index + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark-band home-process-section" id="how-it-works">
        <div className="container">
          <RevealOnScroll>
            <div className="section-heading">
              <span className="eyebrow">How a session feels</span>
              <h2>Not a lecture. Not a judgment. A real conversation.</h2>
              <p>
                The aim is simple: to help you feel less alone in the moment and more certain about what comes next.
              </p>
            </div>
          </RevealOnScroll>

          <div className="home-process-grid">
            {guidanceSteps.map((item) => {
              const Icon = item.icon
              return (
                <RevealOnScroll key={item.number}>
                  <article className="home-process-step">
                    <div className="home-process-head">
                      <span>{item.number}</span>
                      <Icon size={22} />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </article>
                </RevealOnScroll>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section home-pathways-section">
        <div className="container">
          <RevealOnScroll>
            <div className="home-pathways-heading">
              <div>
                <span className="eyebrow">Choose what you need today</span>
                <h2>Begin with the kind of support that feels right.</h2>
              </div>
              <p>
                You do not have to know the perfect service before reaching out. Start with the closest feeling.
              </p>
            </div>
          </RevealOnScroll>

          <div className="home-pathways-layout">
            <div className="home-pathway-tabs" role="tablist" aria-label="Serenova services">
              {pathways.map((item) => {
                const Icon = item.icon
                const selected = active.key === item.key
                return (
                  <button
                    key={item.key}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    className={`home-pathway-tab ${selected ? 'active' : ''}`}
                    onClick={() => setActive(item)}
                  >
                    <Icon size={20} />
                    <span>
                      <strong>{item.prompt}</strong>
                      <small>{item.title}</small>
                    </span>
                    <ArrowRight size={18} />
                  </button>
                )
              })}
            </div>

            <div className="home-pathway-detail" role="tabpanel">
              <div className="home-pathway-icon">
                <ActiveIcon size={28} />
              </div>
              <span className="eyebrow">{active.price}</span>
              <h3>{active.title}</h3>
              <p>{active.copy}</p>
              <Link href={active.href} className="btn btn-primary">
                {active.key === 'travel' ? 'Explore Travel Support' : 'Book This Session'}
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight home-final-section">
        <div className="container home-final-inner">
          <div>
            <span className="eyebrow">When you are ready</span>
            <h2>Your first step can simply be: “I need to talk.”</h2>
            <p>Book directly, or send a WhatsApp message first if you are unsure where to begin.</p>
          </div>
          <div className="home-final-actions">
            <Link href="/book?type=consultancy" className="btn btn-primary">
              <Calendar size={18} />
              Book a Session
            </Link>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <MessageCircle size={18} />
              Ask on WhatsApp
            </a>
          </div>
        </div>
        <div className="container">
          <p className="home-care-note">
            Serenova offers supportive, non-clinical guidance. It is not therapy, diagnosis, or emergency mental-health care. If you may harm yourself or are in immediate danger, contact local emergency services or a qualified crisis service now.
          </p>
        </div>
      </section>
    </div>
  )
}
