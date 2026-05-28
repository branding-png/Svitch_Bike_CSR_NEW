import { emailHref } from '@/data/contact-info'

// "Become A Svitch Dealer" CTA — mirrors CSR_New_web `#become-dealer`.
// Content + stats split inside a single `.become-dealer-card`.
const PERKS = [
  'Exclusive territory rights',
  'Factory-backed training program',
  'Co-branded marketing support',
  'Low initial investment & fast ROI',
]

const STATS = [
  { num: '₹15', unit: 'L+', label: 'Avg. Monthly Revenue' },
  { num: '6',   unit: 'mo', label: 'Avg. Payback Period'  },
  { num: '100', unit: '%',  label: 'Training Covered'     },
  { num: '24/7',            label: 'Partner Support'      },
]

export default function BecomeDealerCta({ onApply }) {
  return (
    <section id="become-dealer">
      <div className="container">
        <div className="card-base become-dealer-card">
          <div className="become-dealer-content">
            <span className="section-label">Partner With Us</span>
            <h2>
              Become A Svitch <span className="accent">Dealer</span>
            </h2>
            <p>
              Join India&apos;s fastest-growing EV motorcycle network. Exclusive
              territory rights, comprehensive training, and dedicated marketing
              support — everything you need to ride the electric revolution.
            </p>

            <ul className="become-dealer-perks">
              {PERKS.map((p) => (
                <li key={p}><i className="bi bi-check2-circle"></i> {p}</li>
              ))}
            </ul>

            <div className="become-dealer-cta">
              <button type="button" className="btn-csr primary" onClick={onApply}>
                <i className="bi bi-building-add"></i> Apply For Dealership
              </button>
              <a href={emailHref('dealers')} className="btn-csr secondary">
                <i className="bi bi-envelope"></i> Email Our Team
              </a>
            </div>
          </div>

          <div className="become-dealer-stats">
            {STATS.map((s) => (
              <div key={s.label} className="become-stat">
                <h3>
                  {s.num}
                  {s.unit && <small>{s.unit}</small>}
                </h3>
                <span className="rajdhani-lbl-text-sm">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
