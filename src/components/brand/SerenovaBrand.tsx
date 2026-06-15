import type { SVGProps } from 'react'

type LogoMarkProps = SVGProps<SVGSVGElement> & {
  size?: number
}

export function SerenovaLogoMark({ size = 44, style, ...props }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      role="img"
      aria-label="Serenova logo mark"
      style={{ width: size, height: size, ...style }}
      {...props}
    >
      <rect x="6" y="6" width="68" height="68" rx="18" fill="#113c3a" />
      <rect x="9.5" y="9.5" width="61" height="61" rx="15" fill="none" stroke="#fffaf2" strokeOpacity="0.16" />
      <path
        d="M25 47c0-16.5 7.5-30 15-30s15 13.5 15 30"
        fill="none"
        stroke="#fffaf2"
        strokeLinecap="round"
        strokeWidth="4.2"
      />
      <path
        d="M25 47c5.4 7.3 24.6 7.3 30 0"
        fill="none"
        stroke="#8aa39a"
        strokeLinecap="round"
        strokeWidth="4.2"
      />
      <path
        d="M40 22l4.1 12 12 4.1-12 4.1-4.1 12-4.1-12-12-4.1 12-4.1L40 22z"
        fill="#d59a76"
      />
      <circle cx="40" cy="38.1" r="6" fill="#fffaf2" />
      <path
        d="M22 59c11.8-6.3 25.8-6.3 36 0"
        fill="none"
        stroke="#e7bf8f"
        strokeLinecap="round"
        strokeOpacity="0.88"
        strokeWidth="3.4"
      />
    </svg>
  )
}

export function SerenovaLockup({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand-lockup ${compact ? 'brand-lockup-compact' : ''}`}>
      <span className="brand-logo-shell">
        <SerenovaLogoMark size={compact ? 38 : 44} className="brand-logo-mark" />
      </span>
      <span className="brand-wordmark">
        <span className="brand-name">Serenova</span>
        <span className="brand-sub">Guidance Studio</span>
      </span>
    </span>
  )
}

export function SerenovaBrandPanel() {
  return (
    <div className="brand-panel">
      <div className="brand-panel-mark">
        <SerenovaLogoMark size={92} />
      </div>
      <div>
        <span className="eyebrow">Serenova</span>
        <h3>Private guidance, clearly held.</h3>
        <p>One mark for clarity sessions, astrology-backed counsel, and companion travel support.</p>
      </div>
    </div>
  )
}
