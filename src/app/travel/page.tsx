import Link from 'next/link'
import TravelInquiryForm from '@/components/travel/TravelInquiryForm'

export default function TravelPage() {
  return (
    <div style={{ backgroundColor: 'var(--parchment)' }}>

      {/* ── HERO ── */}
      <section style={{
        padding: '160px 24px 96px',
        backgroundColor: '#0D0D0D',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <p style={{
            fontSize: '11px', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#C4956A', marginBottom: '24px',
          }}>
            Companion Travel
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 5vw, 60px)',
            fontWeight: 500, color: '#F7F2EA',
            lineHeight: 1.15, marginBottom: '24px',
          }}>
            Your child explores freely.<br />
            <em style={{ color: '#C4956A' }}>You have peace of mind.</em>
          </h1>
          <p style={{ fontSize: '16px', color: '#8A7968', lineHeight: 1.8, marginBottom: '40px' }}>
            A trusted, caring companion who travels with your child —
            keeping them safe, engaged, and coming home with stories worth telling.
          </p>
          <a href="#inquire" style={{
            display: 'inline-flex', alignItems: 'center',
            padding: '14px 36px', borderRadius: '999px',
            backgroundColor: '#C4956A', color: '#fff',
            fontSize: '15px', fontWeight: 500, textDecoration: 'none',
          }}>
            Inquire About a Trip
          </a>
        </div>
      </section>

      {/* ── WHAT THIS IS ── */}
      <section style={{ padding: '96px 24px', backgroundColor: '#fff' }}>
        <div style={{
          maxWidth: '1120px', margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '80px', alignItems: 'center',
        }}>
          <div>
            <p style={{
              fontSize: '11px', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#C4956A', marginBottom: '20px',
            }}>
              What this service is
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(26px, 3.5vw, 38px)',
              fontWeight: 500, color: '#0D0D0D',
              lineHeight: 1.3, marginBottom: '28px',
            }}>
              More than a chaperone.<br />A genuine companion.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                'Many parents want to give their children the gift of travel — but can\'t always take time off to go with them.',
                'This service fills that gap. She accompanies your child on trips, acting as a trusted adult presence: part guide, part caregiver, part adventure partner.',
                'She brings years of experience working with children and families, a calm temperament in unexpected situations, and a genuine love for exploration.',
                'Every trip is planned together with the family. Safety, itinerary, communication, and comfort are all agreed upon before departure.',
              ].map((para, i) => (
                <p key={i} style={{ fontSize: '15px', color: '#4A5F74', lineHeight: 1.9 }}>{para}</p>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { icon: '🗺️', title: 'Pre-trip planning', desc: 'Full itinerary agreed with the family before departure. No surprises.' },
              { icon: '📱', title: 'Regular check-ins', desc: 'Updates via WhatsApp throughout the trip — photos, location, status.' },
              { icon: '🛡️', title: 'Safety first', desc: 'First-aid trained. Always has emergency contacts and a backup plan.' },
              { icon: '🌟', title: 'Child-centred pace', desc: 'Trips move at the child\'s pace — never rushed, always present.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{
                display: 'flex', gap: '20px', alignItems: 'flex-start',
                backgroundColor: 'var(--parchment)',
                borderRadius: '14px', padding: '20px 24px',
                border: '1px solid #E8D5B7',
              }}>
                <span style={{ fontSize: '24px', flexShrink: 0 }}>{icon}</span>
                <div>
                  <p style={{ fontSize: '15px', fontWeight: 500, color: '#0D0D0D', marginBottom: '4px' }}>{title}</p>
                  <p style={{ fontSize: '13px', color: '#8A7968', lineHeight: 1.6 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section style={{ padding: '96px 24px', backgroundColor: 'var(--parchment)' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{
              fontSize: '11px', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#C4956A', marginBottom: '16px',
            }}>
              Who this is for
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(26px, 3.5vw, 40px)',
              fontWeight: 500, color: '#0D0D0D',
            }}>
              This service was built for families like yours
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
          }}>
            {[
              { emoji: '👔', title: 'Busy parents', desc: 'You want your child to travel and experience the world — but work or other commitments make it impossible to go yourself.' },
              { emoji: '✈️', title: 'Solo young travellers', desc: 'Your child is old enough to explore but you\'d feel better with a trusted adult alongside them.' },
              { emoji: '👨‍👩‍👧', title: 'Single-parent families', desc: 'Managing a trip alone is hard. Having a companion takes the weight off without taking away the experience.' },
              { emoji: '🌍', title: 'Educational trips', desc: 'School excursions, heritage tours, nature camps — she\'s done them all and knows how to make them meaningful.' },
            ].map(({ emoji, title, desc }) => (
              <div key={title} style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                padding: '32px 28px',
                border: '1px solid #E8D5B7',
              }}>
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>{emoji}</div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '18px', fontWeight: 500,
                  color: '#0D0D0D', marginBottom: '10px',
                }}>
                  {title}
                </h3>
                <p style={{ fontSize: '14px', color: '#4A5F74', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '96px 24px', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{
              fontSize: '11px', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#C4956A', marginBottom: '16px',
            }}>
              The process
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(26px, 3.5vw, 40px)',
              fontWeight: 500, color: '#0D0D0D',
            }}>
              From inquiry to adventure
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { step: '01', title: 'Send an inquiry', desc: 'Fill in the form below or message on WhatsApp with your child\'s age, destination, and travel dates.' },
              { step: '02', title: 'Discovery call', desc: 'A free 20-minute call to understand your family\'s needs, your child\'s personality, and what you\'re hoping for from the trip.' },
              { step: '03', title: 'Trip planning', desc: 'Itinerary, accommodation, activities, and safety protocols are planned together. You approve everything before departure.' },
              { step: '04', title: 'Travel & updates', desc: 'She travels with your child, sends regular updates, and handles anything that comes up along the way.' },
              { step: '05', title: 'Safe return', desc: 'Your child comes home safe, full of stories, and probably asking to go again.' },
            ].map(({ step, title, desc }, i) => (
              <div key={step} style={{
                display: 'flex', gap: '28px',
                paddingBottom: i < 4 ? '40px' : '0',
                marginBottom: i < 4 ? '40px' : '0',
                borderBottom: i < 4 ? '1px solid #E8D5B7' : 'none',
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '32px', fontWeight: 400,
                  color: '#E8D5B7', lineHeight: 1,
                  flexShrink: 0, width: '48px',
                }}>
                  {step}
                </span>
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '18px', fontWeight: 500,
                    color: '#0D0D0D', marginBottom: '8px',
                  }}>
                    {title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#4A5F74', lineHeight: 1.8 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING NOTE ── */}
      <section style={{ padding: '64px 24px', backgroundColor: 'var(--parchment)' }}>
        <div style={{
          maxWidth: '720px', margin: '0 auto',
          backgroundColor: '#fff',
          borderRadius: '20px',
          padding: '48px',
          border: '1px solid #E8D5B7',
          textAlign: 'center',
        }}>
          <p style={{
            fontSize: '11px', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#C4956A', marginBottom: '16px',
          }}>
            Pricing
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28px', fontWeight: 500,
            color: '#0D0D0D', marginBottom: '16px',
          }}>
            Every trip is priced individually
          </h2>
          <p style={{ fontSize: '15px', color: '#4A5F74', lineHeight: 1.8, marginBottom: '12px' }}>
            Pricing depends on trip duration, destination, number of children, and any special requirements.
            Travel expenses (transport, accommodation, meals) are covered separately by the family.
          </p>
          <p style={{ fontSize: '15px', color: '#4A5F74', lineHeight: 1.8, marginBottom: '32px' }}>
            The companion fee typically ranges from <strong style={{ color: '#0D0D0D' }}>₹1,500–₹3,000 per day</strong>,
            depending on the nature of the trip.
          </p>
          
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hi, I'd like to inquire about the Companion Travel service.`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '12px 28px', borderRadius: '999px',
              backgroundColor: '#25D366', color: '#fff',
              fontSize: '14px', fontWeight: 500, textDecoration: 'none',
            }}
          >
            Chat on WhatsApp →
          </a>
        </div>
      </section>

      {/* ── INQUIRY FORM ── */}
      <section id="inquire" style={{ padding: '96px 24px', backgroundColor: '#0D0D0D' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{
              fontSize: '11px', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#C4956A', marginBottom: '16px',
            }}>
              Get in touch
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(26px, 3.5vw, 40px)',
              fontWeight: 500, color: '#F7F2EA', marginBottom: '12px',
            }}>
              Tell us about the trip
            </h2>
            <p style={{ fontSize: '15px', color: '#8A7968' }}>
              Fill this in and she'll get back to you within 24 hours.
            </p>
          </div>

          <TravelInquiryForm />
        </div>
      </section>

    </div>
  )
}