import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion'

export default function SpotlightCard({
  children,
  className = '',
  tilt = true,
  spotlight = true,
  glow = true,
}) {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const spotX = useMotionValue(50)
  const spotY = useMotionValue(50)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 30 })
  const springSpotX = useSpring(spotX, { stiffness: 300, damping: 30 })
  const springSpotY = useSpring(spotY, { stiffness: 300, damping: 30 })

  const spotlightBg = useMotionTemplate`radial-gradient(600px circle at ${springSpotX}% ${springSpotY}%, rgba(255,102,0,0.18), transparent 40%)`

  const handleMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    spotX.set(((e.clientX - rect.left) / rect.width) * 100)
    spotY.set(((e.clientY - rect.top) / rect.height) * 100)
    if (tilt) {
      x.set((e.clientX - rect.left) / rect.width - 0.5)
      y.set((e.clientY - rect.top) / rect.height - 0.5)
    }
  }

  const handleLeave = () => {
    setHovered(false)
    x.set(0)
    y.set(0)
    spotX.set(50)
    spotY.set(50)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      style={tilt ? { rotateX, rotateY, transformPerspective: 1000 } : undefined}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`relative group ${className}`}
    >
      {spotlight && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
          style={{ background: spotlightBg }}
        />
      )}
      {glow && hovered && (
        <div className="pointer-events-none absolute -inset-1 rounded-[inherit] bg-gradient-to-br from-brand-500/20 via-transparent to-accent-500/20 blur-xl opacity-60 z-0" />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  )
}
