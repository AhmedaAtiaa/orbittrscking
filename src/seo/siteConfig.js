/** Site-wide SEO & business configuration */
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://orbitdimension.com').replace(/\/$/, '')

export const DEFAULT_LOCALE = 'ar'
export const LOCALES = ['ar', 'en']

export const BRAND = {
  nameAr: 'أبعاد المدار',
  nameEn: 'Orbit Dimension',
  legalAr: 'شركة أبعاد المدار للحلول التقنية',
  legalEn: 'Orbit for Technology Solutions',
  shortAr: 'أبعاد المدار',
  shortEn: 'Orbit',
  taglineAr: 'تتبع بلا حدود',
  taglineEn: 'Tracking Without Limits',
  logo: `${SITE_URL}/images/logo-full.png`,
  logoMark: `${SITE_URL}/images/logo-mark-256.png`,
  ogImage: `${SITE_URL}/images/cover-orbit.png`,
  themeColor: '#ff6600',
  backgroundColor: '#0a0f1a',
}

export const BUSINESS = {
  email: 'info@orbitdimension.com',
  emailCare: 'customercare@orbitdimension.com',
  phone: '+966541294487',
  phoneDisplay: '+966 54 129 4487',
  whatsapp: 'https://wa.me/966541294487',
  addressAr: 'الرياض - حي المرسلات، طريق أبو بكر الصديق',
  addressEn: 'Riyadh - Al-Mursalat, Abu Bakr Al-Siddiq Road',
  cityAr: 'الرياض',
  cityEn: 'Riyadh',
  regionAr: 'منطقة الرياض',
  regionEn: 'Riyadh Province',
  country: 'SA',
  postalCode: '11632',
  geo: { latitude: 24.7136, longitude: 46.6753 },
  openingHours: ['Mo-Th 08:00-18:00', 'Su 08:00-18:00'],
  priceRange: '$$',
  sameAs: [
    'https://www.linkedin.com/company/orbit-tracking1',
    'https://www.facebook.com/share/1CjWyY9Hak/',
  ],
  areaServed: ['SA', 'Saudi Arabia', 'المملكة العربية السعودية', 'Riyadh', 'Jeddah', 'Dammam'],
}

export const VERIFICATION = {
  google: import.meta.env.VITE_GSC_VERIFICATION || '',
  bing: import.meta.env.VITE_BING_VERIFICATION || '',
}

export const ANALYTICS = {
  ga4: import.meta.env.VITE_GA_MEASUREMENT_ID || '',
}

/** Friendly URL slugs for services (kebab-case) */
export const SERVICE_SLUGS = {
  gps: 'gps-tracking',
  rental: 'car-rental-tracking',
  temp: 'temperature-monitoring',
  weight: 'truck-weight-management',
  school: 'school-bus-tracking',
  specialized: 'specialized-transport',
  fuel: 'fuel-monitoring',
  equipment: 'equipment-management',
  waste: 'waste-management',
  dashcamAi: 'ai-dashcam',
}

export const SLUG_TO_SERVICE = Object.fromEntries(
  Object.entries(SERVICE_SLUGS).map(([id, slug]) => [slug, id])
)

export const SERVICE_IDS = Object.keys(SERVICE_SLUGS)
