import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

/** Accessible FAQ accordion — pairs with FAQPage JSON-LD */
export default function FaqSection({ title, subtitle, faqs = [], id = 'faq' }) {
  const [open, setOpen] = useState(0)

  if (!faqs.length) return null

  return (
    <section id={id} className="mt-12" aria-labelledby={`${id}-heading`}>
      {title && (
        <div className="mb-6">
          <h2 id={`${id}-heading`} className="text-xl sm:text-2xl font-bold text-white mb-2">
            {title}
          </h2>
          {subtitle && <p className="text-slate-400 text-sm sm:text-base">{subtitle}</p>}
        </div>
      )}
      <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
        {faqs.map((faq, i) => {
          const isOpen = open === i
          return (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-slate-900/40 overflow-hidden"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-a-${i}`}
                id={`${id}-q-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 px-4 sm:px-5 py-4 text-start hover:bg-white/5 transition-colors"
              >
                <span itemProp="name" className="font-semibold text-white text-sm sm:text-base">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-brand-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  aria-hidden
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`${id}-a-${i}`}
                    role="region"
                    aria-labelledby={`${id}-q-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <p itemProp="text" className="px-4 sm:px-5 pb-4 text-slate-300 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}
