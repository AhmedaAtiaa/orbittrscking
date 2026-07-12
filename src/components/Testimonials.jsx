import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { images } from '../data/images'
import { useLanguage } from '../i18n/LanguageContext'
import { RevealOnScroll, StaggerContainer, StaggerItem } from './effects/AnimatedText'
import SpotlightCard from './effects/SpotlightCard'
import SafeImage from './ui/SafeImage'

const testimonialImages = [images.trucks, images.schoolBus, images.refrigerated]

export default function Testimonials() {
  const { t } = useLanguage()
  const items = t('testimonials.items')

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0">
        <SafeImage src={images.highway} alt="" className="w-full h-full object-cover opacity-5 ken-burns-slow" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <RevealOnScroll className="text-center mb-16">
          <span className="text-accent-400 font-bold text-sm tracking-wider">{t('testimonials.label')}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-3 mb-4">
            {t('testimonials.title')} <span className="gradient-text-animated">{t('testimonials.titleHighlight')}</span>
          </h2>
        </RevealOnScroll>

        <StaggerContainer className="grid md:grid-cols-3 gap-8" stagger={0.15}>
          {items.map((item, index) => (
            <StaggerItem key={index}>
              <SpotlightCard className="h-full">
                <motion.div
                  whileHover={{ y: -12 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 hover:border-brand-500/30 transition-all duration-500 h-full border-beam"
                >
                  <div className="relative h-40 overflow-hidden">
                    <SafeImage
                      src={testimonialImages[index]}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                    >
                      <Quote className="w-8 h-8 text-brand-400/50 absolute top-4 start-4" />
                    </motion.div>
                  </div>

                  <div className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.08 }}
                        >
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        </motion.div>
                      ))}
                    </div>

                    <p className="text-slate-300 leading-relaxed mb-6 text-sm">
                      &ldquo;{item.text}&rdquo;
                    </p>

                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center font-bold text-lg ring-2 ring-brand-500/30"
                      >
                        {item.name.charAt(0)}
                      </motion.div>
                      <div>
                        <p className="font-bold">{item.name}</p>
                        <p className="text-xs text-slate-300">{item.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
