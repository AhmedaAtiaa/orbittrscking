/** الانتقال لصفحة تفاصيل الخدمة */
export function goToService(serviceId) {
  if (!serviceId) return
  window.location.hash = `#/service/${serviceId}`
}

export const SERVICE_IDS = [
  'gps',
  'rental',
  'temp',
  'weight',
  'school',
  'specialized',
  'fuel',
  'equipment',
  'waste',
  'dashcamAi',
]
