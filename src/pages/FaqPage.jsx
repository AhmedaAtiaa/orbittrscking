import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import { getSiteFaqs } from '../data/serviceFaqs'
import FaqSection from '../components/seo/FaqSection'
import Breadcrumbs from '../components/seo/Breadcrumbs'
import AppLink from '../components/AppLink'
import { buildBreadcrumbs } from '../seo/pageMeta'
import { contactHash, blogPath, servicePath } from '../utils/paths'
import { SERVICE_IDS } from '../utils/goToService'

export default function FaqPage() {
  const { t, locale, isRtl } = useLanguage()
  const faqs = getSiteFaqs(locale)
  const crumbs = buildBreadcrumbs({ name: 'faq' }, locale)
  const title = locale === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'
  const subtitle =
    locale === 'ar'
      ? 'إجابات حول أبعاد المدار، تتبع المركبات، إدارة الأسطول، وأجهزة التتبع في السعودية.'
      : 'Answers about Orbit Dimension, vehicle tracking, fleet management, and GPS devices in Saudi Arabia.'

  return (
    <section className="relative min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Breadcrumbs items={crumbs} />
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-brand-400 text-sm font-bold mb-2">{t('company.name')}</p>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">{title}</h1>
          <p className="text-slate-300 leading-relaxed mb-8">{subtitle}</p>
        </motion.div>

        <FaqSection faqs={faqs} title={null} id="site-faq" />

        <div className="mt-12 rounded-3xl border border-white/10 bg-slate-900/40 p-6">
          <h2 className="text-lg font-bold text-white mb-3">
            {locale === 'ar' ? 'استكشف الحلول' : 'Explore solutions'}
          </h2>
          <ul className="grid sm:grid-cols-2 gap-2 text-sm">
            {SERVICE_IDS.slice(0, 6).map((id) => (
              <li key={id}>
                <AppLink href={servicePath(locale, id)} className="text-slate-300 hover:text-brand-400 transition-colors">
                  {t(`services.items.${id}.title`)}
                </AppLink>
              </li>
            ))}
          </ul>
          <div className={`mt-6 flex flex-wrap gap-3 ${isRtl ? '' : ''}`}>
            <AppLink href={contactHash(locale)} className="btn-primary text-sm !py-3 !px-6">
              {locale === 'ar' ? 'تواصل معنا' : 'Contact us'}
            </AppLink>
            <AppLink href={blogPath(locale)} className="btn-outline text-sm !py-3 !px-6">
              {locale === 'ar' ? 'المدونة' : 'Blog'}
            </AppLink>
          </div>
        </div>
      </div>
    </section>
  )
}
