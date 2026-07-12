import { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Target, Eye, Heart, ShieldCheck, Users, MapPin,
} from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { COMPANY, images } from '../data/images'
import SafeImage from '../components/ui/SafeImage'

const valueIcons = [ShieldCheck, Users, Target, Heart]

export default function AboutPage() {
  const { t, isRtl } = useLanguage()
  const Arrow = isRtl ? ArrowLeft : ArrowRight
  const title = t('aboutPage.title')
  const eyebrow = t('aboutPage.eyebrow')
  const intro = t('aboutPage.intro')
  const mission = t('aboutPage.mission')
  const vision = t('aboutPage.vision')
  const values = t('aboutPage.values') || []
  const stats = t('aboutPage.stats') || []
  const why = t('aboutPage.why') || []

  useEffect(() => {
    const prev = document.title
    document.title = `${title} | ${t('company.name')}`
    return () => {
      document.title = prev
    }
  }, [title, t])

  return (
    <section className="relative min-h-screen pt-24 pb-20">
      <div className="relative h-[40vh] min-h-[240px] max-h-[380px] overflow-hidden">
        <SafeImage
          src={images.controlRoom}
          fallback={images.technology}
          alt={title}
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/75 to-surface-950/40" />
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-l from-brand-500 to-orange-600" />

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-10">
            <motion.a
              href="#/"
              initial={{ opacity: 0, x: isRtl ? 12 : -12 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-brand-400 transition-colors mb-4"
            >
              <Arrow className={`w-4 h-4 ${isRtl ? '' : 'rotate-180'}`} />
              {t('aboutPage.back')}
            </motion.a>
            <p className="text-brand-400 text-sm font-bold tracking-wide mb-2">{eyebrow}</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              {title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-6 sm:p-8 border border-white/10 mb-10"
        >
          <p className="text-slate-200 text-base sm:text-lg leading-relaxed mb-6">{intro}</p>
          <div className="flex flex-wrap gap-3">
            <a href="#contact" className="btn-primary text-sm !py-3 !px-6">
              {t('aboutPage.ctaContact')}
            </a>
            <a href="#/careers" className="btn-outline text-sm !py-3 !px-6">
              {t('aboutPage.ctaCareers')}
            </a>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-5 border border-white/10 text-center"
            >
              <p className="text-2xl sm:text-3xl font-black text-brand-400 mb-1">{stat.value}</p>
              <p className="text-sm text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <motion.article
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-6 sm:p-7 border border-white/10"
          >
            <div className="w-11 h-11 rounded-xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center mb-4">
              <Target className="w-5 h-5 text-brand-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">{mission.title}</h2>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">{mission.body}</p>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="glass rounded-3xl p-6 sm:p-7 border border-white/10"
          >
            <div className="w-11 h-11 rounded-xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center mb-4">
              <Eye className="w-5 h-5 text-brand-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">{vision.title}</h2>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">{vision.body}</p>
          </motion.article>
        </div>

        <div className="mb-10">
          <h2 className="text-xl sm:text-2xl font-black text-white mb-6">{t('aboutPage.valuesTitle')}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {values.map((item, i) => {
              const Icon = valueIcons[i % valueIcons.length]
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.04, 0.2) }}
                  className="glass rounded-2xl p-5 border border-white/10 flex gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-500/15 border border-brand-500/25 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-brand-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.body}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-6 sm:p-8 border border-white/10 mb-10"
        >
          <h2 className="text-xl sm:text-2xl font-black text-white mb-5">{t('aboutPage.whyTitle')}</h2>
          <ul className="space-y-3">
            {why.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-300 text-sm sm:text-base">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="glass rounded-3xl p-6 sm:p-7 border border-white/10 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-bold mb-1">{t('company.fullName')}</p>
              <p className="text-sm text-slate-400">{t('company.address')}</p>
              <p className="text-sm text-slate-400">{t('company.hours')}</p>
            </div>
          </div>
          <div className="flex flex-col sm:items-end gap-1 text-sm">
            <a href={`mailto:${COMPANY.email}`} className="text-brand-400 hover:text-brand-300" dir="ltr">
              {COMPANY.email}
            </a>
            <a href={`tel:${COMPANY.phoneTel}`} className="text-brand-400 hover:text-brand-300" dir="ltr">
              {COMPANY.phoneDisplay || COMPANY.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
