export const TIME_SLOTS = [
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:30 PM',
  '2:30 PM',
  '3:30 PM',
  '4:30 PM',
  '5:30 PM',
  '6:30 PM',
]

const IST_TIME_ZONE = 'Asia/Kolkata'

function formatDateInIST(date: Date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: IST_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date)

  const value = (type: string) => parts.find((part) => part.type === type)?.value
  return `${value('year')}-${value('month')}-${value('day')}`
}

function getISTDateParts(date: Date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: IST_TIME_ZONE,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(date)

  const value = (type: string) => Number(parts.find((part) => part.type === type)?.value)

  return {
    year: value('year'),
    month: value('month'),
    day: value('day'),
    hour: value('hour'),
    minute: value('minute'),
  }
}

export function getBookingDateWindow(now = new Date()) {
  const todayParts = getISTDateParts(now)
  const start = new Date(Date.UTC(todayParts.year, todayParts.month - 1, todayParts.day))
  const end = new Date(start)
  end.setUTCDate(end.getUTCDate() + 7)

  return {
    minDateStr: formatDateInIST(start),
    maxDateStr: formatDateInIST(end),
  }
}

export function isDateWithinBookingWindow(date: string, now = new Date()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false
  const { minDateStr, maxDateStr } = getBookingDateWindow(now)
  return date >= minDateStr && date <= maxDateStr
}

function slotToMinutes(slot: string) {
  const match = slot.match(/^(\d{1,2}):(\d{2})\s(AM|PM)$/)
  if (!match) return null

  const [, hourRaw, minuteRaw, meridiem] = match
  let hour = Number(hourRaw)
  const minute = Number(minuteRaw)

  if (meridiem === 'PM' && hour !== 12) hour += 12
  if (meridiem === 'AM' && hour === 12) hour = 0

  return hour * 60 + minute
}

export function getAvailableTimesForDate(date: string, takenTimes: string[] = [], now = new Date()) {
  if (!isDateWithinBookingWindow(date, now)) return []

  const { minDateStr } = getBookingDateWindow(now)
  const nowParts = getISTDateParts(now)
  const currentMinutes = nowParts.hour * 60 + nowParts.minute
  const taken = new Set(takenTimes)

  return TIME_SLOTS.filter((slot) => {
    if (taken.has(slot)) return false

    if (date === minDateStr) {
      const slotMinutes = slotToMinutes(slot)
      return slotMinutes !== null && slotMinutes > currentMinutes
    }

    return true
  })
}
