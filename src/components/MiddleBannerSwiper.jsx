import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import banner1 from '../assets/middle-banner1.png'
import banner2 from '../assets/middle-banner2.png'

export default function MiddleBannerSwiper() {
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  return (
    <div className="mb-swiper-wrap">
      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop={true}
        speed={800}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current
          swiper.params.navigation.nextEl = nextRef.current
        }}
        className="mb-swiper"
      >
        <SwiperSlide>
          <img src={banner1} alt="Banner 1" className="mb-slide-img" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={banner2} alt="Banner 2" className="mb-slide-img" />
        </SwiperSlide>
      </Swiper>

      {/* Bottom-right arrows */}
      <div className="mb-arrows">
        <button ref={prevRef} className="mb-arrow mb-arrow-prev" aria-label="Previous">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button ref={nextRef} className="mb-arrow mb-arrow-next" aria-label="Next">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  )
}
