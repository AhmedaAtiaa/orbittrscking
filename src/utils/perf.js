import { useEffect, useState } from 'react'

/**
 * وضع أداء خفيف — موبايل / توفير البيانات / أجهزة ضعيفة / تقليل الحركة
 */
export function usePerfMode() {
  const [mode, setMode] = useState({
    lite: true,
    reducedMotion: false,
    isMobile: true,
    ready: false,
  })

  useEffect(() => {
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mqMobile = window.matchMedia('(max-width: 768px)')
    const saveData = navigator.connection?.saveData === true

    const compute = () => {
      const reducedMotion = mqMotion.matches
      const isMobile = mqMobile.matches
      // خفيف على الموبايل وتوفير البيانات وتقليل الحركة — الديسكتوب يبقى أغنى بصرياً
      const lite = reducedMotion || isMobile || saveData
      setMode({ lite, reducedMotion, isMobile, ready: true })
    }

    compute()
    mqMotion.addEventListener('change', compute)
    mqMobile.addEventListener('change', compute)
    return () => {
      mqMotion.removeEventListener('change', compute)
      mqMobile.removeEventListener('change', compute)
    }
  }, [])

  return mode
}
