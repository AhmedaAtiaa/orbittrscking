import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '../../utils/motion'

export default function GlowCursor() {
  const reduced = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 20 })
  const springY = useSpring(y, { stiffness: 150, damping: 20 })

  useEffect(() => {
    if (reduced) return
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const leave = () => setVisible(false)
    const over = (e) => {
      const t = e.target
      setHovering(
        t.closest('a, button, [role="button"], input, textarea, select, .cursor-pointer') !== null
      )
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseleave', leave)
    document.addEventListener('mouseover', over)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseover', over)
    }
  }, [x, y, reduced])

  if (reduced || !visible) return null

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      className="fixed top-0 left-0 z-[150] pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-screen hidden md:block"
    >
      <motion.div
        animate={{
          scale: hovering ? 2.8 : 1,
          opacity: hovering ? 0.5 : 0.25,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="w-10 h-10 rounded-full bg-brand-400/40 blur-lg"
      />
      <motion.div
        animate={{ scale: hovering ? 1.5 : 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-brand-300/60"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand-200" />
    </motion.div>
  )
}
