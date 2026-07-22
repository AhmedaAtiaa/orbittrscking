import { useEffect, useState } from 'react'
import {
  parsePathname,
  resolveLegacyHash,
  navigate,
  LOCATION_CHANGE_EVENT,
} from '../utils/paths'
import { DEFAULT_LOCALE } from '../seo/siteConfig'

function readRoute() {
  if (typeof window === 'undefined') {
    return { name: 'home', locale: DEFAULT_LOCALE, serviceId: null, slug: null }
  }
  return parsePathname(window.location.pathname)
}

/**
 * Path-based History API router (replaces hash routing for SEO).
 */
export function usePathRoute() {
  const [route, setRoute] = useState(readRoute)

  useEffect(() => {
    const sync = () => setRoute(readRoute())

    // One-time legacy hash → path redirect
    const legacy = resolveLegacyHash(window.location.hash, readRoute().locale)
    if (legacy) {
      navigate(legacy, { replace: true })
      sync()
    }

    // popstate: browser back/forward
    // LOCATION_CHANGE_EVENT: in-app navigate() after pushState/replaceState
    window.addEventListener('popstate', sync)
    window.addEventListener(LOCATION_CHANGE_EVENT, sync)
    return () => {
      window.removeEventListener('popstate', sync)
      window.removeEventListener(LOCATION_CHANGE_EVENT, sync)
    }
  }, [])

  // Scroll to top on route or locale change. Home section hashes (#contact) are
  // handled by App's hash-scroll effect only when a hash is still present.
  useEffect(() => {
    if (route.name === 'home' && window.location.hash && !window.location.hash.startsWith('#/')) {
      return
    }
    window.scrollTo(0, 0)
  }, [route.name, route.serviceId, route.slug, route.locale])

  return route
}
