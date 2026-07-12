import { useState } from 'react'
import { ImageOff } from 'lucide-react'

const PLACEHOLDER = '/images/placeholder.svg'

/**
 * صورة مع fallback تلقائي — تحميل كسول وdecoding غير متزامن
 */
export default function SafeImage({
  src,
  fallback,
  alt = '',
  className = '',
  loading = 'lazy',
  fetchPriority,
  width,
  height,
  ...props
}) {
  const [current, setCurrent] = useState(src)
  const [errored, setErrored] = useState(false)

  const handleError = () => {
    if (fallback && current !== fallback) {
      setCurrent(fallback)
      return
    }
    if (current !== PLACEHOLDER) {
      setCurrent(PLACEHOLDER)
      setErrored(true)
    }
  }

  if (errored && current === PLACEHOLDER) {
    return (
      <div className={`flex items-center justify-center bg-slate-800 text-slate-400 ${className}`} {...props}>
        <ImageOff className="w-8 h-8 opacity-50" />
        <span className="sr-only">{alt}</span>
      </div>
    )
  }

  return (
    <img
      src={current}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      width={width}
      height={height}
      onError={handleError}
      {...props}
    />
  )
}
