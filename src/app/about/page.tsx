import type { Metadata } from 'next'
import Pillars from '@/components/pillars'
import SectionHeading from '@/components/section-heading'
import ArrowLink from '@/components/arrow-link'
import Gallery from '@/components/gallery'
import { PHOTOS } from '@/utils/photos'

export const metadata: Metadata = {
  title: 'About — Ömürcan Cengiz',
  description: 'Founder, engineer, photographer, and triathlete based in Amsterdam.',
}

const FACTS = [
  { value: '10 years', label: 'Taking products from idea to launch' },
  { value: '2022', label: 'Founded Spargo' },
  { value: 'Amsterdam', label: 'Home base' },
]

const PRINCIPLES = [
  {
    title: 'What gets shipped.',
    text: 'Ideas are cheap and roadmaps are wishes. The work that counts is the work that reaches people.',
  },
  {
    title: 'Who it serves.',
    text: 'Every feature has to earn its place by solving a real problem for a real person.',
  },
  {
    title: 'Whether it lasts.',
    text: 'I build for the long run: simple systems, honest products, and decisions that age well.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* ── Header ────────────────────────────────────── */}
      <section className="pt-36 md:pt-44 pb-24 md:pb-32">
        <div className="max-w-[1080px] mx-auto px-6">
          <SectionHeading
            as="h1"
            eyebrow="About"
            title="Builder at heart."
            subtitle="Designer, engineer, founder."
          />
        </div>
        <div className="max-w-[1080px] mx-auto px-6 mt-14 md:mt-20 grid md:grid-cols-[1fr_auto] gap-14 md:gap-20 items-start">
          <div>
            <div
              data-animate
              className="max-w-xl space-y-5 text-[19px] leading-[1.5] tracking-[-0.01em] text-[#86868b] text-pretty"
            >
              <p>
                I&apos;m an old soul who builds new things. For ten years I&apos;ve designed and
                built products end to end, and I care less about trends than about what lasts. I
                like making things that make people&apos;s lives more creative and less annoying.
              </p>
              <p>
                Along the way I&apos;ve built for global brands through agency partners, and one app
                I designed and built for a client went on to be{' '}
                <span className="text-[#1d1d1f]">acquired</span>. In 2022 I started{' '}
                <span className="text-[#1d1d1f]">Spargo</span>, which I designed and built on my
                own, from brand to infrastructure.
              </p>
              <p>
                I design the interface and write the code, so nothing gets lost in between. I think
                in products, not features.
              </p>
              <p>
                When I&apos;m not building, I&apos;m behind a camera shooting film, or out training:
                swimming, cycling, running.
              </p>
            </div>
          </div>
          <figure
            data-animate
            data-delay="1"
            className="w-full max-w-[340px] md:w-[clamp(260px,26vw,340px)]"
          >
            <img
              src="/omur.webp"
              srcSet="/omur-mobile.webp 728w, /omur.webp 1456w"
              sizes="(max-width: 768px) 340px, 340px"
              alt="Ömürcan looking out over the sea"
              width={340}
              height={425}
              className="w-full aspect-[4/5] object-cover rounded-[28px]"
            />
          </figure>
        </div>

        <div className="max-w-[1080px] mx-auto px-6 mt-20 md:mt-28 grid sm:grid-cols-3 gap-8 sm:gap-6">
          {FACTS.map(({ value, label }, i) => (
            <div
              key={label}
              data-animate
              data-delay={String(i)}
              className="border-t border-black/[0.08] pt-5"
            >
              <p className="text-[clamp(1.75rem,3vw,2.25rem)] font-semibold tracking-[-0.025em] text-[#1d1d1f]">
                {value}
              </p>
              <p className="mt-1 text-[15px] text-[#86868b]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── What I do ─────────────────────────────────── */}
      <section className="py-28 md:py-40 bg-[#f5f5f7]">
        <div className="max-w-[1080px] mx-auto px-6">
          <SectionHeading
            eyebrow="What I do"
            title="Five disciplines."
            subtitle="One way of working."
            className="mb-14 md:mb-20"
          />
          <Pillars />
        </div>
      </section>

      {/* ── Photography ───────────────────────────────── */}
      <section className="py-28 md:py-40">
        <div className="max-w-[1080px] mx-auto px-6">
          <div className="mb-14 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Photography"
              title="Through the lens."
              subtitle="Moments between lines of code."
            />
            <div data-animate className="shrink-0">
              <ArrowLink href="/photography">See all photos</ArrowLink>
            </div>
          </div>
          <Gallery photos={PHOTOS.slice(0, 3)} />
        </div>
      </section>

      {/* ── Principles ────────────────────────────────── */}
      <section className="py-28 md:py-40 bg-[#f5f5f7]">
        <div className="max-w-[1080px] mx-auto px-6">
          <SectionHeading
            eyebrow="How I think"
            title="Products, not features."
            subtitle="Three questions I ask about everything I build."
            className="mb-14 md:mb-20"
          />
          <div className="grid md:grid-cols-3 gap-10 md:gap-8">
            {PRINCIPLES.map(({ title, text }, i) => (
              <div key={title} data-animate data-delay={String(i)}>
                <span className="text-[13px] font-medium text-[#86868b]/70 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-[24px] font-semibold tracking-[-0.02em] text-[#1d1d1f]">
                  {title}
                </h3>
                <p className="mt-3 text-[16px] leading-[1.5] tracking-[-0.01em] text-[#86868b] text-pretty">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
