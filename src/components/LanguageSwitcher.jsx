import { Globe } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { switchLocalePath, navigate } from '../utils/paths'

export default function LanguageSwitcher({ className = '' }) {
  const { locale } = useLanguage()

  const handleToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const next = locale === 'ar' ? 'en' : 'ar'
    // Path only — never preserve #contact / section hashes on locale switch
    const path = switchLocalePath(window.location.pathname, next).split('#')[0]
    navigate(path)
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`relative z-10 shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg glass text-sm font-medium text-slate-300 hover:text-white hover:border-brand-500/40 transition-colors ${className}`}
      aria-label={locale === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
    >
      <Globe className="w-4 h-4 text-brand-400" aria-hidden />
      <span>{locale === 'ar' ? 'EN' : 'عربي'}</span>
    </button>
  )
}
