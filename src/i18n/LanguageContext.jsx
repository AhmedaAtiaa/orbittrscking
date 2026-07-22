import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import ar from './translations/ar'
import en from './translations/en'
import { DEFAULT_LOCALE } from '../seo/siteConfig'
import { parsePathname } from '../utils/paths'

const translations = { ar, en }
const STORAGE_KEY = 'orbit-tracking-lang'

const LanguageContext = createContext(null)

function getNested(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj)
}

function initialLocale() {
  if (typeof window === 'undefined') return DEFAULT_LOCALE
  const fromPath = parsePathname(window.location.pathname).locale
  if (fromPath) return fromPath
  return localStorage.getItem(STORAGE_KEY) || DEFAULT_LOCALE
}

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(initialLocale)

  const isRtl = locale === 'ar'

  const setLocale = useCallback((lang) => {
    setLocaleState(lang)
    localStorage.setItem(STORAGE_KEY, lang)
  }, [])

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'ar' ? 'en' : 'ar')
  }, [locale, setLocale])

  const t = useCallback((key, vars) => {
    const raw = getNested(translations[locale], key)
    let value = raw !== undefined ? raw : getNested(translations.ar, key)
    if (value === undefined) return ''
    if (Array.isArray(value) || (typeof value === 'object' && value !== null)) return value
    if (typeof value === 'string' && vars) {
      Object.entries(vars).forEach(([k, v]) => {
        value = value.replace(`{${k}}`, v)
      })
    }
    return value
  }, [locale])

  useEffect(() => {
    const root = document.documentElement
    root.lang = locale
    root.dir = isRtl ? 'rtl' : 'ltr'
  }, [locale, isRtl])

  return (
    <LanguageContext.Provider value={{ locale, isRtl, setLocale, toggleLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
