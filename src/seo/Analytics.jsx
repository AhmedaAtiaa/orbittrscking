import { useEffect } from 'react'
import { ANALYTICS } from './siteConfig'

/**
 * Google Analytics 4 — loads only when VITE_GA_MEASUREMENT_ID is set.
 */
export default function Analytics() {
  useEffect(() => {
    const id = ANALYTICS.ga4
    if (!id || typeof window === 'undefined') return
    if (window.__orbitGaLoaded) return
    window.__orbitGaLoaded = true

    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag = gtag
    gtag('js', new Date())
    gtag('config', id, { anonymize_ip: true, send_page_view: true })

    const onNav = () => {
      gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname + window.location.search + window.location.hash,
      })
    }
    window.addEventListener('popstate', onNav)
    return () => window.removeEventListener('popstate', onNav)
  }, [])

  return null
}
