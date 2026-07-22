import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import { getBlogList } from '../data/blogPosts'
import Breadcrumbs from '../components/seo/Breadcrumbs'
import AppLink from '../components/AppLink'
import SafeImage from '../components/ui/SafeImage'
import { buildBreadcrumbs } from '../seo/pageMeta'
import { blogPath } from '../utils/paths'

export default function BlogPage() {
  const { locale } = useLanguage()
  const posts = getBlogList()
  const crumbs = buildBreadcrumbs({ name: 'blog' }, locale)
  const title = locale === 'ar' ? 'مدونة أبعاد المدار' : 'Orbit Dimension Blog'
  const subtitle =
    locale === 'ar'
      ? 'مقالات عملية عن تتبع المركبات، إدارة الأسطول، GPS، مراقبة الوقود والحرارة، وكاميرات الذكاء الاصطناعي.'
      : 'Practical insights on fleet tracking, GPS, fuel and temperature monitoring, AI cameras, and IoT platforms.'

  return (
    <section className="relative min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Breadcrumbs items={crumbs} />
        <motion.header initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">{title}</h1>
          <p className="text-slate-300 max-w-2xl leading-relaxed">{subtitle}</p>
        </motion.header>

        <div className="grid sm:grid-cols-2 gap-6">
          {posts.map((post, i) => {
            const loc = post[locale] || post.ar
            return (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-3xl border border-white/10 bg-slate-900/40 overflow-hidden hover:border-brand-500/40 transition-colors group"
              >
                <AppLink href={blogPath(locale, post.slug)} className="block">
                  <div className="h-44 overflow-hidden">
                    <SafeImage
                      src={post.image}
                      alt={loc.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      width={640}
                      height={360}
                    />
                  </div>
                  <div className="p-5">
                    <time dateTime={post.datePublished} className="text-xs text-brand-400 font-medium">
                      {post.datePublished}
                    </time>
                    <h2 className="text-lg font-bold text-white mt-2 mb-2 leading-snug group-hover:text-brand-300 transition-colors">
                      {loc.title}
                    </h2>
                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">{loc.excerpt}</p>
                  </div>
                </AppLink>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
