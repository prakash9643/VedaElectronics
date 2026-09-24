import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import ServicesCarousel from './components/ServicesCarousel.jsx'
import WhyChooseUs from './components/WhyChooseUs.jsx'
import BookingModal from './components/BookingModal.jsx'
import Footer from './components/Footer.jsx'
import MiddleBannerSwiper from './components/MiddleBannerSwiper.jsx'
import Testimonials from './components/Testimonials.jsx'
import TrustedCompanies from './components/TrustedCompanies.jsx'
import FloatingServiceStack from './components/FloatingServiceStack.jsx'
import FloatingContactButtons from './components/FloatingContactButtons.jsx'
import HomeApplianceServices from './components/HomeApplianceServices.jsx'
import WhyChooseElectronicsServices from './components/WhyChooseElectronicsServices.jsx'
import AdminPanel from './components/AdminPanel.jsx'


export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    const isAdmin = window.location.pathname === '/admin'
    document.title = isAdmin ? 'Admin Workspace | Veda Electronics' : 'Electronic Repair Company in Darbhanga | Veda Electronics'
    let robots = document.querySelector('meta[name="robots"]')
    if (!robots) {
      robots = document.createElement('meta')
      robots.name = 'robots'
      document.head.appendChild(robots)
    }
    robots.content = isAdmin ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'
    fetch('/api/settings').then((response) => response.json()).then((result) => setSettings(result.settings)).catch(() => {})
  }, [])

  if (window.location.pathname === '/admin') return <AdminPanel />

  return (
    <>
      <Header settings={settings} onBookService={() => setBookingOpen(true)} />
      <Hero settings={settings} onBookService={() => setBookingOpen(true)} />
      <ServicesCarousel />
      <WhyChooseUs />
      <MiddleBannerSwiper />
      <HomeApplianceServices />
      <WhyChooseElectronicsServices />
      <TrustedCompanies />
      <Testimonials />
      <Footer settings={settings} onBookService={() => setBookingOpen(true)} />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
      <FloatingServiceStack />
      <FloatingContactButtons />
    </>
  )
}


