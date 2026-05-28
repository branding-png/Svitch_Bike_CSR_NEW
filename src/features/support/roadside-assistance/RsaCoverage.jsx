// "What's Covered" coverage grid — mirrors CSR_New_web `.onspot-sec` block.
// 6 cards driven by data; styling lives in roadside-assistance.css under the
// `.ra-coverage-grid` + `.ra-coverage-card` selectors.
const COVERAGE = [
  { icon: 'bi-battery-half', title: 'Battery Boost',         text: "Out of charge? We'll bring a portable charger or swap battery on the spot." },
  { icon: 'bi-truck',        title: 'Free Towing',           text: 'Up to 50 km tow to nearest Svitch service centre. Beyond 50 km at ₹25/km.' },
  { icon: 'bi-tools',        title: 'On-Spot Repair',        text: 'Minor electrical, brake, suspension issues fixed at your location.' },
  { icon: 'bi-circle',       title: 'Flat Tyre / Puncture',  text: 'We repair the puncture or replace the tube on-site within 60 minutes.' },
  { icon: 'bi-key-fill',     title: 'Lockout Service',       text: 'Locked out of the bike or lost key? Our team will get you riding again.' },
  { icon: 'bi-house-fill',   title: 'Hotel Assistance',      text: "If repair takes >6 hours and you're 100+ km from home, hotel night up to ₹2,500." },
]

export default function RsaCoverage({ items = COVERAGE }) {
  return (
    <section aria-label="RsaCoverage" className="section-pad onspot-sec">
      <div className="container">
        <div className="onspot-head">
          <span className="section-label">What&apos;s Covered</span>
          <h2 className="section-title">
            On-Spot help &amp; <span className="accent">Free towing</span>
          </h2>
          <p className="section-desc">
            Every CSR 762 comes with one year of free Roadside Assistance.
            Renew yearly or bundle with EV Shield Plus insurance.
          </p>
        </div>

        <div className="ra-coverage-grid">
          {items.map((c) => (
            <div key={c.title} className="card-base ra-coverage-card">
              <div className="card-base-icon card-base-icon-center">
              <i className={`bi ${c.icon}`}></i>
              </div>
              <h3 className="card-base-title">{c.title}</h3>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
