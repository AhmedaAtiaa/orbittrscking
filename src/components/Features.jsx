import { motion } from 'framer-motion'
import {
  MapPin, Bell, BarChart3, Smartphone, Lock, Cloud,
  Gauge, Route, Thermometer, Users
} from 'lucide-react'
import { images } from '../data/images'
import { useLanguage } from '../i18n/LanguageContext'
import { RevealOnScroll, StaggerContainer, StaggerItem } from './effects/AnimatedText'
import SpotlightCard from './effects/SpotlightCard'
import SafeImage from './ui/SafeImage'

const featureKeys = [
  { key: 'tracking', icon: MapPin, span: 'lg:col-span-2 lg:row-span-2', image: images.mobileApp, featured: true },
  { key: 'alerts', icon: Bell },
  { key: 'reports', icon: BarChart3 },
  { key: 'mobile', icon: Smartphone, span: 'lg:col-span-2' },
  { key: 'security', icon: Lock },
  { key: 'cloud', icon: Cloud },
  { key: 'speed', icon: Gauge },
  { key: 'routes', icon: Route },
  { key: 'temperature', icon: Thermometer },
  { key: 'drivers', icon: Users },
]

export default function Features() {
  const { t } = useLanguage()

  return (
    <section id="features" className="section-padding relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-600/5 rounded-full blur-3xl pointer-events-none animate-glow-pulse" />

      <div className="max-w-7xl mx-auto relative">
        <RevealOnScroll className="text-center mb-16">
          <span className="text-accent-400 font-bold text-sm tracking-widest uppercase">{t('features.label')}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black mt-3 mb-4">
            {t('features.title')} <span className="gradient-text-animated">{t('features.titleHighlight')}</span> {t('features.titleEnd')}
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">{t('features.subtitle')}</p>
        </RevealOnScroll>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr" stagger={0.06}>
          {featureKeys.map((feature) => (
            <StaggerItem key={feature.key} className={`${feature.span || ''} ${feature.featured ? 'min-h-[320px]' : 'min-h-[160px]'}`}>
              <SpotlightCard tilt={feature.featured} className="h-full">
                <div className={`group relative h-full rounded-2xl overflow-hidden border border-white/10 bg-slate-900/60 hover:border-brand-500/30 transition-colors duration-300 border-beam ${feature.featured ? 'p-8 scanlines' : 'p-5'}`}>
                  {feature.image && (
                    <>
                      <SafeImage src={feature.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700 ken-burns" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40" />
                    </>
                  )}
                  <div className={`relative z-10 h-full flex flex-col ${feature.featured ? 'justify-end' : ''}`}>
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className={`rounded-xl bg-gradient-to-br from-brand-500/30 to-accent-500/20 flex items-center justify-center mb-4 border border-brand-500/20 ${feature.featured ? 'w-16 h-16' : 'w-12 h-12'}`}
                    >
                      <feature.icon className={`${feature.featured ? 'w-8 h-8' : 'w-6 h-6'} text-brand-300`} />
                    </motion.div>
                    <h3 className={`font-bold mb-1 group-hover:text-brand-300 transition-colors ${feature.featured ? 'text-2xl' : 'text-base'}`}>
                      {t(`features.items.${feature.key}.title`)}
                    </h3>
                    <p className={`text-slate-300 ${feature.featured ? 'text-base' : 'text-sm'}`}>
                      {t(`features.items.${feature.key}.desc`)}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
