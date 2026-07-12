import { motion } from 'framer-motion'
import { useReducedMotion } from '../../utils/motion'

const orbs = [
  { className: 'top-[10%] start-[5%] w-72 h-72 bg-brand-500', delay: 0 },
  { className: 'top-[60%] end-[10%] w-96 h-96 bg-accent-500', delay: 2 },
  { className: 'bottom-[20%] start-[30%] w-64 h-64 bg-brand-400', delay: 4 },
]

export default function FloatingOrbs() {
  const reduced = useReducedMotion()
  if (reduced) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl opacity-[0.07] ${orb.className}`}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  )
}
