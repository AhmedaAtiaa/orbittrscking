import { lazy, Suspense, useState, useEffect, useMemo } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import Preloader from './components/effects/Preloader'
import ScrollProgress from './components/effects/ScrollProgress'
import SectionDivider from './components/effects/SectionDivider'
import WhatsAppButton from './components/WhatsAppButton'
import { usePerfMode } from './utils/perf'
import { usePathRoute } from './hooks/usePathRoute'
import { useLanguage } from './i18n/LanguageContext'
import RouteSeo from './seo/RouteSeo'
import Analytics from './seo/Analytics'
import AppLink from './components/AppLink'
import { homePath } from './utils/paths'

const ImageMarquee = lazy(() => import('./components/ImageMarquee'))
const Services = lazy(() => import('./components/Services'))
const Showcase = lazy(() => import('./components/Showcase'))
const Features = lazy(() => import('./components/Features'))
const Stats = lazy(() => import('./components/Stats'))
const Partners = lazy(() => import('./components/Partners'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const CTA = lazy(() => import('./components/CTA'))
const Contact = lazy(() => import('./components/Contact'))
const ChatAssistant = lazy(() => import('./components/ChatAssistant'))
const ParticleNetwork = lazy(() => import('./components/effects/ParticleNetwork'))
const AuroraBackground = lazy(() => import('./components/effects/AuroraBackground'))
const FloatingOrbs = lazy(() => import('./components/effects/FloatingOrbs'))
const LegalPage = lazy(() => import('./pages/LegalPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const CareersPage = lazy(() => import('./pages/CareersPage'))
const TeamPage = lazy(() => import('./pages/TeamPage'))
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'))
const FaqPage = lazy(() => import('./pages/FaqPage'))

function SectionFallback() {
  return <div className="min-h-[120px]" aria-hidden />
}

function NotFound({ locale }) {
  return (
    <section className="relative min-h-screen pt-28 pb-20 px-4">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-3xl font-black text-white mb-4">
          {locale === 'ar' ? 'الصفحة غير موجودة' : 'Page not found'}
        </h1>
        <p className="text-slate-400 mb-6">
          {locale === 'ar'
            ? 'عذراً، لم نتمكن من العثور على هذه الصفحة.'
            : 'Sorry, we could not find that page.'}
        </p>
        <AppLink href={homePath(locale)} className="btn-primary text-sm !py-3 !px-6">
          {locale === 'ar' ? 'العودة للرئيسية' : 'Back to home'}
        </AppLink>
      </div>
    </section>
  )
}

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const { lite, ready } = usePerfMode()
  const route = usePathRoute()
  const { locale, setLocale, t } = useLanguage()

  // Sync language with URL locale (URL is source of truth after path-based i18n)
  useEffect(() => {
    if (route.locale && route.locale !== locale) {
      setLocale(route.locale)
    }
  }, [route.locale, locale, setLocale])

  const isLegal = route.name === 'privacy' || route.name === 'terms'
  const isAbout = route.name === 'about'
  const isCareers = route.name === 'careers'
  const isTeam = route.name === 'team'
  const isService = route.name === 'service'
  const isBlog = route.name === 'blog'
  const isBlogPost = route.name === 'blog-post'
  const isFaq = route.name === 'faq'
  const isNotFound = route.name === 'notfound'
  const isSubpage =
    isLegal || isAbout || isCareers || isTeam || isService || isBlog || isBlogPost || isFaq || isNotFound

  const serviceTitle = useMemo(() => {
    if (!isService || !route.serviceId) return null
    const pages = t('servicePages.pages') || {}
    return pages[route.serviceId]?.title || null
  }, [isService, route.serviceId, t])

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), lite ? 600 : 900)
    return () => clearTimeout(timer)
  }, [lite])

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50)
        ticking = false
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Hash scroll for #contact etc. after home load / locale change.
  // Re-read hash when the timer fires so a language switch that cleared #contact
  // cannot still scroll to Contact from a stale closed-over hash.
  useEffect(() => {
    if (route.name !== 'home') return
    if (!window.location.hash || window.location.hash.startsWith('#/')) return
    const tmr = setTimeout(() => {
      const hash = window.location.hash?.replace(/^#/, '')
      if (!hash || hash.startsWith('/')) return
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
    }, 400)
    return () => clearTimeout(tmr)
  }, [route.name, route.locale])

  return (
    <div className={`relative min-h-screen ${lite ? 'perf-lite' : ''}`}>
      <RouteSeo route={route} serviceTitle={serviceTitle} />
      <Analytics />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-brand-500 focus:text-white focus:outline-none"
      >
        {locale === 'ar' ? 'تخطي إلى المحتوى' : 'Skip to content'}
      </a>
      <Preloader done={loaded} />
      {!lite && !isSubpage && <ScrollProgress />}

      <Suspense fallback={null}>
        {!lite && ready && (
          <>
            <AuroraBackground />
            <FloatingOrbs />
            {!isSubpage && <ParticleNetwork />}
          </>
        )}
      </Suspense>

      <div className="fixed inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-surface-900 via-surface-950 to-surface-975" />
        {!lite && <div className="animated-grid absolute inset-0 opacity-70" />}
        {!lite && !isSubpage && (
          <div className="absolute bottom-0 inset-x-0 h-1/3 hologram-grid opacity-20" />
        )}
      </div>

      <Navbar scrolled={scrolled || isSubpage} />

      {isLegal ? (
        <main id="main-content">
          <Suspense fallback={<SectionFallback />}>
            <LegalPage type={route.name} />
          </Suspense>
        </main>
      ) : isAbout ? (
        <main id="main-content">
          <Suspense fallback={<SectionFallback />}>
            <AboutPage />
          </Suspense>
        </main>
      ) : isCareers ? (
        <main id="main-content">
          <Suspense fallback={<SectionFallback />}>
            <CareersPage />
          </Suspense>
        </main>
      ) : isTeam ? (
        <main id="main-content">
          <Suspense fallback={<SectionFallback />}>
            <TeamPage />
          </Suspense>
        </main>
      ) : isService ? (
        <main id="main-content">
          <Suspense fallback={<SectionFallback />}>
            <ServiceDetailPage serviceId={route.serviceId} />
          </Suspense>
        </main>
      ) : isBlog ? (
        <main id="main-content">
          <Suspense fallback={<SectionFallback />}>
            <BlogPage />
          </Suspense>
        </main>
      ) : isBlogPost ? (
        <main id="main-content">
          <Suspense fallback={<SectionFallback />}>
            <BlogPostPage slug={route.slug} />
          </Suspense>
        </main>
      ) : isFaq ? (
        <main id="main-content">
          <Suspense fallback={<SectionFallback />}>
            <FaqPage />
          </Suspense>
        </main>
      ) : isNotFound ? (
        <main id="main-content">
          <NotFound locale={route.locale} />
        </main>
      ) : (
        <main id="main-content">
          <Hero />
          <Suspense fallback={<SectionFallback />}>
            <ImageMarquee />
            {!lite && <SectionDivider />}
            <Services />
            {!lite && <SectionDivider flip />}
            <Showcase />
            {!lite && <SectionDivider />}
            <Features />
            <Stats />
            <Partners />
            <Testimonials />
            <CTA />
            <Contact />
          </Suspense>
        </main>
      )}

      <Footer />
      <WhatsAppButton />
      <Suspense fallback={null}>
        <ChatAssistant />
      </Suspense>
    </div>
  )
}

export default App
