import techniciansImage from '../assets/technicians.jfif'
const FEATURES = [
  {
    title: 'Same Day Service',
    text: 'Quick, efficient repairs at your doorstep.',
    tone: 'dark',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Affordable Pricing',
    text: 'Transparent, competitive rates with no surprises.',
    tone: 'dark',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3.5" y="6.5" width="17" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3.5 10.5h17M8 15h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function WhyChooseUs() {
  return (
    <section className="why-choose" aria-labelledby="why-choose-title">
      <div className="wrap">
        <div className="why-choose-head">
          <span className="section-eyebrow why-choose-eyebrow">
            <span aria-hidden="true">+</span>
            <span className="why-choose-eyebrow-full">Trusted by homes in Darbhanga Lahariya Sarai</span>
            <span className="why-choose-eyebrow-sm">Trusted in Darbhanga</span>
          </span>
          <h2 id="why-choose-title">Why Choose Us</h2>
        </div>

        <div className="why-choose-grid">
          <article className="why-tile why-tile-feature">
            <img className="why-tile-feature-image" src={techniciansImage} alt="Expert technician" loading="lazy" />
            <div className="why-tile-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M14 2 6 12h5l-1 10 9-14h-5l1-6z" fill="currentColor" />
              </svg>
            </div>
            <div>
              <h3>Expert Technicians</h3>
              <p>Certified professionals who know every major brand and model.</p>
            </div>
          </article>

          {FEATURES.map((feature) => (
            <article className={'why-tile why-tile-small ' + feature.tone} key={feature.title}>
              <div className="why-tile-icon" aria-hidden="true">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}

          <article className="why-tile why-tile-warranty">
            <div className="why-warranty-glow" aria-hidden="true" />
            <div className="why-tile-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 3l7 3v6c0 5-3 7.5-7 9-4-1.5-7-4-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3>Service Warranty</h3>
            <p>Every repair comes with an assured 30-day warranty, so you are covered after we leave.</p>
          </article>
        </div>

        <div className="why-choose-actions">
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
    </section>
  )
}

