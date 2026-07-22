import { useEffect } from 'react'
import {
  SITE_URL,
  BRAND,
  VERIFICATION,
  DEFAULT_LOCALE,
} from './siteConfig'
import { absoluteUrl, localePath, homePath } from '../utils/paths'
import { buildGraph } from './schemas'

function upsertMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href, attrs = {}) {
  const selector = Object.entries(attrs)
    .map(([k, v]) => `[${k}="${v}"]`)
    .join('')
  let el = document.head.querySelector(`link[rel="${rel}"]${selector}`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v))
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function upsertJsonLd(id, data) {
  const existing = document.getElementById(id)
  if (!data) {
    existing?.remove()
    return
  }
  const json = JSON.stringify(data)
  if (existing) {
    existing.textContent = json
    return
  }
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = id
  script.textContent = json
  document.head.appendChild(script)
}

/**
 * Dynamic SEO head manager — titles, descriptions, canonical, OG, Twitter, hreflang, JSON-LD.
 */
export default function SeoHead({
  locale = DEFAULT_LOCALE,
  title,
  description,
  path,
  keywords = [],
  image = BRAND.ogImage,
  type = 'website',
  schemas = [],
  noindex = false,
}) {
  useEffect(() => {
    const canonicalPath = path || homePath(locale)
    const url = absoluteUrl(canonicalPath)
    const fullTitle = title
    const desc = description
    const ogImage = image?.startsWith('http') ? image : `${SITE_URL}${image}`

    document.title = fullTitle
    document.documentElement.lang = locale
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'

    upsertMeta('name', 'description', desc)
    upsertMeta('name', 'keywords', keywords.join(', '))
    upsertMeta('name', 'author', locale === 'ar' ? BRAND.legalAr : BRAND.legalEn)
    upsertMeta('name', 'robots', noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1')
    upsertMeta('name', 'googlebot', noindex ? 'noindex,nofollow' : 'index,follow')
    upsertMeta('name', 'theme-color', BRAND.themeColor)
    upsertMeta('name', 'application-name', locale === 'ar' ? BRAND.nameAr : BRAND.nameEn)
    upsertMeta('name', 'apple-mobile-web-app-title', locale === 'ar' ? BRAND.nameAr : BRAND.nameEn)
    upsertMeta('name', 'format-detection', 'telephone=yes')
    upsertMeta('name', 'geo.region', 'SA-01')
    upsertMeta('name', 'geo.placename', locale === 'ar' ? 'الرياض' : 'Riyadh')

    if (VERIFICATION.google) upsertMeta('name', 'google-site-verification', VERIFICATION.google)
    if (VERIFICATION.bing) upsertMeta('name', 'msvalidate.01', VERIFICATION.bing)

    // Open Graph
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:site_name', locale === 'ar' ? BRAND.nameAr : BRAND.nameEn)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', desc)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', ogImage)
    upsertMeta('property', 'og:image:alt', fullTitle)
    upsertMeta('property', 'og:locale', locale === 'ar' ? 'ar_SA' : 'en_US')
    upsertMeta('property', 'og:locale:alternate', locale === 'ar' ? 'en_US' : 'ar_SA')

    // Twitter
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', desc)
    upsertMeta('name', 'twitter:image', ogImage)

    // Canonical + hreflang
    upsertLink('canonical', url)

    const arPath = locale === 'ar' ? canonicalPath : canonicalPath.replace(/^\/en/, '') || '/'
    const enPath = localePath('en', locale === 'en' ? canonicalPath.replace(/^\/en/, '') || '/' : canonicalPath)

    upsertLink('alternate', absoluteUrl(arPath === '/' ? '/' : arPath), { hreflang: 'ar' })
    upsertLink('alternate', absoluteUrl(enPath), { hreflang: 'en' })
    upsertLink('alternate', absoluteUrl(arPath === '/' ? '/' : arPath), { hreflang: 'x-default' })

    upsertJsonLd('orbit-jsonld', buildGraph(schemas))
  }, [
    locale,
    title,
    description,
    path,
    // Primitive deps avoid re-running when parent recreates arrays each render
    keywords.join('|'),
    image,
    type,
    JSON.stringify(schemas),
    noindex,
  ])

  return null
}
