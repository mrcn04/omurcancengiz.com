import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1.5 text-[15px] font-medium tracking-[-0.01em] text-[#1d1d1f] hover:opacity-60 transition-opacity"
    >
      {children}
      <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
    </Link>
  )
}
