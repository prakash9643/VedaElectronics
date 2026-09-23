import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import acRepairImage from '../assets/acrepair.jfif'
import refrigeratorRepairImage from '../assets/refrigeratorrepair.jfif'
import washingMachineRepairImage from '../assets/washingmachinerepair.jfif'
import microwaveRepairImage from '../assets/microwave.jfif'
import tvRepairImage from '../assets/LED  LCD TV Repair.jfif'
import roRepairImage from '../assets/RO Water Purifier Repair.jfif'
import chimneyRepairImage from '../assets/Kitchen Chimney Repair.jfif'
import geyserRepairImage from '../assets/Geyser Repair.jfif'

const HOME_APPLIANCE_SERVICES = [
  { title: 'AC Repair', text: 'Fast cooling checks and AC servicing.', image: acRepairImage },
  { title: 'Refrigerator Repair', text: 'Reliable fridge diagnosis and repair.', image: refrigeratorRepairImage },
  { title: 'Washing Machine Repair', text: 'Washer service for common faults.', image: washingMachineRepairImage },
  { title: 'Microwave Oven Repair', text: 'Safe microwave inspection and repair.', image: microwaveRepairImage },
  { title: 'LED / LCD TV Repair', text: 'Screen, sound, and power issue support.', image: tvRepairImage },
  { title: 'RO Water Purifier Repair', text: 'Filter, leakage, and flow repairs.', image: roRepairImage },
  { title: 'Kitchen Chimney Repair', text: 'Deep cleaning and motor service.', image: chimneyRepairImage },
  { title: 'Geyser Repair', text: 'Heating, wiring, and safety checks.', image: geyserRepairImage },
]

export default function HomeApplianceServices() {
  return (
    <section className="v4" aria-labelledby="home-appliance-services-title">
      <div className="wrap">
        <div className="v4-head">
          <span className="section-eyebrow"><span>+</span> Electronics Services</span>
          <h2 id="home-appliance-services-title">Our Home Appliance Repair Services</h2>
        </div>
        <Swiper
          className="v4-swiper"
          modules={[Autoplay]}
          slidesPerView={1.15}
          spaceBetween={16}
          loop={true}
          speed={900}
          autoplay={{ delay: 1800, disableOnInteraction: false, pauseOnMouseEnter: true }}
          breakpoints={{
            421: { slidesPerView: 2, spaceBetween: 16 },
            641: { slidesPerView: 3, spaceBetween: 16 },
            981: { slidesPerView: 5, spaceBetween: 16 },
          }}
        >
          {HOME_APPLIANCE_SERVICES.map((service) => (
            <SwiperSlide className="v4-slide" key={service.title}>
              <a className="v4-card" href="/services-we-offer/">
                <img src={service.image} alt="" loading="lazy" />
                <div className="v4-card-body">
                  <div className="v4-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2.5 20 5.5v5.6c0 5.1-3.3 8.7-8 10.4-4.7-1.7-8-5.3-8-10.4V5.5Z" />
                      <path d="M8.7 12.2 11 14.5l4.3-4.6" />
                    </svg>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="v4-info">
          <p>
            Electronics Services is one of the best home appliance repair service providers in All India. If you are located anywhere in India and want to repair your product, you can call anytime to get instant doorstep service.
          </p>
          <p>
            We are experts in repairing Refrigerator, Washing Machine, and Microwave appliances. Our many years of experience ensure that you get skilled and trained technicians for your appliances.
          </p>
          <p>
            When you want fast and reliable service, just call us and we'll send a technician quickly. We are part of India's leading service company providing trusted home appliance repair solutions.
          </p>
          <p>
            We offer multi-brand Refrigerator, Washing Machine, and Microwave repair service at your location anywhere in India.
          </p>
          <div className="v4-actions">
            <a className="btn btn-book" href="/services-we-offer/">
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3.5" y="5" width="17" height="16" rx="2.2" stroke="currentColor" strokeWidth="1.8" />
                <path d="M3.5 9.5h17M8 3v3.2M16 3v3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M8.5 13.2l2.2 2.2 4.3-4.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Book Service &rarr;</span>
            </a>
            <a className="btn btn-call" href="tel:+917011612320">
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              </svg>
              <span>Call 7011612320</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

