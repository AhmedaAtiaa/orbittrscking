/**
 * الشركاء التقنيون — شعارات رسمية
 */
const p = (name) => `/images/partners/${name}.png`

export const partners = [
  { id: 'teltonika', name: 'Teltonika', nameAr: 'تيلتونيكا', category: 'hardware', logo: p('teltonika'), color: '#0054A6' },
  { id: 'ruptela', name: 'Ruptela', nameAr: 'روبتيلا', category: 'hardware', logo: p('ruptela'), color: '#1B4F9C' },
  { id: 'queclink', name: 'Queclink', nameAr: 'كويكلينك', category: 'hardware', logo: p('queclink'), color: '#E31C23' },
  { id: 'jimi', name: 'Jimi IoT', nameAr: 'جيمي', category: 'hardware', logo: p('jimi'), color: '#00AEEF' },
  { id: 'stc', name: 'stc', nameAr: 'STC', category: 'telecom', logo: p('stc'), color: '#4F008C' },
  { id: 'zain', name: 'Zain', nameAr: 'زين', category: 'telecom', logo: p('zain'), color: '#6BCE00' },
  { id: 'mobily', name: 'Mobily', nameAr: 'موبايلي', category: 'telecom', logo: p('mobily'), color: '#0057A8' },
  { id: 'lebara', name: 'Lebara', nameAr: 'ليبارا', category: 'telecom', logo: p('lebara'), color: '#00A0E3' },
  { id: 'tga', name: 'TGA', nameAr: 'الهيئة العامة للنقل', category: 'gov', logo: p('tga'), color: '#0B3D5C' },
  { id: 'cst', name: 'CST', nameAr: 'هيئة الاتصالات والفضاء والتقنية', category: 'gov', logo: p('cst'), color: '#1A3A6B' },
  { id: 'sfda', name: 'SFDA', nameAr: 'هيئة الغذاء والدواء', category: 'gov', logo: p('sfda'), color: '#1B7A4E' },
  { id: 'riyadh', name: 'Riyadh Municipality', nameAr: 'أمانة الرياض', category: 'gov', logo: p('riyadh'), color: '#1B5E3B' },
  { id: 'jeddah', name: 'Jeddah Municipality', nameAr: 'أمانة جدة', category: 'gov', logo: p('jeddah'), color: '#5B2C6F' },
]

export const partnerCategories = ['all', 'hardware', 'telecom', 'gov']
