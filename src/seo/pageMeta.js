import { BRAND } from './siteConfig'
import { servicePath, blogPath, faqPath, aboutPath, homePath, teamPath, careersPath, privacyPath, termsPath } from '../utils/paths'

/** High-quality per-page metadata (AR + EN) targeting priority keywords */
export const pageMeta = {
  home: {
    ar: {
      title: 'أبعاد المدار | تتبع المركبات وإدارة الأسطول في السعودية',
      description:
        'شركة أبعاد المدار — منصة تتبع مركبات وأجهزة GPS وإدارة أسطول في السعودية. تتبع الشاحنات والحافلات المدرسية ومراقبة الوقود والحرارة وكاميرات الذكاء الاصطناعي.',
      keywords: [
        'أبعاد المدار',
        'شركة أبعاد المدار',
        'تتبع المركبات',
        'منصة تتبع',
        'إدارة الأسطول',
        'أجهزة تتبع',
        'تتبع الشاحنات',
        'تتبع الحافلات',
        'السعودية',
      ],
    },
    en: {
      title: 'Orbit Dimension | Fleet Tracking & GPS in Saudi Arabia',
      description:
        'Orbit Dimension — enterprise GPS tracking, fleet management, school bus tracking, fuel & temperature monitoring, AI cameras, and IoT platform solutions across Saudi Arabia.',
      keywords: [
        'Orbit Dimension',
        'Fleet Tracking',
        'GPS Tracking',
        'Vehicle Tracking',
        'Fleet Management',
        'Asset Tracking',
        'School Bus Tracking',
        'Fuel Monitoring',
        'Temperature Monitoring',
        'AI Camera',
        'IoT Platform',
        'Saudi Arabia',
      ],
    },
  },
  about: {
    ar: {
      title: 'من نحن | شركة أبعاد المدار للحلول التقنية',
      description:
        'تعرف على شركة أبعاد المدار — روّاد حلول تتبع المركبات وإدارة الأسطول وإنترنت الأشياء في المملكة العربية السعودية.',
      keywords: ['شركة أبعاد المدار', 'أبعاد المدار', 'تتبع المركبات', 'الرياض'],
    },
    en: {
      title: 'About Us | Orbit Dimension Technology Solutions',
      description:
        'Learn about Orbit Dimension — a leading provider of fleet tracking, GPS, and IoT platform solutions in Saudi Arabia.',
      keywords: ['Orbit Dimension', 'Fleet Management', 'GPS Tracking', 'Saudi Arabia'],
    },
  },
  team: {
    ar: {
      title: 'فريق العمل | أبعاد المدار',
      description: 'تعرف على فريق أبعاد المدار المتخصص في تتبع المركبات ومنصات إدارة الأسطول والحلول التقنية.',
      keywords: ['أبعاد المدار', 'فريق العمل'],
    },
    en: {
      title: 'Our Team | Orbit Dimension',
      description: 'Meet the Orbit Dimension team behind enterprise GPS tracking and fleet management solutions in Saudi Arabia.',
      keywords: ['Orbit Dimension', 'Team'],
    },
  },
  careers: {
    ar: {
      title: 'الوظائف | انضم إلى أبعاد المدار',
      description: 'انضم إلى فريق أبعاد المدار وابنِ مستقبل تتبع المركبات وإنترنت الأشياء في السعودية.',
      keywords: ['وظائف أبعاد المدار', 'توظيف'],
    },
    en: {
      title: 'Careers | Join Orbit Dimension',
      description: 'Join Orbit Dimension and help build the future of fleet tracking and IoT platforms in Saudi Arabia.',
      keywords: ['Orbit Dimension careers', 'jobs'],
    },
  },
  privacy: {
    ar: {
      title: 'سياسة الخصوصية | أبعاد المدار',
      description: 'سياسة الخصوصية لشركة أبعاد المدار — كيف نحمي بيانات عملائنا ومستخدمي منصة التتبع.',
      keywords: ['سياسة الخصوصية', 'أبعاد المدار'],
    },
    en: {
      title: 'Privacy Policy | Orbit Dimension',
      description: 'Orbit Dimension privacy policy — how we protect customer and fleet tracking platform data.',
      keywords: ['Privacy Policy', 'Orbit Dimension'],
    },
  },
  terms: {
    ar: {
      title: 'الشروط والأحكام | أبعاد المدار',
      description: 'الشروط والأحكام لاستخدام خدمات ومنصة تتبع أبعاد المدار.',
      keywords: ['الشروط والأحكام', 'أبعاد المدار'],
    },
    en: {
      title: 'Terms of Service | Orbit Dimension',
      description: 'Terms and conditions for using Orbit Dimension tracking services and IoT platform.',
      keywords: ['Terms of Service', 'Orbit Dimension'],
    },
  },
  faq: {
    ar: {
      title: 'الأسئلة الشائعة | تتبع المركبات وأبعاد المدار',
      description:
        'إجابات عن تتبع المركبات، إدارة الأسطول، أجهزة GPS، منصة التتبع، تتبع الشاحنات والحافلات في السعودية مع أبعاد المدار.',
      keywords: ['أسئلة شائعة', 'تتبع المركبات', 'أبعاد المدار', 'إدارة الأسطول'],
    },
    en: {
      title: 'FAQ | Fleet Tracking & Orbit Dimension',
      description:
        'Answers about GPS tracking, fleet management, vehicle trackers, school bus tracking, fuel monitoring, and Orbit Dimension services in Saudi Arabia.',
      keywords: ['FAQ', 'Fleet Tracking', 'GPS Tracking', 'Orbit Dimension'],
    },
  },
  blog: {
    ar: {
      title: 'المدونة | دليل تتبع المركبات وإدارة الأسطول',
      description:
        'مقالات خبراء أبعاد المدار حول تتبع GPS، إدارة الأسطول، مراقبة الوقود والحرارة، وكاميرات الذكاء الاصطناعي في السعودية.',
      keywords: ['مدونة تتبع المركبات', 'إدارة الأسطول', 'GPS', 'أبعاد المدار'],
    },
    en: {
      title: 'Blog | Fleet Tracking & GPS Insights',
      description:
        'Expert articles from Orbit Dimension on GPS tracking, fleet management, fuel monitoring, AI cameras, and IoT platforms in Saudi Arabia.',
      keywords: ['Fleet Tracking Blog', 'GPS Tracking', 'Fleet Management', 'Orbit Dimension'],
    },
  },
}

export const servicePageMeta = {
  gps: {
    ar: {
      title: 'تتبع المركبات GPS | منصة تتبع وإدارة الأسطول — أبعاد المدار',
      description:
        'حلول تتبع مركبات GPS لحظية من أبعاد المدار: موقع مباشر، سجل الرحلات، تنبيهات، وتقارير لتحسين كفاءة الأسطول في السعودية.',
      keywords: ['تتبع المركبات', 'GPS', 'منصة تتبع', 'أجهزة تتبع', 'إدارة الأسطول'],
    },
    en: {
      title: 'GPS Vehicle Tracking | Fleet Tracking Platform — Orbit Dimension',
      description:
        'Real-time GPS vehicle tracking from Orbit Dimension: live location, trip history, alerts, and analytics for fleet management in Saudi Arabia.',
      keywords: ['GPS Tracking', 'Vehicle Tracking', 'Fleet Tracking', 'Fleet Management'],
    },
  },
  rental: {
    ar: {
      title: 'تتبع سيارات التأجير | حماية الأسطول — أبعاد المدار',
      description: 'تتبع أساطيل التأجير مع السياج الجغرافي وتنبيهات الاستخدام غير المصرح به لتحسين حماية الأصول.',
      keywords: ['تتبع التأجير', 'إدارة الأسطول', 'حماية الأصول'],
    },
    en: {
      title: 'Car Rental Tracking | Asset Tracking — Orbit Dimension',
      description: 'Track rental fleets with geofencing and unauthorized-use alerts to protect assets and improve utilization.',
      keywords: ['Asset Tracking', 'Car Rental Tracking', 'Fleet Management'],
    },
  },
  temp: {
    ar: {
      title: 'مراقبة الحرارة والرطوبة | التتبع المبرد — أبعاد المدار',
      description: 'مراقبة درجة الحرارة والرطوبة للشاحنات المبردة والمستودعات مع تنبيهات فورية لضمان سلسلة التبريد.',
      keywords: ['مراقبة الحرارة', 'التتبع المبرد', 'سلسلة التبريد'],
    },
    en: {
      title: 'Temperature Monitoring | Cold Chain Tracking — Orbit Dimension',
      description: 'Temperature and humidity monitoring for refrigerated fleets and warehouses with instant cold-chain alerts.',
      keywords: ['Temperature Monitoring', 'Cold Chain', 'Fleet Tracking'],
    },
  },
  weight: {
    ar: {
      title: 'إدارة وزن الشاحنات | تتبع الحمولة — أبعاد المدار',
      description: 'حلول مراقبة وزن الشاحنات لحظياً لمنع الحمولة الزائدة وتحسين استهلاك الوقود والامتثال.',
      keywords: ['تتبع الشاحنات', 'وزن الشاحنات', 'إدارة الأسطول'],
    },
    en: {
      title: 'Truck Weight Management | Fleet Tracking — Orbit Dimension',
      description: 'Real-time truck weight monitoring to prevent overloading, optimize fuel use, and stay compliant.',
      keywords: ['Truck Tracking', 'Fleet Management', 'Weight Management'],
    },
  },
  school: {
    ar: {
      title: 'تتبع الحافلات المدرسية | سلامة النقل — أبعاد المدار',
      description: 'تتبع حافلات المدارس لحظياً مع تنبيهات السلامة وإشعارات لأولياء الأمور وإدارة مسارات النقل المدرسي.',
      keywords: ['تتبع الحافلات', 'النقل المدرسي', 'تتبع المركبات'],
    },
    en: {
      title: 'School Bus Tracking | Student Transport Safety — Orbit Dimension',
      description: 'Live school bus tracking with safety alerts, parent notifications, and route management across Saudi Arabia.',
      keywords: ['School Bus Tracking', 'Vehicle Tracking', 'Fleet Management'],
    },
  },
  specialized: {
    ar: {
      title: 'النقل المتخصص والتعاقدي | تتبع الأسطول — أبعاد المدار',
      description: 'حلول تتبع للنقل المتخصص والتعاقدي مع رقابة تشغيلية وتقارير أداء للعقود.',
      keywords: ['نقل متخصص', 'إدارة الأسطول', 'تتبع المركبات'],
    },
    en: {
      title: 'Specialized Transport Tracking | Fleet Management — Orbit Dimension',
      description: 'Tracking solutions for specialized and contract transport with operational control and performance reports.',
      keywords: ['Fleet Management', 'Vehicle Tracking', 'Contract Transport'],
    },
  },
  fuel: {
    ar: {
      title: 'مراقبة الوقود | خفض الهدر — أبعاد المدار',
      description: 'مراقبة مستوى الوقود والتنبيه عند السرقة أو الهدر مع تقارير استهلاك دقيقة لأساطيل السعودية.',
      keywords: ['مراقبة الوقود', 'إدارة الأسطول', 'تتبع الشاحنات'],
    },
    en: {
      title: 'Fuel Monitoring | Cut Fleet Waste — Orbit Dimension',
      description: 'Fuel level monitoring with theft and waste alerts plus accurate consumption reports for Saudi fleets.',
      keywords: ['Fuel Monitoring', 'Fleet Management', 'Fleet Tracking'],
    },
  },
  equipment: {
    ar: {
      title: 'إدارة المعدات | تتبع الأصول — أبعاد المدار',
      description: 'تتبع المعدات الثقيلة والأصول ميدانياً لتحسين الاستخدام والصيانة وتقليل الفقد.',
      keywords: ['تتبع الأصول', 'إدارة المعدات', 'منصة تتبع'],
    },
    en: {
      title: 'Equipment Management | Asset Tracking — Orbit Dimension',
      description: 'Track heavy equipment and field assets to improve utilization, maintenance, and loss prevention.',
      keywords: ['Asset Tracking', 'Equipment Management', 'IoT Platform'],
    },
  },
  waste: {
    ar: {
      title: 'إدارة النفايات | تتبع أساطيل النظافة — أبعاد المدار',
      description: 'تتبع مركبات النظافة وجمع النفايات لتحسين المسارات والامتثال التشغيلي.',
      keywords: ['تتبع النفايات', 'إدارة الأسطول', 'تتبع المركبات'],
    },
    en: {
      title: 'Waste Management Tracking | Fleet Optimization — Orbit Dimension',
      description: 'Track waste collection fleets to optimize routes, prove compliance, and improve city operations.',
      keywords: ['Fleet Tracking', 'Waste Management', 'Vehicle Tracking'],
    },
  },
  dashcamAi: {
    ar: {
      title: 'كاميرا الذكاء الاصطناعي | سلامة السائق — أبعاد المدار',
      description: 'كاميرات AI للمركبات مع ADAS وDMS وبث مباشر لتقليل الحوادث وتحسين سلوك القيادة.',
      keywords: ['كاميرا ذكاء اصطناعي', 'سلامة الأسطول', 'تتبع المركبات'],
    },
    en: {
      title: 'AI Camera Dashcam | Fleet Safety — Orbit Dimension',
      description: 'AI dash cameras with ADAS, DMS, and live video to reduce accidents and improve driver behavior.',
      keywords: ['AI Camera', 'Fleet Safety', 'GPS Tracking', 'IoT Platform'],
    },
  },
}

export function getPageMeta(pageKey, locale) {
  const entry = pageMeta[pageKey]
  if (!entry) return pageMeta.home[locale] || pageMeta.home.ar
  return entry[locale] || entry.ar
}

export function getServiceMeta(serviceId, locale) {
  const entry = servicePageMeta[serviceId]
  if (!entry) return getPageMeta('home', locale)
  return entry[locale] || entry.ar
}

export function breadcrumbLabels(locale) {
  if (locale === 'ar') {
    return {
      home: BRAND.nameAr,
      about: 'من نحن',
      team: 'الفريق',
      careers: 'الوظائف',
      privacy: 'الخصوصية',
      terms: 'الشروط',
      faq: 'الأسئلة الشائعة',
      blog: 'المدونة',
      services: 'الخدمات',
    }
  }
  return {
    home: BRAND.nameEn,
    about: 'About',
    team: 'Team',
    careers: 'Careers',
    privacy: 'Privacy',
    terms: 'Terms',
    faq: 'FAQ',
    blog: 'Blog',
    services: 'Services',
  }
}

export function buildBreadcrumbs(route, locale, extraName) {
  const labels = breadcrumbLabels(locale)
  const items = [{ name: labels.home, path: homePath(locale) }]

  switch (route.name) {
    case 'about':
      items.push({ name: labels.about, path: aboutPath(locale) })
      break
    case 'team':
      items.push({ name: labels.team, path: teamPath(locale) })
      break
    case 'careers':
      items.push({ name: labels.careers, path: careersPath(locale) })
      break
    case 'privacy':
      items.push({ name: labels.privacy, path: privacyPath(locale) })
      break
    case 'terms':
      items.push({ name: labels.terms, path: termsPath(locale) })
      break
    case 'faq':
      items.push({ name: labels.faq, path: faqPath(locale) })
      break
    case 'blog':
      items.push({ name: labels.blog, path: blogPath(locale) })
      break
    case 'blog-post':
      items.push({ name: labels.blog, path: blogPath(locale) })
      if (extraName) items.push({ name: extraName, path: blogPath(locale, route.slug) })
      break
    case 'service':
      items.push({ name: labels.services, path: `${homePath(locale)}#services` })
      if (extraName && route.serviceId) {
        items.push({ name: extraName, path: servicePath(locale, route.serviceId) })
      }
      break
    default:
      break
  }
  return items
}
