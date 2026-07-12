import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../../i18n/LanguageContext'
import Logo from '../ui/Logo'

export default function Preloader({ done }) {
  const { t, isRtl } = useLanguage()

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-surface-950"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-brand-600/10 via-transparent to-accent-500/5" />

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="relative mb-8"
          >
            <Logo variant="full" size={64} animated={false} showTagline />
          </motion.div>

          <div className="w-40 h-0.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className={`h-full bg-gradient-to-${isRtl ? 'l' : 'r'} from-brand-500 to-accent-500 rounded-full`}
            />
          </div>

          <p className="text-slate-300 text-xs mt-3">{t('preloader.loading')}</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
