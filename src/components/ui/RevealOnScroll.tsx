"use client"

import React, { useRef, useEffect, useState } from 'react'

export default function RevealOnScroll({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      })
    }, { threshold: 0.12 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`}>
      {children}
    </div>
  )
}
