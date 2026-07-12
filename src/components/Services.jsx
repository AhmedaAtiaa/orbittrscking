import { motion } from 'framer-motion'
import { Truck, Bus, Snowflake, ArrowLeft, ArrowRight } from 'lucide-react'
import { images } from '../data/images'
import { useLanguage } from '../i18n/LanguageContext'
import { RevealOnScroll, StaggerContainer, StaggerItem } from './effects/AnimatedText'
import SpotlightCard from './effects/SpotlightCard'
import SafeImage from './ui/SafeImage'

const serviceConfig = [
  { id: 'trucks', icon: Truck, gradient: 'from-orange-500 to-red-500', image: images.trucks, iconColor: '#f97316' },
  { id: 'school', icon: Bus, gradient: 'from-brand-500 to-brand-700', image: images.schoolBus, iconColor: '#ff6600' },
  {
    id: 'cold', icon: Snowflake, gradient: 'from-cyan-400 to-blue-500', image: images.refrigerated,
    imageFallback: images.refrigeratedAlt, iconColor: '#22d3ee', imageClass: 'brightness-105 saturate-110',
  },
]

export default function Services() {
  const { t, isRtl } = useLanguage()
  const Arrow = isRtl ? ArrowLeft : ArrowRight

  return (
    <section id="services" className="section-padding relative">
      <div className="absolute top-0 end-0 w-96 h-96 bg-brand-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <RevealOnScroll className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.2em' }}
            viewport={{ once: true }}
            className="text-brand-400 font-bold text-sm tracking-widest inline-block"
          >
            {t('services.label')}
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black mt-3 mb-4">
            {t('services.title')} <span className="gradient-text-animated">{t('services.titleHighlight')}</span> {t('services.titleEnd')}
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">{t('services.subtitle')}</p>
        </RevealOnScroll>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.15}>
          {serviceConfig.map((service) => {
            const title = t(`services.items.${service.id}.title`)
            const description = t(`services.items.${service.id}.description`)
            const features = t(`services.items.${service.id}.features`)
            const featureList = Array.isArray(features) ? features : []

            return (
              <StaggerItem key={service.id}>
                <SpotlightCard className="h-full">
                  <div className={`group relative overflow-hidden rounded-3xl bg-slate-900/50 border border-white/10 hover:border-brand-500/30 transition-colors duration-300 h-full border-beam`}>
                    <div className={`relative h-64 overflow-hidden ${service.id === 'cold' ? 'ring-1 ring-cyan-400/30' : ''}`}>
                      <SafeImage
                        src={service.image}
                        fallback={service.imageFallback}
                        alt={title}
                        className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ${service.imageClass || ''}`}
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t from-slate-900 ${service.id === 'cold' ? 'via-slate-900/20' : 'via-slate-900/30'} to-transparent`} />
                      <div className={`absolute top-0 start-0 w-full h-1 bg-gradient-to-l ${service.gradient}`} />
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="absolute bottom-4 end-4 w-14 h-14 rounded-2xl glass flex items-center justify-center"
                      >
                        <service.icon className="w-7 h-7" style={{ color: service.iconColor }} />
                      </motion.div>
                      <div className="absolute top-4 start-4 glass rounded-full px-3 py-1 text-xs font-medium text-brand-300">
                        {service.id === 'cold' ? t('services.coldBadge') : t('services.featured')}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-brand-300 transition-colors">{title}</h3>
                      <p className="text-slate-300 mb-6 leading-relaxed text-sm">{description}</p>
                      <ul className="space-y-2.5 mb-6">
                        {featureList.map((feature, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className="flex items-center gap-2 text-sm text-slate-300"
                          >
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-l ${service.gradient} shadow-sm shrink-0`} />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                      <a href="#contact" className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 font-medium text-sm group/link">
                        {t('services.learnMore')}
                        <Arrow className={`w-4 h-4 transition-transform ${isRtl ? 'group-hover/link:-translate-x-2' : 'group-hover/link:translate-x-2'}`} />
                      </a>
                    </div>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}
