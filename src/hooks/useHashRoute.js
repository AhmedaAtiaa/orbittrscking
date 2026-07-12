import { useEffect, useState } from 'react'

function parseRoute(hash) {
  if (hash.startsWith('#/privacy')) return 'privacy'
  if (hash.startsWith('#/terms')) return 'terms'
  return 'home'
}

/** توجيه بسيط عبر الهاش بدون مكتبة */
export function useHashRoute() {
  const [route, setRoute] = useState(() =>
    typeof window !== 'undefined' ? parseRoute(window.location.hash) : 'home'
  )

  useEffect(() => {
    const onHash = () => setRoute(parseRoute(window.location.hash))
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    if (route !== 'home') {
      window.scrollTo(0, 0)
    }
  }, [route])

  return route
}
