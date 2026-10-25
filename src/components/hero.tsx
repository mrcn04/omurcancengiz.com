import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ParticleGlobe from './particle-globe'

export default function Hero() {
  return (
    <section
      data-nav-theme="dark"
      data-dark-page
      className="relative isolate min-h-[100svh] flex flex-col pt-28 pb-12 md:pt-24 md:pb-0 bg-[#080808] text-white overflow-hidden"
    >
      {/* The globe fills the hero and sits itself to the right of the copy (above it on mobile). */}
      <ParticleGlobe className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 flex-1 flex items-end md:items-center pointer-events-none">
        <div className="w-full max-w-[1080px] mx-auto px-6 pt-[54svh] md:pt-0">
          <div className="max-w-[560px]">
            <p className="hero-animate hero-animate-1 mb-5 text-[14px] tracking-[-0.01em] text-white/50">
              Developer &amp; Designer
            </p>
            <h1 className="hero-animate hero-animate-2 text-[clamp(2rem,4.8vw,3.5rem)] font-semibold tracking-[-0.025em] leading-[1.02]">
              Ömürcan Cengiz
            </h1>
            <p className="hero-animate hero-animate-3 mt-6 max-w-md text-[clamp(14px,1.5vw,16px)] leading-[1.42] tracking-[0.004em] text-white/60">
              Founder of{' '}
              <Link
                href="/work#spargo"
                className="pointer-events-auto text-white hover:opacity-50 transition-opacity"
              >
                Spargo
              </Link>
              . I design and build products that make life more creative and less annoying.
            </p>
            <div className="hero-animate hero-animate-4 mt-10 pointer-events-auto">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 h-12 px-6 rounded-full bg-white text-black text-[15px] font-medium hover:bg-white/90 transition-colors"
              >
                Book an intro call
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
