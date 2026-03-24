'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import SocialLinks from '../components/socials'
import SpargoIcon from '../components/spargo-icon'

const MARQUEE_ITEMS = [
  'TypeScript',
  'React',
  'Next.js',
  'Go',
  'React Native',
  'Node.js',
  'PostgreSQL',
  'Product Design',
  'System Architecture',
  '9 Years',
  'Founder',
  'Amsterdam',
  'Swift',
  'C',
]

const STATS = [
  { value: '9+', label: 'Years building' },
  { value: 'TS · Go', label: 'Primary stack' },
  { value: 'Spargo', label: 'Indie founder' },
  { value: 'Amsterdam', label: 'Based in' },
]


export default function HomePage() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
    const img = new window.Image()
    img.src = '/omur.webp'
    img.onload = () => {
      document.getElementById('picture')?.classList.add('is-loaded')
    }
  }, [])

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="min-h-screen flex items-center justify-between px-8 md:px-16 lg:px-24 overflow-hidden">
        {/* Left — all content */}
        <div className="flex-1 flex flex-col justify-center py-28 max-w-[600px]">
          {/* Hi I'm label */}
          <div className="name flex items-center gap-3" style={{ marginBottom: '3rem' }}>
            <span className="block w-4 h-px bg-[#219EBC] flex-shrink-0" />
            <span
              className="text-[10px] tracking-[0.5em] font-semibold text-[#219EBC]"
              style={{ fontFamily: 'var(--font-montserrat)' }}
            >
              Hi, I&apos;m
            </span>
          </div>

          {/* Name */}
          <h1
            className="name leading-[0.88] tracking-[-0.04em]"
            style={{ fontFamily: 'var(--font-montserrat)', marginBottom: '3rem' }}
          >
            <span
              className="block font-black hero-outline"
              style={{ fontSize: 'clamp(3.5rem, 7.5vw, 8.5rem)' }}
            >
              Ömürcan
            </span>
            <span
              className="block font-black text-[#222]"
              style={{ fontSize: 'clamp(3.5rem, 7.5vw, 8.5rem)' }}
            >
              Cengiz
            </span>
          </h1>

          {/* Role + divider */}
          <p className="job">Founder &amp; Developer</p>
          <hr className="hr" />

          {/* Bio */}
          <div className="description max-w-sm">
            <p style={{ color: '#7B7B7B' }} className="leading-[1.95]">
              9 years building software people love. Full-stack TypeScript &amp; Go. Founder of{' '}
              <a
                href="https://spargo.app"
                target="_blank"
                rel="noreferrer"
                className="text-[#222] underline underline-offset-2 decoration-[#219EBC]/40 hover:text-[#219EBC] transition-colors duration-200"
              >
                Spargo
              </a>
              . I also shoot film.
            </p>
          </div>

          {/* CTA */}
          <div className="contact mt-8">
            <a
              className="button group inline-flex items-center gap-2"
              href="mailto:omurccengiz@gmail.com"
            >
              Get in touch
              <ArrowUpRight
                size={12}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          {/* Socials */}
          {loaded ? <SocialLinks /> : <div style={{ height: '48px' }} />}
        </div>

        {/* Right — photo card (desktop only) */}
        <div className="hidden md:flex items-center justify-end flex-shrink-0 ml-12 lg:ml-20">
          <div className="relative">
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl bg-[#219EBC]/12 pointer-events-none" />
            <figure
              id="picture"
              className="picture relative z-10 w-[260px] lg:w-[400px] rounded-3xl overflow-hidden"
            >
              <img
                id="pictureImage"
                className="picture-image w-full block"
                style={{ aspectRatio: '3/4', objectFit: 'cover' }}
                srcSet="/omur-mobile.webp 480w, /omur.webp 800w"
                sizes="(max-width: 1024px) 260px, 300px"
                src="/omur.webp"
                alt="Portrait of Ömürcan Cengiz"
                width={400}
                height={500}
              />
            </figure>
          </div>
        </div>
      </section>

      {/* ── Marquee ────────────────────────────────────────── */}
      <div className="bg-[#222] border-y border-white/5 py-[14px] overflow-hidden">
        <div className="marquee-outer">
          <div className="marquee-track">
            {[0, 1].map(rep => (
              <span key={rep} className="inline-flex">
                {MARQUEE_ITEMS.map((item, j) => (
                  <span key={`${rep}-${j}`} className="inline-flex items-center gap-5 mx-5">
                    <span
                      className="text-[9px] tracking-[0.4em] uppercase text-white/30 whitespace-nowrap"
                      style={{ fontFamily: 'var(--font-montserrat)' }}
                    >
                      {item}
                    </span>
                    <span className="text-[#219EBC]/35 text-[8px]">✦</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stats ──────────────────────────────────────────── */}
      <section className="bg-white border-b border-black/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <div
                key={stat.value}
                className={`py-10 px-6 first:pl-0 ${i < 3 ? 'border-r border-black/[0.06]' : ''}`}
              >
                <p
                  className="text-2xl md:text-[2rem] font-black text-[#222] tracking-[-0.02em] leading-none"
                  style={{ fontFamily: 'var(--font-montserrat)' }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-[9px] tracking-[0.35em] uppercase mt-3"
                  style={{ fontFamily: 'var(--font-montserrat)', color: '#7B7B7B' }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ──────────────────────────────────────────── */}
      <section id="about" className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 py-32">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 md:gap-20 items-start">
          <div>
            <p
              className="text-[10px] tracking-[0.45em] uppercase text-[#219EBC] mb-5"
              style={{ fontFamily: 'var(--font-montserrat)' }}
            >
              About
            </p>
            <h2
              className="text-[2.25rem] md:text-[3rem] font-black text-[#222] tracking-[-0.03em] leading-[1.0]"
              style={{ fontFamily: 'var(--font-montserrat)' }}
            >
              Engineer
              <br />
              by trade.
              <br />
              Builder
              <br />
              by nature.
            </h2>
          </div>
          <div className="space-y-5 md:pt-[68px]">
            <p className="leading-[1.95] text-[0.95rem]" style={{ color: '#7B7B7B' }}>
              I&apos;ve spent the last 9 years turning ideas into software that people actually use.
              From early-stage startups to shipping my own products — I&apos;ve lived every stage of
              the product lifecycle.
            </p>
            <p className="leading-[1.95] text-[0.95rem]" style={{ color: '#7B7B7B' }}>
              Most recently, I founded{' '}
              <a
                href="https://spargo.app"
                target="_blank"
                rel="noreferrer"
                className="text-[#222] underline underline-offset-2 decoration-[#219EBC]/40 hover:text-[#219EBC] transition-colors duration-200"
              >
                Spargo
              </a>{' '}
              — a creative platform designed, engineered, and shipped solo. When I&apos;m not at the
              keyboard, I&apos;m behind a camera shooting film.
            </p>
            <p
              className="text-[9px] tracking-[0.35em] uppercase pt-4"
              style={{ fontFamily: 'var(--font-montserrat)', color: '#7B7B7B' }}
            >
              Amsterdam, Netherlands
            </p>
          </div>
        </div>
      </section>

      {/* ── Work ───────────────────────────────────────────── */}
      <section id="projects" className="bg-[#0f0f0f] py-28">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
          <div className="mb-16">
            <p
              className="text-[10px] tracking-[0.45em] uppercase text-[#219EBC] mb-5"
              style={{ fontFamily: 'var(--font-montserrat)' }}
            >
              Selected Work
            </p>
            <h2
              className="text-[2.25rem] md:text-[3.5rem] font-black text-white tracking-[-0.025em] leading-[1.0]"
              style={{ fontFamily: 'var(--font-montserrat)' }}
            >
              What I&apos;ve
              <br />
              Built
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Spargo */}
            <a
              href="https://spargo.app"
              target="_blank"
              rel="noreferrer"
              className="group relative bg-white/[0.05] border border-white/[0.07] rounded-3xl p-8 md:p-10 overflow-hidden hover:bg-white/[0.08] transition-all duration-300 block min-h-[320px]"
            >
              <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#219EBC]/8 blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-8">
                  <SpargoIcon size={32} />
                </div>
                <p
                  className="text-[9px] tracking-[0.4em] uppercase text-[#219EBC] mb-3"
                  style={{ fontFamily: 'var(--font-montserrat)' }}
                >
                  Founder · 2022 – Present
                </p>
                <h3
                  className="text-2xl md:text-3xl font-black text-white tracking-[-0.02em] mb-4"
                  style={{ fontFamily: 'var(--font-montserrat)' }}
                >
                  Spargo
                </h3>
                <p className="text-sm leading-[1.8] flex-1 max-w-xs" style={{ color: '#7B7B7B' }}>
                  A creative platform built from scratch. Designed, engineered, and shipped — solo.
                </p>
                <div className="mt-10 flex items-center gap-2 text-white/20 group-hover:text-[#219EBC] transition-colors duration-300">
                  <span
                    className="text-[9px] tracking-[0.35em] uppercase"
                    style={{ fontFamily: 'var(--font-montserrat)' }}
                  >
                    Visit
                  </span>
                  <ArrowUpRight
                    size={12}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </div>
            </a>
            {/* Placeholder */}
            <div className="relative bg-white/[0.02] border border-white/[0.04] rounded-3xl p-8 md:p-10 min-h-[320px] flex flex-col justify-between overflow-hidden">
              <div>
                <p
                  className="text-[9px] tracking-[0.4em] uppercase text-white/15 mb-4"
                  style={{ fontFamily: 'var(--font-montserrat)' }}
                >
                  Up Next
                </p>
                <h3
                  className="text-3xl font-black text-white/10 tracking-[-0.02em] leading-tight"
                  style={{ fontFamily: 'var(--font-montserrat)' }}
                >
                  Something
                  <br />
                  new.
                </h3>
              </div>
              <div className="flex gap-2">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#219EBC]/20" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Photography ────────────────────────────────────── */}
      <section className="py-28" id="photography">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
            <div>
              <p
                className="text-[10px] tracking-[0.45em] uppercase text-[#219EBC] mb-5"
                style={{ fontFamily: 'var(--font-montserrat)' }}
              >
                Through the Lens
              </p>
              <h2
                className="text-[2.25rem] md:text-[3.5rem] font-black text-[#222] tracking-[-0.025em] leading-[1.0]"
                style={{ fontFamily: 'var(--font-montserrat)' }}
              >
                I also
                <br />
                shoot.
              </h2>
            </div>
            <Link
              href="/photography"
              className="group inline-flex items-center gap-4 self-start md:self-auto"
            >
              <span
                className="text-[10px] tracking-[0.35em] uppercase transition-colors duration-300"
                style={{ fontFamily: 'var(--font-montserrat)', color: '#7B7B7B' }}
              >
                See all
              </span>
              <span className="h-px w-8 bg-black/10 group-hover:w-14 group-hover:bg-[#219EBC] transition-all duration-400" />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { aspect: 'aspect-[3/4]' },
              { aspect: 'aspect-[4/5]' },
              { aspect: 'aspect-[2/3]' },
            ].map((item, i) => (
              <div
                key={i}
                className={`${item.aspect} bg-white rounded-2xl border border-black/[0.06] overflow-hidden relative group cursor-pointer`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#219EBC]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}
