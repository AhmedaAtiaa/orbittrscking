import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { images } from '../data/images'
import { useLanguage } from '../i18n/LanguageContext'
import SafeImage from './ui/SafeImage'

export default function Showcase() {
  const { t, isRtl } = useLanguage()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%'])
  const highlights = t('showcase.highlights')
  const slideFrom = isRtl ? 50 : -50

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: slideFrom }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <span className="text-accent-400 font-bold text-sm">{t('showcase.label')}</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-3 mb-6 leading-tight">
              <span className="gradient-text">{t('showcase.title')}</span>
              <br />
              {t('showcase.titleEnd')}
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              {t('showcase.description')}
            </p>

            <ul className="space-y-4 mb-10">
              {highlights.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-accent-400 shrink-0" />
                  <span className="text-slate-300">{item}</span>
                </motion.li>
              ))}
            </ul>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-block"
            >
              {t('showcase.cta')}
            </motion.a>
          </motion.div>

          <div className="order-1 lg:order-2 relative h-[500px] lg:h-[600px]">
            <motion.div style={{ y: imageY }} className="absolute inset-0">
              <div className="relative w-full h-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="absolute inset-4 rounded-3xl overflow-hidden shadow-2xl shadow-brand-500/20"
                >
                  <SafeImage
                    src={images.controlRoom}
                    alt={t('showcase.alt.controlRoom')}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: isRtl ? 30 : -30, y: 30 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="absolute -bottom-4 end-[-1rem] w-48 h-36 rounded-2xl overflow-hidden border-4 border-slate-950 shadow-2xl z-10"
                >
                  <SafeImage src={images.dashboard} alt={t('showcase.alt.dashboard')} className="w-full h-full object-cover" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: isRtl ? -30 : 30, y: -30 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-4 start-[-1rem] w-44 h-32 rounded-2xl overflow-hidden border-4 border-slate-950 shadow-2xl z-10"
                >
                  <SafeImage src={images.gps} alt={t('showcase.alt.gps')} className="w-full h-full object-cover" />
                </motion.div>

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 border border-brand-500/20 rounded-full -z-10"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 border border-accent-500/20 rounded-full -z-10"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
