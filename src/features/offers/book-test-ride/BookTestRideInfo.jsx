// Right-side info cards on the Book Test Ride page — mirrors CSR_New_web `.tr-info-list`.
const INFO_CARDS = [
  {
    icon:        'bi-clock-fill',
    title:       '30-Minute Experience',
    description: 'A dedicated Svitch expert walks you through the CSR 762, its features, and the companion app — followed by a 20-minute road ride.',
  },
  {
    icon:        'bi-person-check-fill',
    title:       'What to Bring',
    description: 'A valid 2-wheeler driving licence and comfortable clothing. Helmet and all safety gear are provided at the dealership.',
  },
  {
    icon:        'bi-geo-alt-fill',
    title:       '500+ Locations',
    description: 'Test rides available at every authorised Svitch dealer across India. Use the dealer finder to locate the closest one.',
  },
  {
    icon:        'bi-gift-fill',
    title:       'Test Ride Offer',
    description: 'Complete a test ride and unlock ₹2,000 off your CSR 762 booking — valid for 30 days on any colour variant.',
  },
]

export default function BookTestRideInfo({ items = INFO_CARDS }) {
  return (
    <aside className="tr-info-list">
      {items.map((c) => (
        <div key={c.title} className="card-base tr-info-card">
          <span className="card-base-icon"><i className={`bi ${c.icon}`}></i></span>
          <h3>{c.title}</h3>
          <p>{c.description}</p>
        </div>
      ))}
    </aside>
  )
}
