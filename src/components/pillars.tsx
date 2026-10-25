import { Fragment, type ReactNode } from 'react'
import Link from 'next/link'
import {
  Aperture,
  ArrowRight,
  Bike,
  CodeXml,
  Flag,
  Footprints,
  PenTool,
  Waves,
  type LucideIcon,
} from 'lucide-react'
import SpargoIcon from './spargo-icon'

const TILE = 'rounded-[28px] p-8 md:p-10 min-h-[300px] flex flex-col justify-between'
const TILE_TITLE = 'text-[28px] md:text-[32px] font-semibold tracking-[-0.02em] leading-[1.1]'
const TILE_BODY = 'mt-3 text-[16px] leading-[1.5] tracking-[-0.01em]'

const SWATCHES = ['#1d1d1f', '#86868b', '#d2d2d7', '#219ebc']

const RACE_LEGS = [
  { icon: Waves, label: 'Swim' },
  { icon: Bike, label: 'Bike' },
  { icon: Footprints, label: 'Run' },
]

// The five things I do, as a bento grid. Sits on a #f5f5f7 background.
export default function Pillars() {
  return (
    <div className="grid md:grid-cols-6 gap-4">
      {/* Designer */}
      <div data-animate className={`md:col-span-4 bg-white ${TILE}`}>
        <div>
          <TileLabel icon={PenTool}>Designer</TileLabel>
          <h3 className={`${TILE_TITLE} text-[#1d1d1f]`}>Design that feels right.</h3>
          <p className={`${TILE_BODY} max-w-md text-[#86868b]`}>
            Interface, interaction, and brand. I design the products I build, so nothing gets lost
            between the mockup and the code.
          </p>
        </div>
        <div aria-hidden className="mt-10 flex items-end justify-between gap-6">
          <span className="text-[64px] leading-[0.75] font-semibold tracking-[-0.04em] text-[#1d1d1f]">
            Aa
          </span>
          <svg width="128" height="48" viewBox="0 0 128 48" fill="none" className="hidden sm:block">
            <path d="M6 42C32 42 40 8 64 8s32 34 58 34" stroke="#1d1d1f" strokeWidth="1.5" />
            <path d="M40 8h48" stroke="#219ebc" />
            <circle cx="40" cy="8" r="2.5" fill="#219ebc" />
            <circle cx="88" cy="8" r="2.5" fill="#219ebc" />
            {[
              [6, 42],
              [64, 8],
              [122, 42],
            ].map(([x, y]) => (
              <rect
                key={x}
                x={x - 3.5}
                y={y - 3.5}
                width="7"
                height="7"
                fill="white"
                stroke="#219ebc"
              />
            ))}
          </svg>
          <div className="flex">
            {SWATCHES.map(color => (
              <span
                key={color}
                className="-ml-2.5 first:ml-0 size-10 rounded-full ring-[3px] ring-white"
                style={{ background: color }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Engineer */}
      <div data-animate data-delay="1" className={`md:col-span-2 bg-[#1d1d1f] ${TILE}`}>
        <div>
          <TileLabel icon={CodeXml} dark>
            Engineer
          </TileLabel>
          <h3 className={`${TILE_TITLE} text-white`}>Engineer always.</h3>
          <p className={`${TILE_BODY} text-white/50`}>
            Full-stack, interface to infrastructure. I design the system and write the code.
          </p>
        </div>
        <code className="mt-10 font-mono text-[13px] text-white/40">
          <span className="text-white/85">ship</span>(build(idea))
        </code>
      </div>

      {/* Founder */}
      <div data-animate className={`md:col-span-2 bg-white ${TILE}`}>
        <div>
          <TileLabel icon={Flag}>Founder</TileLabel>
          <h3 className={`${TILE_TITLE} text-[#1d1d1f]`}>Entrepreneur first.</h3>
          <p className={`${TILE_BODY} text-[#86868b]`}>
            I start companies and stay for the hard parts: product, brand, and the unglamorous work
            in between.
          </p>
        </div>
        <Link
          href="/work"
          className="group mt-10 self-start inline-flex items-center gap-2.5 rounded-full bg-[#f5f5f7] hover:bg-[#ebebed] pl-1.5 pr-3.5 py-1.5 transition-colors"
        >
          <span className="grid place-items-center size-7 rounded-full bg-[#1d1d1f]">
            <SpargoIcon size={13} />
          </span>
          <span className="text-[14px] font-medium text-[#1d1d1f]">Spargo</span>
          <span className="text-[14px] text-[#86868b]">since 2022</span>
          <ArrowRight
            size={14}
            className="text-[#86868b] transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      {/* Photographer */}
      <Link
        href="/photography"
        data-animate
        data-delay="1"
        className={`group md:col-span-2 bg-white ${TILE}`}
      >
        <div>
          <TileLabel icon={Aperture}>Photographer</TileLabel>
          <h3 className={`${TILE_TITLE} text-[#1d1d1f]`}>Behind the lens.</h3>
          <p className={`${TILE_BODY} text-[#86868b]`}>
            Street scenes, travel, and the quiet details of everyday life. Mostly on film.
          </p>
        </div>
        <span className="mt-10 inline-flex items-center gap-1.5 text-[14px] font-medium text-[#1d1d1f]">
          View photography
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>

      {/* Triathlete */}
      <div data-animate data-delay="2" className={`md:col-span-2 bg-white ${TILE}`}>
        <div>
          <TileLabel icon={Waves}>Triathlete</TileLabel>
          <h3 className={`${TILE_TITLE} text-[#1d1d1f]`}>Swim. Bike. Run.</h3>
          <p className={`${TILE_BODY} text-[#86868b]`}>
            Endurance sport keeps me honest. Consistency beats intensity, in training and in
            building.
          </p>
        </div>
        <div className="mt-10 flex items-start">
          {RACE_LEGS.map(({ icon: Icon, label }, i) => (
            <Fragment key={label}>
              {i > 0 && <span className="flex-1 mt-[18px] mx-1.5 h-px bg-black/10" />}
              <span className="flex flex-col items-center gap-2 text-[12px] text-[#86868b]">
                <span className="grid place-items-center size-9 rounded-full bg-[#f5f5f7] text-[#1d1d1f]">
                  <Icon size={15} strokeWidth={1.75} />
                </span>
                {label}
              </span>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

function TileLabel({
  icon: Icon,
  dark,
  children,
}: {
  icon: LucideIcon
  dark?: boolean
  children: ReactNode
}) {
  return (
    <p
      className={`mb-6 flex items-center gap-2 text-[13px] font-medium ${
        dark ? 'text-white/50' : 'text-[#86868b]'
      }`}
    >
      <Icon size={15} strokeWidth={1.75} />
      {children}
    </p>
  )
}
