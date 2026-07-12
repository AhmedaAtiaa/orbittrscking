import { motion } from 'framer-motion'
import { useLanguage } from '../../i18n/LanguageContext'

/**
 * شعار أبعاد المدار — أيقونة شفافة + اسم الشركة بجانبها
 */
export default function Logo({
  variant = 'full',
  className = '',
  size = 48,
  animated = true,
  showTagline = true,
}) {
  const { t, isRtl } = useLanguage()
  const name = t('company.name')
  const tagline = t('company.tagline')
  const isMark = variant === 'mark'

  const icon = (
    <img
      src="/images/logo-mark.svg"
      alt=""
      width={size}
      height={size}
      className="block object-contain"
      style={{ width: size, height: size, background: 'transparent' }}
      decoding="async"
      aria-hidden
    />
  )

  const iconWrap = animated ? (
    <motion.div
      whileHover={{ rotate: 12, scale: 1.06 }}
      transition={{ type: 'spring', stiffness: 260, damping: 16 }}
      className="relative shrink-0 flex items-center justify-center bg-transparent"
      style={{ width: size, height: size }}
    >
      {icon}
    </motion.div>
  ) : (
    <div
      className="relative shrink-0 flex items-center justify-center bg-transparent"
      style={{ width: size, height: size }}
    >
      {icon}
    </div>
  )

  if (isMark) {
    return (
      <div className={`inline-flex items-center bg-transparent ${className}`} aria-label={name}>
        {iconWrap}
      </div>
    )
  }

  return (
    <div
      className={`inline-flex items-center gap-3 bg-transparent ${className}`}
      aria-label={`${name} — ${tagline}`}
    >
      {iconWrap}
      <div className={`min-w-0 leading-tight ${isRtl ? 'text-right' : 'text-left'}`}>
        <span className="block text-lg sm:text-xl font-black text-white tracking-tight">
          {name}
        </span>
        {showTagline && (
          <span className="block text-[11px] sm:text-xs font-medium text-brand-400 mt-0.5 tracking-wide">
            {tagline}
          </span>
        )}
      </div>
    </div>
  )
}
