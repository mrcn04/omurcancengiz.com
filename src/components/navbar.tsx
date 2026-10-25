'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Palmtree } from 'lucide-react'

const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Photography', href: '/photography' },
]

const CONTACT = { label: 'Contact', href: '/contact' }

export default function Navbar() {
  const pathname = usePathname()
  const barRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)
  // Home opens on the dark hero, so start dark there and the first paint already matches.
  const [dark, setDark] = useState(pathname === '/')
  const [open, setOpen] = useState(false)

  // Match the section under the bar: anything marked data-nav-theme="dark" flips it dark.
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const bar = barRef.current
      const header = bar?.parentElement
      if (!bar || !header) return
      // Sample the middle of the 56px top row, so an open mobile menu doesn't shift the point.
      const below = document
        .elementsFromPoint(window.innerWidth / 2, bar.getBoundingClientRect().top + 28)
        .find(el => !header.contains(el))
      setScrolled(window.scrollY > 8)
      setDark(!!below?.closest('[data-nav-theme="dark"]'))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [pathname])

  useEffect(() => setOpen(false), [pathname])

  const isActive = (href: string) => pathname === href || pathname === `${href}/`
  const linkTone = (href: string) =>
    `uppercase font-medium transition-colors ${
      isActive(href)
        ? dark
          ? 'text-white'
          : 'text-[#1d1d1f]'
        : dark
          ? 'text-white/55 hover:text-white'
          : 'text-[#86868b] hover:text-[#1d1d1f]'
    }`

  return (
    <header className="fixed top-3 md:top-4 inset-x-0 z-50 px-3 md:px-6">
      <div
        ref={barRef}
        className={`max-w-[1080px] mx-auto rounded-2xl border backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 ${
          dark
            ? 'bg-[#1d1d1f]/75 border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.25)]'
            : scrolled || open
              ? 'bg-white/80 border-black/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.06)]'
              : 'bg-white/80 border-black/[0.06]'
        }`}
      >
        <div className="h-14 pl-5 pr-2 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={`flex items-center gap-1.5 hover:opacity-60 transition-[color,opacity] duration-300 ${
              dark ? 'text-white' : 'text-[#1d1d1f]'
            }`}
          >
            <span className="text-[13px] tracking-[0.25em] uppercase font-semibold">ÖC</span>
            <Palmtree className="size-[18px]" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className={`text-[11px] tracking-[0.15em] ${linkTone(href)}`}
              >
                {label}
              </Link>
            ))}
            <Link
              href={CONTACT.href}
              className={`h-10 px-5 inline-flex items-center rounded-xl text-[11px] tracking-[0.15em] uppercase font-medium transition-colors duration-300 ${
                dark
                  ? 'bg-white text-[#1d1d1f] hover:bg-white/85'
                  : 'bg-[#1d1d1f] text-white hover:bg-black'
              }`}
            >
              {CONTACT.label}
            </Link>
          </nav>

          {/* Mobile toggle: two lines that fold into an X */}
          <button
            className={`md:hidden relative size-10 rounded-xl transition-colors duration-300 ${
              dark ? 'text-white hover:bg-white/10' : 'text-[#1d1d1f] hover:bg-black/[0.04]'
            }`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span
              className={`absolute left-[11px] top-1/2 -mt-[0.75px] h-[1.5px] w-[18px] rounded-full bg-current transition-transform duration-300 ${
                open ? 'rotate-45' : '-translate-y-[3.5px]'
              }`}
            />
            <span
              className={`absolute left-[11px] top-1/2 -mt-[0.75px] h-[1.5px] w-[18px] rounded-full bg-current transition-transform duration-300 ${
                open ? '-rotate-45' : 'translate-y-[3.5px]'
              }`}
            />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden grid transition-[grid-template-rows] duration-300 ease-out ${
            open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <nav className="overflow-hidden">
            <div className="px-2 pb-2 pt-1 flex flex-col">
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  tabIndex={open ? 0 : -1}
                  className={`px-3 py-3.5 rounded-lg text-[12px] tracking-[0.2em] ${linkTone(href)}`}
                >
                  {label}
                </Link>
              ))}
              <Link
                href={CONTACT.href}
                tabIndex={open ? 0 : -1}
                className={`mt-2 h-11 inline-flex items-center justify-center rounded-xl text-[12px] tracking-[0.2em] uppercase font-medium ${
                  dark ? 'bg-white text-[#1d1d1f]' : 'bg-[#1d1d1f] text-white'
                }`}
              >
                {CONTACT.label}
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
