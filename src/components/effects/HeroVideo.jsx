import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../utils/motion'
import { heroVideo } from '../../data/images'
import AnimatedHeroScene from './AnimatedHeroScene'
import SafeImage from '../ui/SafeImage'

export default function HeroVideo({ isRtl, fallbackSrc, fallbackAlt, className = '' }) {
  const reduced = useReducedMotion()
  const videoRef = useRef(null)
  const [videoOk, setVideoOk] = useState(true)

  const useRealVideo = heroVideo.enabled && !reduced

  useEffect(() => {
    if (!useRealVideo) return
    const el = videoRef.current
    if (!el) return

    const onError = () => setVideoOk(false)
    el.addEventListener('error', onError, true)

    const playPromise = el.play?.()
    if (playPromise?.catch) {
      playPromise.catch(() => {})
    }

    return () => el.removeEventListener('error', onError, true)
  }, [useRealVideo])

  const overlay = (
    <>
      <div className={`absolute inset-0 bg-gradient-to-${isRtl ? 'l' : 'r'} from-surface-950/90 via-surface-950/70 to-surface-950/35`} />
      <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-transparent to-surface-950/30" />
    </>
  )

  // فيديو حقيقي (عند تفعيله ونجاح تحميله)
  if (useRealVideo && videoOk) {
    return (
      <div className={`absolute inset-0 ${className}`}>
        <motion.video
          ref={videoRef}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.2, 0.8, 0.2, 1] }}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={heroVideo.poster || fallbackSrc}
          aria-hidden
        >
          <source src={heroVideo.webm} type="video/webm" />
          <source src={heroVideo.mp4} type="video/mp4" />
        </motion.video>
        {overlay}
      </div>
    )
  }

  // حركة مُعطّلة → صورة ثابتة فقط
  if (reduced) {
    return (
      <div className={`absolute inset-0 ${className}`}>
        <SafeImage
          src={fallbackSrc}
          alt={fallbackAlt}
          loading="eager"
          className="w-full h-full object-cover"
        />
        {overlay}
      </div>
    )
  }

  // الافتراضي: صورة الأسطول + مشهد التتبع المتحرك (يعطي إحساس الفيديو الحي)
  return (
    <div className={`absolute inset-0 ${className}`}>
        <SafeImage
          src={fallbackSrc}
          alt={fallbackAlt}
          loading="eager"
          fetchPriority="high"
          className="w-full h-full object-cover ken-burns-slow"
        />
      {overlay}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <AnimatedHeroScene />
      </div>
    </div>
  )
}
