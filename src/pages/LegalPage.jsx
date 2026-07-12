import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft, Shield, Scale } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { COMPANY } from '../data/images'
import { useEffect } from 'react'

export default function LegalPage({ type = 'privacy' }) {
  const { t, isRtl } = useLanguage()
  const Arrow = isRtl ? ArrowLeft : ArrowRight
  const isPrivacy = type === 'privacy'
  const base = isPrivacy ? 'privacyPage' : 'termsPage'
  const Icon = isPrivacy ? Shield : Scale

  const title = t(`${base}.title`)
  const updated = t(`${base}.updated`)
  const intro = t(`${base}.intro`)
  const sections = t(`${base}.sections`) || []
  const contactNote = t(`${base}.contactNote`)

  useEffect(() => {
    const prev = document.title
    document.title = `${title} | ${t('company.name')}`
    return () => {
      document.title = prev
    }
  }, [title, t])

  return (
    <section className="relative min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.a
          href="#/"
          initial={{ opacity: 0, x: isRtl ? 12 : -12 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-brand-400 transition-colors mb-8"
        >
          <Arrow className={`w-4 h-4 ${isRtl ? '' : 'rotate-180'}`} />
          {t('privacyPage.back')}
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass rounded-3xl p-6 sm:p-10 border border-white/10"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center shrink-0">
              <Icon className="w-6 h-6 text-brand-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">{title}</h1>
              <p className="text-sm text-slate-400">{updated}</p>
            </div>
          </div>

          <p className="text-slate-200 leading-relaxed mb-10 text-base sm:text-lg border-b border-white/10 pb-8">
            {intro}
          </p>

          <div className="space-y-8">
            {Array.isArray(sections) &&
              sections.map((section, i) => (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: Math.min(i * 0.04, 0.3) }}
                >
                  <h2 className="text-lg sm:text-xl font-bold text-brand-300 mb-3">
                    {i + 1}. {section.title}
                  </h2>
                  <div className="space-y-3">
                    {(section.paragraphs || []).map((p, j) => (
                      <p key={j} className="text-slate-300 leading-relaxed text-sm sm:text-base">
                        {p}
                      </p>
                    ))}
                  </div>
                </motion.article>
              ))}
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 rounded-2xl bg-white/5 p-5 sm:p-6">
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-4">{contactNote}</p>
            <div className="flex flex-col sm:flex-row gap-3 text-sm">
              <a
                href={`mailto:${COMPANY.email}`}
                className="text-brand-400 hover:text-brand-300 transition-colors"
                dir="ltr"
              >
                {COMPANY.email}
              </a>
              <span className="hidden sm:inline text-slate-600">·</span>
              <a
                href={`tel:${COMPANY.phoneTel}`}
                className="text-brand-400 hover:text-brand-300 transition-colors"
                dir="ltr"
              >
                {COMPANY.phoneDisplay || COMPANY.phone}
              </a>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 text-sm">
            {isPrivacy ? (
              <a href="#/terms" className="text-slate-400 hover:text-brand-400 transition-colors underline underline-offset-4">
                {t('footer.links.terms')}
              </a>
            ) : (
              <a href="#/privacy" className="text-slate-400 hover:text-brand-400 transition-colors underline underline-offset-4">
                {t('footer.links.privacy')}
              </a>
            )}
            <a href="#contact" className="text-slate-400 hover:text-brand-400 transition-colors underline underline-offset-4">
              {t('nav.contact')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
