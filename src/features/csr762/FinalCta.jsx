// CSR 762 — "Ready To Ride?" final call-to-action. Mirrors svitch.bike
// `#final-cta`. Giant background watermark + two CTAs (Buy Now → #pricing,
// Test Ride → #test-ride).
const CTAS = [
  { href: '#pricing',   label: 'Buy Now',        icon: 'bi-lightning-charge-fill', variant: 'primary-dark' },
  { href: '#test-ride', label: 'Book Test Ride', icon: 'bi-geo-alt',               variant: 'outline-dark' },
]

export default function FinalCta({
  watermark  = 'CSR762',
  label      = 'The Future Is Electric',
  titleStart = 'Ready To',
  titleEnd   = 'Ride?',
  ctas       = CTAS,
}) {
  return (
    <section id="final-cta">
      <div className="cta-watermark">{watermark}</div>
      <div className="container cta-container">
        <div className="reveal">
          <span className="cta-label">{label}</span>
          <div className="cta-title">
            {titleStart}<br />{titleEnd}
          </div>
          <div className="cta-actions">
            {ctas.map((c) => (
              <a key={c.label} href={c.href} className={`btn-csr ${c.variant}`}>
                <i className={`bi ${c.icon}`} /> {c.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
