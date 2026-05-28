// Network partners chip grid — mirrors CSR_New_web `#cn-partners`.
const PARTNERS = [
  'Tata Power EZ Charge',
  'EESL Charging Network',
  'BPCL EV',
  'ChargeGrid',
  'MagentaCharge',
  'Statiq',
  'Fortum Charge & Drive',
  'IOTECHWORLD Avigation',
]

export default function NetworkPartners({ items = PARTNERS }) {
  return (
    <section aria-label="NetworkPartners" id="cn-partners">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Network Partners</span>
          <h2 className="section-title">
            Charge On Any <span className="accent">Network</span>
          </h2>
          <p className="section-desc rajdhani-lbl-text-sm">
            Compatible with all major public charging networks in India.
            Find, charge, and pay through the Svitch Connect app.
          </p>
        </div>

        <div className="partner-grid">
          {items.map((p) => (
            <span key={p} className="partner-chip">
              <i className="bi bi-plug"></i> {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
