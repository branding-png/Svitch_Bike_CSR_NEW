// Stats strip on the Dealers page — mirrors CSR_New_web `#dealers-stats`.
// The last card is a "Partner" CTA that scrolls to the become-dealer section.
const STATS = [
  { num: '10',   label: 'Experience Stores'    },
  { num: '500',  unit: '+', label: 'Service Centers'  },
  { num: '25',   unit: '+', label: 'Cities Covered'   },
  { num: 'Free', label: 'Test Rides Available' },
]

export default function DealerStats({ items = STATS }) {
  return (
    <section aria-label="DealerStats" id="dealers-stats">
      <div className="container">
        <div className="dealers-stats-row">
          {items.map((s) => (
            <div key={s.label} className="card-base dealer-stat">
              <h3>
                {s.num}
                {s.unit && <small>{s.unit}</small>}
              </h3>
              <span className="rajdhani-lbl-text-sm">{s.label}</span>
            </div>
          ))}

          <a
            href="#become-dealer"
            className="rajdhani-lbl-text-sm card-base dealer-stat is-cta"
          >
            <h3>
              <i className="bi bi-briefcase-fill me-2"></i>
              Partner <i className="bi bi-arrow-right"></i>
            </h3>
            <span className="rajdhani-lbl-text-sm">Become A Svitch Dealer</span>
          </a>
        </div>
      </div>
    </section>
  )
}
