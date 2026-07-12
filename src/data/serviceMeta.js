import { images } from './images'

/** بيانات بصرية مشتركة لصفحات تفاصيل الخدمات */
export const serviceMeta = {
  gps: {
    image: images.trucks,
    gradient: 'from-brand-500 to-brand-700',
    accent: '#ff6600',
  },
  rental: {
    image: images.serviceRental,
    gradient: 'from-orange-500 to-amber-500',
    accent: '#f97316',
  },
  temp: {
    image: images.refrigerated,
    imageFallback: images.refrigeratedAlt,
    gradient: 'from-cyan-400 to-blue-500',
    accent: '#22d3ee',
  },
  weight: {
    image: images.serviceWeight,
    gradient: 'from-amber-500 to-orange-600',
    accent: '#f59e0b',
  },
  school: {
    image: images.schoolBus,
    gradient: 'from-brand-400 to-accent-500',
    accent: '#ff8a3d',
  },
  specialized: {
    image: images.serviceSpecialized,
    gradient: 'from-orange-600 to-red-500',
    accent: '#ea580c',
  },
  fuel: {
    image: images.productFuelSensor,
    gradient: 'from-yellow-500 to-orange-500',
    accent: '#eab308',
  },
  equipment: {
    image: images.serviceEquipment,
    gradient: 'from-slate-400 to-brand-500',
    accent: '#94a3b8',
  },
  waste: {
    image: images.serviceWaste,
    gradient: 'from-emerald-500 to-teal-600',
    accent: '#10b981',
  },
  dashcamAi: {
    image: images.productDashcam,
    gradient: 'from-violet-500 to-brand-500',
    accent: '#a78bfa',
  },
}
