import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'



const SERVICES = [
  {
    label: 'AC Repair',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="5" width="20" height="10" rx="2" stroke="#fff" strokeWidth="1.7" />
        <path d="M6 19l1-4M18 19l-1-4M12 15v4" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Refrigerator Repair',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="2" width="14" height="20" rx="2" stroke="#fff" strokeWidth="1.7" />
        <path d="M8 6h.01M8 10h.01" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        <path d="M5 9h14" stroke="#fff" strokeWidth="1.7" />
      </svg>
    ),
  },
  {
    label: 'Washing Machine Repair',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="2" width="18" height="20" rx="2" stroke="#fff" strokeWidth="1.7" />
        <circle cx="12" cy="14" r="5" stroke="#fff" strokeWidth="1.7" />
        <circle cx="8" cy="5.5" r="1" fill="#fff" />
      </svg>
    ),
  },
  {
    label: 'Microwave Oven Repair',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="4" width="20" height="15" rx="2" stroke="#fff" strokeWidth="1.7" />
        <rect x="4.5" y="6.5" width="12" height="10" rx="1" stroke="#fff" strokeWidth="1.5" />
        <circle cx="19" cy="11.5" r="1" fill="#fff" />
      </svg>
    ),
  },
  {
    label: 'LED / LCD TV Repair',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="4" width="18" height="12" rx="2" stroke="#fff" strokeWidth="1.7" />
        <path d="M8 20h8M12 16v4" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'RO Water Purifier Repair',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2c3 4 5 7.2 5 10.2a5 5 0 0 1-10 0C7 9.2 9 6 12 2z" stroke="#fff" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Kitchen Chimney Repair',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 3h12l-2 6h2l-5 12v-7H9v7L4 9h2l0-6z" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Geyser Repair',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="7" y="2" width="10" height="20" rx="4" stroke="#fff" strokeWidth="1.7" />
        <path d="M12 8c1.2 1.4 1.6 2.4 1.6 3.4a1.6 1.6 0 0 1-3.2 0c0-1 .4-2 1.6-3.4z" fill="#fff" />
      </svg>
    ),
  },
]

export default function ServicesCarousel() {
  return (
    <section className="usp-strip" aria-label="Services we repair">
      <div className="usp-wrap">
        <div className="usp-swiper">
          <Swiper
            modules={[Autoplay, FreeMode]}
            slidesPerView="auto"
            spaceBetween={16}
            loop={true}
            speed={4500}
            autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
            allowTouchMove={true}
            freeMode={{ enabled: true, momentum: false }}
          >
            {SERVICES.map((service) => (
              <SwiperSlide key={service.label} className="usp-slide">
                <a className="usp-link" href="#top">
                  <span className="usp-icon" aria-hidden="true">
                    {service.icon}
                  </span>
                  {service.label}
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

