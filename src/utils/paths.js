import {
  SITE_URL,
  DEFAULT_LOCALE,
  SERVICE_SLUGS,
  SLUG_TO_SERVICE,
} from '../seo/siteConfig'

/**
 * Parse pathname into route + locale.
 * AR (default): /, /about, /services/gps-tracking, /blog/slug
 * EN: /en, /en/about, /en/services/gps-tracking
 */
export function parsePathname(pathname = '/') {
  let path = pathname.replace(/\/+$/, '') || '/'
  let locale = DEFAULT_LOCALE
  let rest = path

  if (path === '/en' || path.startsWith('/en/')) {
    locale = 'en'
    rest = path === '/en' ? '/' : path.slice(3) || '/'
  }

  if (rest === '/' || rest === '') {
    return { name: 'home', locale, serviceId: null, slug: null }
  }

  const segments = rest.replace(/^\//, '').split('/')

  if (segments[0] === 'about') return { name: 'about', locale, serviceId: null, slug: null }
  if (segments[0] === 'team') return { name: 'team', locale, serviceId: null, slug: null }
  if (segments[0] === 'careers') return { name: 'careers', locale, serviceId: null, slug: null }
  if (segments[0] === 'privacy') return { name: 'privacy', locale, serviceId: null, slug: null }
  if (segments[0] === 'terms') return { name: 'terms', locale, serviceId: null, slug: null }
  if (segments[0] === 'faq') return { name: 'faq', locale, serviceId: null, slug: null }
  if (segments[0] === 'blog') {
    if (segments[1]) return { name: 'blog-post', locale, serviceId: null, slug: segments[1] }
    return { name: 'blog', locale, serviceId: null, slug: null }
  }
  if (segments[0] === 'services' && segments[1]) {
    const serviceId = SLUG_TO_SERVICE[segments[1]] || null
    return { name: 'service', locale, serviceId, slug: segments[1] }
  }

  return { name: 'notfound', locale, serviceId: null, slug: null }
}

/** Build locale-aware path */
export function localePath(locale, path = '/') {
  const clean = path.startsWith('/') ? path : `/${path}`
  if (locale === 'en') {
    if (clean === '/') return '/en'
    return `/en${clean}`
  }
  return clean === '/' ? '/' : clean
}

export function homePath(locale) {
  return localePath(locale, '/')
}

export function aboutPath(locale) {
  return localePath(locale, '/about')
}

export function teamPath(locale) {
  return localePath(locale, '/team')
}

export function careersPath(locale) {
  return localePath(locale, '/careers')
}

export function privacyPath(locale) {
  return localePath(locale, '/privacy')
}

export function termsPath(locale) {
  return localePath(locale, '/terms')
}

export function faqPath(locale) {
  return localePath(locale, '/faq')
}

export function blogPath(locale, slug) {
  if (slug) return localePath(locale, `/blog/${slug}`)
  return localePath(locale, '/blog')
}

export function servicePath(locale, serviceId) {
  const slug = SERVICE_SLUGS[serviceId] || serviceId
  return localePath(locale, `/services/${slug}`)
}

export function contactHash(locale) {
  return `${homePath(locale)}#contact`
}

export function sectionHash(locale, section) {
  return `${homePath(locale)}#${section}`
}

/** Absolute canonical URL */
export function absoluteUrl(path) {
  const p = path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
  return p.replace(/\/$/, '') || SITE_URL
}

/** Swap locale keeping the same logical page */
export function switchLocalePath(currentPath, targetLocale) {
  const route = parsePathname(currentPath)
  switch (route.name) {
    case 'home':
      return homePath(targetLocale)
    case 'about':
      return aboutPath(targetLocale)
    case 'team':
      return teamPath(targetLocale)
    case 'careers':
      return careersPath(targetLocale)
    case 'privacy':
      return privacyPath(targetLocale)
    case 'terms':
      return termsPath(targetLocale)
    case 'faq':
      return faqPath(targetLocale)
    case 'blog':
      return blogPath(targetLocale)
    case 'blog-post':
      return blogPath(targetLocale, route.slug)
    case 'service':
      return route.serviceId ? servicePath(targetLocale, route.serviceId) : homePath(targetLocale)
    default:
      return homePath(targetLocale)
  }
}

/** Redirect legacy hash URLs → path URLs */
export function resolveLegacyHash(hash, locale = DEFAULT_LOCALE) {
  if (!hash || hash === '#' || hash === '#/') return null
  const h = hash.replace(/^#/, '')
  if (h.startsWith('/privacy')) return privacyPath(locale)
  if (h.startsWith('/terms')) return termsPath(locale)
  if (h.startsWith('/about')) return aboutPath(locale)
  if (h.startsWith('/careers')) return careersPath(locale)
  if (h.startsWith('/team')) return teamPath(locale)
  const m = h.match(/^\/service\/([a-zA-Z0-9_-]+)/)
  if (m) {
    const id = m[1]
    if (SERVICE_SLUGS[id]) return servicePath(locale, id)
  }
  return null
}

/** Fired after pushState/replaceState so the SPA router can sync (synthetic popstate is unreliable). */
export const LOCATION_CHANGE_EVENT = 'orbit:locationchange'

export function navigate(to, { replace = false } = {}) {
  if (typeof window === 'undefined') return
  // Normalize via URL so a hashless target always drops any existing #contact hash.
  const next = new URL(to, window.location.origin)
  const wantsHash = typeof to === 'string' && to.includes('#')
  if (!wantsHash) next.hash = ''
  const url = `${next.pathname}${next.search}${next.hash}`
  if (replace) window.history.replaceState({}, '', url)
  else window.history.pushState({}, '', url)
  // Custom event is the source of truth for in-app navigation.
  // Keep popstate for browser back/forward and any listeners that already use it.
  window.dispatchEvent(new Event(LOCATION_CHANGE_EVENT))
  window.dispatchEvent(new PopStateEvent('popstate'))
  const hash = next.hash ? next.hash.slice(1) : ''
  if (hash && !hash.startsWith('/')) {
    requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
    })
  } else {
    window.scrollTo(0, 0)
  }
}
