'use client'

import { useEffect, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { EMAIL } from '@/utils/contact'

// Styled for the dark closing card.
export default function CopyEmail() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const id = setTimeout(() => setCopied(false), 1600)
    return () => clearTimeout(id)
  }, [copied])

  return (
    <button
      onClick={() => navigator.clipboard.writeText(EMAIL).then(() => setCopied(true))}
      className="inline-flex items-center gap-2 h-12 px-6 rounded-full ring-1 ring-inset ring-white/15 text-[15px] text-white hover:bg-white/[0.06] transition-colors"
    >
      {copied ? <Check size={15} /> : <Copy size={15} className="text-white/50" />}
      {copied ? 'Copied to clipboard' : EMAIL}
    </button>
  )
}
