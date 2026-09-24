import heroImage from '../assets/heroimg.jpeg'

export default function Hero({ settings, onBookService }) {
  const phone = settings?.phone || '7011612320'
  return (
    <main id="top" className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">
            <svg className="eyebrow-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path
                d="M12 2.5l2.7 6.06 6.55.6-4.94 4.4 1.46 6.44L12 16.9l-5.77 3.1 1.46-6.44-4.94-4.4 6.55-.6L12 2.5z"
                fill="var(--orange)"
                stroke="var(--orange)"
                strokeWidth="1"
                strokeLinejoin="round"
              />
            </svg>
            <span className="hero-eyebrow-full">{settings?.heroEyebrow || "Darbhanga Lahariya Sarai's trusted electronics repair service"}</span>
            <span className="hero-eyebrow-sm">Trusted in {settings?.serviceArea || 'Darbhanga'}</span>
          </span>

          <h1>
            {(settings?.heroTitle || 'Electronics Repair\nMade Simple').split('\n').map((line) => <span key={line}>{line}<br /></span>)}
          </h1>

          <p className="lede">
            {settings?.heroDescription || 'TVs, mixers, microwaves, inverters and every home electronic - diagnosis, repair and installation for all brands. Book in under a minute and a verified technician reaches your home.'}
          </p>

          <div className="cta-row">
            <button className="btn btn-book" type="button" onClick={onBookService}>
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="3.5" y="5" width="17" height="16" rx="2.2" stroke="currentColor" strokeWidth="1.8" />
                <path d="M3.5 9.5h17M8 3v3.2M16 3v3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M8.5 13.2l2.2 2.2 4.3-4.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Book Service
            </button>
            <a className="btn btn-call" href={`tel:${phone}`}>
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                  d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="btn-label">Call {phone}</span>
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-frame">
            <div className="visual-photo">
              <img
                src={heroImage}
                alt="Veda Electronics technician repairing an electronic device at the workbench"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="hero-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" focusable="false">
          <path fill="#253c96" d="M0,44 C240,104 420,4 720,44 C1020,84 1200,104 1440,54 L1440,120 L0,120 Z"></path>
        </svg>
      </div>
    </main>
  )
}

