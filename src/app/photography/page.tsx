import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Photography — Ömürcan Cengiz',
  description: 'A collection of photographs by Ömürcan Cengiz.',
}

interface Photo {
  src: string
  alt: string
  location: string
  year: number
  aspectRatio?: 'portrait' | 'landscape' | 'square'
}

// Add your photos here when ready.
const PHOTOS: Photo[] = [
  // { src: '/photos/istanbul-01.jpg', alt: 'Istanbul rooftops at dusk', location: 'Istanbul', year: 2024, aspectRatio: 'portrait' },
]

const ASPECT_CLASSES: Record<string, string> = {
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  square: 'aspect-square',
}

export default function PhotographyPage() {
  const isEmpty = PHOTOS.length === 0

  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-quicksand)' }}>

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 pt-36 pb-20">

        <Link
          href="/"
          className="inline-flex items-center gap-3 mb-20 group"
          style={{ fontFamily: 'var(--font-montserrat)' }}
        >
          <span className="h-px w-6 bg-[#219EBC] group-hover:w-12 transition-all duration-300" />
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#219EBC]">Back</span>
        </Link>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12">
          <div>
            <p
              className="text-[10px] tracking-[0.45em] uppercase text-[#219EBC] mb-6"
              style={{ fontFamily: 'var(--font-montserrat)' }}
            >
              Ömürcan Cengiz
            </p>
            <h1
              className="leading-[0.9] tracking-[-0.03em]"
              style={{ fontFamily: 'var(--font-montserrat)' }}
            >
              <span
                className="block text-[3.5rem] md:text-[6.5rem] lg:text-[8rem] font-black"
                style={{ WebkitTextStroke: '2px #222', color: 'transparent' }}
              >
                Photo
              </span>
              <span className="block text-[3.5rem] md:text-[6.5rem] lg:text-[8rem] font-black text-[#222]">
                graphy
              </span>
            </h1>
          </div>

          <p
            className="text-sm leading-[1.95] max-w-[240px] md:mb-3"
          style={{ color: '#7B7B7B' }}
          >
            Moments captured between lines of code. Street scenes, travel, and the
            quiet details of everyday life.
          </p>
        </div>

        <div className="mt-20 h-px bg-black/[0.07]" />
      </section>

      {/* ── Grid ─────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 pb-32">
        {isEmpty ? <EmptyState /> : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {PHOTOS.map((photo, i) => (
              <PhotoCard key={i} photo={photo} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

function PhotoCard({ photo, index }: { photo: Photo; index: number }) {
  const aspect = ASPECT_CLASSES[photo.aspectRatio ?? 'portrait']
  return (
    <div
      className="break-inside-avoid group relative overflow-hidden rounded-2xl bg-[#F8F8F8]"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className={`relative ${aspect} w-full`}>
        <img
          src={photo.src}
          alt={photo.alt}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
        <div>
          <p className="text-white text-sm font-semibold" style={{ fontFamily: 'var(--font-montserrat)' }}>
            {photo.location}
          </p>
          <p className="text-white/50 text-xs mt-0.5 tracking-wider">{photo.year}</p>
        </div>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="py-40 flex flex-col items-center justify-center text-center">
      {/* Decorative grid */}
      <div className="grid grid-cols-4 gap-2 mb-14 opacity-15">
        {[
          'aspect-[3/4]', 'aspect-[2/3]', 'aspect-[4/3]', 'aspect-square',
          'aspect-square', 'aspect-[3/4]', 'aspect-[4/3]', 'aspect-[2/3]',
        ].map((a, i) => (
          <div key={i} className={`${a} w-14 rounded-xl bg-[#222]`} />
        ))}
      </div>
      <span
        className="block text-[10px] tracking-[0.45em] uppercase text-[#219EBC] mb-4"
        style={{ fontFamily: 'var(--font-montserrat)' }}
      >
        Coming soon
      </span>
      <p className="text-[#999] text-sm leading-relaxed max-w-[220px]">
        The gallery is being curated. Check back soon.
      </p>
    </div>
  )
}
