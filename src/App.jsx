import { lazy, Suspense, useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import Preloader from './components/effects/Preloader'
import ScrollProgress from './components/effects/ScrollProgress'
import SectionDivider from './components/effects/SectionDivider'
import WhatsAppButton from './components/WhatsAppButton'
import { usePerfMode } from './utils/perf'
import { useHashRoute } from './hooks/useHashRoute'

const ImageMarquee = lazy(() => import('./components/ImageMarquee'))
const Services = lazy(() => import('./components/Services'))
const Showcase = lazy(() => import('./components/Showcase'))
const Gallery = lazy(() => import('./components/Gallery'))
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

function SectionFallback() {
  return <div className="min-h-[120px]" aria-hidden />
}

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const { lite, ready } = usePerfMode()
  const route = useHashRoute()
  const isLegal = route.name === 'privacy' || route.name === 'terms'
  const isAbout = route.name === 'about'
  const isCareers = route.name === 'careers'
  const isTeam = route.name === 'team'
  const isService = route.name === 'service'
  const isSubpage = isLegal || isAbout || isCareers || isTeam || isService

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

  return (
    <div className={`relative min-h-screen ${lite ? 'perf-lite' : ''}`}>
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

      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-900 via-surface-950 to-surface-975" />
        {!lite && <div className="animated-grid absolute inset-0 opacity-70" />}
        {!lite && !isSubpage && (
          <div className="absolute bottom-0 inset-x-0 h-1/3 hologram-grid opacity-20" />
        )}
      </div>

      <Navbar scrolled={scrolled || isSubpage} />

      {isLegal ? (
        <main>
          <Suspense fallback={<SectionFallback />}>
            <LegalPage type={route.name} />
          </Suspense>
        </main>
      ) : isAbout ? (
        <main>
          <Suspense fallback={<SectionFallback />}>
            <AboutPage />
          </Suspense>
        </main>
      ) : isCareers ? (
        <main>
          <Suspense fallback={<SectionFallback />}>
            <CareersPage />
          </Suspense>
        </main>
      ) : isTeam ? (
        <main>
          <Suspense fallback={<SectionFallback />}>
            <TeamPage />
          </Suspense>
        </main>
      ) : isService ? (
        <main>
          <Suspense fallback={<SectionFallback />}>
            <ServiceDetailPage serviceId={route.serviceId} />
          </Suspense>
        </main>
      ) : (
        <main>
          <Hero />
          <Suspense fallback={<SectionFallback />}>
            <ImageMarquee />
            {!lite && <SectionDivider />}
            <Services />
            {!lite && <SectionDivider flip />}
            <Showcase />
            <Gallery />
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
