import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import SectionHeading from '@/components/section-heading'
import { EMAIL } from '@/utils/contact'

export const metadata: Metadata = {
  title: 'Contact — Ömürcan Cengiz',
  description: 'Tell me what you are building.',
}

export default function ContactPage() {
  return (
    <section className="min-h-[85svh] flex items-center pt-36 md:pt-44 pb-28 md:pb-40">
      <div className="w-full max-w-[1080px] mx-auto px-6">
        <SectionHeading
          as="h1"
          eyebrow="Contact"
          title="Let's talk."
          subtitle="Tell me what you're building."
        />
        <div data-animate className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href={`mailto:${EMAIL}`}
            className="group inline-flex items-center gap-2 h-12 px-6 rounded-full bg-[#1d1d1f] text-white text-[15px] font-medium hover:bg-black transition-colors"
          >
            Email me
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <span className="text-[15px] text-[#86868b] select-all">{EMAIL}</span>
        </div>
      </div>
    </section>
  )
}
