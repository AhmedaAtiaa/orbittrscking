import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowLeft, ArrowRight, Play, Shield, Zap, Globe, Satellite, Radio, Snowflake } from 'lucide-react'
import { images } from '../data/images'
import { useLanguage } from '../i18n/LanguageContext'
import { AnimatedWords } from './effects/AnimatedText'
import MagneticButton from './effects/MagneticButton'
import SpotlightCard from './effects/SpotlightCard'
import HeroVideo from './effects/HeroVideo'
import SafeImage from './ui/SafeImage'

function FloatingImage({ src, fallback, className, delay = 0, alt = '', badge, bright = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateY: -15 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ delay, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      className={`absolute ${className}`}
    >
      <SpotlightCard tilt className="h-full overflow-hidden rounded-2xl shadow-2xl border border-white/20">
        <SafeImage
          src={src}
          fallback={fallback}
          alt={alt}
          loading="lazy"
          className={`w-full h-full object-cover ${bright ? 'brightness-110 saturate-110' : ''}`}
        />
        <div className={`absolute inset-0 ${bright ? 'bg-gradient-to-t from-slate-900/70 via-transparent to-cyan-900/10' : 'bg-gradient-to-t from-black/40 to-transparent'}`} />
        {badge && (
          <div className="absolute bottom-2 end-2 bg-cyan-950/80 backdrop-blur-sm border border-cyan-400/40 rounded-lg px-2.5 py-1 flex items-center gap-1.5 text-xs font-bold text-cyan-100">
            {badge}
          </div>
        )}
      </SpotlightCard>
    </motion.div>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const { t, isRtl } = useLanguage()
  const Arrow = isRtl ? ArrowLeft : ArrowRight
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const align = isRtl ? 'lg:text-right' : 'lg:text-left'
  const justify = isRtl ? 'lg:justify-start' : 'lg:justify-start'

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <HeroVideo isRtl={isRtl} fallbackSrc={images.hero} fallbackAlt={t('hero.alt.fleet')} />
      </motion.div>

      <div className="absolute top-1/4 end-[10%] w-64 h-64 bg-brand-500/10 rounded-full blur-3xl animate-glow-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 start-[5%] w-48 h-48 bg-accent-500/10 rounded-full blur-3xl animate-glow-pulse pointer-events-none" style={{ animationDelay: '1.5s' }} />

      <motion.div style={{ opacity }} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-20 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`text-center ${align}`}>
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 glass rounded-full px-5 py-2.5 mb-8 neon-glow"
            >
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>
                <Satellite className="w-4 h-4 text-brand-400" />
              </motion.div>
              <span className="text-sm text-slate-300">{t('hero.badge')}</span>
              <span className="relative flex h-2 w-2">
                <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
            </motion.div>

            <h1 className="mb-6">
              <span className="block text-5xl sm:text-6xl lg:text-8xl font-black leading-tight gradient-text-animated">
                <AnimatedWords text={t('hero.title')} delay={0.4} />
              </span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.8 }}
                className="block text-white text-3xl sm:text-4xl lg:text-5xl font-black mt-3"
              >
                {t('hero.subtitle')}
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className={`text-lg sm:text-xl text-slate-200 mb-10 max-w-xl mx-auto ${isRtl ? 'lg:mx-0' : 'lg:mx-0'} leading-relaxed`}
            >
              {t('hero.description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15 }}
              className={`flex flex-col sm:flex-row gap-4 justify-center ${justify}`}
            >
              <MagneticButton href="#contact" className="btn-primary flex items-center justify-center gap-2 text-lg">
                {t('hero.ctaPrimary')}
                <Arrow className="w-5 h-5" />
              </MagneticButton>
              <MagneticButton href="#gallery" strength={0.2} className="btn-outline flex items-center justify-center gap-2 group">
                <Play className="w-5 h-5 group-hover:text-brand-400 transition-colors" />
                {t('hero.ctaSecondary')}
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className={`flex flex-wrap items-center gap-4 mt-12 justify-center ${justify}`}
            >
              {[
                { icon: Globe, text: t('hero.statClients'), color: 'text-brand-400' },
                { icon: Shield, text: t('hero.statSecurity'), color: 'text-accent-400' },
                { icon: Zap, text: t('hero.statSupport'), color: 'text-yellow-400' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4 + i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="flex items-center gap-2 glass rounded-full px-5 py-2.5 border-beam"
                >
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                  <span className="text-sm font-bold">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="relative h-[500px] hidden lg:block">
            <FloatingImage src={images.dashboard} alt={t('hero.alt.dashboard')} className="w-72 h-48 top-0 end-0 z-20 animate-float" delay={0.5} />
            <FloatingImage src={images.trucks} alt={t('hero.alt.trucks')} className="w-64 h-44 top-28 start-0 z-30 animate-float-slow" delay={0.65} />
            <FloatingImage src={images.schoolBus} alt={t('hero.alt.schoolBus')} className="w-56 h-40 bottom-24 end-4 z-10 animate-float" delay={0.8} />
            <FloatingImage
              src={images.refrigerated}
              fallback={images.refrigeratedAlt}
              alt={t('hero.alt.refrigerated')}
              className="w-60 h-44 bottom-4 start-6 z-20 animate-float-slow ring-2 ring-cyan-400/60 shadow-cyan-500/20"
              delay={0.95}
              bright
              badge={<><Snowflake className="w-3.5 h-3.5 text-cyan-300" /> {t('hero.coldTransport')}</>}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
            >
              <SpotlightCard className="glass-card !p-5 text-center border-beam neon-glow">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center"
                >
                  <Radio className="w-8 h-8 text-white" />
                </motion.div>
                <p className="text-2xl font-black gradient-text-animated">2,450+</p>
                <p className="text-xs text-slate-300">{t('hero.connectedVehicles')}</p>
              </SpotlightCard>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.a
        href="#services"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 text-slate-400 hover:text-brand-400 transition-colors"
      >
        <span className="text-xs">{t('hero.discoverMore')}</span>
        <div className="w-6 h-10 rounded-full border-2 border-current flex justify-center pt-2 opacity-60">
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 bg-current rounded-full"
          />
        </div>
      </motion.a>
    </section>
  )
}
