import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#0D0D0D] text-[#E8D5B7]">
      <div className="container mx-auto px-6 max-w-280 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <p
              className="text-[20px] font-medium text-white mb-2"
              style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            >
              Serenova
            </p>
            <p className="text-[11px] tracking-[0.15em] text-[#C4956A] uppercase mb-4">
              Guidance & Astrology
            </p>
            <p className="text-sm text-[#8A7968] leading-relaxed">
              A safe space to be heard, guided, and understood.
            </p>
          </div>

          {/* Pages */}
          <div>
            <p className="text-xs tracking-widest uppercase text-[#C4956A] mb-4 font-medium">
              Navigate
            </p>
            <ul className="flex flex-col gap-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About' },
                { href: '/sessions', label: 'Sessions & Pricing' },
                { href: '/book', label: 'Book a Session' },
                { href: '/travel', label: 'Companion Travel' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#8A7968] hover:text-[#C4956A] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs tracking-widest uppercase text-[#C4956A] mb-4 font-medium">
              Reach Out
            </p>
            <div className="flex flex-col gap-3 text-sm text-[#8A7968]">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C4956A] transition-colors flex items-center gap-2"
              >
                WhatsApp →
              </a>
              <p>Available Mon–Sat, 10am–7pm IST</p>
            </div>
          </div>

        </div>

        <div className="border-t border-[#1E1E1E] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-[#4A4A4A]">
            © {new Date().getFullYear()} All rights reserved.
          </p>
          <p className="text-xs text-[#4A4A4A]">
            Made with care
          </p>
        </div>
      </div>
    </footer>
  )
}