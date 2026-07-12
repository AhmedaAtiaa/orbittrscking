import { marqueeImages } from '../data/images'
import { useLanguage } from '../i18n/LanguageContext'
import SafeImage from './ui/SafeImage'
import { usePerfMode } from '../utils/perf'

function MarqueeRow({ images: imgs, reverse = false, speed = 40, altLabel }) {
  const doubled = [...imgs, ...imgs]

  return (
    <div className="flex marquee-mask overflow-hidden">
      <div
        className={`flex gap-4 shrink-0 py-2 will-change-transform ${reverse ? 'marquee-track-reverse' : 'marquee-track'}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((src, i) => (
          <div
            key={i}
            className="relative w-56 sm:w-72 h-36 sm:h-44 rounded-2xl overflow-hidden shrink-0 border border-white/10"
          >
            <SafeImage
              src={src}
              alt={`${altLabel} ${(i % (imgs.length || 1)) + 1}`}
              className="w-full h-full object-cover"
              width={288}
              height={176}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ImageMarquee() {
  const { t } = useLanguage()
  const { lite } = usePerfMode()
  const row1 = marqueeImages.slice(0, 4)
  const row2 = marqueeImages.slice(4, 8)
  const altLabel = t('gallery.marquee')

  return (
    <section className="py-8 sm:py-10 overflow-hidden border-y border-white/8 bg-surface-900/40 relative content-auto">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-600/8 to-accent-500/6 pointer-events-none" />
      <div className="space-y-4">
        <MarqueeRow images={row1} speed={45} altLabel={altLabel} />
        {!lite && <MarqueeRow images={row2} reverse speed={40} altLabel={altLabel} />}
      </div>
    </section>
  )
}
