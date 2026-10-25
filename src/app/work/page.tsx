import type { Metadata } from 'next'
import SpargoShowcase from '@/components/spargo-showcase'
import Engagements from '@/components/engagements'
import ClosingCta from '@/components/closing-cta'
import SectionHeading from '@/components/section-heading'

export const metadata: Metadata = {
  title: 'Work — Ömürcan Cengiz',
  description: 'Spargo, and how I help founders and product teams build theirs.',
}

const STEPS = [
  {
    title: 'Intro call',
    text: 'We talk through the product, the team, and where things are stuck.',
  },
  {
    title: 'A clear plan',
    text: 'I come back with a recommendation: what to build, how to build it, and in what order.',
  },
  {
    title: 'Hands on',
    text: 'I advise on the decisions that matter, or design and build alongside your team.',
  },
]

export default function WorkPage() {
  return (
    <>
      {/* ── Header ────────────────────────────────────── */}
      <section className="pt-36 md:pt-44 pb-24 md:pb-32">
        <div className="max-w-[1080px] mx-auto px-6">
          <SectionHeading
            as="h1"
            eyebrow="Work"
            title="Things I build."
            subtitle="And how I can help you build yours."
            description="I design and build my own products, and help founders and product teams get theirs out the door."
          />
        </div>
      </section>

      {/* ── Spargo ────────────────────────────────────── */}
      <SpargoShowcase id="spargo" />

      {/* ── Engagements ───────────────────────────────── */}
      <section id="engagements" className="scroll-mt-20 py-28 md:py-40 bg-[#f5f5f7]">
        <div className="max-w-[1080px] mx-auto px-6">
          <SectionHeading
            eyebrow="Work with me"
            title="Two ways to work together."
            subtitle="Advise, or build."
            description="Senior judgment on the decisions that shape your product, or a partner who designs and builds it with you."
            className="mb-14 md:mb-20"
          />
          <Engagements />
        </div>
      </section>

      {/* ── Process ───────────────────────────────────── */}
      <section id="process" className="scroll-mt-20 py-28 md:py-40">
        <div className="max-w-[1080px] mx-auto px-6">
          <SectionHeading
            eyebrow="How it works"
            title="Simple by design."
            subtitle="Three steps, no ceremony."
            className="mb-14 md:mb-20"
          />
          <ol className="grid md:grid-cols-3 gap-4">
            {STEPS.map(({ title, text }, i) => (
              <li
                key={title}
                data-animate
                data-delay={String(i)}
                className="rounded-[28px] ring-1 ring-inset ring-black/[0.06] p-8 md:p-10"
              >
                <span className="grid place-items-center size-9 rounded-full bg-[#1d1d1f] text-white text-[13px] font-medium tabular-nums">
                  {i + 1}
                </span>
                <h3 className="mt-10 text-[21px] font-semibold tracking-[-0.015em] text-[#1d1d1f]">
                  {title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.5] tracking-[-0.01em] text-[#86868b]">
                  {text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ClosingCta />
    </>
  )
}
