import { motion } from 'framer-motion'
import {
  Navigation, Car, Thermometer, Scale, Bus, Truck,
  Fuel, Wrench, Trash2, Video, ArrowLeft, ArrowRight,
} from 'lucide-react'
import { images } from '../data/images'
import { useLanguage } from '../i18n/LanguageContext'
import { RevealOnScroll, StaggerContainer, StaggerItem } from './effects/AnimatedText'
import SpotlightCard from './effects/SpotlightCard'
import SafeImage from './ui/SafeImage'
import { goToService } from '../utils/goToService'

const serviceConfig = [
  { id: 'gps', icon: Navigation, gradient: 'from-brand-500 to-brand-700', image: images.trucks, iconColor: '#ff6600', featured: true },
  { id: 'rental', icon: Car, gradient: 'from-orange-500 to-amber-500', image: images.serviceRental, iconColor: '#f97316' },
  { id: 'temp', icon: Thermometer, gradient: 'from-cyan-400 to-blue-500', image: images.refrigerated, imageFallback: images.refrigeratedAlt, iconColor: '#22d3ee', imageClass: 'brightness-105 saturate-110', cold: true },
  { id: 'weight', icon: Scale, gradient: 'from-amber-500 to-orange-600', image: images.serviceWeight, iconColor: '#f59e0b' },
  { id: 'school', icon: Bus, gradient: 'from-brand-400 to-accent-500', image: images.schoolBus, iconColor: '#ff8a3d', featured: true },
  { id: 'specialized', icon: Truck, gradient: 'from-orange-600 to-red-500', image: images.serviceSpecialized, iconColor: '#ea580c' },
  { id: 'fuel', icon: Fuel, gradient: 'from-yellow-500 to-orange-500', image: images.productFuelSensor, iconColor: '#eab308' },
  { id: 'equipment', icon: Wrench, gradient: 'from-slate-400 to-brand-500', image: images.serviceEquipment, iconColor: '#94a3b8' },
  { id: 'waste', icon: Trash2, gradient: 'from-emerald-500 to-teal-600', image: images.serviceWaste, iconColor: '#10b981' },
  { id: 'dashcamAi', icon: Video, gradient: 'from-violet-500 to-brand-500', image: images.productDashcam, iconColor: '#a78bfa', featured: true },
]

export default function Services() {
  const { t, isRtl, locale } = useLanguage()
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
            {[t('services.title'), t('services.titleHighlight'), t('services.titleEnd')]
              .filter(Boolean)
              .map((part, i, arr) =>
                part === t('services.titleHighlight') ? (
                  <span key={i} className="gradient-text-animated">
                    {part}
                    {i < arr.length - 1 ? ' ' : ''}
                  </span>
                ) : (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 ? ' ' : ''}
                  </span>
                )
              )}
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">{t('services.subtitle')}</p>
        </RevealOnScroll>

        <StaggerContainer className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8" stagger={0.08}>
          {serviceConfig.map((service) => {
            const title = t(`services.items.${service.id}.title`)
            const description = t(`services.items.${service.id}.description`)
            const features = t(`services.items.${service.id}.features`)
            const featureList = Array.isArray(features) ? features : []
            const badge = service.cold
              ? t('services.coldBadge')
              : service.featured
                ? t('services.featured')
                : null

            return (
              <StaggerItem key={service.id}>
                <SpotlightCard className="h-full">
                  <article className="group relative overflow-hidden rounded-3xl bg-slate-900/50 border border-white/10 hover:border-brand-500/30 transition-colors duration-300 h-full border-beam flex flex-col">
                    <button
                      type="button"
                      onClick={() => goToService(service.id, locale)}
                      className={`relative h-48 overflow-hidden shrink-0 w-full text-start ${service.cold ? 'ring-1 ring-cyan-400/30' : ''}`}
                      aria-label={title}
                    >
                      <SafeImage
                        src={service.image}
                        fallback={service.imageFallback}
                        alt={title}
                        className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ${service.imageClass || ''}`}
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t from-slate-900 ${service.cold ? 'via-slate-900/20' : 'via-slate-900/30'} to-transparent`} />
                      <div className={`absolute top-0 start-0 w-full h-1 bg-gradient-to-l ${service.gradient}`} />
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="absolute bottom-4 end-4 w-12 h-12 rounded-2xl glass flex items-center justify-center"
                      >
                        <service.icon className="w-6 h-6" style={{ color: service.iconColor }} />
                      </motion.div>
                      {badge && (
                        <div className="absolute top-4 start-4 glass rounded-full px-3 py-1 text-xs font-medium text-brand-300">
                          {badge}
                        </div>
                      )}
                    </button>

                    <div className="p-5 sm:p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-brand-300 transition-colors leading-snug">
                        {title}
                      </h3>
                      <p className="text-slate-300 mb-4 leading-relaxed text-sm flex-1">{description}</p>
                      {featureList.length > 0 && (
                        <ul className="space-y-2 mb-5">
                          {featureList.slice(0, 4).map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                              <div className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-l ${service.gradient} shadow-sm shrink-0`} />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <button
                        type="button"
                        onClick={() => goToService(service.id, locale)}
                        className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 font-medium text-sm group/link mt-auto"
                      >
                        {t('services.learnMore')}
                        <Arrow className={`w-4 h-4 transition-transform ${isRtl ? 'group-hover/link:-translate-x-2' : 'group-hover/link:translate-x-2'}`} />
                      </button>
                    </div>
                  </article>
                </SpotlightCard>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}
