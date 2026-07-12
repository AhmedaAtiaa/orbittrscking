const patterns = {
  greeting: [
    /مرحب|السلام|اهلا|أهلا|هلا|صباح|مساء|hello|hi|hey|good\s*(morning|evening)/i,
  ],
  services: [
    /خدم|service|شاحن|truck|حافل|مدرس|school|bus|مبرد|cold|refrigerat|تبريد|أسطول|fleet/i,
  ],
  products: [
    /منتج|product|جهاز|device|gps|داش|dashcam|كامير|camera|مستشعر|sensor|وقود|fuel|obd|شريح|sim/i,
  ],
  pricing: [
    /سعر|تكلف|عرض|quote|price|cost|مجان|free|trial|تجرب|اشتراك|باق/i,
  ],
  contact: [
    /تواصل|اتصل|call|phone|هاتف|بريد|email|عنوان|address|موقع|location|واتس|whatsapp/i,
  ],
  features: [
    /مميز|feature|تقارير|report|تنبيه|alert|تطبيق|app|mobile|أمان|security|سحاب|cloud/i,
  ],
  about: [
    /من نحن|about|شركة|company|أبعاد|مدار|orbit|tracking|خبر|experience|سنة/i,
  ],
}

function matches(text, category) {
  return patterns[category].some((re) => re.test(text))
}

export function getChatResponse(input, { t, locale }) {
  const text = input.trim()
  if (!text) return t('chat.errors.empty')

  if (matches(text, 'greeting')) {
    return t('chat.responses.greeting')
  }

  if (matches(text, 'pricing')) {
    return t('chat.responses.pricing')
  }

  if (matches(text, 'contact')) {
    return t('chat.responses.contact')
  }

  if (matches(text, 'about')) {
    return t('chat.responses.about')
  }

  if (matches(text, 'features')) {
    return t('chat.responses.features')
  }

  if (/شاحن|truck/i.test(text) && !/مدرس|school/i.test(text)) {
    return t('chat.responses.trucks')
  }

  if (/مدرس|school|حافل|bus/i.test(text)) {
    return t('chat.responses.school')
  }

  if (/مبرد|cold|تبريد|refrigerat/i.test(text)) {
    return t('chat.responses.cold')
  }

  if (matches(text, 'services')) {
    return t('chat.responses.services')
  }

  if (/gps|تتبع/i.test(text) && !/شاحن/i.test(text)) {
    return t('chat.responses.gps')
  }

  if (/داش|dashcam|كامير/i.test(text)) {
    return t('chat.responses.dashcam')
  }

  if (/حرار|رطوب|temp|humidity/i.test(text)) {
    return t('chat.responses.tempSensor')
  }

  if (/وقود|fuel/i.test(text)) {
    return t('chat.responses.fuelSensor')
  }

  if (matches(text, 'products')) {
    return t('chat.responses.products')
  }

  return t('chat.responses.fallback')
}

export function getQuickReplies(t) {
  return t('chat.quickReplies')
}

export const TYPING_DELAY_MS = 600 + Math.random() * 800
