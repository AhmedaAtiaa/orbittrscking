import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import { getBlogPost, getBlogList } from '../data/blogPosts'
import Breadcrumbs from '../components/seo/Breadcrumbs'
import AppLink from '../components/AppLink'
import SafeImage from '../components/ui/SafeImage'
import { buildBreadcrumbs } from '../seo/pageMeta'
import { blogPath, contactHash, servicePath } from '../utils/paths'

export default function BlogPostPage({ slug }) {
  const { locale, isRtl } = useLanguage()
  const post = getBlogPost(slug)

  if (!post) {
    return (
      <section className="relative min-h-screen pt-28 pb-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">{locale === 'ar' ? 'المقال غير موجود' : 'Article not found'}</h1>
          <AppLink href={blogPath(locale)} className="text-brand-400 hover:text-brand-300">
            {locale === 'ar' ? 'العودة للمدونة' : 'Back to blog'}
          </AppLink>
        </div>
      </section>
    )
  }

  const loc = post[locale] || post.ar
  const crumbs = buildBreadcrumbs({ name: 'blog-post', slug }, locale, loc.title)
  const related = getBlogList().filter((p) => p.slug !== slug).slice(0, 3)

  return (
    <article className="relative min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Breadcrumbs items={crumbs} />
        <motion.header initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <time dateTime={post.datePublished} className="text-sm text-brand-400 font-medium">
            {post.datePublished}
          </time>
          <h1 className="text-3xl sm:text-4xl font-black text-white mt-2 mb-4 leading-tight">{loc.title}</h1>
          <p className="text-slate-300 text-lg leading-relaxed">{loc.excerpt}</p>
        </motion.header>

        <div className="rounded-3xl overflow-hidden border border-white/10 mb-8 h-56 sm:h-72">
          <SafeImage
            src={post.image}
            alt={loc.title}
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            width={1200}
            height={630}
          />
        </div>

        <div className="prose-orbit space-y-5">
          {loc.content.map((paragraph, i) => (
            <p key={i} className="text-slate-300 leading-relaxed text-base sm:text-[1.05rem]">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <AppLink href={contactHash(locale)} className="btn-primary text-sm !py-3 !px-6">
            {locale === 'ar' ? 'اطلب عرض سعر' : 'Get a quote'}
          </AppLink>
          <AppLink href={servicePath(locale, 'gps')} className="btn-outline text-sm !py-3 !px-6">
            {locale === 'ar' ? 'حلول التتبع' : 'Tracking solutions'}
          </AppLink>
          <AppLink href={blogPath(locale)} className="text-sm text-slate-400 hover:text-brand-400 px-2 py-3">
            {locale === 'ar' ? '← كل المقالات' : isRtl ? 'كل المقالات ←' : '← All articles'}
          </AppLink>
        </div>

        {related.length > 0 && (
          <aside className="mt-14" aria-label={locale === 'ar' ? 'مقالات ذات صلة' : 'Related articles'}>
            <h2 className="text-xl font-bold text-white mb-4">
              {locale === 'ar' ? 'مقالات ذات صلة' : 'Related articles'}
            </h2>
            <ul className="space-y-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <AppLink
                    href={blogPath(locale, r.slug)}
                    className="block rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-3 hover:border-brand-500/40 transition-colors"
                  >
                    <span className="text-sm font-semibold text-white">{(r[locale] || r.ar).title}</span>
                  </AppLink>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>
    </article>
  )
}
