import { useState } from 'react'
import { ImageOff } from 'lucide-react'

const PLACEHOLDER = '/images/placeholder.svg'

/** Prefer sibling .webp when available (generated at build / optimize script) */
function webpSrc(src) {
  if (!src || typeof src !== 'string') return null
  if (/\.webp$/i.test(src) || /\.svg$/i.test(src) || src.startsWith('data:')) return null
  if (!/\.(jpe?g|png)$/i.test(src)) return null
  return src.replace(/\.(jpe?g|png)$/i, '.webp')
}

/**
 * صورة مع fallback — lazy loading، decoding async، ودعم WebP عبر <picture>
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
  sizes,
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
    }
    setErrored(true)
  }

  if (errored && current === PLACEHOLDER) {
    return (
      <div className={`flex items-center justify-center bg-slate-800 text-slate-400 ${className}`} role="img" aria-label={alt || 'Image unavailable'} {...props}>
        <ImageOff className="w-8 h-8 opacity-50" aria-hidden />
        <span className="sr-only">{alt || 'Image unavailable'}</span>
      </div>
    )
  }

  const webp = webpSrc(current)
  const img = (
    <img
      src={current}
      alt={alt || ''}
      className={className}
      loading={loading}
      decoding="async"
      {...(fetchPriority != null ? { fetchpriority: fetchPriority } : {})}
      width={width}
      height={height}
      sizes={sizes}
      onError={handleError}
      {...props}
    />
  )

  if (webp) {
    return (
      <picture>
        <source type="image/webp" srcSet={webp} />
        {img}
      </picture>
    )
  }

  return img
}
