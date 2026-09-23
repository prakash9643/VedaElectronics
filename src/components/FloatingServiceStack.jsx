import { useEffect, useState } from 'react'
import BookingModal from './BookingModal.jsx'
import './FloatingServiceStack.css'

const SERVICES = ['AC Repair', 'Refrigerator Repair', 'Washing Machine Repair', 'Microwave Oven Repair', 'LED / LCD TV Repair', 'RO Water Purifier Repair', 'Kitchen Chimney Repair', 'Geyser Repair']

export default function FloatingServiceStack() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (paused || bookingOpen) return undefined
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % SERVICES.length), 3600)
    return () => window.clearInterval(timer)
  }, [paused, bookingOpen])

  if (!visible) return null

  const service = SERVICES[activeIndex]

  return <>
    <aside className="floating-service-stack" aria-label="Our repair services" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="floating-service-card" key={service}>
        <button className="floating-service-close" type="button" aria-label="Close service card" onClick={() => setVisible(false)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
        </button>
        <h2>{service}</h2>
        <p>Fast, trusted repair at your doorstep.</p>
        <button className="floating-service-action" type="button" onClick={() => setBookingOpen(true)}>Service Now <span aria-hidden="true">-&gt;</span></button>
      </div>
    </aside>
    <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
  </>
}
