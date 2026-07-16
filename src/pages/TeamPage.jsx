import { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Users, Wrench, Headphones, LineChart, Settings2,
  ShieldCheck, Zap, HeartHandshake,
} from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { COMPANY } from '../data/images'

const deptIcons = [Wrench, Headphones, LineChart, Settings2]
const valueIcons = [ShieldCheck, Zap, HeartHandshake]

export default function TeamPage() {
  const { t, isRtl } = useLanguage()
  const Arrow = isRtl ? ArrowLeft : ArrowRight
  const title = t('teamPage.title')
  const departments = t('teamPage.departments') || []
  const values = t('teamPage.values') || []

  useEffect(() => {
    const prev = document.title
    document.title = `${title} | ${t('company.name')}`
    return () => {
      document.title = prev
    }
  }, [title, t])

  return (
    <section className="relative min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.a
          href="#/"
          initial={{ opacity: 0, x: isRtl ? 12 : -12 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-brand-400 transition-colors mb-8"
        >
          <Arrow className={`w-4 h-4 ${isRtl ? '' : 'rotate-180'}`} />
          {t('teamPage.back')}
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6 text-brand-400" />
            </div>
            <div>
              <p className="text-brand-400 text-sm font-bold mb-1">{t('teamPage.eyebrow')}</p>
              <h1 className="text-2xl sm:text-4xl font-black text-white">{title}</h1>
            </div>
          </div>
          <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-3xl">
            {t('teamPage.intro')}
          </p>
        </motion.div>

        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl font-black text-white mb-6">{t('teamPage.departmentsTitle')}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {departments.map((dept, i) => {
              const Icon = deptIcons[i % deptIcons.length]
              return (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.05, 0.2) }}
                  className="glass rounded-3xl p-5 sm:p-6 border border-white/10"
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-500/15 border border-brand-500/25 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-brand-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{dept.title}</h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-3">{dept.body}</p>
                  <p className="text-xs sm:text-sm text-brand-300/90 leading-relaxed">{dept.benefit}</p>
                </motion.article>
              )
            })}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl font-black text-white mb-6">{t('teamPage.valuesTitle')}</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {values.map((item, i) => {
              const Icon = valueIcons[i % valueIcons.length]
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.04, 0.15) }}
                  className="glass rounded-2xl p-5 border border-white/10"
                >
                  <Icon className="w-5 h-5 text-brand-400 mb-3" />
                  <h3 className="font-bold text-white mb-1.5">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.body}</p>
                </motion.div>
              )
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-6 sm:p-8 border border-white/10 border-brand-500/20 bg-brand-500/5"
        >
          <h2 className="text-xl font-bold text-white mb-3">{t('teamPage.ctaTitle')}</h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
            {t('teamPage.ctaBody')}
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#contact" className="btn-primary text-sm !py-3 !px-6">
              {t('teamPage.ctaContact')}
            </a>
            <a href="#/careers" className="btn-outline text-sm !py-3 !px-6">
              {t('teamPage.ctaCareers')}
            </a>
            <a
              href={COMPANY.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-slate-400 hover:text-brand-400 px-2"
            >
              {t('company.whatsapp')}
            </a>
          </div>
          <a
            href={`mailto:${COMPANY.emailCare}`}
            className="inline-flex mt-5 text-sm font-medium text-brand-400 hover:text-brand-300 transition-colors"
            dir="ltr"
          >
            {COMPANY.emailCare}
          </a>
        </motion.div>

        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <a href="#/about" className="text-slate-400 hover:text-brand-400 transition-colors underline underline-offset-4">
            {t('footer.links.about')}
          </a>
          <a href="#/careers" className="text-slate-400 hover:text-brand-400 transition-colors underline underline-offset-4">
            {t('footer.links.careers')}
          </a>
        </div>
      </div>
    </section>
  )
}
