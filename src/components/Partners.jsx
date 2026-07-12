import { useMemo, useState } from 'react'
import { Handshake, Cpu, Radio, Landmark } from 'lucide-react'
import { partners } from '../data/partners'
import { useLanguage } from '../i18n/LanguageContext'
import { usePerfMode } from '../utils/perf'
import { RevealOnScroll } from './effects/AnimatedText'

const categoryMeta = {
  all: { icon: Handshake },
  hardware: { icon: Cpu },
  telecom: { icon: Radio },
  gov: { icon: Landmark },
}

function PartnerCard({ partner, isRtl }) {
  return (
    <div className="group relative shrink-0 w-[160px] sm:w-[200px]">
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${partner.color}55, transparent)` }}
      />
      <div className="relative rounded-2xl border border-white/10 bg-zinc-950/80 overflow-hidden border-beam hover:border-brand-500/30 transition-colors">
        <div className="aspect-[16/10] flex items-center justify-center p-4 sm:p-5 bg-white">
          <img
            src={partner.logo}
            alt={isRtl ? partner.nameAr : partner.name}
            className="max-w-full max-h-full w-auto h-auto object-contain"
            loading="lazy"
            draggable={false}
          />
        </div>
        <div className="px-3 py-2.5 text-center border-t border-white/5">
          <p className="text-xs sm:text-sm font-bold text-white truncate">
            {isRtl ? partner.nameAr : partner.name}
          </p>
        </div>
      </div>
    </div>
  )
}

function PartnersMarquee({ items, reverse = false, speed = 40, isRtl }) {
  const track = useMemo(() => [...items, ...items], [items])
  if (!items.length) return null

  return (
    <div className="flex marquee-mask overflow-hidden partners-marquee">
      <div
        className={`flex gap-4 sm:gap-5 shrink-0 py-2 will-change-transform partners-marquee-track ${
          reverse ? 'marquee-track-reverse' : 'marquee-track'
        }`}
        style={{ animationDuration: `${speed}s` }}
      >
        {track.map((partner, i) => (
          <PartnerCard
            key={`${partner.id}-${i}`}
            partner={partner}
            isRtl={isRtl}
          />
        ))}
      </div>
    </div>
  )
}

export default function Partners() {
  const { t, isRtl } = useLanguage()
  const { lite } = usePerfMode()
  const [filter, setFilter] = useState('all')

  const filtered = useMemo(
    () => (filter === 'all' ? partners : partners.filter((p) => p.category === filter)),
    [filter]
  )

  const row1 = useMemo(() => {
    if (filter !== 'all') return filtered
    return partners.filter((p) => p.category === 'hardware' || p.category === 'telecom')
  }, [filter, filtered])

  const row2 = useMemo(() => {
    if (filter !== 'all') return filtered
    return partners.filter((p) => p.category === 'gov')
  }, [filter, filtered])

  const categories = ['all', 'hardware', 'telecom', 'gov']

  return (
    <section id="partners" className="section-padding relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-brand-500/40 to-transparent" />
      <div className="absolute top-1/2 start-0 w-72 h-72 bg-brand-600/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative">
        <RevealOnScroll className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-4">
            <Handshake className="w-4 h-4 text-brand-400" />
            <span className="text-sm text-brand-300 font-medium">{t('partners.label')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-2 mb-4">
            {t('partners.title')}{' '}
            <span className="gradient-text-animated">{t('partners.titleHighlight')}</span>
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">{t('partners.subtitle')}</p>
        </RevealOnScroll>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((key) => {
            const Icon = categoryMeta[key].icon
            const active = filter === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                  active
                    ? 'bg-brand-500/20 border-brand-500/50 text-brand-300'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/25 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {t(`partners.categories.${key}`)}
              </button>
            )
          })}
        </div>
      </div>

      <div className="relative space-y-5 -mx-0">
        <PartnersMarquee
          key={`r1-${filter}`}
          items={row1.length ? row1 : filtered}
          speed={filter === 'all' ? 42 : 28}
          isRtl={isRtl}
        />
        {!lite && (
          <PartnersMarquee
            key={`r2-${filter}`}
            items={row2.length ? row2 : filtered}
            reverse
            speed={filter === 'all' ? 36 : 32}
            isRtl={isRtl}
          />
        )}
      </div>

      <div className="max-w-7xl mx-auto relative">
        <RevealOnScroll delay={0.15} className="mt-12 text-center">
          <p className="text-slate-400 text-sm max-w-xl mx-auto">{t('partners.note')}</p>
        </RevealOnScroll>
      </div>
    </section>
  )
}
