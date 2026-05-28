import LegalRelatedCard from './LegalRelatedCard'

// "Related Policies" section — mirrors CSR_New_web `.legal-related`.
// Each legal page passes its own `items` array; each item is a prop bundle for
// <LegalRelatedCard> (icon, title, description, cta, and either `to` or `href`).
export default function LegalRelated({
  label       = 'Related Policies',
  titleStart  = 'Read',
  titleAccent = 'More',
  items       = [],
}) {
  if (!items.length) return null
  return (
    <section aria-label="LegalRelated" className="legal-related">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{label}</span>
          <h2 className="section-title">
            {titleStart} <span className="accent">{titleAccent}</span>
          </h2>
        </div>
        <div className="legal-related-grid">
          {items.map((item, i) => (
            <LegalRelatedCard key={item.to || item.href || i} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}
