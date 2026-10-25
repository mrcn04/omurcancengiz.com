'use client'

import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { Photo } from '@/utils/photos'

export default function Gallery({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState<number | null>(null)
  const open = index !== null
  const photo = open ? photos[index] : null

  const step = useCallback(
    (by: number) => setIndex(i => (i === null ? i : (i + by + photos.length) % photos.length)),
    [photos.length],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIndex(null)
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.documentElement.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, step])

  return (
    <>
      <div className="columns-2 lg:columns-3 gap-3 md:gap-4">
        {photos.map((p, i) => (
          <button
            key={p.src}
            data-animate
            data-delay={String(i % 3)}
            onClick={() => setIndex(i)}
            aria-label={`Open photo: ${p.alt}`}
            className="group relative block w-full mb-3 md:mb-4 break-inside-avoid overflow-hidden rounded-[16px] md:rounded-[20px] bg-[#f5f5f7] cursor-zoom-in"
            style={{ aspectRatio: `${p.width} / ${p.height}` }}
          >
            <img
              src={p.thumb ?? p.src}
              alt={p.alt}
              loading="lazy"
              className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <span className="absolute inset-x-0 bottom-0 p-4 pt-12 text-left bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="block text-[13px] text-white">{p.caption ?? p.alt}</span>
            </span>
          </button>
        ))}
      </div>

      {photo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={photo.alt}
          className="fixed inset-0 z-[70] flex flex-col bg-black/95 backdrop-blur-sm text-white animate-in fade-in duration-200"
          onClick={() => setIndex(null)}
        >
          <div className="flex items-center justify-between px-4 md:px-6 h-16 shrink-0 text-[13px] text-white/60">
            <span className="tabular-nums">
              {(index ?? 0) + 1} / {photos.length}
            </span>
            <button
              onClick={() => setIndex(null)}
              aria-label="Close"
              className="grid place-items-center size-10 rounded-full hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="relative flex-1 min-h-0 flex items-center justify-center px-4 md:px-20">
            <img
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              onClick={e => e.stopPropagation()}
              className="max-h-full max-w-full object-contain rounded-lg animate-in fade-in zoom-in-[0.98] duration-300"
            />
            {photos.length > 1 && (
              <>
                <LightboxArrow side="left" onClick={() => step(-1)} />
                <LightboxArrow side="right" onClick={() => step(1)} />
              </>
            )}
          </div>

          <div
            className="shrink-0 px-4 md:px-6 py-5 text-center text-[13px]"
            onClick={e => e.stopPropagation()}
          >
            <p className="text-white/85">{photo.caption ?? photo.alt}</p>
            {photo.credit && (
              <p className="mt-1 text-white/40">
                Photo by{' '}
                <a
                  href={photo.credit.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-white/70"
                >
                  {photo.credit.name}
                </a>{' '}
                on Unsplash
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

function LightboxArrow({ side, onClick }: { side: 'left' | 'right'; onClick: () => void }) {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight
  return (
    <button
      onClick={e => {
        e.stopPropagation()
        onClick()
      }}
      aria-label={side === 'left' ? 'Previous photo' : 'Next photo'}
      className={`absolute top-1/2 -translate-y-1/2 ${
        side === 'left' ? 'left-2 md:left-5' : 'right-2 md:right-5'
      } grid place-items-center size-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur transition-colors`}
    >
      <Icon size={22} />
    </button>
  )
}
