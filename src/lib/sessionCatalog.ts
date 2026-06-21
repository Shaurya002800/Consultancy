import type { SessionType } from '@/types'

export const SESSION_CATALOG = {
  consultancy: [
    { duration: 30, label: 'Personal Guidance (30 min)', price: 800 },
    { duration: 60, label: 'Personal Guidance (60 min)', price: 1400 },
    { duration: 90, label: 'Personal Guidance (90 min)', price: 1900 },
  ],
  astrology: [
    { duration: 60, label: 'Astrology + Guidance (60 min)', price: 1800 },
    { duration: 90, label: 'Astrology + Guidance (90 min)', price: 2400 },
  ],
} satisfies Record<SessionType, Array<{ duration: number; label: string; price: number }>>

export function getSessionOption(sessionType: unknown, duration: unknown) {
  if (sessionType !== 'consultancy' && sessionType !== 'astrology') return null
  if (typeof duration !== 'number' || !Number.isInteger(duration)) return null

  return SESSION_CATALOG[sessionType].find((option) => option.duration === duration) || null
}
