#!/usr/bin/env node
/**
 * Generates public/sitemap.xml with hreflang alternates for AR/EN.
 * Run automatically after vite build.
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const siteUrl = (process.env.VITE_SITE_URL || 'https://orbitdimension.com').replace(/\/$/, '')

const SERVICE_SLUGS = [
  'gps-tracking',
  'car-rental-tracking',
  'temperature-monitoring',
  'truck-weight-management',
  'school-bus-tracking',
  'specialized-transport',
  'fuel-monitoring',
  'equipment-management',
  'waste-management',
  'ai-dashcam',
]

const BLOG_SLUGS = [
  'fleet-tracking-saudi-arabia-guide',
  'gps-tracking-devices-explained',
  'school-bus-tracking-safety',
  'fuel-monitoring-cut-costs',
  'temperature-monitoring-cold-chain',
  'ai-camera-fleet-safety',
  'iot-platform-vehicle-telemetry',
  'truck-tracking-logistics',
]

const STATIC = ['', 'about', 'team', 'careers', 'privacy', 'terms', 'faq', 'blog']

function locPath(locale, path) {
  const clean = path ? `/${path}` : ''
  if (locale === 'en') return path ? `/en${clean}` : '/en'
  return clean || '/'
}

function abs(path) {
  return `${siteUrl}${path === '/' ? '' : path}`
}

function urlEntry(arPath, enPath, priority, changefreq = 'weekly') {
  const ar = abs(arPath)
  const en = abs(enPath)
  return `  <url>
    <loc>${ar}</loc>
    <xhtml:link rel="alternate" hreflang="ar" href="${ar}" />
    <xhtml:link rel="alternate" hreflang="en" href="${en}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${ar}" />
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>
  <url>
    <loc>${en}</loc>
    <xhtml:link rel="alternate" hreflang="ar" href="${ar}" />
    <xhtml:link rel="alternate" hreflang="en" href="${en}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${ar}" />
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

const urls = []

for (const page of STATIC) {
  const priority = page === '' ? '1.0' : page === 'blog' ? '0.8' : '0.7'
  const freq = page === '' ? 'daily' : 'weekly'
  urls.push(urlEntry(locPath('ar', page), locPath('en', page), priority, freq))
}
for (const slug of SERVICE_SLUGS) {
  urls.push(
    urlEntry(locPath('ar', `services/${slug}`), locPath('en', `services/${slug}`), '0.9', 'weekly')
  )
}
for (const slug of BLOG_SLUGS) {
  urls.push(
    urlEntry(locPath('ar', `blog/${slug}`), locPath('en', `blog/${slug}`), '0.75', 'monthly')
  )
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`

const outDir = join(root, 'dist')
mkdirSync(outDir, { recursive: true })
writeFileSync(join(outDir, 'sitemap.xml'), xml)
writeFileSync(join(root, 'public', 'sitemap.xml'), xml)
console.log(`sitemap.xml written (${urls.length * 2} URLs with hreflang) → dist/ & public/`)
