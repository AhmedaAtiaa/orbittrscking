import { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Briefcase, MapPin, Clock, Send, CheckCircle2,
} from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { COMPANY } from '../data/images'

export default function CareersPage() {
  const { t, isRtl } = useLanguage()
  const Arrow = isRtl ? ArrowLeft : ArrowRight
  const title = t('careersPage.title')
  const jobs = t('careersPage.jobs') || []
  const benefits = t('careersPage.benefits') || []
  const steps = t('careersPage.steps') || []

  useEffect(() => {
    const prev = document.title
    document.title = `${title} | ${t('company.name')}`
    return () => {
      document.title = prev
    }
  }, [title, t])

  const applyHref = `mailto:${COMPANY.email}?subject=${encodeURIComponent(t('careersPage.emailSubject'))}`

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
          {t('careersPage.back')}
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center shrink-0">
              <Briefcase className="w-6 h-6 text-brand-400" />
            </div>
            <div>
              <p className="text-brand-400 text-sm font-bold mb-1">{t('careersPage.eyebrow')}</p>
              <h1 className="text-2xl sm:text-4xl font-black text-white">{title}</h1>
            </div>
          </div>
          <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-3xl">
            {t('careersPage.intro')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-5">
            <h2 className="text-xl font-bold text-white">{t('careersPage.openingsTitle')}</h2>
            {jobs.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-3xl p-6 sm:p-8 border border-white/10"
              >
                <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                  {t('careersPage.emptyJobs')}
                </p>
              </motion.div>
            ) : (
              jobs.map((job, i) => (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.05, 0.25) }}
                  className="glass rounded-3xl p-5 sm:p-6 border border-white/10"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <h3 className="text-lg font-bold text-white">{job.title}</h3>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-brand-500/15 text-brand-300 border border-brand-500/25">
                      {job.type}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-4">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-400" />
                      {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-brand-400" />
                      {job.department}
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">{job.summary}</p>
                  <ul className="space-y-2 mb-5">
                    {(job.requirements || []).map((req, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-slate-400">
                        <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`${applyHref}%20-%20${encodeURIComponent(job.title)}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-brand-400 hover:text-brand-300 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    {t('careersPage.apply')}
                  </a>
                </motion.article>
              ))
            )}
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-3xl p-6 border border-white/10"
            >
              <h2 className="text-lg font-bold text-white mb-4">{t('careersPage.benefitsTitle')}</h2>
              <ul className="space-y-3">
                {benefits.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-3xl p-6 border border-white/10"
            >
              <h2 className="text-lg font-bold text-white mb-4">{t('careersPage.processTitle')}</h2>
              <ol className="space-y-4">
                {steps.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="w-7 h-7 rounded-lg bg-brand-500/20 text-brand-400 text-sm font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-white text-sm mb-0.5">{step.title}</p>
                      <p className="text-xs text-slate-400 leading-relaxed">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </motion.div>

            <div className="rounded-3xl p-6 border border-brand-500/30 bg-brand-500/10">
              <p className="text-sm text-slate-200 leading-relaxed mb-4">{t('careersPage.ctaNote')}</p>
              <div className="flex flex-col gap-2">
                <a href={applyHref} className="btn-primary text-sm !py-3 text-center">
                  {t('careersPage.ctaEmail')}
                </a>
                <a
                  href={COMPANY.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-sm !py-3 text-center"
                >
                  {t('careersPage.ctaWhatsapp')}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm">
          <a href="#/about" className="text-slate-400 hover:text-brand-400 transition-colors underline underline-offset-4">
            {t('footer.links.about')}
          </a>
          <a href="#contact" className="text-slate-400 hover:text-brand-400 transition-colors underline underline-offset-4">
            {t('nav.contact')}
          </a>
        </div>
      </div>
    </section>
  )
}
