import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'
import Logo from './ui/Logo'
import AppLink from './AppLink'
import { homePath, sectionHash, contactHash, blogPath, faqPath } from '../utils/paths'

export default function Navbar({ scrolled }) {
  const [open, setOpen] = useState(false)
  const { t, isRtl, locale } = useLanguage()

  const navLinks = [
    { href: sectionHash(locale, 'services'), key: 'nav.services' },
    { href: sectionHash(locale, 'features'), key: 'nav.features' },
    { href: sectionHash(locale, 'partners'), key: 'nav.partners' },
    { href: blogPath(locale), key: 'footer.links.blog' },
    { href: contactHash(locale), key: 'nav.contact' },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass shadow-lg shadow-black/30 py-3 backdrop-blur-2xl bg-surface-950/75'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <AppLink href={homePath(locale)} className="group shrink-0" aria-label={t('company.name')}>
          <Logo variant="full" size={44} animated showTagline />
        </AppLink>

        <nav className="hidden lg:flex items-center gap-6" aria-label={t('nav.menu')}>
          {navLinks.map((link) => (
            <AppLink
              key={link.key}
              href={link.href}
              className="text-slate-300 hover:text-white transition-colors relative group text-sm font-medium"
            >
              {t(link.key)}
              <span className={`absolute -bottom-1 ${isRtl ? 'right-0' : 'left-0'} w-0 h-0.5 bg-gradient-to-l from-brand-400 to-accent-400 group-hover:w-full transition-all duration-300`} />
            </AppLink>
          ))}
          <LanguageSwitcher />
          <motion.div whileTap={{ scale: 0.98 }} className="shrink-0">
            <AppLink href={contactHash(locale)} className="btn-primary text-sm !py-3 !px-6">
              {t('nav.getQuote')}
            </AppLink>
          </motion.div>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg glass"
            aria-label={t('nav.menu')}
            aria-expanded={open}
          >
            {open ? <X className="w-6 h-6" aria-hidden /> : <Menu className="w-6 h-6" aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-white/10 mt-3"
          >
            <nav className="flex flex-col p-4 gap-4" aria-label={t('nav.menu')}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.key}
                  initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <AppLink
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-slate-300 hover:text-white py-2 font-medium block"
                  >
                    {t(link.key)}
                  </AppLink>
                </motion.div>
              ))}
              <AppLink
                href={faqPath(locale)}
                onClick={() => setOpen(false)}
                className="text-slate-300 hover:text-white py-2 font-medium"
              >
                {t('footer.links.faq')}
              </AppLink>
              <AppLink
                href={contactHash(locale)}
                onClick={() => setOpen(false)}
                className="btn-primary text-center text-sm"
              >
                {t('nav.getQuote')}
              </AppLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
