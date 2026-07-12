import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Satellite, Camera, Thermometer, Fuel, Cpu, Wifi,
  ArrowLeft, ArrowRight, CheckCircle2, X, ZoomIn, Package, ExternalLink
} from 'lucide-react'
import { productCatalog } from '../data/images'
import { useLanguage } from '../i18n/LanguageContext'
import { RevealOnScroll, StaggerContainer, StaggerItem } from './effects/AnimatedText'
import SpotlightCard from './effects/SpotlightCard'
import SafeImage from './ui/SafeImage'
import { goToService } from '../utils/goToService'

const iconMap = {
  'gps-tracker': Satellite,
  dashcam: Camera,
  'temp-humidity': Thermometer,
  'fuel-sensor': Fuel,
  obd: Cpu,
  'sim-m2m': Wifi,
}

export default function Products() {
  const [selected, setSelected] = useState(null)
  const { t, isRtl } = useLanguage()
  const Arrow = isRtl ? ArrowLeft : ArrowRight

  const getProduct = (id) => ({
    id,
    name: t(`products.items.${id}.name`),
    tagline: t(`products.items.${id}.tagline`),
    description: t(`products.items.${id}.description`),
    specs: t(`products.items.${id}.specs`),
    badge: t(`products.items.${id}.badge`),
  })

  return (
    <section id="products" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-950/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <RevealOnScroll className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-4">
            <Package className="w-4 h-4 text-brand-400" />
            <span className="text-sm text-brand-300 font-medium">{t('products.label')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black mt-3 mb-4">
            {t('products.title')} <span className="gradient-text-animated">{t('products.titleHighlight')}</span> {t('products.titleEnd')}
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">{t('products.subtitle')}</p>
        </RevealOnScroll>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.1}>
          {productCatalog.map((product) => {
            const Icon = iconMap[product.id] || Package
            const info = getProduct(product.id)
            const specs = Array.isArray(info.specs) ? info.specs : []

            return (
              <StaggerItem key={product.id}>
                <SpotlightCard className="h-full">
                  <article className="group relative flex flex-col rounded-3xl overflow-hidden border border-white/10 bg-slate-900/50 hover:border-brand-500/30 transition-colors duration-300 h-full border-beam">
                    <div
                      className="relative h-56 overflow-hidden bg-slate-800 cursor-pointer"
                      onClick={() => goToService(product.serviceId)}
                      role="link"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          goToService(product.serviceId)
                        }
                      }}
                    >
                      <SafeImage src={product.image} alt={info.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                      {info.badge && (
                        <motion.span
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          className={`absolute top-4 end-4 text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-l ${product.color} text-white shadow-lg`}
                        >
                          {info.badge}
                        </motion.span>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelected({ ...product, ...info })
                        }}
                        className="absolute top-4 start-4 w-9 h-9 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10"
                        aria-label={`${t('products.zoom')} ${info.name}`}
                      >
                        <ZoomIn className="w-4 h-4" />
                      </button>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
                          <ExternalLink className="w-5 h-5 text-brand-300" />
                        </div>
                      </div>
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className={`absolute bottom-4 end-4 w-12 h-12 rounded-xl bg-gradient-to-br ${product.color} flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <p className="text-xs text-brand-400 font-medium mb-1">{info.tagline}</p>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-brand-300 transition-colors">{info.name}</h3>
                      <p className="text-slate-300 text-sm leading-relaxed mb-5 flex-1">{info.description}</p>
                      <ul className="space-y-2 mb-5">
                        {specs.map((spec, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-accent-400 shrink-0" />
                            {spec}
                          </li>
                        ))}
                      </ul>
                      <a href="#contact" className="inline-flex items-center gap-2 text-sm font-medium text-brand-400 hover:text-brand-300 transition-colors">
                        {t('products.requestQuote')}
                        <Arrow className="w-4 h-4" />
                      </a>
                    </div>
                  </article>
                </SpotlightCard>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 glass rounded-2xl p-6 flex flex-wrap items-center justify-center gap-8 text-center"
        >
          {(t('products.warranty') || []).map((item, i) => (
            <div key={i}>
              <p className="font-bold text-white">{item.label}</p>
              <p className="text-xs text-slate-300">{item.sub}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full glass rounded-3xl overflow-hidden"
            >
              <button onClick={() => setSelected(null)} className="absolute top-4 start-4 z-10 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10">
                <X className="w-5 h-5" />
              </button>
              <SafeImage src={selected.image} alt={selected.name} className="w-full h-64 sm:h-80 object-cover" />
              <div className="p-6 sm:p-8">
                <p className="text-brand-400 text-sm font-medium">{selected.tagline}</p>
                <h3 className="text-2xl font-black mt-1 mb-3">{selected.name}</h3>
                <p className="text-slate-300 mb-4">{selected.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {(selected.specs || []).map((s, i) => (
                    <span key={i} className="text-xs glass rounded-full px-3 py-1 text-slate-300">{s}</span>
                  ))}
                </div>
                <a href="#contact" onClick={() => setSelected(null)} className="btn-primary inline-flex items-center gap-2">
                  {t('products.requestProduct')}
                  <Arrow className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
