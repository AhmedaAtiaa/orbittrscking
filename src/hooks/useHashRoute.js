import { useEffect, useState } from 'react'

/**
 * @returns {{ name: 'home' | 'privacy' | 'terms' | 'about' | 'careers' | 'service', serviceId?: string }}
 */
function parseRoute(hash) {
  if (hash.startsWith('#/privacy')) return { name: 'privacy' }
  if (hash.startsWith('#/terms')) return { name: 'terms' }
  if (hash.startsWith('#/about')) return { name: 'about' }
  if (hash.startsWith('#/careers')) return { name: 'careers' }
  const serviceMatch = hash.match(/^#\/service\/([a-zA-Z0-9_-]+)/)
  if (serviceMatch) return { name: 'service', serviceId: serviceMatch[1] }
  return { name: 'home' }
}

/** توجيه بسيط عبر الهاش بدون مكتبة */
export function useHashRoute() {
  const [route, setRoute] = useState(() =>
    typeof window !== 'undefined' ? parseRoute(window.location.hash) : { name: 'home' }
  )

  useEffect(() => {
    const onHash = () => setRoute(parseRoute(window.location.hash))
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    if (route.name !== 'home') {
      window.scrollTo(0, 0)
    }
  }, [route])

  return route
}
