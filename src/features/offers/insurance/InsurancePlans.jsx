import { Link } from 'react-router-dom'
import SectionHeader from '@/ui/SectionHeader'

// Insurance plans — mirrors CSR_New_web `.ins-grid`.
// Each plan lists `bullets` of { ok, text } so we can render check vs. cross.
// The middle plan can be flagged `featured: true` to get the highlight badge.
const PLANS = [
  {
    name:  'Third-Party',
    price: '₹1,499',
    bullets: [
      { ok: true,  text: 'Mandatory legal cover' },
      { ok: true,  text: 'Third-party injury / death' },
      { ok: true,  text: 'Third-party property damage' },
      { ok: false, text: 'No own-damage cover' },
      { ok: false, text: 'No theft cover' },
    ],
    ctaVariant: 'secondary',
  },
  {
    name:  'Comprehensive',
    price: '₹3,499',
    featured: true,
    bullets: [
      { ok: true,  text: 'Everything in Third-Party' },
      { ok: true,  text: 'Own damage (accident, fire, flood)' },
      { ok: true,  text: 'Theft & vandalism' },
      { ok: true,  text: 'Personal accident cover — ₹15L' },
      { ok: true,  text: 'Cashless claim at 1,500+ workshops' },
      { ok: false, text: 'No battery / charger cover' },
    ],
    ctaVariant: 'primary',
  },
  {
    name:  'EV Shield Plus',
    price: '₹5,299',
    bullets: [
      { ok: true, text: 'Everything in Comprehensive' },
      { ok: true, text: 'Battery damage & replacement' },
      { ok: true, text: 'Charger & cable cover' },
      { ok: true, text: 'Roadside assistance 24×7' },
      { ok: true, text: 'Zero-depreciation claim' },
      { ok: true, text: 'Engine / motor protection' },
    ],
    ctaVariant: 'secondary',
  },
]

export default function InsurancePlans({ plans = PLANS }) {
  return (
    <section aria-label="InsurancePlans" className="section-pad insurance-sec">
      <div className="container">
        <SectionHeader
          label="Choose Your Plan"
          titleStart="Three plans,"
          titleAccent="zero confusion"
          description="Mandatory third-party cover, comprehensive own-damage, or full peace-of-mind — backed by IRDAI-licensed insurers."
        />

        <div className="ins-grid">
          {plans.map((p) => (
            <div key={p.name} className={'card-base ins-card' + (p.featured ? ' featured' : '')}>
              {p.featured && <span className="ins-badge">Most Popular</span>}
              <h3 className="ins-name">{p.name}</h3>
              <div>
                <span className="ins-price">{p.price}</span>
                <span className="ins-price-note">per year</span>
              </div>
              <ul className="ins-list">
                {p.bullets.map((b, i) => (
                  <li key={i} className={b.ok ? '' : 'no'}>
                    <i className={`bi ${b.ok ? 'bi-check-circle-fill' : 'bi-x-circle'}`}></i>{' '}
                    {b.text}
                  </li>
                ))}
              </ul>
              <Link to="/company/contact" className={`rajdhani-lbl-text-sm btn-csr ${p.ctaVariant}`}>
                <i className="bi bi-arrow-right"></i> Buy Now
              </Link>
            </div>
          ))}
        </div>

        {/* Renewal banner */}
        <div
          className="card-base"
          style={{
            marginTop:       32,
            padding:         28,
            display:         'flex',
            flexWrap:        'wrap',
            gap:             14,
            alignItems:      'center',
            justifyContent:  'space-between',
          }}
        >
          <div>
            <strong style={{ display: 'block', color:'white' }}>Already have a policy?</strong>
            <span>Renew in under 5 minutes — just enter your registration number.</span>
          </div>
          <Link to="/company/contact" className="rajdhani-lbl-text-sm btn-csr primary">
            <i className="bi bi-arrow-clockwise"></i> Renew Online
          </Link>
        </div>
      </div>
    </section>
  )
}
