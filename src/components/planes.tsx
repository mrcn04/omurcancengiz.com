'use client'

import { useEffect, useRef } from 'react'

const PLANE_COUNT = 30
const PLANE_SIZE = 40
const MOBILE_SCALE = 0.67
const MAX_BANK = 0.5

const FLIGHT = {
  speed: 50, // px/s along each route
  routeLength: 1.7, // × viewport diagonal, so routes start and end off screen
  wobble: 28,
  driftX: 14,
  driftY: 10,
  jitter: 11,
}

const CURSOR = { radius: 180, push: 50, swirl: 30, fadeMs: 1200 }

interface Flight {
  x: number
  y: number
  heading: number
  phase: number
  progress: number
  driftScale: number
  jitterX: number
  jitterY: number
  scale: number
  turn: number
  speed: number
}

// Deterministic pseudo-random in [0, 1), so planes start in the same spots every visit.
function hash(i: number, salt: number) {
  const v = Math.sin((i + 1) * 12.9898 + salt * 78.233) * 43758.5453
  return v - Math.floor(v)
}

// Base-2 Van der Corput sequence: spreads planes evenly from top to bottom.
function radicalInverse(i: number) {
  let result = 0
  for (let n = i, f = 0.5; n > 0; n >>= 1, f /= 2) if (n & 1) result += f
  return result
}

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max)

const FLIGHTS: Flight[] = Array.from({ length: PLANE_COUNT }, (_, i) => {
  const a = hash(i, 1)
  const b = hash(i, 2)
  return {
    x: ((i * 0.618034 + a * 0.08) % 1) - 0.5,
    y: clamp(radicalInverse(i + 1) - 0.5 + (b - 0.5) * 0.08, -0.5, 0.5),
    heading: a * Math.PI * 2,
    phase: a * Math.PI * 2,
    progress: b,
    driftScale: 0.72 + b * 0.55,
    jitterX: hash(i, 3) * 2 - 1,
    jitterY: hash(i, 4) * 2 - 1,
    scale: 0.82 + a * 0.34,
    turn: i % 2 === 0 ? 1 : -1,
    speed: 0.7 + b * 0.65,
  }
})

function routePosition(f: Flight, t: number, w: number, h: number, mobile: boolean) {
  const spreadX = 1.26
  const spreadY = mobile ? 0.73 : 1.12
  const route = Math.hypot(w, h) * FLIGHT.routeLength
  const along = (((f.progress + (t * FLIGHT.speed * f.speed) / route) % 1) - 0.5) * route
  const wave = t * 0.5 * f.speed
  const wobble = Math.sin(wave + f.phase) * FLIGHT.wobble * f.driftScale
  const hx = Math.cos(f.heading)
  const hy = Math.sin(f.heading)

  return {
    x:
      w * 0.5 +
      f.x * w * spreadX +
      f.jitterX * FLIGHT.jitter +
      hx * along -
      hy * wobble +
      Math.cos(wave + f.phase) * FLIGHT.driftX * f.driftScale,
    y:
      h * (mobile ? 0.44 : 0.5) +
      f.y * h * spreadY +
      f.jitterY * FLIGHT.jitter +
      hy * along +
      hx * wobble +
      Math.sin(wave * 1.31 + f.phase) * FLIGHT.driftY * f.driftScale,
  }
}

export default function Planes() {
  const fieldRef = useRef<HTMLDivElement>(null)
  const planeRefs = useRef<(SVGSVGElement | null)[]>([])
  const shadowRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const field = fieldRef.current
    if (!field) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointer = { x: 0, y: 0, at: -Infinity }
    const planes = FLIGHTS.map(f => ({
      x: NaN,
      y: NaN,
      tx: Math.cos(f.heading),
      ty: Math.sin(f.heading),
      bank: 0,
    }))

    const onPointerMove = (e: PointerEvent) => {
      const rect = field.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.at = performance.now()
    }

    const start = performance.now()
    let last = start
    let frame = 0

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      const t = reduceMotion ? 0 : (now - start) / 1000
      const w = field.clientWidth
      const h = field.clientHeight
      const mobile = w < 768
      const size = mobile ? MOBILE_SCALE : 1
      // Cursor turbulence fades out once the pointer stops moving.
      const turbulence = reduceMotion ? 0 : clamp(1 - (now - pointer.at) / CURSOR.fadeMs, 0, 1)
      const follow = reduceMotion ? 1 : 1 - Math.exp(-9.2 * dt)
      const steer = reduceMotion ? 1 : 1 - Math.exp(-9 * dt)
      const settle = reduceMotion ? 1 : 1 - Math.exp(-7 * dt)

      FLIGHTS.forEach((f, i) => {
        let { x, y } = routePosition(f, t, w, h, mobile)

        if (turbulence > 0) {
          const dx = x - pointer.x
          const dy = y - pointer.y
          const d = Math.max(Math.hypot(dx, dy), 1)
          if (d < CURSOR.radius) {
            const k = (1 - d / CURSOR.radius) ** 2 * turbulence
            const push = CURSOR.push * k * f.driftScale
            const swirl = CURSOR.swirl * k * f.turn
            x += (dx / d) * push - (dy / d) * swirl
            y += (dy / d) * push + (dx / d) * swirl
          }
        }

        const p = planes[i]
        // Jump instead of gliding when a plane wraps to the far end of its route.
        if (Number.isNaN(p.x) || Math.hypot(x - p.x, y - p.y) > Math.max(w, h) * 1.35) {
          p.x = x
          p.y = y
        }
        const px = p.x
        const py = p.y
        p.x += (x - p.x) * follow
        p.y += (y - p.y) * follow

        let targetBank = 0
        const vx = p.x - px
        const vy = p.y - py
        const v = Math.hypot(vx, vy)
        if (v > 1e-3) {
          const ptx = p.tx
          const pty = p.ty
          p.tx += (vx / v - p.tx) * steer
          p.ty += (vy / v - p.ty) * steer
          const n = Math.hypot(p.tx, p.ty) || 1
          p.tx /= n
          p.ty /= n
          targetBank = clamp((ptx * p.ty - pty * p.tx) * 10, -MAX_BANK, MAX_BANK)
        }
        p.bank += (targetBank - p.bank) * settle

        const angle = Math.atan2(p.ty, p.tx)
        const scale = f.scale * size
        const plane = planeRefs.current[i]
        const shadow = shadowRefs.current[i]
        // Banking foreshortens the wings, which run along the plane's local y axis.
        if (plane) {
          plane.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%) rotate(${angle}rad) scale(${scale}, ${scale * Math.cos(p.bank)})`
        }
        if (shadow) {
          shadow.style.transform = `translate3d(${p.x + 6 * scale}px, ${p.y + 20 * scale}px, 0) translate(-50%, -50%) rotate(${angle}rad) scale(${scale})`
        }
      })

      if (!reduceMotion) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    if (!reduceMotion) window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  return (
    <div
      ref={fieldRef}
      aria-hidden
      className="fade-in-delayed pointer-events-none absolute inset-0"
    >
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="plane-wing" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#d2d2d2" />
            <stop offset="1" stopColor="#e9e9e9" />
          </linearGradient>
          <linearGradient id="plane-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#c9c9c9" />
            <stop offset="0.5" stopColor="#e6e6e6" />
            <stop offset="1" stopColor="#c6c6c6" />
          </linearGradient>
          {/* Top view of a light aircraft, nose pointing along +x. */}
          <symbol id="plane" viewBox="-20 -20 40 40">
            <path
              d="M15 0c0-1.9-1.6-3.1-3.6-3.1L-13.5-1.3C-15.4-1.2-16.5-.7-16.5 0s1.1 1.2 3 1.3L11.4 3.1C13.4 3.1 15 1.9 15 0Z"
              fill="url(#plane-body)"
            />
            <rect x="-16" y="-6.5" width="3.4" height="13" rx="1" fill="url(#plane-wing)" />
            <rect x="0" y="-19" width="5" height="38" rx="1.4" fill="url(#plane-wing)" />
            <rect x="-17" y="-0.7" width="6.5" height="1.4" rx="0.7" fill="#c9c9c9" />
            <ellipse cx="8.4" cy="0" rx="2" ry="1.9" fill="#c6c6c6" />
            <rect x="15.2" y="-4.5" width="0.9" height="9" rx="0.45" fill="#c4c4c4" opacity="0.7" />
          </symbol>
        </defs>
      </svg>

      {FLIGHTS.map((_, i) => (
        <div key={i}>
          <div
            ref={el => {
              shadowRefs.current[i] = el
            }}
            className="absolute left-0 top-0 w-[26px] h-[16px] rounded-full bg-[radial-gradient(closest-side,rgba(0,0,0,0.11),transparent)] blur-[1.5px] will-change-transform"
          />
          <svg
            ref={el => {
              planeRefs.current[i] = el
            }}
            width={PLANE_SIZE}
            height={PLANE_SIZE}
            className="absolute left-0 top-0 will-change-transform"
          >
            <use href="#plane" />
          </svg>
        </div>
      ))}
    </div>
  )
}
