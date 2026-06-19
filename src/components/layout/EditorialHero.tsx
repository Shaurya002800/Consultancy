import type { ReactNode } from 'react'

type EditorialHeroProps = {
  variant: 'sessions' | 'travel' | 'about'
  eyebrow: string
  title: ReactNode
  copy: string
  actions?: ReactNode
  noteLabel: string
  note: string
}

export default function EditorialHero({
  variant,
  eyebrow,
  title,
  copy,
  actions,
  noteLabel,
  note,
}: EditorialHeroProps) {
  return (
    <section className={`editorial-hero editorial-hero-${variant}`}>
      <div className="editorial-hero-inner">
        <div className="editorial-hero-copy">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{copy}</p>
          {actions && <div className="editorial-hero-actions">{actions}</div>}
        </div>

        <aside className="editorial-hero-note">
          <span>{noteLabel}</span>
          <p>{note}</p>
        </aside>
      </div>
    </section>
  )
}
