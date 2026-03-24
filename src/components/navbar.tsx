'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, Palmtree } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

const NAV_LINKS = [
  { label: 'Dev', href: '#dev' },
  { label: 'Photography', href: '/photography' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#F8F8F8]/60 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-start text-[#222] hover:text-[#219EBC] transition-colors duration-300 text-[14px] tracking-[0.35em] uppercase font-semibold"
          style={{ fontFamily: 'var(--font-montserrat)' }}
        >
          ÖC
          <Palmtree className="size-5 ml-2" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-[10px] tracking-[0.3em] uppercase transition-colors duration-300 hover:text-[#219EBC] font-semibold"
              style={{ fontFamily: 'var(--font-montserrat)', color: '#7B7B7B' }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="md:hidden hover:text-[#222] transition-colors"
            aria-label="Open menu"
            style={{ color: '#7B7B7B' }}
          >
            <Menu size={20} />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-[#F8F8F8] border-black/[0.06] w-64 flex flex-col"
          >
            <div className="flex items-center justify-between mb-16 pt-2">
              <span
                className="text-[11px] tracking-[0.35em] uppercase font-semibold text-[#222]"
                style={{ fontFamily: 'var(--font-montserrat)' }}
              >
                ÖC
              </span>
            </div>
            <nav className="flex flex-col gap-8">
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="text-[10px] tracking-[0.4em] uppercase transition-colors duration-300 hover:text-[#219EBC]"
                  style={{ fontFamily: 'var(--font-montserrat)', color: '#7B7B7B' }}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
