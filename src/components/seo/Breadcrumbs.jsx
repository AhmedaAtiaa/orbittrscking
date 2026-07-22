import AppLink from '../AppLink'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

/** Visual breadcrumb nav — matches BreadcrumbList schema */
export default function Breadcrumbs({ items = [] }) {
  const { isRtl } = useLanguage()
  if (!items.length) return null
  const Chevron = isRtl ? ChevronLeft : ChevronRight

  return (
    <nav aria-label={isRtl ? 'مسار التنقل' : 'Breadcrumb'} className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-slate-400">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={item.path + i} className="flex items-center gap-1.5">
              {i > 0 && <Chevron className="w-3.5 h-3.5 opacity-50" aria-hidden />}
              {last ? (
                <span aria-current="page" className="text-slate-200 font-medium truncate max-w-[220px]">
                  {item.name}
                </span>
              ) : (
                <AppLink href={item.path} className="hover:text-brand-400 transition-colors truncate max-w-[180px]">
                  {item.name}
                </AppLink>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
