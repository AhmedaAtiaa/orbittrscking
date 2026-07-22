import { motion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, CheckCircle2, Layers, ListChecks,
  Route, Sparkles, Target,
} from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { COMPANY, images } from '../data/images'
import { serviceMeta } from '../data/serviceMeta'
import { SERVICE_IDS } from '../utils/goToService'
import { getServiceFaqs } from '../data/serviceFaqs'
import SafeImage from '../components/ui/SafeImage'
import AppLink from '../components/AppLink'
import Breadcrumbs from '../components/seo/Breadcrumbs'
import FaqSection from '../components/seo/FaqSection'
import { buildBreadcrumbs } from '../seo/pageMeta'
import { homePath, contactHash, sectionHash, servicePath } from '../utils/paths'

export default function ServiceDetailPage({ serviceId }) {
  const { t, isRtl, locale } = useLanguage()
  const Arrow = isRtl ? ArrowLeft : ArrowRight
  const pages = t('servicePages.pages') || {}
  const page = pages[serviceId]
  const meta = serviceMeta[serviceId]
  const valid = Boolean(page && meta)
  const faqs = getServiceFaqs(serviceId, locale)
  const faqTitle = locale === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'

  if (!valid) {
    return (
      <section className="relative min-h-screen pt-28 pb-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">{t('servicePages.notFound') || 'Service not found'}</h1>
          <AppLink href={sectionHash(locale, 'services')} className="text-brand-400 hover:text-brand-300">
            {t('servicePages.backServices')}
          </AppLink>
        </div>
      </section>
    )
  }

  const related = SERVICE_IDS.filter((id) => id !== serviceId).slice(0, 3)
  const crumbs = buildBreadcrumbs({ name: 'service', serviceId }, locale, page.title)

  return (
    <section className="relative min-h-screen pt-24 pb-20">
      <div className="relative h-[42vh] min-h-[260px] max-h-[420px] overflow-hidden">
        <SafeImage
          src={meta.image}
          fallback={meta.imageFallback || images.fleet}
          alt={page.title}
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/70 to-surface-950/30" />
        <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-l ${meta.gradient}`} />

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-10">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 12 : -12 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <AppLink
                href={homePath(locale)}
                className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-brand-400 transition-colors mb-4"
              >
                <Arrow className={`w-4 h-4 ${isRtl ? '' : 'rotate-180'}`} />
                {t('servicePages.back')}
              </AppLink>
            </motion.div>
            <p className="text-brand-400 text-sm font-bold tracking-wide mb-2">{page.eyebrow}</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight max-w-3xl">
              {page.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <Breadcrumbs items={crumbs} />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-6 sm:p-8 border border-white/10 mb-10"
        >
          <p className="text-slate-200 text-base sm:text-lg leading-relaxed mb-6">{page.summary}</p>
          <div className="flex flex-wrap gap-3">
            <AppLink href={contactHash(locale)} className="btn-primary text-sm !py-3 !px-6">
              {t('servicePages.requestQuote')}
            </AppLink>
            <a
              href={COMPANY.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-sm !py-3 !px-6"
            >
              {t('servicePages.talkWhatsapp')}
            </a>
            <AppLink href={sectionHash(locale, 'services')} className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-brand-400 px-2">
              {t('servicePages.backServices')}
            </AppLink>
          </div>
        </motion.div>

        <div className="space-y-10">
          <DetailBlock icon={Sparkles} title={t('services.label')} accent={meta.accent}>
            {(page.overview || []).map((p, i) => (
              <p key={i} className="text-slate-300 leading-relaxed text-sm sm:text-base mb-3 last:mb-0">
                {p}
              </p>
            ))}
          </DetailBlock>

          <DetailBlock icon={Layers} title={t('servicePages.systemLabel')} accent={meta.accent}>
            <ul className="space-y-3">
              {(page.system || []).map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300 text-sm sm:text-base">
                  <CheckCircle2 className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </DetailBlock>

          <DetailBlock icon={Route} title={t('servicePages.howLabel')} accent={meta.accent}>
            <div className="grid sm:grid-cols-2 gap-4">
              {(page.steps || []).map((step, i) => (
                <div key={i} className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${meta.gradient} flex items-center justify-center text-sm font-black`}>
                      {i + 1}
                    </span>
                    <h3 className="font-bold text-white">{step.title}</h3>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>
          </DetailBlock>

          <div className="grid lg:grid-cols-2 gap-6">
            <DetailBlock icon={Target} title={t('servicePages.benefitsLabel')} accent={meta.accent}>
              <ul className="space-y-2.5">
                {(page.benefits || []).map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </DetailBlock>

            <DetailBlock icon={ListChecks} title={t('servicePages.useCasesLabel')} accent={meta.accent}>
              <ul className="space-y-2.5">
                {(page.useCases || []).map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </DetailBlock>
          </div>

          <DetailBlock icon={CheckCircle2} title={t('servicePages.featuresLabel')} accent={meta.accent}>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {(page.features || []).map((feature, i) => (
                <div key={i} className="flex items-start gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                  {feature}
                </div>
              ))}
            </div>
          </DetailBlock>

          <FaqSection title={faqTitle} faqs={faqs} id={`service-faq-${serviceId}`} />

          <div>
            <h2 className="text-lg font-bold text-white mb-4">{t('servicePages.relatedLabel')}</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((id) => {
                const rel = pages[id]
                const relMeta = serviceMeta[id]
                if (!rel || !relMeta) return null
                return (
                  <AppLink
                    key={id}
                    href={servicePath(locale, id)}
                    className="text-start rounded-2xl overflow-hidden border border-white/10 bg-slate-900/50 hover:border-brand-500/40 transition-colors group"
                  >
                    <div className="h-28 overflow-hidden">
                      <SafeImage src={relMeta.image} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-brand-400 mb-1">{rel.eyebrow}</p>
                      <p className="text-sm font-bold text-white leading-snug">{rel.title}</p>
                    </div>
                  </AppLink>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function DetailBlock({ icon: Icon, title, accent, children }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      className="rounded-3xl border border-white/10 bg-slate-900/40 p-5 sm:p-7"
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10"
          style={{ backgroundColor: `${accent}22` }}
        >
          <Icon className="w-5 h-5" style={{ color: accent }} />
        </div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
      {children}
    </motion.article>
  )
}
