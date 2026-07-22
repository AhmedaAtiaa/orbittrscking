import { useLanguage } from '../i18n/LanguageContext'
import { navigate } from '../utils/paths'

/**
 * Locale-aware internal link that uses History API (no full reload).
 * Anchors (#contact) still use native href when path matches home.
 */
export default function AppLink({ href, children, className = '', onClick, replace = false, ...props }) {
  const { locale } = useLanguage()

  const handleClick = (e) => {
    if (onClick) onClick(e)
    if (e.defaultPrevented) return
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return

    const url = typeof href === 'function' ? href(locale) : href
    if (!url || url.startsWith('http') || url.startsWith('mailto:') || url.startsWith('tel:')) return

    // Same-page hash only
    if (url.startsWith('#')) return

    e.preventDefault()
    navigate(url, { replace })
  }

  const resolved = typeof href === 'function' ? href(locale) : href

  return (
    <a href={resolved} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}
