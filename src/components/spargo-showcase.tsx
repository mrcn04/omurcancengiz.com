import { ArrowUpRight } from 'lucide-react'
import SpargoIcon from './spargo-icon'
import SpargoMenubar from './spargo-menubar'

const FACTS = [
  { label: 'Design', text: 'Brand, product, and interface.' },
  { label: 'Engineering', text: 'Architecture and code, end to end.' },
  { label: 'Team', text: 'Just me, from first sketch to infrastructure.' },
]

export default function SpargoShowcase({ id }: { id?: string }) {
  return (
    <section
      id={id}
      data-nav-theme="dark"
      className="scroll-mt-20 bg-black text-white py-28 md:py-40 overflow-hidden"
    >
      <div className="max-w-[1080px] mx-auto px-6">
        <div data-animate className="max-w-2xl mx-auto mb-14 md:mb-20 text-center">
          <span className="inline-grid place-items-center size-14 rounded-2xl bg-white/[0.08] ring-1 ring-white/10 mb-8">
            <SpargoIcon size={26} />
          </span>
          <h2 className="text-[clamp(2.75rem,6vw,4.5rem)] font-semibold tracking-[-0.03em] leading-[1.02]">
            Spargo.
          </h2>
          <p className="mt-3 text-[clamp(1.25rem,2.4vw,1.75rem)] font-semibold tracking-[-0.015em] bg-gradient-to-r from-[#4facfe] to-[#a855f7] bg-clip-text text-transparent">
            Ten tools. One menubar.
          </p>
          <p className="mt-6 text-[17px] leading-[1.5] text-white/50 text-pretty">
            A collective, pragmatic app for macOS. From managing your windows to reading your
            device&apos;s stats, Spargo puts ten built-in apps in your menubar.
          </p>
        </div>

        <div data-animate>
          <SpargoMenubar />
        </div>

        <div className="mt-14 md:mt-16 grid sm:grid-cols-3 gap-8 sm:gap-6">
          {FACTS.map(({ label, text }, i) => (
            <div
              key={label}
              data-animate
              data-delay={String(i)}
              className="border-t border-white/10 pt-5"
            >
              <p className="text-[14px] text-white/40">{label}</p>
              <p className="mt-1 text-[17px] text-white/85 tracking-[-0.01em]">{text}</p>
            </div>
          ))}
        </div>

        <div
          data-animate
          className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
        >
          <a
            href="https://spargo.app"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 h-11 px-5 rounded-full bg-white text-black text-[15px] font-medium hover:bg-white/90 transition-colors"
          >
            Visit spargo.app
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  )
}
