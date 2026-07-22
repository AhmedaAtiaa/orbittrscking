import SeoHead from './SeoHead'
import { getPageMeta, getServiceMeta, buildBreadcrumbs } from './pageMeta'
import {
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
  webPageSchema,
  breadcrumbSchema,
  faqSchema,
  productSchema,
  softwareApplicationSchema,
  serviceSchema,
  articleSchema,
} from './schemas'
import { BRAND } from './siteConfig'
import {
  homePath,
  aboutPath,
  teamPath,
  careersPath,
  privacyPath,
  termsPath,
  faqPath,
  blogPath,
  servicePath,
} from '../utils/paths'
import { getServiceFaqs, getSiteFaqs } from '../data/serviceFaqs'
import { getBlogPost } from '../data/blogPosts'
import { absoluteUrl } from '../utils/paths'

/** Route-aware SEO document head + JSON-LD graph */
export default function RouteSeo({ route, serviceTitle }) {
  const { locale, name, serviceId, slug } = route
  let meta = getPageMeta('home', locale)
  let path = homePath(locale)
  let type = 'website'
  let image = BRAND.ogImage
  let schemas = [
    organizationSchema(locale),
    localBusinessSchema(locale),
    websiteSchema(locale),
  ]
  let crumbs = []
  let noindex = false

  if (name === 'about') {
    meta = getPageMeta('about', locale)
    path = aboutPath(locale)
    crumbs = buildBreadcrumbs(route, locale)
  } else if (name === 'team') {
    meta = getPageMeta('team', locale)
    path = teamPath(locale)
    crumbs = buildBreadcrumbs(route, locale)
  } else if (name === 'careers') {
    meta = getPageMeta('careers', locale)
    path = careersPath(locale)
    crumbs = buildBreadcrumbs(route, locale)
  } else if (name === 'privacy') {
    meta = getPageMeta('privacy', locale)
    path = privacyPath(locale)
    crumbs = buildBreadcrumbs(route, locale)
  } else if (name === 'terms') {
    meta = getPageMeta('terms', locale)
    path = termsPath(locale)
    crumbs = buildBreadcrumbs(route, locale)
  } else if (name === 'faq') {
    meta = getPageMeta('faq', locale)
    path = faqPath(locale)
    crumbs = buildBreadcrumbs(route, locale)
    schemas.push(faqSchema(getSiteFaqs(locale)))
  } else if (name === 'blog') {
    meta = getPageMeta('blog', locale)
    path = blogPath(locale)
    crumbs = buildBreadcrumbs(route, locale)
    type = 'website'
  } else if (name === 'blog-post') {
    const post = getBlogPost(slug)
    if (!post) {
      noindex = true
      meta = {
        title: locale === 'ar' ? 'المقال غير موجود | أبعاد المدار' : 'Article not found | Orbit Dimension',
        description: meta.description,
        keywords: [],
      }
      path = blogPath(locale, slug)
    } else {
      const loc = post[locale] || post.ar
      meta = {
        title: `${loc.title} | ${locale === 'ar' ? BRAND.nameAr : BRAND.nameEn}`,
        description: loc.excerpt,
        keywords: loc.keywords || [],
      }
      path = blogPath(locale, slug)
      image = post.image?.startsWith('http') ? post.image : absoluteUrl(post.image)
      type = 'article'
      crumbs = buildBreadcrumbs(route, locale, loc.title)
      schemas.push(
        articleSchema({
          locale,
          title: loc.title,
          description: loc.excerpt,
          path,
          image,
          datePublished: post.datePublished,
          dateModified: post.dateModified,
          keywords: loc.keywords || [],
        })
      )
    }
  } else if (name === 'service' && serviceId) {
    meta = getServiceMeta(serviceId, locale)
    path = servicePath(locale, serviceId)
    const title = serviceTitle || meta.title
    crumbs = buildBreadcrumbs(route, locale, title)
    const faqs = getServiceFaqs(serviceId, locale)
    schemas.push(
      serviceSchema({
        locale,
        name: title,
        description: meta.description,
        path,
      }),
      productSchema({
        locale,
        name: title,
        description: meta.description,
        path,
      }),
      softwareApplicationSchema({
        locale,
        name: `${locale === 'ar' ? BRAND.nameAr : BRAND.nameEn} — ${title}`,
        description: meta.description,
        path,
      }),
      faqSchema(faqs)
    )
  } else if (name === 'notfound') {
    noindex = true
    meta = {
      title: locale === 'ar' ? 'الصفحة غير موجودة | أبعاد المدار' : 'Page not found | Orbit Dimension',
      description: meta.description,
      keywords: [],
    }
    path = typeof window !== 'undefined' ? window.location.pathname : homePath(locale)
  } else {
    // home — add software application for the platform
    schemas.push(
      softwareApplicationSchema({
        locale,
        name: locale === 'ar' ? 'منصة أبعاد المدار لتتبع المركبات' : 'Orbit Dimension Fleet Tracking Platform',
        description: meta.description,
        path,
      })
    )
  }

  schemas.push(
    webPageSchema({
      locale,
      title: meta.title,
      description: meta.description,
      path,
      type: name === 'blog-post' ? 'Article' : 'WebPage',
    })
  )

  if (crumbs.length) {
    schemas.push(breadcrumbSchema(crumbs))
  }

  return (
    <SeoHead
      locale={locale}
      title={meta.title}
      description={meta.description}
      keywords={meta.keywords || []}
      path={path}
      image={image}
      type={type}
      schemas={schemas}
      noindex={noindex}
    />
  )
}
