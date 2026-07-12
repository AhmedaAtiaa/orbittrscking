import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpLeft, ArrowUpRight } from 'lucide-react'
import { galleryItems } from '../data/images'
import { useLanguage } from '../i18n/LanguageContext'
import SafeImage from './ui/SafeImage'
import { goToService } from '../utils/goToService'

export default function Gallery() {
  const [filter, setFilter] = useState('all')
  const { t, isRtl } = useLanguage()
  const Arrow = isRtl ? ArrowUpLeft : ArrowUpRight

  const categoryKeys = ['trucks', 'schools', 'cold', 'tech', 'products', 'fleet', 'routes', 'logistics', 'monitoring']
  const categories = [
    { key: 'all', label: t('gallery.all') },
    ...categoryKeys.map((key) => ({ key, label: t(`gallery.categories.${key}`) })),
  ]

  const items = galleryItems.map((item) => ({
    ...item,
    title: t(`gallery.items.${item.key}`),
    category: t(`gallery.categories.${item.categoryKey}`),
    serviceTitle: item.serviceId ? t(`services.items.${item.serviceId}.title`) : '',
  }))

  const filtered = filter === 'all' ? items : items.filter((g) => g.categoryKey === filter)

  return (
    <section id="gallery" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-950/30 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-brand-400 font-bold text-sm tracking-wider">{t('gallery.label')}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black mt-3 mb-4">
            {t('gallery.title')} <span className="gradient-text-animated">{t('gallery.titleHighlight')}</span> {t('gallery.titleEnd')}
          </h2>
          <p className="text-slate-400 text-sm mt-2">{t('gallery.clickHint')}</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <motion.button
              key={cat.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(cat.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat.key
                  ? 'bg-gradient-to-l from-brand-600 to-accent-500 text-white shadow-lg shadow-brand-500/30'
                  : 'glass text-slate-300 hover:text-white'
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.button
                type="button"
                key={item.key}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.05 }}
                className={`relative overflow-hidden rounded-2xl cursor-pointer group border-beam text-start ${
                  index === 0 ? 'md:col-span-2 md:row-span-2' : index === 3 ? 'md:row-span-2' : ''
                }`}
                onClick={() => goToService(item.serviceId)}
                aria-label={`${item.title} — ${item.serviceTitle || ''}`}
              >
                <div className={`relative ${index === 0 ? 'h-80 md:h-full min-h-[300px]' : index === 3 ? 'h-72 md:h-full min-h-[280px]' : 'h-48'}`}>
                  <SafeImage src={item.src} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 rounded-full glass flex items-center justify-center">
                      <Arrow className="w-6 h-6 text-brand-300" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 end-0 start-0 p-4">
                    <span className="text-xs text-brand-400 font-medium">{item.category}</span>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    {item.serviceTitle && (
                      <p className="text-xs text-slate-400 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.serviceTitle}
                      </p>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
