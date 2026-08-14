"use client"

/**
 * Campo de estrelas + constelações com parallax reativo ao mouse.
 * Movimentos bruscos geram impulso; a inércia amortece de volta (spring/lerp).
 * Respeita prefers-reduced-motion.
 */

import { useEffect, useRef } from "react"

type Star = { x: number; y: number; r: number; tw: number; phase: number }
type ConstellationPoint = {
  x: number
  y: number
  /** estrelas mais brilhantes (ex.: Três Marias) */
  bright?: boolean
  size?: number
}
type Constellation = {
  /** pontos em coords normalizadas 0–1 */
  points: ConstellationPoint[]
  edges: [number, number][]
  /** polilinhas suaves (ex.: arco) — índices de pontos em sequência */
  curves?: number[][]
  depth: number
}

function mulberry32(seed: number) {
  // LCG simples (só para layout visual de estrelas)
  let state = seed >>> 0
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0
    return state / 4294967296
  }
}

/** Coloca pontos locais (unidades ~ombros=±1) em coords normalizadas 0–1. */
function place(
  cx: number,
  cy: number,
  scale: number,
  locals: { lx: number; ly: number; bright?: boolean; size?: number }[],
  aspectX = 0.82,
): ConstellationPoint[] {
  const sx = scale * aspectX
  const sy = scale
  return locals.map(({ lx, ly, bright, size }) => ({
    x: cx + lx * sx,
    y: cy + ly * sy,
    bright,
    size,
  }))
}

/** Só o cinturão de Órion — Três Marias (Mintaka, Alnilam, Alnitak). */
function tresMariasBelt(): Constellation {
  // direita inferior
  const cx = 0.78
  const cy = 0.72
  const scale = 0.1

  return {
    depth: 0.8,
    points: place(cx, cy, scale, [
      { lx: -0.7, ly: -0.25, size: 1.8 }, // Mintaka
      { lx: 0.0, ly: 0.0, size: 1.8 }, // Alnilam
      { lx: 0.7, ly: 0.25, size: 1.8 }, // Alnitak
    ]),
    edges: [
      [0, 1],
      [1, 2],
    ],
  }
}

const CONSTELLATIONS: Constellation[] = [
  {
    // Cassiopeia (W) — canto superior esquerdo
    depth: 0.5,
    points: [
      { x: 0.1, y: 0.18 },
      { x: 0.16, y: 0.12 },
      { x: 0.22, y: 0.19 },
      { x: 0.28, y: 0.11 },
      { x: 0.34, y: 0.17 },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ],
  },
  {
    // pequena figura (kite) — ~+4cm direita, ~+2cm baixo
    depth: 0.4,
    points: [
      { x: 0.71, y: 0.2 },
      { x: 0.76, y: 0.26 },
      { x: 0.82, y: 0.22 },
      { x: 0.77, y: 0.32 },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [1, 3],
    ],
  },
  {
    // Cruzeiro do Sul — canto inferior esquerdo
    depth: 0.65,
    points: [
      { x: 0.14, y: 0.64 },
      { x: 0.18, y: 0.74 },
      { x: 0.22, y: 0.66 },
      { x: 0.16, y: 0.8 },
      { x: 0.24, y: 0.78 },
    ],
    edges: [
      [0, 1],
      [1, 3],
      [2, 1],
      [1, 4],
    ],
  },
  tresMariasBelt(),
]

function buildField(count: number, seed: number): Star[] {
  const rnd = mulberry32(seed)
  const stars: Star[] = []
  for (let i = 0; i < count; i++) {
    stars.push({
      x: rnd(),
      y: rnd(),
      r: 0.4 + rnd() * 1.4,
      tw: 0.4 + rnd() * 0.6,
      phase: rnd() * Math.PI * 2,
    })
  }
  return stars
}

function starColor(isLight: boolean, alpha: number) {
  if (isLight) return `rgba(91, 65, 232, ${alpha * 0.55})`
  return `rgba(245, 243, 255, ${alpha})`
}

function lineColor(isLight: boolean, alpha: number) {
  if (isLight) return `rgba(91, 65, 232, ${alpha * 0.35})`
  return `rgba(196, 181, 253, ${alpha})`
}

export default function Constellations() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let isLight =
      document.documentElement.getAttribute("data-theme") === "light" ||
      (!document.documentElement.getAttribute("data-theme") &&
        window.matchMedia("(prefers-color-scheme: light)").matches)

    let w = 0
    let h = 0
    let dpr = 1
    let stars = buildField(90, 42)
    let raf = 0

    // parallax: follow suave + impulso separado (ambos com decay exponencial)
    let followX = 0
    let followY = 0
    let impulseX = 0
    let impulseY = 0
    let targetX = 0
    let targetY = 0
    let lastMx = 0
    let lastMy = 0
    let lastMoveT = performance.now()
    let lastFrameT = performance.now()
    let hasMouse = false

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = w < 700 ? 55 : 110
      stars = buildField(count, 42)
    }

    const syncTheme = () => {
      const attr = document.documentElement.getAttribute("data-theme")
      if (attr === "light") isLight = true
      else if (attr === "dark") isLight = false
      else isLight = window.matchMedia("(prefers-color-scheme: light)").matches
    }

    /** lerp exponencial estável em qualquer FPS */
    const easeToward = (current: number, target: number, dt: number, speed: number) =>
      current + (target - current) * (1 - Math.exp(-speed * dt))

    const onMove = (e: PointerEvent) => {
      if (reduced) return
      const now = performance.now()
      const dtMs = Math.max(8, Math.min(40, now - lastMoveT))
      const nx = (e.clientX / w) * 2 - 1
      const ny = (e.clientY / h) * 2 - 1
      targetX = nx * 22
      targetY = ny * 14

      if (hasMouse) {
        const dx = e.clientX - lastMx
        const dy = e.clientY - lastMy
        const speed = Math.hypot(dx, dy) / dtMs
        // só impulsos bem bruscos, bem suaves
        if (speed > 1.1) {
          const boost = Math.min(1.1, (speed - 1.1) * 0.9)
          impulseX += dx * 0.045 * boost
          impulseY += dy * 0.045 * boost
          const iMax = 28
          impulseX = Math.max(-iMax, Math.min(iMax, impulseX))
          impulseY = Math.max(-iMax, Math.min(iMax, impulseY))
        }
      }
      hasMouse = true
      lastMx = e.clientX
      lastMy = e.clientY
      lastMoveT = now
    }

    const draw = (t: number) => {
      const now = performance.now()
      const dt = Math.min(0.05, (now - lastFrameT) / 1000)
      lastFrameT = now

      ctx.clearRect(0, 0, w, h)

      let ox = 0
      let oy = 0
      if (!reduced) {
        // follow bem butter (lento) + impulso que escorre
        followX = easeToward(followX, targetX, dt, 2.4)
        followY = easeToward(followY, targetY, dt, 2.4)
        impulseX *= Math.exp(-2.8 * dt)
        impulseY *= Math.exp(-2.8 * dt)
        ox = followX + impulseX
        oy = followY + impulseY
      }

      // field stars
      for (const s of stars) {
        const depth = 0.35 + (s.r / 2) * 0.5
        const px = s.x * w + ox * depth
        const py = s.y * h + oy * depth
        const twinkle = reduced
          ? 0.55
          : 0.45 + 0.4 * (0.5 + 0.5 * Math.sin(t * 0.0007 * s.tw + s.phase))
        ctx.beginPath()
        ctx.fillStyle = starColor(isLight, twinkle * (0.35 + s.r * 0.25))
        ctx.arc(px, py, s.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // constellations
      for (const c of CONSTELLATIONS) {
        const pts = c.points.map((p) => ({
          x: p.x * w + ox * c.depth,
          y: p.y * h + oy * c.depth,
          bright: p.bright,
          size: p.size ?? 1.8,
        }))

        ctx.lineCap = "round"
        ctx.lineJoin = "round"
        ctx.lineWidth = 1
        ctx.strokeStyle = lineColor(isLight, isLight ? 0.45 : 0.28)
        ctx.beginPath()
        for (const [a, b] of c.edges) {
          ctx.moveTo(pts[a].x, pts[a].y)
          ctx.lineTo(pts[b].x, pts[b].y)
        }
        ctx.stroke()

        // curvas suaves (arco do caçador)
        for (const curve of c.curves ?? []) {
          if (curve.length < 2) continue
          ctx.beginPath()
          ctx.moveTo(pts[curve[0]].x, pts[curve[0]].y)
          for (let i = 1; i < curve.length - 1; i++) {
            const curr = pts[curve[i]]
            const next = pts[curve[i + 1]]
            const mx = (curr.x + next.x) / 2
            const my = (curr.y + next.y) / 2
            ctx.quadraticCurveTo(curr.x, curr.y, mx, my)
          }
          const last = pts[curve[curve.length - 1]]
          ctx.lineTo(last.x, last.y)
          ctx.stroke()
        }

        // cinturão das Três Marias um pouco mais visível
        if (c.points.some((p) => p.bright)) {
          ctx.lineWidth = 1.5
          ctx.strokeStyle = lineColor(isLight, isLight ? 0.75 : 0.55)
          ctx.beginPath()
          for (const [a, b] of c.edges) {
            if (c.points[a].bright && c.points[b].bright) {
              ctx.moveTo(pts[a].x, pts[a].y)
              ctx.lineTo(pts[b].x, pts[b].y)
            }
          }
          ctx.stroke()
        }

        for (let i = 0; i < pts.length; i++) {
          const p = pts[i]
          const pulse = reduced
            ? 0.85
            : 0.72 + 0.22 * (0.5 + 0.5 * Math.sin(t * 0.0006 + i))
          const alpha = p.bright ? Math.min(1, pulse + 0.15) : pulse
          const glow = p.bright ? 8 : 5.5
          // glow atrás, estrela na frente (cobre a ponta da linha)
          ctx.beginPath()
          ctx.fillStyle = starColor(isLight, alpha * (p.bright ? 0.32 : 0.2))
          ctx.arc(p.x, p.y, glow, 0, Math.PI * 2)
          ctx.fill()
          ctx.beginPath()
          ctx.fillStyle = starColor(isLight, alpha)
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    syncTheme()
    window.addEventListener("resize", resize)
    window.addEventListener("pointermove", onMove, { passive: true })

    const themeObs = new MutationObserver(syncTheme)
    themeObs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    })
    const lightMq = window.matchMedia("(prefers-color-scheme: light)")
    const onScheme = () => syncTheme()
    lightMq.addEventListener("change", onScheme)

    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", onMove)
      themeObs.disconnect()
      lightMq.removeEventListener("change", onScheme)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="constellations"
      aria-hidden="true"
    />
  )
}
