import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { TrendingUp } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { RevealOnScroll } from './effects/AnimatedText'

function AnimatedCounter({ value, suffix = '' }) {
  const ref = useRef(null)
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (v) => Math.round(v))

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(motionValue, value, { duration: 2.5, ease: [0.2, 0.8, 0.2, 1] })
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, motionValue])

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

const statConfig = [
  { value: 1500, suffix: '+', labelKey: 'stats.clients', color: 'from-brand-500 to-brand-700' },
  { value: 8000, suffix: '+', labelKey: 'stats.vehicles', color: 'from-accent-500 to-brand-600' },
  { value: 99, suffix: '.9%', labelKey: 'stats.uptime', color: 'from-brand-400 to-accent-500' },
  { value: 5, suffix: '', labelKey: 'stats.experience', color: 'from-orange-500 to-red-500' },
]

export default function Stats() {
  const { t } = useLanguage()

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-950/20 via-transparent to-accent-950/20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <RevealOnScroll className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-black gradient-text-animated">{t('stats.title')}</h2>
        </RevealOnScroll>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {statConfig.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
              whileHover={{ y: -10, scale: 1.03 }}
              className="relative group"
            >
              <div className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-70 blur-md transition-opacity duration-500`} />
              <div className="relative glass rounded-2xl p-6 sm:p-8 text-center border-beam overflow-hidden neon-glow">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-15 transition-opacity`} />
                <motion.div
                  animate={{ y: [0, -6, 0], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.4 }}
                  className="w-10 h-10 mx-auto mb-4 rounded-lg bg-white/5 flex items-center justify-center relative"
                >
                  <span className="absolute inset-0 rounded-lg pulse-ring bg-brand-400/20" />
                  <TrendingUp className="w-5 h-5 text-brand-400 relative z-10" />
                </motion.div>
                <p className="text-4xl sm:text-5xl lg:text-6xl font-black gradient-text-animated mb-2 relative z-10">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-slate-300 font-medium relative z-10">{t(stat.labelKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
