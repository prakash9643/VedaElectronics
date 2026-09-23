const BENEFITS = [
  {
    title: 'Expert & Certified Technicians',
    text: 'Accurate diagnosis, long-lasting repairs.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14.7 6.3a4 4 0 0 0-5.4 4.9L3 17.5V21h3.5l6.3-6.3a4 4 0 0 0 4.9-5.4l-2.6 2.6-2.4-.6-.6-2.4Z" />
      </svg>
    ),
  },
  {
    title: 'Same Day Doorstep Service',
    text: 'Quick response at your door.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
      </svg>
    ),
  },
  {
    title: 'Affordable & Transparent Pricing',
    text: 'No hidden charges, ever.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9.2" />
        <path d="M8.5 8h7M8.5 11h7M8.5 8c3 0 4.7 1 4.7 3s-1.7 3-4.7 3M8.5 14l5 5" />
      </svg>
    ),
  },
  {
    title: 'Service Warranty',
    text: 'Warranty on every repair.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2.5 20 5.5v5.6c0 5.1-3.3 8.7-8 10.4-4.7-1.7-8-5.3-8-10.4V5.5Z" />
        <path d="M8.7 12.2 11 14.5l4.3-4.6" />
      </svg>
    ),
  },
  {
    title: 'Trusted by Thousands',
    text: 'A proven reputation nationwide.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" />
        <path d="M7 5H4v1.5A3.5 3.5 0 0 0 7.5 10" />
        <path d="M17 5h3v1.5A3.5 3.5 0 0 1 16.5 10" />
        <path d="M12 13v3.5" />
        <path d="M9 20.5h6" />
        <path d="M9.5 20.5c0-1.8.9-3 2.5-3s2.5 1.2 2.5 3" />
      </svg>
    ),
  },
]

export default function WhyChooseElectronicsServices() {
  return (
    <section className="v5b" aria-labelledby="why-electronics-services-title">
      <div className="wrap">
        <div className="v5b-top">
          <div>
            <span className="section-eyebrow"><span>+</span> Benefits</span>
            <h2 id="why-electronics-services-title">Why Choose Electronics Services</h2>
          </div>
          <p>
            When it comes to home appliance repair, you deserve fast, reliable, and professional service. Electronics Services is trusted by thousands of customers across India for quality workmanship and dependable support.
          </p>
        </div>
        <div className="v5b-grid">
          {BENEFITS.map((benefit) => (
            <article className="v5b-item" key={benefit.title}>
              <div className="v5b-icon">{benefit.icon}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
