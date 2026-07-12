import { useEffect, useState } from 'react'

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] },
  },
}

export const slideIn = (direction = 'right') => {
  const x = direction === 'right' ? 36 : direction === 'left' ? -36 : 0
  const y = direction === 'up' ? 36 : direction === 'down' ? -36 : 0
  return {
    hidden: { opacity: 0, x, y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] },
    },
  }
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mqMobile = window.matchMedia('(max-width: 768px)')
    const saveData = navigator.connection?.saveData === true

    const update = () => {
      setReduced(mq.matches || mqMobile.matches || saveData)
    }
    update()
    mq.addEventListener('change', update)
    mqMobile.addEventListener('change', update)
    return () => {
      mq.removeEventListener('change', update)
      mqMobile.removeEventListener('change', update)
    }
  }, [])

  return reduced
}
