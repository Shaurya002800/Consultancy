import type { SVGProps } from 'react'

interface InkDividerProps extends SVGProps<SVGSVGElement> {
  variant?: 'A' | 'B' | 'C'
}

export default function InkDivider({ variant = 'A', style, ...props }: InkDividerProps) {
  const paths: Record<string, string> = {
    A: 'M0,12 C150,9 300,15 450,12 C600,9 750,15 900,12 C1050,9 1150,14 1200,12',
    B: 'M0,12 C200,15 350,9 500,13 C650,17 800,8 950,12 C1050,14 1150,10 1200,12',
    C: 'M0,12 C100,8 250,16 400,11 C550,6 700,16 850,12 C1000,8 1100,15 1200,12',
  }

  return (
    <svg
      width="100%"
      height="24"
      viewBox="0 0 1200 24"
      preserveAspectRatio="none"
      className="ink-divider"
      style={{ display: 'block', margin: '64px 0', ...style }}
      {...props}
    >
      <path
        d={paths[variant]}
        stroke="#C9956A"
        strokeOpacity="0.35"
        strokeWidth="0.8"
        fill="none"
      />
    </svg>
  )
}
