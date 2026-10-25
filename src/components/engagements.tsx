import { ArrowRight, Check } from 'lucide-react'
import { EMAIL } from '@/utils/contact'

// Pricing and terms live here. Keep it to two clear offers rather than a menu of services.
const ENGAGEMENTS = [
  {
    name: 'Advisory',
    title: 'Senior judgment, on call.',
    summary:
      'For founders and leadership teams facing the decisions that shape a product: what to build, how to architect it, and when to ship.',
    includes: ['Product strategy', 'Technical architecture', 'Fractional CTO', 'Design reviews'],
    price: '€1,000',
    unit: 'per hour',
  },
  {
    name: 'Build',
    title: 'Designed and built, end to end.',
    summary:
      'I design and build your product, or the part that matters most, with the care of someone who ships their own.',
    includes: ['Product design', 'Engineering', 'Launch'],
    price: 'Fixed scope',
    unit: 'quoted per project',
  },
]

// Two engagement cards. Sits on a #f5f5f7 background.
export default function Engagements() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {ENGAGEMENTS.map((e, i) => (
        <div
          key={e.name}
          data-animate
          data-delay={String(i)}
          className="flex flex-col rounded-[28px] bg-white p-8 md:p-10"
        >
          <p className="text-[13px] font-medium text-[#86868b]">{e.name}</p>
          <h3 className="mt-4 text-[28px] md:text-[32px] font-semibold tracking-[-0.02em] leading-[1.1] text-[#1d1d1f] text-balance">
            {e.title}
          </h3>
          <p className="mt-3 text-[16px] leading-[1.5] tracking-[-0.01em] text-[#86868b] text-pretty">
            {e.summary}
          </p>

          <ul className="mt-8 space-y-2.5">
            {e.includes.map(item => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-[15px] tracking-[-0.01em] text-[#1d1d1f]"
              >
                <Check size={15} strokeWidth={2} className="text-[#86868b]" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-10 flex items-end justify-between gap-4">
            <p>
              <span className="block text-[24px] font-semibold tracking-[-0.02em] text-[#1d1d1f]">
                {e.price}
              </span>
              <span className="text-[14px] text-[#86868b]">{e.unit}</span>
            </p>
            <a
              href={`mailto:${EMAIL}?subject=${encodeURIComponent(`${e.name} inquiry`)}`}
              className="group shrink-0 inline-flex items-center gap-2 h-11 px-5 rounded-full bg-[#1d1d1f] text-white text-[15px] font-medium hover:bg-black transition-colors"
            >
              Inquire
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}
