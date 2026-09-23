export default function Header({ onBookService }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a href="#top" className="logo" aria-label="Veda Electronics home">
          <span className="logo-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" fill="#fff" />
            </svg>
          </span>
          <span className="logo-text">
            Veda Electronics
            <span>Doorstep Repair Service</span>
          </span>
        </a>

        <div className="header-actions">
          <a className="btn btn-call" href="tel:+917011612320">
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path
                d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
            <span className="btn-label">Call Now</span>
          </a>
          <button className="btn btn-book" type="button" onClick={onBookService}>
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect x="3.5" y="5" width="17" height="16" rx="2.2" stroke="currentColor" strokeWidth="1.8" />
              <path d="M3.5 9.5h17M8 3v3.2M16 3v3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M8.5 13.2l2.2 2.2 4.3-4.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Book Service</span>
          </button>
        </div>
      </div>
    </header>
  )
}
