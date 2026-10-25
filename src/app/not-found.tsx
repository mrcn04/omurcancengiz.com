'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Planes from '@/components/planes'

const LEAVE_MS = 220

export default function NotFound() {
  const router = useRouter()
  const [leaving, setLeaving] = useState(false)

  return (
    <main
      className={`fixed inset-0 z-[60] overflow-hidden bg-[#f5f5f7] transition-opacity duration-[220ms] ease-out ${
        leaving ? 'opacity-0' : ''
      }`}
    >
      <div className="relative h-full">
        <Planes />

        <div className="relative z-10 h-full flex flex-col items-center md:items-start justify-between md:justify-center text-center md:text-left pt-16 pb-16 md:py-0 md:pl-[clamp(2rem,15vw,15rem)]">
          <h1 className="text-[26px] md:text-[clamp(26px,2.1vw,34px)] leading-[1.15] tracking-[-0.02em] font-normal">
            <span className="blur-in blur-in-1 block text-[#1d1d1f]">404</span>
            <span className="blur-in blur-in-2 block text-[#86868b]">Lost in flight?</span>
          </h1>
          <Link
            href="/"
            onClick={e => {
              e.preventDefault()
              if (leaving) return
              setLeaving(true)
              setTimeout(() => router.push('/'), LEAVE_MS)
            }}
            className="blur-in blur-in-3 md:mt-12 text-[14px] tracking-[-0.016em] text-[#86868b] hover:text-[#1d1d1f] active:scale-[0.97] transition-[color,transform] duration-150"
          >
            Find your way home
          </Link>
        </div>
      </div>
    </main>
  )
}
