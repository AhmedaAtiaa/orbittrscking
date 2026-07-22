import { SITE_URL, BRAND, BUSINESS } from './siteConfig'
import { absoluteUrl } from '../utils/paths'

function brandName(locale) {
  return locale === 'ar' ? BRAND.nameAr : BRAND.nameEn
}

function legalName(locale) {
  return locale === 'ar' ? BRAND.legalAr : BRAND.legalEn
}

function address(locale) {
  return locale === 'ar' ? BUSINESS.addressAr : BUSINESS.addressEn
}

export function organizationSchema(locale = 'ar') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: brandName(locale),
    alternateName: [BRAND.nameAr, BRAND.nameEn, BRAND.shortAr, BRAND.shortEn, 'Orbit Tracking'],
    legalName: legalName(locale),
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: BRAND.logo,
      width: 512,
      height: 512,
    },
    image: BRAND.ogImage,
    email: BUSINESS.email,
    telephone: BUSINESS.phone,
    sameAs: BUSINESS.sameAs,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address(locale),
      addressLocality: locale === 'ar' ? BUSINESS.cityAr : BUSINESS.cityEn,
      addressRegion: locale === 'ar' ? BUSINESS.regionAr : BUSINESS.regionEn,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.country,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: BUSINESS.phone,
        contactType: 'customer service',
        email: BUSINESS.emailCare,
        areaServed: 'SA',
        availableLanguage: ['Arabic', 'English'],
      },
      {
        '@type': 'ContactPoint',
        telephone: BUSINESS.phone,
        contactType: 'sales',
        email: BUSINESS.email,
        areaServed: 'SA',
        availableLanguage: ['Arabic', 'English'],
      },
    ],
  }
}

export function localBusinessSchema(locale = 'ar') {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': `${SITE_URL}/#localbusiness`,
    name: brandName(locale),
    image: BRAND.ogImage,
    url: SITE_URL,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    priceRange: BUSINESS.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address(locale),
      addressLocality: locale === 'ar' ? BUSINESS.cityAr : BUSINESS.cityEn,
      addressRegion: locale === 'ar' ? BUSINESS.regionAr : BUSINESS.regionEn,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    areaServed: BUSINESS.areaServed.map((name) => ({
      '@type': 'Place',
      name,
    })),
    parentOrganization: { '@id': `${SITE_URL}/#organization` },
  }
}

export function websiteSchema(locale = 'ar') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: brandName(locale),
    alternateName: locale === 'ar' ? BRAND.nameEn : BRAND.nameAr,
    inLanguage: locale === 'ar' ? 'ar-SA' : 'en-SA',
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function webPageSchema({
  locale = 'ar',
  title,
  description,
  path,
  type = 'WebPage',
  datePublished,
  dateModified,
}) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: title,
    description,
    inLanguage: locale === 'ar' ? 'ar-SA' : 'en-SA',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: BRAND.ogImage,
    },
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
  }
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function faqSchema(faqs = []) {
  if (!faqs.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function productSchema({
  locale = 'ar',
  name,
  description,
  path,
  image,
  category,
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: image || BRAND.ogImage,
    brand: {
      '@type': 'Brand',
      name: brandName(locale),
    },
    category: category || (locale === 'ar' ? 'تتبع المركبات' : 'Vehicle Tracking'),
    url: absoluteUrl(path),
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'SAR',
      url: absoluteUrl(path),
      seller: { '@id': `${SITE_URL}/#organization` },
    },
  }
}

export function softwareApplicationSchema({
  locale = 'ar',
  name,
  description,
  path,
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, iOS, Android',
    url: absoluteUrl(path),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'SAR',
      description: locale === 'ar' ? 'عرض سعر مخصص' : 'Custom quote',
    },
    provider: { '@id': `${SITE_URL}/#organization` },
    inLanguage: locale === 'ar' ? 'ar' : 'en',
  }
}

export function serviceSchema({
  locale = 'ar',
  name,
  description,
  path,
  image,
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    image: image || BRAND.ogImage,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: {
      '@type': 'Country',
      name: 'Saudi Arabia',
    },
    url: absoluteUrl(path),
    serviceType: locale === 'ar' ? 'تتبع وإدارة الأسطول' : 'Fleet Tracking & Management',
  }
}

export function articleSchema({
  locale = 'ar',
  title,
  description,
  path,
  image,
  datePublished,
  dateModified,
  keywords = [],
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: image || BRAND.ogImage,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: brandName(locale),
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: brandName(locale),
      logo: {
        '@type': 'ImageObject',
        url: BRAND.logo,
      },
    },
    mainEntityOfPage: absoluteUrl(path),
    keywords: keywords.join(', '),
    inLanguage: locale === 'ar' ? 'ar-SA' : 'en-SA',
  }
}

export function buildGraph(schemas = []) {
  const filtered = schemas.filter(Boolean)
  if (!filtered.length) return null
  if (filtered.length === 1) return filtered[0]
  return {
    '@context': 'https://schema.org',
    '@graph': filtered.map(({ '@context': _c, ...rest }) => rest),
  }
}
