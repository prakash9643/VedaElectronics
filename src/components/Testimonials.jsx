import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

const TESTIMONIALS = [
  {
    name: 'Rohit Kumar',
    area: 'Laheriya Sarai',
    image: 'https://images.unsplash.com/photo-1694871420319-0ee2bab9c1a5?auto=format&fit=crop&w=160&h=160&q=80',
    review: 'Quick response and a clean repair. My TV was working the same evening.',
  },
  {
    name: 'Priya Sharma',
    area: 'Darbhanga',
    image: 'https://images.unsplash.com/photo-1649140338036-a740e72d5581?auto=format&fit=crop&w=160&h=160&q=80',
    review: 'The technician explained the issue clearly and fixed my refrigerator at home.',
  },
  {
    name: 'Vivek Singh',
    area: 'Laheriya Sarai',
    image: 'https://images.unsplash.com/photo-1531339413195-cc6c17163974?auto=format&fit=crop&w=160&h=160&q=80',
    review: 'Polite service, fair pricing and the work was completed without any hassle.',
  },
]

function RatingStars() {
  return (
    <span className="testimonial-stars" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, index) => (
        <svg key={index} viewBox="0 0 24 24" aria-hidden="true">
          <path d="m12 2.8 2.8 5.7 6.3.9-4.6 4.5 1.1 6.3-5.6-3-5.6 3 1.1-6.3-4.6-4.5 6.3-.9L12 2.8Z" />
        </svg>
      ))}
    </span>
  )
}

export default function Testimonials() {
  return (
    <section className="testimonials" aria-labelledby="testimonials-title">
      <div className="wrap">
        <div className="testimonials-head">
          <span className="section-eyebrow">Customer Reviews</span>
          <h2 id="testimonials-title">Trusted by local homes</h2>
        </div>

        <Swiper
          className="testimonials-swiper"
          modules={[Autoplay]}
          loop
          speed={700}
          autoplay={{ delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true }}
          spaceBetween={18}
          slidesPerView={1}
          breakpoints={{
            680: { slidesPerView: 2 },
            980: { slidesPerView: 3 },
          }}
        >
          {TESTIMONIALS.map((testimonial) => (
            <SwiperSlide key={testimonial.name}>
              <article className="testimonial-card">
                <div className="testimonial-card-top">
                  <img src={testimonial.image} alt={testimonial.name} loading="lazy" />
                  <div>
                    <h3>{testimonial.name}</h3>
                    <span>{testimonial.area}</span>
                  </div>
                </div>
                <RatingStars />
                <p>"{testimonial.review}"</p>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

