import { marqueeItems } from '../data/images'
import { useLanguage } from '../i18n/LanguageContext'
import SafeImage from './ui/SafeImage'
import { usePerfMode } from '../utils/perf'
import { goToService } from '../utils/goToService'

function MarqueeRow({ items, reverse = false, speed = 40, altLabel, locale }) {
  const doubled = [...items, ...items]

  return (
    <div className="flex marquee-mask overflow-hidden">
      <div
        className={`flex gap-4 shrink-0 py-2 will-change-transform ${reverse ? 'marquee-track-reverse' : 'marquee-track'}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <button
            type="button"
            key={i}
            onClick={() => goToService(item.serviceId, locale)}
            className="relative w-56 sm:w-72 h-36 sm:h-44 rounded-2xl overflow-hidden shrink-0 border border-white/10 text-start cursor-pointer group"
          >
            <SafeImage
              src={item.src}
              alt={`${altLabel} ${(i % (items.length || 1)) + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              width={288}
              height={176}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
          </button>
        ))}
      </div>
    </div>
  )
}

export default function ImageMarquee() {
  const { t, locale } = useLanguage()
  const { lite } = usePerfMode()
  const mid = Math.ceil(marqueeItems.length / 2)
  const row1 = marqueeItems.slice(0, mid)
  const row2 = marqueeItems.slice(mid)
  const altLabel = t('gallery.marquee')

  return (
    <section className="py-8 sm:py-10 overflow-hidden border-y border-white/8 bg-surface-900/40 relative content-auto">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-600/8 to-accent-500/6 pointer-events-none" />
      <div className="space-y-4">
        <MarqueeRow items={row1} speed={50} altLabel={altLabel} locale={locale} />
        {!lite && row2.length > 0 && <MarqueeRow items={row2} reverse speed={45} altLabel={altLabel} locale={locale} />}
      </div>
    </section>
  )
}
