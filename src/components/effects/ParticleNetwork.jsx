import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../utils/motion'

/** رسم سيارة بسيطة مضيئة باتجاه الحركة */
function drawCar(ctx, x, y, angle, scale, glow) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(angle)
  ctx.scale(scale, scale)

  // هالة ضوء GPS / تتبع
  const aura = ctx.createRadialGradient(0, 0, 2, 0, 0, 28)
  aura.addColorStop(0, `rgba(255, 102, 0, ${0.45 * glow})`)
  aura.addColorStop(0.45, `rgba(255, 140, 40, ${0.15 * glow})`)
  aura.addColorStop(1, 'rgba(255, 102, 0, 0)')
  ctx.fillStyle = aura
  ctx.beginPath()
  ctx.arc(0, 0, 28, 0, Math.PI * 2)
  ctx.fill()

  // جسم السيارة
  ctx.shadowColor = 'rgba(255, 102, 0, 0.9)'
  ctx.shadowBlur = 10 * glow

  ctx.fillStyle = `rgba(255, 130, 40, ${0.85 * glow})`
  ctx.beginPath()
  // هيكل
  ctx.moveTo(-10, -5)
  ctx.lineTo(8, -5)
  ctx.quadraticCurveTo(12, -5, 12, -2)
  ctx.lineTo(12, 2)
  ctx.quadraticCurveTo(12, 5, 8, 5)
  ctx.lineTo(-10, 5)
  ctx.quadraticCurveTo(-14, 5, -14, 2)
  ctx.lineTo(-14, -2)
  ctx.quadraticCurveTo(-14, -5, -10, -5)
  ctx.closePath()
  ctx.fill()

  // مقصورة
  ctx.fillStyle = `rgba(255, 200, 120, ${0.75 * glow})`
  ctx.beginPath()
  ctx.moveTo(-3, -4.5)
  ctx.lineTo(4, -4.5)
  ctx.lineTo(6, -1.5)
  ctx.lineTo(-5, -1.5)
  ctx.closePath()
  ctx.fill()

  // مصابيح أمامية
  ctx.shadowBlur = 14 * glow
  ctx.fillStyle = `rgba(255, 240, 180, ${0.95 * glow})`
  ctx.beginPath()
  ctx.ellipse(11, -2.5, 1.8, 1.2, 0, 0, Math.PI * 2)
  ctx.ellipse(11, 2.5, 1.8, 1.2, 0, 0, Math.PI * 2)
  ctx.fill()

  // نقطة تتبع فوق السيارة
  ctx.shadowBlur = 8 * glow
  ctx.fillStyle = `rgba(255, 102, 0, ${glow})`
  ctx.beginPath()
  ctx.arc(0, -9, 2.2, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}

export default function ParticleNetwork() {
  const canvasRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let cars = []
    let visible = true

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onVisibility = () => {
      visible = !document.hidden
    }
    document.addEventListener('visibilitychange', onVisibility)

    const isMobile = window.innerWidth < 768
    const count = isMobile ? 2 : 4

    cars = Array.from({ length: count }, () => {
      const speed = 0.35 + Math.random() * 0.45
      const angle = Math.random() * Math.PI * 2
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        scale: 1.35 + Math.random() * 0.45,
        glow: 0.7 + Math.random() * 0.3,
        pulse: Math.random() * Math.PI * 2,
      }
    })

    let frame = 0
    const draw = () => {
      if (!visible) {
        animId = requestAnimationFrame(draw)
        return
      }

      frame += 1
      if (frame % 2 === 1) {
        animId = requestAnimationFrame(draw)
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      cars.forEach((c) => {
        c.x += c.vx
        c.y += c.vy
        c.pulse += 0.03

        // ارتداد ناعم من الحواف مع تغيير الاتجاه
        if (c.x < 40) c.vx = Math.abs(c.vx)
        if (c.x > canvas.width - 40) c.vx = -Math.abs(c.vx)
        if (c.y < 40) c.vy = Math.abs(c.vy)
        if (c.y > canvas.height - 40) c.vy = -Math.abs(c.vy)

        // انحناء خفيف في المسار (حركة أسطول طبيعية)
        const turn = (Math.sin(c.pulse * 0.4) * 0.008)
        const cos = Math.cos(turn)
        const sin = Math.sin(turn)
        const nvx = c.vx * cos - c.vy * sin
        const nvy = c.vx * sin + c.vy * cos
        c.vx = nvx
        c.vy = nvy

        const angle = Math.atan2(c.vy, c.vx)
        const glow = c.glow * (0.75 + 0.25 * Math.sin(c.pulse))

        drawCar(ctx, c.x, c.y, angle, c.scale, glow)
      })

      animId = requestAnimationFrame(draw)
    }
    draw()

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
      className="fixed inset-0 pointer-events-none z-0 opacity-40"
      aria-hidden
    />
  )
}
