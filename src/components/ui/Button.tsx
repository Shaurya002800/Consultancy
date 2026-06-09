/// <reference types="react" />
import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

// Ensure JSX namespace exists in environments where @types/react isn't picked up.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any
    }
  }
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full tracking-wide',
        {
          'bg-[#C4956A] text-white hover:bg-[#A67B52] active:scale-95':
            variant === 'primary',
          'border border-[#C4956A] text-[#C4956A] hover:bg-[#C4956A] hover:text-white active:scale-95':
            variant === 'outline',
          'text-[#2C3E50] hover:text-[#C4956A] underline-offset-4 hover:underline':
            variant === 'ghost',
        },
        {
          'text-sm px-5 py-2': size === 'sm',
          'text-base px-7 py-3': size === 'md',
          'text-lg px-9 py-4': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}