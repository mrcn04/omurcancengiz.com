'use client'

import { useEffect, useRef, useState } from 'react'

const LETTER = 'Ö'
const SURFACE = 9000
const CORE = 5800
const SHELL = 2200
const CLOUD = 3500

const ENTER_S = 1.4 // fade and grow in
const REVEAL_S = 2.5 // the letter turns from edge-on to face-on
const SPIN = 0.06 // rad/s
const TILT = 0.12
const PUFF_GAP = 0.22 // seconds between puffs while hovering
const BRIGHTNESS = 2.47

// Aqua on black: deep aqua in shadow, bright aqua where lit, a lighter aqua for
// ripples. Alpha may run past 1 so the dots bloom against the dark.
const FAINT = [0.02, 0.3, 0.36]
const STRONG = [0.62, 0.95, 1.0]
const RIPPLE = [0.35, 0.85, 0.95]
const DOT = 0.45
const SHADOW = 0.92
const MAX_ALPHA = 4

// Where the sphere sits in the canvas, in CSS pixels: to the right of the copy on desktop,
// above it on mobile.
function placeSphere(width: number, height: number) {
  return width < 768
    ? { x: width * 0.5, y: height * 0.35, radius: Math.min(width * 0.4, height * 0.22) }
    : { x: width * 0.72, y: height * 0.52, radius: Math.min(width * 0.2, height * 0.31) }
}

const VERTEX = `
precision highp float;
attribute vec3 aPos;
attribute float aKind;
attribute float aSeed;
uniform vec2 uViewport;
uniform vec3 uSphere;
uniform vec2 uRotation;
uniform float uTime;
uniform vec2 uEnter;
uniform vec3 uMouse;
uniform vec2 uImpacts[4];
uniform vec3 uHits[4];
uniform float uMode;
uniform vec4 uBurst;
uniform vec3 uBurstDir;
uniform vec2 uBurstRotation;
uniform float uDpr;
uniform vec3 uFaint;
uniform vec3 uStrong;
uniform vec3 uRipple;
uniform float uDot;
uniform float uShadow;
uniform float uMaxAlpha;
varying vec3 vColor;
varying float vAlpha;
varying float vBlur;

vec3 turn(vec3 p, vec2 r) {
  float c = cos(r.x), s = sin(r.x);
  p.xz = mat2(c, -s, s, c) * p.xz;
  c = cos(r.y); s = sin(r.y);
  p.yz = mat2(c, -s, s, c) * p.yz;
  return p;
}

vec4 place(vec2 p) {
  vec2 pixel = uSphere.xy + p * vec2(uSphere.z, -uSphere.z);
  return vec4(pixel / uViewport * vec2(2.0, -2.0) + vec2(-1.0, 1.0), 0.0, 1.0);
}

void main() {
  vec3 rest = normalize(aPos);
  float strand = 0.5 + 0.5 * sin(aSeed * 51.0);
  vBlur = 0.0;

  // A puff launches from the orientation the sphere had at that moment, so it drifts free
  // rather than spinning along.
  bool puff = uMode > 0.5;
  vec3 surface = turn(aPos, puff ? uBurstRotation : uRotation);
  vec3 p = surface;

  // Lit from the upper left, with a bright rim and a shadow towards the lower right.
  float lighting = clamp(0.52 - surface.x * 0.48 + surface.y * 0.32, 0.08, 1.0);
  float edge = pow(max(1.0 - abs(surface.z), 0.0), 3.0);
  float front = smoothstep(-0.1, 0.65, surface.z);
  float shadow = smoothstep(-0.25, 0.65, surface.x) * smoothstep(-0.25, 0.65, -surface.y);
  vColor = mix(uFaint, uStrong, lighting);

  if (puff) {
    float flight = max(0.0, uTime - uBurst.x);
    float seed = fract(sin(aSeed * 713.0 + uBurst.y * 97.0) * 43758.5453);
    float dist = acos(clamp(dot(rest, uBurstDir), -1.0, 1.0));
    float power = uBurst.w;
    vec3 tangent = normalize(cross(surface, vec3(0.3, 1.0, 0.2)));
    p = surface * (1.0 + flight * (0.12 + seed * 0.38) * mix(0.3, 1.0, power))
      + tangent * flight * sin(seed * 91.0) * 0.22;
    p.y += (1.0 - power) * flight * 0.10 - power * flight * flight * 0.025;
    float alpha = exp(-dist * dist / 0.16) * (1.0 - exp(-flight * 30.0))
      * (1.0 - smoothstep(1.2, uBurst.z, flight))
      * power * step(mix(0.97, 0.86, power), seed) * (0.35 + seed * 0.5);
    vAlpha = min(alpha * (1.0 - shadow * uShadow) * BRIGHTNESS, uMaxAlpha);
    gl_Position = place(p.xy);
    gl_PointSize = (1.2 + seed * 1.6) * uDpr * uDot;
    return;
  }

  // Click ripples: rings travelling across the sphere from the hit, measured on the resting
  // sphere so they stay attached while it turns.
  float shock = 0.0;
  float blush = 0.0;
  for (int i = 0; i < 4; i++) {
    float age = max(0.0, uTime - uImpacts[i].x);
    float phase = acos(clamp(dot(rest, uHits[i]), -1.0, 1.0)) - age * 1.9;
    float envelope = (1.0 - exp(-age * 45.0)) * exp(-age * 1.15) * uImpacts[i].y;
    float band = exp(-phase * phase / 0.055);
    shock += cos(phase * 15.0) * band * envelope;
    blush += band * envelope;
  }
  shock = clamp(shock, -1.0, 1.0);
  blush = 1.0 - exp(-blush);

  // The cursor presses a soft dent into the front.
  vec2 toMouse = surface.xy - uMouse.xy;
  float hover = exp(-dot(toMouse, toMouse) / 0.1065) * uMouse.z * smoothstep(-0.1, 0.4, surface.z);
  float noise = sin(surface.x * 19.0 + surface.z * 13.0 + uTime * 1.2)
    * sin(surface.y * 17.0 - surface.z * 11.0 + uTime * 0.9);
  noise = noise * 0.65 + sin(aSeed * 73.0 + uTime * 1.5) * 0.35;
  float radius = 1.0 + sin(surface.x * 11.0 + surface.y * 7.0 + uTime * 0.7) * 0.006
    + noise * 0.01 + shock * 0.13 - hover * 0.09;

  float alpha;
  float size;
  float entrance = uEnter.x;
  if (aKind < 1.5) {
    // The surface, and the letter running through it, share one look.
    p *= radius;
    float dust = 0.0;
    if (aKind < 0.5) {
      // A soft patch of dust drifts around the silhouette about once a minute.
      float angle = 0.6 + uTime * 0.105;
      vec2 drift = vec2(cos(angle), sin(angle));
      float zone = smoothstep(0.55, 0.95, dot(surface.xy, drift))
        * (1.0 - smoothstep(0.2, 0.7, abs(surface.z)));
      dust = smoothstep(0.62, 1.0, aSeed) * zone;
      p += normalize(surface) * dust * (0.10 + 0.15 * sin(aSeed * 40.0 + uTime * 0.4));
      p.xy += vec2(-drift.y, drift.x) * dust * sin(aSeed * 65.0) * 0.18;
    }
    float mottling = 0.65 + 0.35 * sin(surface.x * 9.0 + surface.z * 4.0)
      * cos(surface.y * 8.0 - surface.z * 5.0);
    alpha = (0.035 + edge * (0.95 + lighting * lighting * 0.55) + front * (0.16 + mottling * 0.25))
      * mix(lighting, 0.62 + lighting * 0.38, front * 0.65);
    alpha *= mix(0.45, 1.0, strand) * 1.65 + dust * 0.11;
    size = (1.3 + front * (0.2 + aSeed * 0.4) + edge * (1.5 + strand * 2.5)) * (1.0 - dust * 0.45);
  } else if (aKind < 2.5) {
    // A sparse outer shell, softly out of focus where it passes in front.
    p *= radius * 1.3;
    entrance = uEnter.y;
    alpha = (0.18 + max(surface.z, 0.0) * 0.55 + edge * 0.16) * lighting * 0.7;
    vBlur = 5.0 * smoothstep(0.55, 1.3, p.z);
    float core = 1.5 + strand * 1.5;
    size = core + vBlur;
    alpha *= pow(core / size, 1.2);
    vColor = mix(vColor, vec3(1.0, 0.97, 0.91), 0.16);
  } else {
    // Fine particles lifting off the hovered patch.
    p *= radius + 0.015 + aSeed * 0.05;
    p.xy += vec2(sin(aSeed * 93.0), cos(aSeed * 71.0)) * 0.018;
    alpha = hover * hover * (0.3 + aSeed * 0.5);
    size = 1.2 + aSeed * 1.4;
  }

  p *= mix(0.78, 1.0, entrance);
  vec2 toGlow = p.xy - uMouse.xy;
  float glow = exp(-dot(toGlow, toGlow) / 0.147) * uMouse.z;
  vColor = mix(vColor, uRipple, blush * 0.45);
  vColor = mix(vColor, uStrong, glow * 0.12);
  alpha *= entrance * (1.0 + blush * 0.6) * (1.0 + glow * front * 0.9) * (1.0 - shadow * uShadow);

  gl_Position = place(p.xy);
  gl_PointSize = size * uDpr * uDot;
  // Past 1 the premultiplied colour brightens: a glow on black, a wash-out on white.
  vAlpha = min(alpha * BRIGHTNESS, uMaxAlpha);
}
`.replaceAll('BRIGHTNESS', BRIGHTNESS.toFixed(3))

const FRAGMENT = `
precision highp float;
varying vec3 vColor;
varying float vAlpha;
varying float vBlur;

void main() {
  float d = length(gl_PointCoord - 0.5);
  float crisp = 1.0 - smoothstep(0.25, 0.5, d);
  float soft = exp(-d * d * 18.0) * (1.0 - smoothstep(0.35, 0.5, d));
  float a = vAlpha * mix(crisp, soft, min(vBlur / 3.0, 1.0));
  gl_FragColor = vec4(vColor * a, a);
}
`

const easeOut = (v: number) => 1 - (1 - Math.min(1, Math.max(0, v))) ** 3

// Undo the shader's turn() (yaw about y, then pitch about x).
function unturn([x, y, z]: number[], yaw: number, pitch: number) {
  const y1 = Math.cos(pitch) * y - Math.sin(pitch) * z
  const z1 = Math.sin(pitch) * y + Math.cos(pitch) * z
  return [Math.cos(yaw) * x - Math.sin(yaw) * z1, y1, Math.sin(yaw) * x + Math.cos(yaw) * z1]
}

// Points across a glyph, running the full depth of the sphere behind it: face-on it reads
// as the letter, edge-on it smears into a band.
function sampleLetter(letter: string, fontFamily: string) {
  const size = 256
  const ctx = document.createElement('canvas').getContext('2d', { willReadFrequently: true })!
  ctx.canvas.width = ctx.canvas.height = size
  ctx.font = `800 ${size * 0.8}px ${fontFamily}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(letter, size / 2, size / 2)
  const data = ctx.getImageData(0, 0, size, size).data
  const filled = (x: number, y: number) => data[(y * size + x) * 4 + 3] > 127

  let minX = size
  let maxX = 0
  let minY = size
  let maxY = 0
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (!filled(x, y)) continue
      minX = Math.min(minX, x)
      maxX = Math.max(maxX, x)
      minY = Math.min(minY, y)
      maxY = Math.max(maxY, y)
    }
  }
  const unit = 0.94 / Math.max(1, maxX - minX, maxY - minY)
  const cx = (minX + maxX) / 2
  const cy = (minY + maxY) / 2
  const tilt = (10 * Math.PI) / 180

  const points: number[] = []
  for (let i = 0; points.length < CORE * 3 && i < CORE * 60; i++) {
    const sx = Math.random() * size
    const sy = Math.random() * size
    if (!filled(Math.floor(sx), Math.floor(sy))) continue
    const x = (sx - cx) * unit
    const y = (cy - sy) * unit
    const z = (Math.random() * 2 - 1) * Math.sqrt(Math.max(0, 0.92 - x * x - y * y))
    points.push(x, Math.cos(tilt) * y - Math.sin(tilt) * z, Math.sin(tilt) * y + Math.cos(tilt) * z)
  }
  return points
}

function fibonacciSphere(count: number, jitter = 0) {
  const points: number[] = []
  for (let i = 0; i < count; i++) {
    const y = 1 - ((i + 0.5) / count) * 2 + (Math.random() - 0.5) * jitter
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = i * Math.PI * (3 - Math.sqrt(5)) + (Math.random() - 0.5) * jitter * 4
    points.push(Math.cos(theta) * r, y, Math.sin(theta) * r)
  }
  return points
}

function buildParticles(letter: string, fontFamily: string) {
  const surface = fibonacciSphere(SURFACE)
  const core = sampleLetter(letter, fontFamily)
  const shell = fibonacciSphere(SHELL, 0.02)
  const cloud: number[] = []
  for (let i = 0; i < CLOUD; i++) {
    const j = Math.floor(Math.random() * SURFACE) * 3
    cloud.push(surface[j], surface[j + 1], surface[j + 2])
  }

  const groups = [surface, core, shell, cloud]
  const total = groups.reduce((n, g) => n + g.length / 3, 0)
  const position = new Float32Array(total * 3)
  const kind = new Float32Array(total)
  const seed = new Float32Array(total)
  let offset = 0
  groups.forEach((group, k) => {
    position.set(group, offset * 3)
    for (let i = 0; i < group.length / 3; i++) {
      kind[offset + i] = k
      seed[offset + i] = Math.random()
    }
    offset += group.length / 3
  })
  return { position, kind, seed, total }
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    throw new Error(gl.getShaderInfoLog(shader) ?? '')
  return shader
}

interface Burst {
  time: number
  seed: number
  life: number
  power: number
  direction: number[]
  rotation: [number, number]
}

// A sphere of particles with a letter running through it, after motion.dev's hero. It fades
// in while the letter turns to face you, dents and sheds particles under the cursor, ripples
// when clicked, and spins when dragged. Fills its parent; the sphere places itself inside.
export default function ParticleGlobe({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: true })
    if (!gl) {
      setFailed(true)
      return
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let disposed = false
    let visible = true
    let frame = 0
    let staticResizer: ResizeObserver | null = null

    // Time only runs while the globe is on screen, so the intro is never missed.
    let time = 0
    let sphere = placeSphere(canvas.clientWidth, canvas.clientHeight)
    const pointer = { x: 0, y: 0, over: false, hover: 0 }
    const drag = { active: false, moved: false, startX: 0, startY: 0, lastX: 0, lastY: 0, lastT: 0 }
    const spin = { yaw: 0, pitch: 0, vyaw: 0, vpitch: 0 }
    let rotation: [number, number] = [-Math.PI / 2, TILT]
    let lastPuff = 0
    let impactSlot = 0
    const impacts = new Float32Array(8).map((_, i) => (i % 2 === 0 ? -100 : 0))
    const hits = new Float32Array(12)
    const bursts: Burst[] = []

    const onSphere = () => Math.hypot(pointer.x, pointer.y) < 1.03

    // Where the cursor meets the front of the sphere, in its resting orientation.
    const hitDirection = () => {
      let { x, y } = pointer
      const r = Math.hypot(x, y)
      if (r > 1) {
        x /= r
        y /= r
      }
      return unturn([x, y, Math.sqrt(Math.max(0, 1 - x * x - y * y))], rotation[0], rotation[1])
    }

    const puff = (power: number) => {
      bursts.push({
        time,
        seed: Math.random(),
        life: power > 0.5 ? 3 + Math.random() : 2,
        power,
        direction: hitDirection(),
        rotation: [...rotation],
      })
    }

    const ripple = () => {
      hits.set(hitDirection(), impactSlot * 3)
      impacts.set([time, 1], impactSlot * 2)
      impactSlot = (impactSlot + 1) % 4
      puff(1)
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = (e.clientX - rect.left - sphere.x) / sphere.radius
      pointer.y = -(e.clientY - rect.top - sphere.y) / sphere.radius
      pointer.over = true
      canvas.style.cursor = drag.active ? 'grabbing' : onSphere() ? 'grab' : ''
      if (!drag.active) return
      if (Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY) > 6) drag.moved = true
      const dx = e.clientX - drag.lastX
      const dy = e.clientY - drag.lastY
      const dt = Math.max(0.008, (e.timeStamp - drag.lastT) / 1000)
      spin.yaw += dx * 0.003
      spin.pitch -= dy * 0.003
      const blend = 1 - Math.exp(-dt / 0.04)
      spin.vyaw += (Math.max(-3, Math.min(3, (dx * 0.003) / dt)) - spin.vyaw) * blend
      spin.vpitch += (Math.max(-3, Math.min(3, (-dy * 0.003) / dt)) - spin.vpitch) * blend
      drag.lastX = e.clientX
      drag.lastY = e.clientY
      drag.lastT = e.timeStamp
    }
    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return
      onPointerMove(e)
      if (!onSphere()) return
      Object.assign(drag, {
        // Touch keeps scrolling the page; only a mouse drags the sphere around.
        active: e.pointerType === 'mouse',
        moved: false,
        startX: e.clientX,
        startY: e.clientY,
        lastX: e.clientX,
        lastY: e.clientY,
        lastT: e.timeStamp,
      })
      spin.vyaw = spin.vpitch = 0
      if (drag.active) canvas.setPointerCapture(e.pointerId)
    }
    const onPointerUp = (e: PointerEvent) => {
      const tapped = Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY) <= 6
      if (!drag.moved && tapped && onSphere()) ripple()
      drag.active = false
      if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId)
    }
    const onPointerLeave = () => {
      if (!drag.active) pointer.over = false
    }

    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    visibility.observe(canvas)

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(canvas.clientWidth * dpr)
      canvas.height = Math.round(canvas.clientHeight * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
      sphere = placeSphere(canvas.clientWidth, canvas.clientHeight)
    }
    const resizer = new ResizeObserver(resize)
    resizer.observe(canvas)

    // Wait for the site font so the letter is sampled in the right typeface.
    document.fonts.ready.then(() => {
      if (disposed) return
      let program: WebGLProgram
      try {
        program = gl.createProgram()!
        gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX))
        gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT))
        gl.linkProgram(program)
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('link failed')
      } catch {
        setFailed(true)
        return
      }
      gl.useProgram(program)

      const particles = buildParticles(LETTER, getComputedStyle(document.body).fontFamily)
      const attribute = (name: string, data: Float32Array, size: number) => {
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
        const location = gl.getAttribLocation(program, name)
        gl.enableVertexAttribArray(location)
        gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0)
      }
      attribute('aPos', particles.position, 3)
      attribute('aKind', particles.kind, 1)
      attribute('aSeed', particles.seed, 1)

      const locations = new Map<string, WebGLUniformLocation | null>()
      const u = (name: string) => {
        if (!locations.has(name)) locations.set(name, gl.getUniformLocation(program, name))
        return locations.get(name)!
      }
      gl.uniform3fv(u('uFaint'), FAINT)
      gl.uniform3fv(u('uStrong'), STRONG)
      gl.uniform3fv(u('uRipple'), RIPPLE)
      gl.uniform1f(u('uDot'), DOT)
      gl.uniform1f(u('uShadow'), SHADOW)
      gl.uniform1f(u('uMaxAlpha'), MAX_ALPHA)
      gl.enable(gl.BLEND)
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
      resize()

      let last = performance.now()
      const render = (now: number) => {
        const dt = Math.min((now - last) / 1000, 0.05)
        last = now
        if (!reduceMotion) time += dt

        if (!drag.active) {
          spin.yaw += spin.vyaw * dt
          spin.pitch += spin.vpitch * dt
          spin.vyaw *= Math.exp(-dt / 1.6)
          spin.vpitch *= Math.exp(-dt / 1.6)
        }
        spin.pitch = Math.max(-1.2, Math.min(1.2, spin.pitch))
        // The reveal sweep, then a slow constant spin, plus whatever the drag added.
        rotation = reduceMotion
          ? [0, TILT]
          : [
              -Math.PI / 2 + (Math.PI / 2) * easeOut(time / REVEAL_S) + SPIN * time + spin.yaw,
              TILT + spin.pitch,
            ]

        const hoverTarget = pointer.over && !reduceMotion ? 1 : 0
        pointer.hover += (hoverTarget - pointer.hover) * (1 - Math.exp(-dt / 0.1))
        const ready = time > ENTER_S && time - lastPuff > PUFF_GAP
        if (pointer.hover > 0.5 && onSphere() && !drag.active && ready) {
          puff(0.45)
          lastPuff = time
        }

        gl.clearColor(0, 0, 0, 0)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.uniform2f(u('uViewport'), canvas.clientWidth, canvas.clientHeight)
        gl.uniform3f(u('uSphere'), sphere.x, sphere.y, sphere.radius)
        gl.uniform1f(u('uDpr'), Math.min(window.devicePixelRatio || 1, 2))
        gl.uniform1f(u('uTime'), time)
        gl.uniform2f(
          u('uEnter'),
          reduceMotion ? 1 : easeOut(time / ENTER_S),
          reduceMotion ? 1 : easeOut((time - 0.16) / ENTER_S),
        )
        gl.uniform2f(u('uRotation'), rotation[0], rotation[1])
        gl.uniform3f(u('uMouse'), pointer.x, pointer.y, pointer.hover)
        gl.uniform2fv(u('uImpacts[0]'), impacts)
        gl.uniform3fv(u('uHits[0]'), hits)
        gl.uniform1f(u('uMode'), 0)
        gl.drawArrays(gl.POINTS, 0, particles.total)

        // Each live puff redraws the surface points it launched.
        gl.uniform1f(u('uMode'), 1)
        for (let i = bursts.length - 1; i >= 0; i--) {
          const b = bursts[i]
          if (time - b.time >= b.life) {
            bursts.splice(i, 1)
            continue
          }
          gl.uniform4f(u('uBurst'), b.time, b.seed, b.life, b.power)
          gl.uniform3fv(u('uBurstDir'), b.direction)
          gl.uniform2f(u('uBurstRotation'), b.rotation[0], b.rotation[1])
          gl.drawArrays(gl.POINTS, 0, SURFACE)
        }
      }

      const loop = (now: number) => {
        if (disposed) return
        if (visible && !document.hidden) render(now)
        else last = now
        frame = requestAnimationFrame(loop)
      }
      if (reduceMotion) {
        render(performance.now())
        staticResizer = new ResizeObserver(() => render(performance.now()))
        staticResizer.observe(canvas)
      } else {
        frame = requestAnimationFrame(loop)
      }
    })

    if (!reduceMotion) {
      canvas.addEventListener('pointermove', onPointerMove)
      canvas.addEventListener('pointerdown', onPointerDown)
      canvas.addEventListener('pointerup', onPointerUp)
      canvas.addEventListener('pointercancel', onPointerUp)
      canvas.addEventListener('pointerleave', onPointerLeave)
    }
    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      visibility.disconnect()
      resizer.disconnect()
      staticResizer?.disconnect()
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointerup', onPointerUp)
      canvas.removeEventListener('pointercancel', onPointerUp)
      canvas.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  // Without WebGL the hero simply goes without the globe.
  if (failed) return null

  return (
    <canvas
      ref={canvasRef}
      aria-label={`A sphere of particles with the letter ${LETTER} inside`}
      role="img"
      className={`block select-none ${className}`}
    />
  )
}
