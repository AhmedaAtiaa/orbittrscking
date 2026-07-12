import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../utils/motion'

const BRAND = '255, 102, 0'
const ACCENT = '245, 158, 11'

// مسارات أقل — حركة أسطول واضحة بدون ازدحام
const ROUTES = [
  [ { x: -0.08, y: 0.28 }, { x: 0.3, y: 0.36 }, { x: 0.55, y: 0.24 }, { x: 1.08, y: 0.32 } ],
  [ { x: -0.08, y: 0.72 }, { x: 0.28, y: 0.62 }, { x: 0.6, y: 0.76 }, { x: 1.08, y: 0.68 } ],
  [ { x: 1.08, y: 0.18 }, { x: 0.7, y: 0.35 }, { x: 0.4, y: 0.55 }, { x: -0.08, y: 0.78 } ],
  [ { x: -0.08, y: 0.5 }, { x: 0.4, y: 0.48 }, { x: 0.75, y: 0.52 }, { x: 1.08, y: 0.46 } ],
]

function segmentLengths(route, w, h) {
  const pts = route.map((p) => ({ x: p.x * w, y: p.y * h }))
  const segs = []
  let total = 0
  for (let i = 0; i < pts.length - 1; i++) {
    const dx = pts[i + 1].x - pts[i].x
    const dy = pts[i + 1].y - pts[i].y
    const len = Math.hypot(dx, dy)
    segs.push(len)
    total += len
  }
  return { pts, segs, total }
}

function pointAt(pts, segs, total, progress) {
  let target = progress * total
  for (let i = 0; i < segs.length; i++) {
    if (target <= segs[i]) {
      const r = segs[i] === 0 ? 0 : target / segs[i]
      return {
        x: pts[i].x + (pts[i + 1].x - pts[i].x) * r,
        y: pts[i].y + (pts[i + 1].y - pts[i].y) * r,
        angle: Math.atan2(pts[i + 1].y - pts[i].y, pts[i + 1].x - pts[i].x),
      }
    }
    target -= segs[i]
  }
  const last = pts[pts.length - 1]
  return { x: last.x, y: last.y, angle: 0 }
}

/** سيارة مضيئة واضحة — ليست نقطة */
function drawGlowingCar(ctx, x, y, angle, color, scale = 1) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(angle)
  ctx.scale(scale, scale)

  // هالة تتبع
  const aura = ctx.createRadialGradient(0, 0, 4, 0, 0, 36)
  aura.addColorStop(0, `rgba(${color}, 0.55)`)
  aura.addColorStop(0.5, `rgba(${color}, 0.12)`)
  aura.addColorStop(1, `rgba(${color}, 0)`)
  ctx.fillStyle = aura
  ctx.beginPath()
  ctx.arc(0, 0, 36, 0, Math.PI * 2)
  ctx.fill()

  ctx.shadowColor = `rgba(${color}, 0.95)`
  ctx.shadowBlur = 16

  // عجلات
  ctx.fillStyle = `rgba(20, 20, 20, 0.85)`
  ctx.beginPath()
  ctx.ellipse(-8, 7, 3.2, 2.2, 0, 0, Math.PI * 2)
  ctx.ellipse(9, 7, 3.2, 2.2, 0, 0, Math.PI * 2)
  ctx.fill()

  // جسم السيارة (سيدان)
  ctx.fillStyle = `rgba(${color}, 0.95)`
  ctx.beginPath()
  ctx.moveTo(-16, 5)
  ctx.lineTo(-14, -2)
  ctx.lineTo(-6, -3)
  ctx.lineTo(-2, -9)
  ctx.lineTo(8, -9)
  ctx.lineTo(13, -3)
  ctx.lineTo(18, -2)
  ctx.lineTo(18, 5)
  ctx.closePath()
  ctx.fill()

  // سقف / زجاج
  ctx.shadowBlur = 6
  ctx.fillStyle = 'rgba(255, 255, 255, 0.35)'
  ctx.beginPath()
  ctx.moveTo(-1, -8)
  ctx.lineTo(7, -8)
  ctx.lineTo(10, -3.5)
  ctx.lineTo(-4, -3.5)
  ctx.closePath()
  ctx.fill()

  // مصابيح أمامية
  ctx.shadowBlur = 18
  ctx.fillStyle = 'rgba(255, 245, 200, 1)'
  ctx.beginPath()
  ctx.ellipse(17, 0, 2.2, 1.6, 0, 0, Math.PI * 2)
  ctx.fill()

  // شعاع ضوء خفيف للأمام
  const beam = ctx.createLinearGradient(18, 0, 42, 0)
  beam.addColorStop(0, `rgba(255, 220, 150, 0.35)`)
  beam.addColorStop(1, 'rgba(255, 220, 150, 0)')
  ctx.shadowBlur = 0
  ctx.fillStyle = beam
  ctx.beginPath()
  ctx.moveTo(18, -3)
  ctx.lineTo(42, -10)
  ctx.lineTo(42, 10)
  ctx.lineTo(18, 3)
  ctx.closePath()
  ctx.fill()

  // دبوس GPS فوق السيارة
  ctx.shadowColor = `rgba(${color}, 1)`
  ctx.shadowBlur = 10
  ctx.fillStyle = `rgba(${color}, 1)`
  ctx.beginPath()
  ctx.arc(2, -14, 3, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.moveTo(2, -11)
  ctx.lineTo(-1, -6)
  ctx.lineTo(5, -6)
  ctx.closePath()
  ctx.fill()

  ctx.restore()
}

export default function AnimatedHeroScene({ className = '' }) {
  const canvasRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let w = 0
    let h = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let animId
    let visible = true
    let vehicles = []
    let pings = []
    let routeCache = []
    let lastTime = performance.now()
    let frame = 0
    const activeRoutes = ROUTES.slice(0, 3)

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      routeCache = activeRoutes.map((r) => segmentLengths(r, w, h))
    }

    resize()
    window.addEventListener('resize', resize)

    const onVisibility = () => { visible = !document.hidden }
    document.addEventListener('visibilitychange', onVisibility)

    const baseScale = 1.2
    activeRoutes.forEach((_, ri) => {
      vehicles.push({
        route: ri,
        progress: Math.random(),
        speed: 0.016 + Math.random() * 0.018,
        color: ri % 2 === 0 ? BRAND : ACCENT,
        scale: baseScale * (0.95 + Math.random() * 0.2),
        pingTimer: 1.5 + Math.random() * 2,
      })
    })

    const drawRoutes = () => {
      routeCache.forEach(({ pts }) => {
        ctx.beginPath()
        ctx.moveTo(pts[0].x, pts[0].y)
        for (let i = 1; i < pts.length; i++) {
          const midX = (pts[i - 1].x + pts[i].x) / 2
          const midY = (pts[i - 1].y + pts[i].y) / 2
          ctx.quadraticCurveTo(pts[i - 1].x, pts[i - 1].y, midX, midY)
        }
        ctx.strokeStyle = `rgba(${BRAND}, 0.1)`
        ctx.lineWidth = 1
        ctx.setLineDash([6, 10])
        ctx.stroke()
        ctx.setLineDash([])
      })
    }

    const draw = (time) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05)
      lastTime = time
      frame += 1

      if (!visible) {
        animId = requestAnimationFrame(draw)
        return
      }

      // ~30fps بدل 60 — أخف على المعالج
      if (frame % 2 === 1) {
        animId = requestAnimationFrame(draw)
        return
      }

      ctx.clearRect(0, 0, w, h)
      drawRoutes()

      vehicles.forEach((v) => {
        v.progress += v.speed * dt
        if (v.progress > 1) v.progress -= 1

        const rc = routeCache[v.route]
        const pos = pointAt(rc.pts, rc.segs, rc.total, v.progress)

        v.pingTimer -= dt
        if (v.pingTimer <= 0) {
          v.pingTimer = 2.2 + Math.random() * 1.8
          pings.push({ x: pos.x, y: pos.y, r: 0, color: v.color, life: 1 })
        }

        // ذيل ضوء خلف السيارة
        const tailPos = pointAt(rc.pts, rc.segs, rc.total, (v.progress - 0.02 + 1) % 1)
        const grad = ctx.createLinearGradient(tailPos.x, tailPos.y, pos.x, pos.y)
        grad.addColorStop(0, `rgba(${v.color}, 0)`)
        grad.addColorStop(1, `rgba(${v.color}, 0.45)`)
        ctx.beginPath()
        ctx.moveTo(tailPos.x, tailPos.y)
        ctx.lineTo(pos.x, pos.y)
        ctx.strokeStyle = grad
        ctx.lineWidth = 3
        ctx.lineCap = 'round'
        ctx.stroke()

        drawGlowingCar(ctx, pos.x, pos.y, pos.angle, v.color, v.scale)
      })

      pings = pings.filter((p) => p.life > 0)
      pings.forEach((p) => {
        p.r += 35 * dt
        p.life -= dt * 0.7
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${p.color}, ${Math.max(0, p.life) * 0.35})`
        ctx.lineWidth = 1.5
        ctx.stroke()
      })

      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      aria-hidden
    />
  )
}
