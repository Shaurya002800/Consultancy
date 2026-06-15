import type { SessionType } from '@/types'

export type BookingDetailsInput = {
  name: string
  email: string
  phone: string
  dob?: string
  pob?: string
  tob?: string
  message?: string
}

export type BookingDetailsErrors = Partial<Record<keyof BookingDetailsInput, string>>

export type ValidBookingDetails = {
  name: string
  email: string
  phone: string
  dob?: string
  pob?: string
  tob?: string
  message: string
}

const namePattern = /^[A-Za-z][A-Za-z .'-]{1,79}$/
const placePattern = /^[A-Za-z][A-Za-z .,'-]{1,79}$/
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function normalizeIndianPhone(phone: string) {
  let digits = phone.replace(/[^\d]/g, '')
  if (digits.startsWith('91') && digits.length === 12) digits = digits.slice(2)
  return digits
}

function isValidDateString(date: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false
  const parsed = new Date(`${date}T00:00:00Z`)
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().startsWith(date)
}

function isPastDate(date: string) {
  if (!isValidDateString(date)) return false
  const today = new Date()
  const todayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()))
  return new Date(`${date}T00:00:00Z`) < todayUTC
}

export function validateBookingDetails(input: BookingDetailsInput, sessionType: SessionType | null) {
  const errors: BookingDetailsErrors = {}
  const name = input.name.trim().replace(/\s+/g, ' ')
  const email = input.email.trim().toLowerCase()
  const phoneDigits = normalizeIndianPhone(input.phone)
  const message = (input.message || '').trim()
  const dob = (input.dob || '').trim()
  const pob = (input.pob || '').trim().replace(/\s+/g, ' ')
  const tob = (input.tob || '').trim()

  if (!name) {
    errors.name = 'Enter your full name.'
  } else if (!namePattern.test(name) || !/[A-Za-z]{2,}/.test(name) || /\d/.test(name)) {
    errors.name = 'Use a real name with letters only, no numbers or codes.'
  }

  if (!email) {
    errors.email = 'Enter your email address.'
  } else if (!emailPattern.test(email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!phoneDigits) {
    errors.phone = 'Enter your WhatsApp number.'
  } else if (!/^[6-9]\d{9}$/.test(phoneDigits)) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number.'
  }

  if (message.length > 500) {
    errors.message = 'Keep this under 500 characters.'
  }

  if (sessionType === 'astrology') {
    if (!dob) {
      errors.dob = 'Enter your date of birth.'
    } else if (!isPastDate(dob)) {
      errors.dob = 'Enter a valid past date of birth.'
    }

    if (!tob) {
      errors.tob = 'Enter your time of birth.'
    } else if (!/^\d{2}:\d{2}$/.test(tob)) {
      errors.tob = 'Enter time in HH:MM format.'
    }

    if (!pob) {
      errors.pob = 'Enter your place of birth.'
    } else if (!placePattern.test(pob) || /\d/.test(pob)) {
      errors.pob = 'Use a valid city/place name, no numbers.'
    }
  }

  if (Object.keys(errors).length > 0) {
    return { success: false as const, errors }
  }

  return {
    success: true as const,
    data: {
      name,
      email,
      phone: `+91${phoneDigits}`,
      dob: dob || undefined,
      pob: pob || undefined,
      tob: tob || undefined,
      message,
    },
  }
}

export function buildBookingMessage(details: ValidBookingDetails, sessionType: SessionType | null) {
  if (sessionType !== 'astrology') return details.message

  return [
    `DOB: ${details.dob}`,
    `Birthplace: ${details.pob}`,
    `Time: ${details.tob}`,
    details.message,
  ].filter(Boolean).join('. ')
}
