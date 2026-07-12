import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Handshake, Cpu, Radio, Landmark } from 'lucide-react'
import { partners } from '../data/partners'
import { useLanguage } from '../i18n/LanguageContext'
import { RevealOnScroll, StaggerContainer, StaggerItem } from './effects/AnimatedText'

const categoryMeta = {
  all: { icon: Handshake },
  hardware: { icon: Cpu },
  telecom: { icon: Radio },
  gov: { icon: Landmark },
}

export default function Partners() {
  const { t, isRtl } = useLanguage()
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all'
    ? partners
    : partners.filter((p) => p.category === filter)

  const categories = ['all', 'hardware', 'telecom', 'gov']

  return (
    <section id="partners" className="section-padding relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-brand-500/40 to-transparent" />
      <div className="absolute top-1/2 start-0 w-72 h-72 bg-brand-600/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative">
        <RevealOnScroll className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-4">
            <Handshake className="w-4 h-4 text-brand-400" />
            <span className="text-sm text-brand-300 font-medium">{t('partners.label')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-2 mb-4">
            {t('partners.title')}{' '}
            <span className="gradient-text-animated">{t('partners.titleHighlight')}</span>
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">{t('partners.subtitle')}</p>
        </RevealOnScroll>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((key) => {
            const Icon = categoryMeta[key].icon
            const active = filter === key
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                  active
                    ? 'bg-brand-500/20 border-brand-500/50 text-brand-300'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/25 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {t(`partners.categories.${key}`)}
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <StaggerContainer
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
              stagger={0.05}
            >
              {filtered.map((partner) => (
                <StaggerItem key={partner.id}>
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    className="group relative h-full"
                  >
                    <div
                      className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500"
                      style={{ background: `linear-gradient(135deg, ${partner.color}55, transparent)` }}
                    />
                    <div className="relative h-full rounded-2xl border border-white/10 bg-zinc-950/80 overflow-hidden border-beam hover:border-brand-500/30 transition-colors">
                      <div className="aspect-[16/10] flex items-center justify-center p-5 bg-white">
                        <img
                          src={partner.logo}
                          alt={isRtl ? partner.nameAr : partner.name}
                          className="max-w-full max-h-full w-auto h-auto object-contain"
                          loading="lazy"
                        />
                      </div>
                      <div className="px-4 py-3 text-center border-t border-white/5">
                        <p className="text-sm font-bold text-white truncate">
                          {isRtl ? partner.nameAr : partner.name}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          {t(`partners.categories.${partner.category}`)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </motion.div>
        </AnimatePresence>

        <RevealOnScroll delay={0.15} className="mt-12 text-center">
          <p className="text-slate-400 text-sm max-w-xl mx-auto">{t('partners.note')}</p>
        </RevealOnScroll>
      </div>
    </section>
  )
}
