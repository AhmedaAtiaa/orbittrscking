// صور محلية — مُصممة لتوضيح خدمات تتبع المركبات والأساطيل
const img = (name) => `/images/${name}`

export const images = {
  // هيرو: شاحنات بمسارات تتبع رقمية متوهجة
  hero: img('hero.jpg'),
  heroAlt: img('trucks.jpg'),

  // خدمات الأسطول
  trucks: img('trucks.jpg'),
  schoolBus: img('school-bus.jpg'),
  refrigerated: img('refrigerated.jpg'),
  refrigeratedAlt: img('refrigerated-alt.jpg'),
  fleet: img('fleet.jpg'),
  highway: img('highway.jpg'),

  // منصة المراقبة والتتبع
  dashboard: img('dashboard.jpg'),
  gps: img('gps.jpg'),
  mobileApp: img('mobile-app.jpg'),
  controlRoom: img('control-room.jpg'),
  technology: img('technology.jpg'),
  logistics: img('logistics.jpg'),
  warehouse: img('warehouse.jpg'),

  // منتجات التتبع
  productGps: img('product-gps.jpg'),
  productDashcam: img('product-dashcam.jpg'),
  productTempSensor: img('product-temp.jpg'),
  productFuelSensor: img('product-fuel.jpg'),
  productObd: img('product-obd.jpg'),
  productSim: img('product-sim.jpg'),
}

export const productCatalog = [
  { id: 'gps-tracker', image: images.productGps, color: 'from-brand-500 to-brand-700' },
  { id: 'dashcam', image: images.productDashcam, color: 'from-accent-500 to-brand-500' },
  { id: 'temp-humidity', image: images.productTempSensor, color: 'from-cyan-400 to-blue-500' },
  { id: 'fuel-sensor', image: images.productFuelSensor, color: 'from-orange-500 to-amber-500' },
  { id: 'obd', image: images.productObd, color: 'from-amber-500 to-brand-600' },
  { id: 'sim-m2m', image: images.productSim, color: 'from-brand-400 to-brand-600' },
]

export const galleryItems = [
  { key: 'trucks', src: images.trucks, categoryKey: 'trucks' },
  { key: 'schoolBus', src: images.schoolBus, categoryKey: 'schools' },
  { key: 'refrigerated', src: images.refrigerated, categoryKey: 'cold' },
  { key: 'dashboard', src: images.dashboard, categoryKey: 'tech' },
  { key: 'mobileApp', src: images.mobileApp, categoryKey: 'tech' },
  { key: 'controlRoom', src: images.controlRoom, categoryKey: 'monitoring' },
  { key: 'productGps', src: images.productGps, categoryKey: 'products' },
  { key: 'productDashcam', src: images.productDashcam, categoryKey: 'products' },
  { key: 'productTemp', src: images.productTempSensor, categoryKey: 'products' },
  { key: 'productFuel', src: images.productFuelSensor, categoryKey: 'products' },
  { key: 'fleet', src: images.fleet, categoryKey: 'fleet' },
  { key: 'highway', src: images.highway, categoryKey: 'routes' },
]

export const marqueeImages = [
  images.trucks,
  images.dashboard,
  images.productGps,
  images.schoolBus,
  images.mobileApp,
  images.refrigerated,
  images.productDashcam,
  images.controlRoom,
  images.productFuelSensor,
  images.fleet,
]

// فيديو خلفية الهيرو — ضع ملفك في public/videos/hero.mp4 ثم فعّل enabled
export const heroVideo = {
  enabled: false,
  mp4: '/videos/hero.mp4',
  webm: '/videos/hero.webm',
  poster: images.hero,
}

export const COMPANY = {
  email: 'info@orbittracking.com',
  phone: '0541294487',
  // مسافات غير قابلة للكسر + علامة LTR لمنع عكس الرقم في الواجهة العربية
  phoneDisplay: '\u200E054\u00A0129\u00A04487',
  phoneTel: '+966541294487',
  whatsapp: '966541294487',
  whatsappUrl: 'https://wa.me/966541294487',
  linkedin: 'https://www.linkedin.com/company/orbit-tracking1',
  facebook: 'https://www.facebook.com/share/1CjWyY9Hak/',
  address: 'الرياض - المملكة العربية السعودية',
}
