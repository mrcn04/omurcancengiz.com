import Link from 'next/link'
import { SOCIAL_LINKS } from '@/utils/constants'
import SpargoIcon from '@/components/spargo-icon'

const FOOTER_NAV = {
  Navigate: [
    { label: 'Dev', href: '#dev' },
    { label: 'Photography', href: '/photography' },
    { label: 'Contact', href: '#contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-black/[0.06] bg-white">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 pt-14 pb-8">
        {/* Top row */}
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-2">
            <Link
              href="/"
              className="text-sm font-semibold uppercase tracking-[.25em] text-[#222]"
              style={{ fontFamily: 'var(--font-montserrat)' }}
            >
              Ömürcan Cengiz
            </Link>
            <p className="max-w-[180px] text-xs leading-relaxed" style={{ color: '#7B7B7B' }}>
              Builder.
            </p>
          </div>

          {/* Link columns */}
          <div className="flex gap-16">
            {Object.entries(FOOTER_NAV).map(([group, items]) => (
              <div key={group} className="flex flex-col gap-3">
                <p
                  className="text-[10px] font-semibold uppercase tracking-widest"
                  style={{ fontFamily: 'var(--font-montserrat)', color: '#7B7B7B' }}
                >
                  {group}
                </p>
                <ul className="flex flex-col gap-2">
                  {items.map(item => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-[13px] transition-colors duration-200 hover:text-[#222]"
                        style={{ color: '#7B7B7B' }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 flex items-center justify-between border-t border-black/[0.06] pt-6 text-xs"
          style={{ color: '#7B7B7B' }}
        >
          <span style={{ fontFamily: 'var(--font-montserrat)' }}>
            © {new Date().getFullYear()} Ömürcan Cengiz. All rights reserved.
          </span>
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(social => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="transition-colors duration-200 hover:text-[#222] text-base"
                style={{ color: '#7B7B7B' }}
              >
                <i className={social.icon} />
              </a>
            ))}
            <a
              href="https://spargo.app"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spargo"
              className="transition-colors duration-200 hover:opacity-70"
              style={{ color: '#7B7B7B' }}
            >
              <SpargoIcon size={14} color="currentColor" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
