import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import CopyEmail from './copy-email'

export default function ClosingCta() {
  return (
    <section className="p-3 md:p-6">
      <div
        data-nav-theme="dark"
        className="relative overflow-hidden rounded-[28px] md:rounded-[36px] bg-black text-white"
      >
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_0%,rgba(255,255,255,0.11),transparent_70%)]"
        />

        <div className="relative max-w-[1080px] mx-auto px-6 pt-24 pb-10 md:pt-36 md:pb-12">
          <div data-animate className="text-center">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] ring-1 ring-white/10 px-3.5 py-1.5 text-[13px] text-white/70">
              <span className="relative flex size-2">
                <span className="absolute inset-0 rounded-full bg-[#30d158] opacity-60 animate-ping" />
                <span className="relative size-2 rounded-full bg-[#30d158]" />
              </span>
              Limited availability
            </p>
            <h2 className="mt-8 text-[clamp(2.75rem,7.5vw,6rem)] font-semibold tracking-[-0.04em] leading-[0.98] text-balance">
              Have an idea?
              <br />
              <span className="text-white/40">Let&apos;s build it.</span>
            </h2>
            <p className="mt-8 max-w-md mx-auto text-[19px] leading-[1.5] tracking-[-0.01em] text-white/50 text-pretty">
              Tell me what you&apos;re working on: the product, the team, or the problem you
              can&apos;t shake.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 h-12 px-6 rounded-full bg-white text-black text-[15px] font-medium hover:bg-white/90 transition-colors"
              >
                Start a conversation
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <CopyEmail />
            </div>
          </div>

          <div className="mt-24 md:mt-32 pt-8"></div>
        </div>
      </div>
    </section>
  )
}
