import { useState } from 'react'
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


export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <>
      <Header onBookService={() => setBookingOpen(true)} />
      <Hero onBookService={() => setBookingOpen(true)} />
      <ServicesCarousel />
      <WhyChooseUs />
      <MiddleBannerSwiper />
      <HomeApplianceServices />
      <WhyChooseElectronicsServices />
      <TrustedCompanies />
      <Testimonials />
      <Footer onBookService={() => setBookingOpen(true)} />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
      <FloatingServiceStack />
      <FloatingContactButtons />
    </>
  )
}


