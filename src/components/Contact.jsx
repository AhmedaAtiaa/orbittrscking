import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Send, Clock, Loader2 } from 'lucide-react'
import { COMPANY, images } from '../data/images'
import { useLanguage } from '../i18n/LanguageContext'
import SafeImage from './ui/SafeImage'
import { submitContactForm } from '../utils/submitContactForm'

const serviceOptions = [
  { value: 'gps', key: 'gps' },
  { value: 'rental', key: 'rental' },
  { value: 'temp', key: 'temp' },
  { value: 'weight', key: 'weight' },
  { value: 'school', key: 'school' },
  { value: 'specialized', key: 'specialized' },
  { value: 'fuel', key: 'fuel' },
  { value: 'equipment', key: 'equipment' },
  { value: 'waste', key: 'waste' },
  { value: 'dashcamAi', key: 'dashcamAi' },
  { value: 'other', key: 'other' },
]

export default function Contact() {
  const { t, isRtl } = useLanguage()
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '', website: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const companyName = t('company.name')

  const contactInfo = [
    { icon: Phone, label: t('contact.phone'), value: COMPANY.phoneDisplay || COMPANY.phone, href: `tel:${COMPANY.phoneTel || COMPANY.phone.replace(/\s/g, '')}`, ltr: true },
    { icon: Mail, label: t('contact.email'), value: COMPANY.email, href: `mailto:${COMPANY.email}`, ltr: true },
    { icon: Mail, label: t('contact.emailCare'), value: COMPANY.emailCare, href: `mailto:${COMPANY.emailCare}`, ltr: true },
    { icon: MapPin, label: t('contact.address'), value: t('company.address'), href: '#' },
    { icon: Clock, label: t('contact.hours'), value: t('company.hours'), href: '#' },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.website) return
    if (status === 'sending') return

    setStatus('sending')
    try {
      const serviceLabel = form.service
        ? t(`contact.form.options.${form.service}`)
        : ''
      await submitContactForm({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        service: form.service,
        serviceLabel,
        message: form.message.trim(),
      })
      setStatus('success')
      setForm({ name: '', email: '', phone: '', service: '', message: '', website: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const slideFrom = isRtl ? 30 : -30
  const hoverShift = isRtl ? -5 : 5
  const sending = status === 'sending'

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0">
        <SafeImage src={images.technology} alt="" className="w-full h-full object-cover opacity-5" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-brand-400 font-bold text-sm tracking-wider">{t('contact.label')}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-3 mb-4">
            {companyName} <span className="gradient-text">{t('contact.title')}</span>
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">{t('contact.subtitle')}</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          <motion.div
            initial={{ opacity: 0, x: slideFrom }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="relative h-48 rounded-2xl overflow-hidden mb-6 hidden lg:block">
              <SafeImage src={images.fleet} alt={t('contact.altFleet')} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-4">
                <p className="font-bold">{t('contact.teamReady', { name: companyName })}</p>
              </div>
            </div>

            {contactInfo.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: hoverShift }}
                className="flex items-center gap-4 glass-card !p-5 group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-500/20 flex items-center justify-center group-hover:bg-brand-500/30 transition-colors">
                  <item.icon className="w-5 h-5 text-brand-400" />
                </div>
                <div className={item.ltr ? 'text-start' : undefined}>
                  <p className="text-sm text-slate-300">{item.label}</p>
                  <p className="font-medium" dir={item.ltr ? 'ltr' : undefined} style={item.ltr ? { unicodeBidi: 'isolate' } : undefined}>
                    {item.value}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: -slideFrom }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 glass-card space-y-5"
          >
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-slate-300 mb-2">{t('contact.form.name')}</label>
                <input
                  type="text"
                  required
                  disabled={sending}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors disabled:opacity-60"
                  placeholder={t('contact.form.namePlaceholder')}
                />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-2">{t('contact.form.email')}</label>
                <input
                  type="email"
                  required
                  disabled={sending}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors disabled:opacity-60"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-slate-300 mb-2">{t('contact.form.phone')}</label>
                <input
                  type="tel"
                  disabled={sending}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors disabled:opacity-60"
                  placeholder={t('contact.form.phonePlaceholder')}
                />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-2">{t('contact.form.service')}</label>
                <select
                  disabled={sending}
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors disabled:opacity-60"
                >
                  <option value="" className="bg-slate-900">{t('contact.form.servicePlaceholder')}</option>
                  {serviceOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-slate-900">
                      {t(`contact.form.options.${opt.key}`)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-2">{t('contact.form.message')}</label>
              <textarea
                rows={4}
                disabled={sending}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors resize-none disabled:opacity-60"
                placeholder={t('contact.form.messagePlaceholder')}
              />
            </div>

            {status === 'error' && (
              <p className="text-sm text-red-400">{t('contact.form.error')}</p>
            )}

            <motion.button
              type="submit"
              disabled={sending}
              whileHover={sending ? undefined : { scale: 1.02 }}
              whileTap={sending ? undefined : { scale: 0.98 }}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
            >
              {status === 'success' ? (
                t('contact.form.success')
              ) : sending ? (
                <>
                  {t('contact.form.sending')}
                  <Loader2 className="w-5 h-5 animate-spin" />
                </>
              ) : (
                <>
                  {t('contact.form.submit')}
                  <Send className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
