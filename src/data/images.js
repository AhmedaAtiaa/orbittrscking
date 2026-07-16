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
  serviceWeight: img('service-weight.jpg'),
  serviceRental: img('service-rental.jpg'),
  serviceSpecialized: img('service-specialized.jpg'),
  serviceEquipment: img('service-equipment.jpg'),
  serviceWaste: img('service-waste.jpg'),

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
  { id: 'gps-tracker', image: images.productGps, color: 'from-brand-500 to-brand-700', serviceId: 'gps' },
  { id: 'dashcam', image: images.productDashcam, color: 'from-accent-500 to-brand-500', serviceId: 'dashcamAi' },
  { id: 'temp-humidity', image: images.productTempSensor, color: 'from-cyan-400 to-blue-500', serviceId: 'temp' },
  { id: 'fuel-sensor', image: images.productFuelSensor, color: 'from-orange-500 to-amber-500', serviceId: 'fuel' },
  { id: 'obd', image: images.productObd, color: 'from-amber-500 to-brand-600', serviceId: 'gps' },
  { id: 'sim-m2m', image: images.productSim, color: 'from-brand-400 to-brand-600', serviceId: 'gps' },
]

export const galleryItems = [
  { key: 'trucks', src: images.trucks, categoryKey: 'trucks', serviceId: 'gps' },
  { key: 'schoolBus', src: images.schoolBus, categoryKey: 'schools', serviceId: 'school' },
  { key: 'refrigerated', src: images.refrigerated, categoryKey: 'cold', serviceId: 'temp' },
  { key: 'dashboard', src: images.dashboard, categoryKey: 'tech', serviceId: 'gps' },
  { key: 'mobileApp', src: images.mobileApp, categoryKey: 'tech', serviceId: 'gps' },
  { key: 'controlRoom', src: images.controlRoom, categoryKey: 'monitoring', serviceId: 'gps' },
  { key: 'productGps', src: images.productGps, categoryKey: 'products', serviceId: 'gps' },
  { key: 'productDashcam', src: images.productDashcam, categoryKey: 'products', serviceId: 'dashcamAi' },
  { key: 'productTemp', src: images.productTempSensor, categoryKey: 'products', serviceId: 'temp' },
  { key: 'productFuel', src: images.productFuelSensor, categoryKey: 'products', serviceId: 'fuel' },
  { key: 'fleet', src: images.serviceRental, categoryKey: 'fleet', serviceId: 'rental' },
  { key: 'highway', src: images.serviceSpecialized, categoryKey: 'routes', serviceId: 'specialized' },
  { key: 'weight', src: images.serviceWeight, categoryKey: 'trucks', serviceId: 'weight' },
  { key: 'equipment', src: images.serviceEquipment, categoryKey: 'logistics', serviceId: 'equipment' },
  { key: 'waste', src: images.serviceWaste, categoryKey: 'trucks', serviceId: 'waste' },
]

export const marqueeItems = [
  { src: images.serviceEquipment, serviceId: 'equipment' },
  { src: images.serviceWaste, serviceId: 'waste' },
  { src: images.serviceWeight, serviceId: 'weight' },
  { src: images.serviceRental, serviceId: 'rental' },
  { src: images.serviceSpecialized, serviceId: 'specialized' },
  { src: images.trucks, serviceId: 'gps' },
  { src: images.schoolBus, serviceId: 'school' },
  { src: images.refrigerated, serviceId: 'temp' },
  { src: images.dashboard, serviceId: 'gps' },
  { src: images.mobileApp, serviceId: 'gps' },
  { src: images.controlRoom, serviceId: 'gps' },
  { src: images.productDashcam, serviceId: 'dashcamAi' },
]

/** @deprecated استخدم marqueeItems */
export const marqueeImages = marqueeItems.map((i) => i.src)

// فيديو خلفية الهيرو — ضع ملفك في public/videos/hero.mp4 ثم فعّل enabled
export const heroVideo = {
  enabled: false,
  mp4: '/videos/hero.mp4',
  webm: '/videos/hero.webm',
  poster: images.hero,
}

export const COMPANY = {
  email: 'info@orbitdimension.com',
  emailCare: 'customercare@orbitdimension.com',
  phone: '+966541294487',
  // مسافات غير قابلة للكسر + علامة LTR لمنع عكس الرقم في الواجهة العربية
  phoneDisplay: '\u200E+966\u00A054\u00A0129\u00A04487',
  phoneTel: '+966541294487',
  whatsapp: '966541294487',
  whatsappUrl: 'https://wa.me/966541294487',
  linkedin: 'https://www.linkedin.com/company/orbit-tracking1',
  facebook: 'https://www.facebook.com/share/1CjWyY9Hak/',
  address: 'الرياض - حي المرسلات، طريق أبو بكر الصديق',
}
