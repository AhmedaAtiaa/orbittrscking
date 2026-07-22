import { SERVICE_SLUGS } from '../seo/siteConfig'
import { servicePath, navigate } from './paths'

/** Navigate to a service landing page (locale-aware) */
export function goToService(serviceId, locale = 'ar') {
  if (!serviceId || !SERVICE_SLUGS[serviceId]) return
  navigate(servicePath(locale, serviceId))
}

export const SERVICE_IDS = Object.keys(SERVICE_SLUGS)

export { SERVICE_SLUGS }
