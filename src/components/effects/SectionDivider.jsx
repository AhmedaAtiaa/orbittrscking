import { motion } from 'framer-motion'

export default function SectionDivider({ flip = false }) {
  return (
    <div className={`relative h-24 overflow-hidden ${flip ? 'rotate-180' : ''}`}>
      <svg viewBox="0 0 1440 120" className="absolute bottom-0 w-full h-full" preserveAspectRatio="none">
        <motion.path
          initial={{ d: 'M0,60 Q360,120 720,60 T1440,60 L1440,120 L0,120 Z' }}
          animate={{ d: ['M0,60 Q360,120 720,60 T1440,60 L1440,120 L0,120 Z', 'M0,60 Q360,0 720,60 T1440,60 L1440,120 L0,120 Z', 'M0,60 Q360,120 720,60 T1440,60 L1440,120 L0,120 Z'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          fill="url(#waveGrad)"
          opacity="0.15"
        />
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff6600" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ff6600" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-l from-transparent via-brand-500/30 to-transparent" />
    </div>
  )
}
