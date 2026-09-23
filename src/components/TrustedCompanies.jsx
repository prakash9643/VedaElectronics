const PARTNERS = [
  { name: 'Taj Hotels', domain: 'tajhotels.com' },
  { name: 'ITC Hotels', domain: 'itchotels.com' },
  { name: 'OYO', domain: 'oyorooms.com' },
  { name: 'Tata', domain: 'tata.com' },
  { name: 'Reliance', domain: 'ril.com' },
  { name: 'Infosys', domain: 'infosys.com' },
]

function PartnerCard({ partner }) {
  return (
    <article className="trusted-company-card">
      <img
        src={`https://www.google.com/s2/favicons?domain=${partner.domain}&sz=96`}
        alt={`${partner.name} logo`}
        loading="lazy"
      />
      <span>{partner.name}</span>
    </article>
  )
}

export default function TrustedCompanies() {
  return (
    <section className="trusted-companies" aria-labelledby="trusted-companies-title">
      <div className="wrap trusted-companies-inner">
        <div className="trusted-companies-copy">
          <span className="trusted-companies-kicker">Trusted Network</span>
          <h2 id="trusted-companies-title">Trusted By Leading Hotels &amp; Companies in India</h2>
        </div>

        <div className="trusted-companies-marquee" aria-label="Trusted hotels and companies">
          <div className="trusted-companies-track">
            {[...PARTNERS, ...PARTNERS].map((partner, index) => (
              <div className="trusted-company-slide" key={partner.name + index}>
                <PartnerCard partner={partner} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
