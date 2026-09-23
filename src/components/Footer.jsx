import footerImage from '../assets/ctaimg.png'

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="16" rx="2.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 9.5h17M8 3v3.2M16 3v3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
}

function MarkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" fill="#fff" />
    </svg>
  )
}

export default function Footer({ onBookService }) {
  return (
    <>
      <section className="footer-cta" aria-labelledby="footer-cta-title">
        <img className="footer-cta-image" src={footerImage} alt="" aria-hidden="true" loading="lazy" />
        <div className="wrap footer-cta-inner">
          <div>
            <h2 id="footer-cta-title">Need a technician at your door today?</h2>
            <p>Same-day slots open in Darbhanga Lahariya Sarai.</p>
          </div>
          <div className="footer-cta-actions">
            <button className="btn btn-book" type="button" onClick={onBookService}>
              <CalendarIcon />
              Book Service
            </button>
            <a className="btn btn-call" href="tel:+917011612320">
              <PhoneIcon />
              Call Now
            </a>
          </div>
        </div>
      </section>

      <footer>
      <div className="footer-links">
        <div className="wrap footer-links-row">
          <a className="footer-brand" href="#top" aria-label="Veda Electronics home">
            <span className="footer-mark"><MarkIcon /></span>
            <span>
              <strong>Veda Electronics</strong>
              <small>Doorstep repair, Darbhanga Lahariya Sarai</small>
            </span>
          </a>
          <nav className="footer-nav" aria-label="Footer navigation">
            <a href="#top">Services</a>
            <a href="#top">Areas We Cover</a>
            <a href="#why-choose-title">Warranty</a>
            <a href="tel:+917011612320">Contact</a>
          </nav>
          <a className="footer-phone" href="tel:+917011612320">
            <PhoneIcon />
            7011612320
          </a>
        </div>
      </div>

      <div className="footer-copyright">
        <p>(c) 2026 Veda Electronics. All rights reserved. - <a href="tel:+917011612320">7011612320</a></p>
      </div>
      </footer>
    </>
  )
}
