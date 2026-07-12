import { motion, useScroll, useSpring } from 'framer-motion'
import { useLanguage } from '../../i18n/LanguageContext'

export default function ScrollProgress() {
  const { isRtl } = useLanguage()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      style={{ scaleX, transformOrigin: isRtl ? 'right' : 'left' }}
      className={`fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-${isRtl ? 'l' : 'r'} from-brand-500 via-accent-400 to-brand-300 z-[60] shadow-lg shadow-brand-500/50`}
    />
  )
}
