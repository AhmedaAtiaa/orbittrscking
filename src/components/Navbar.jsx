import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'
import Logo from './ui/Logo'

const navLinkKeys = [
  { href: '#services', key: 'nav.services' },
  { href: '#products', key: 'nav.products' },
  { href: '#gallery', key: 'nav.gallery' },
  { href: '#features', key: 'nav.features' },
  { href: '#how-it-works', key: 'nav.howItWorks' },
  { href: '#partners', key: 'nav.partners' },
  { href: '#contact', key: 'nav.contact' },
]

export default function Navbar({ scrolled }) {
  const [open, setOpen] = useState(false)
  const { t, isRtl } = useLanguage()

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
        <a href="#/" className="group shrink-0">
          <Logo variant="full" size={44} animated showTagline />
        </a>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinkKeys.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-slate-300 hover:text-white transition-colors relative group text-sm font-medium"
            >
              {t(link.key)}
              <span className={`absolute -bottom-1 ${isRtl ? 'right-0' : 'left-0'} w-0 h-0.5 bg-gradient-to-l from-brand-400 to-accent-400 group-hover:w-full transition-all duration-300`} />
            </a>
          ))}
          <LanguageSwitcher />
          <motion.a
            href="#contact"
            whileTap={{ scale: 0.98 }}
            className="btn-primary text-sm !py-3 !px-6"
          >
            {t('nav.getQuote')}
          </motion.a>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg glass"
            aria-label={t('nav.menu')}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
            <nav className="flex flex-col p-4 gap-4">
              {navLinkKeys.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setOpen(false)}
                  className="text-slate-300 hover:text-white py-2 font-medium"
                >
                  {t(link.key)}
                </motion.a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} className="btn-primary text-center text-sm">
                {t('nav.getQuote')}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
