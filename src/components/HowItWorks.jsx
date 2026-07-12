import { motion } from 'framer-motion'
import { Settings, Radio, Monitor, HeadphonesIcon } from 'lucide-react'
import { images } from '../data/images'
import { useLanguage } from '../i18n/LanguageContext'
import { RevealOnScroll, StaggerContainer, StaggerItem } from './effects/AnimatedText'
import SpotlightCard from './effects/SpotlightCard'
import SafeImage from './ui/SafeImage'

const stepConfig = [
  { id: 'install', icon: Settings, image: images.technology },
  { id: 'connect', icon: Radio, image: images.productGps },
  { id: 'monitor', icon: Monitor, image: images.dashboard },
  { id: 'support', icon: HeadphonesIcon, image: images.controlRoom },
]

export default function HowItWorks() {
  const { t } = useLanguage()

  return (
    <section id="how-it-works" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <SafeImage src={images.warehouse} alt="" className="w-full h-full object-cover ken-burns-slow" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <RevealOnScroll className="text-center mb-16">
          <span className="text-brand-400 font-bold text-sm tracking-wider">{t('howItWorks.label')}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-3 mb-4">
            {t('howItWorks.title')} <span className="gradient-text-animated">{t('howItWorks.titleHighlight')}</span>
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">{t('howItWorks.subtitle')}</p>
        </RevealOnScroll>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 start-[12%] end-[12%] h-0.5 -translate-y-1/2 overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.2, 0.8, 0.2, 1] }}
              className="h-full bg-gradient-to-l from-brand-500 via-accent-500 to-brand-500 origin-right"
            />
          </div>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.2}>
            {stepConfig.map((step, index) => (
              <StaggerItem key={step.id}>
                <SpotlightCard className="h-full">
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 hover:border-brand-500/30 transition-all h-full border-beam"
                  >
                    <div className="relative h-36 overflow-hidden">
                      <SafeImage src={step.image} alt={t(`howItWorks.steps.${step.id}.title`)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                      <motion.span
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15, type: 'spring' }}
                        className="absolute top-3 end-3 w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-xs font-bold shadow-lg shadow-brand-500/30"
                      >
                        {String(index + 1).padStart(2, '0')}
                      </motion.span>
                    </div>
                    <div className="p-5 text-center">
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="w-14 h-14 mx-auto -mt-10 relative z-10 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center shadow-lg mb-4"
                      >
                        <step.icon className="w-7 h-7 text-white" />
                      </motion.div>
                      <h3 className="text-lg font-bold mb-2 group-hover:text-brand-300 transition-colors">
                        {t(`howItWorks.steps.${step.id}.title`)}
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {t(`howItWorks.steps.${step.id}.description`)}
                      </p>
                    </div>
                  </motion.div>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}
