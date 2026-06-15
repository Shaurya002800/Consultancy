import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans, DM_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFAB from '@/components/ui/WhatsAppFAB'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '600'],
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dm-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Serenova — Guidance & Astrology',
  description: 'A safe space to be heard, guided, and understood.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <WhatsAppFAB />
        <Footer />
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />
      </body>
    </html>
  )
}
