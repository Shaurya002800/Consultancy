"use client"

import React from 'react'

export default function TravelInquiryForm() {
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 18px',
    borderRadius: '12px',
    border: '1px solid #2A2A2A',
    backgroundColor: '#161616',
    color: '#F7F2EA',
    fontSize: '15px',
    fontFamily: 'var(--font-body)',
    outline: 'none',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '12px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    color: '#8A7968',
    marginBottom: '8px',
    display: 'block',
  }

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const data = new FormData(form)
        const params = new URLSearchParams({
          text: `Hi! I'd like to inquire about Companion Travel.\n\nParent name: ${data.get('name')}\nPhone: ${data.get('phone')}\nChild age: ${data.get('age')}\nDestination: ${data.get('destination')}\nDates: ${data.get('dates')}\nDetails: ${data.get('message')}`,
        })
        window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?${params}`, '_blank')
      }}
      style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Your name</label>
          <input name="name" required placeholder="Rahul Sharma" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Phone / WhatsApp</label>
          <input name="phone" required placeholder="+91 98765 43210" style={inputStyle} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Child&apos;s age</label>
          <input name="age" required placeholder="e.g. 10 years" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Destination</label>
          <input name="destination" required placeholder="e.g. Manali, Rajasthan" style={inputStyle} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Travel dates</label>
        <input name="dates" required placeholder="e.g. July 15–20, 2026" style={inputStyle} />
      </div>

      <div>
        <label style={labelStyle}>Anything else we should know</label>
        <textarea
          name="message"
          rows={4}
          placeholder="Number of children, special needs, budget, questions..."
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>

      <button type="submit" style={{
        padding: '16px 32px',
        borderRadius: '999px',
        backgroundColor: '#C4956A',
        color: '#fff',
        fontSize: '15px',
        fontWeight: 500,
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'var(--font-body)',
        transition: 'background 0.2s',
      }}>
        Send Inquiry via WhatsApp →
      </button>
    </form>
  )
}
