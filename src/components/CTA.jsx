import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Sparkles, Star } from 'lucide-react'
import { COMPANY, images } from '../data/images'
import { useLanguage } from '../i18n/LanguageContext'
import MagneticButton from './effects/MagneticButton'
import SafeImage from './ui/SafeImage'

const sparkles = Array.from({ length: 3 }, (_, i) => ({
  top: `${20 + i * 22}%`,
  left: `${18 + i * 25}%`,
  delay: i * 0.6,
  size: i % 2 === 0 ? 'w-2 h-2' : 'w-1.5 h-1.5',
}))

export default function CTA() {
  const { t, isRtl } = useLanguage()
  const Arrow = isRtl ? ArrowLeft : ArrowRight

  return (
    <section className="section-padding relative content-auto">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative rounded-3xl overflow-hidden border-beam"
        >
          <SafeImage src={images.fleet} alt={t('cta.alt')} className="absolute inset-0 w-full h-full object-cover ken-burns" />
          <div className={`absolute inset-0 bg-gradient-to-${isRtl ? 'l' : 'r'} from-brand-600/95 via-brand-500/90 to-accent-500/85`} />

          {sparkles.map((s, i) => (
            <motion.div
              key={i}
              className={`absolute ${s.size} rounded-full bg-yellow-300/80 sparkle-dot`}
              style={{ top: s.top, left: s.left, animationDelay: `${s.delay}s` }}
            />
          ))}

          <div className="relative p-10 sm:p-16 text-center">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-flex mb-6 relative"
            >
              <Sparkles className="w-10 h-10 text-yellow-300" />
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full border border-yellow-300/40 ripple-ring"
              />
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>

            <div className="flex items-center justify-center gap-1 mb-8">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-brand-600 rounded-xl font-bold hover:bg-white/90 transition-colors shadow-lg shadow-black/20"
              >
                {t('cta.primary')}
                <Arrow className="w-5 h-5" />
              </MagneticButton>
              <MagneticButton
                href={`tel:${COMPANY.phoneTel || COMPANY.phone.replace(/\s/g, '')}`}
                strength={0.2}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white rounded-xl font-bold hover:bg-white/10 transition-colors"
              >
                {t('cta.secondary')}
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
