// CSR 762 — "Own It Today." pricing section. Mirrors svitch.bike `#pricing`.
// Two cards: the variant price + the EMI finance card. Data-driven so extra
// variants (e.g. a "Performance" tier) can be added by extending CARDS.
const CARDS = [
  {
    kind:    'variant',
    label:   'Variant',
    name:    'CSR 762',
    amount:  '₹1,89,999',
    note:    'Ex-showroom • EMI from ₹2,899/mo',
    features: [
      '160+ km Range',
      'City & Eco Modes',
      '7" TFT Display',
      '40 ltr Bootspace',
      'Dual Swappable Battery',
      '3 Year Warranty',
    ],
    cta: { href: '#test-ride', label: 'Book Now', variant: 'secondary' },
  },
  {
    kind:    'finance',
    label:   'Finance',
    name:    'Easy EMI',
    amount:  '₹3,299',
    suffix:  '/mo',
    note:    '0% processing fee • Instant approval',
    features: [
      '12/24/36 Month Plans',
      'Minimum Down Payment Option',
      'Instant Online Approval',
      '15+ Banking Partners',
      'No Foreclosure Charges',
      'Flexible Tenure Options',
    ],
    cta: { href: '#test-ride', label: 'Apply Now', variant: 'secondary' },
  },
]

function PriceCard({ card, index }) {
  const isFinance = card.kind === 'finance'
  return (
    <div className={`price-card reveal delay-${index * 2 + 1}`}>
      <span className="price-card-label">{card.label}</span>
      <h3 className="price-card-name">{card.name}</h3>
      <div className={`price-amount${isFinance ? ' price-amount--sm' : ''}`}>
        {card.amount}
        {card.suffix && <span className="price-amount-suffix">{card.suffix}</span>}
      </div>
      <div className="price-note">{card.note}</div>
      <ul className="price-features-list">
        {card.features.map((f) => (
          <li key={f}><i className="bi bi-check2" /> {f}</li>
        ))}
      </ul>
      {card.cta && (
        <a href={card.cta.href} className={`btn-csr ${card.cta.variant} w-100`}>
          {card.cta.label}
        </a>
      )}
    </div>
  )
}

export default function Pricing({
  label      = 'Pricing & Savings',
  titleStart = 'Own It',
  titleEnd   = 'Today.',
  cards      = CARDS,
}) {
  return (
    <section id="pricing">
      <div className="container">
        <div className="pr-heading reveal">
          <span className="section-label">{label}</span>
          <h2 className="section-title display">
            {titleStart}<br />{titleEnd}
          </h2>
        </div>

        <div className="pr-grid">
          {cards.map((card, i) => (
            <PriceCard key={card.name} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
