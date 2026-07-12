import { motion } from 'framer-motion'
import { Phone, Mail, Linkedin, Facebook } from 'lucide-react'
import { COMPANY } from '../data/images'
import { useLanguage } from '../i18n/LanguageContext'
import Logo from './ui/Logo'

const socials = [
  { icon: Facebook, href: COMPANY.facebook, label: 'Facebook' },
  { icon: Linkedin, href: COMPANY.linkedin, label: 'LinkedIn' },
]

export default function Footer() {
  const { t } = useLanguage()

  const footerSections = {
    services: [
      { labelKey: 'footer.links.gpsTracking', href: '#services' },
      { labelKey: 'footer.links.schoolTransport', href: '#services' },
      { labelKey: 'footer.links.tempMonitoring', href: '#services' },
      { labelKey: 'footer.links.dashcamAi', href: '#services' },
    ],
    company: [
      { labelKey: 'footer.links.about', href: '#/about' },
      { labelKey: 'footer.links.team', href: '#/team' },
      { labelKey: 'footer.links.careers', href: '#/careers' },
    ],
    support: [
      { labelKey: 'footer.links.help', href: '#contact' },
      { labelKey: 'footer.links.faq', href: '#contact' },
      { labelKey: 'footer.links.privacy', href: '#/privacy' },
      { labelKey: 'footer.links.terms', href: '#/terms' },
    ],
  }

  return (
    <footer className="border-t border-white/10 bg-surface-900/90 relative overflow-hidden">
      <div className="absolute inset-0 hologram-grid opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <a href="#/" className="mb-6 inline-block group">
              <Logo variant="full" size={52} animated showTagline />
            </a>
            <p className="text-slate-300 leading-relaxed mb-6 max-w-sm">
              {t('company.fullName')} — {t('company.description')}
            </p>
            <div className="flex gap-3">
              {socials.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.15, y: -3 }}
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:bg-brand-500/20 hover:border-brand-500/30 transition-all border-beam"
                >
                  <social.icon className="w-4 h-4 text-slate-300 hover:text-brand-400" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {Object.entries(footerSections).map(([key, links], sectionIndex) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: sectionIndex * 0.1 }}
            >
              <h4 className="font-bold mb-4">{t(`footer.sections.${key}`)}</h4>
              <ul className="space-y-3">
                {links.map((link, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: sectionIndex * 0.1 + i * 0.05 }}
                  >
                    <a href={link.href} className="text-slate-300 hover:text-brand-300 transition-colors text-sm inline-block hover:translate-x-1 rtl:hover:-translate-x-1 transform duration-200">
                      {t(link.labelKey)}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} {t('company.fullName')}. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <motion.a
              whileHover={{ scale: 1.05, color: '#fff' }}
              href={`tel:${COMPANY.phoneTel || COMPANY.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span dir="ltr" style={{ unicodeBidi: 'isolate' }}>{COMPANY.phoneDisplay || COMPANY.phone}</span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, color: '#fff' }}
              href={`mailto:${COMPANY.email}`}
              className="flex items-center gap-2 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span dir="ltr" style={{ unicodeBidi: 'isolate' }}>{COMPANY.email}</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
