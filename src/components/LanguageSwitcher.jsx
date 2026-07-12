import { Globe } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export default function LanguageSwitcher({ className = '' }) {
  const { locale, toggleLocale } = useLanguage()

  return (
    <button
      onClick={toggleLocale}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg glass text-sm font-medium text-slate-300 hover:text-white hover:border-brand-500/40 transition-colors ${className}`}
      aria-label={locale === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
    >
      <Globe className="w-4 h-4 text-brand-400" />
      <span>{locale === 'ar' ? 'EN' : 'عربي'}</span>
    </button>
  )
}
