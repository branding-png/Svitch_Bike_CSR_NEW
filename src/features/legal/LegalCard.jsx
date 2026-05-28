// Generic numbered legal-page section card — mirrors CSR_New_web `.legal-card`.
// Every section on Accessibility, Privacy, Terms, Cookies, Refund, etc. follows
// the same pattern: id anchor + "01 Title" header + body content. This wraps
// that so each page just supplies the data.
//
// Usage (simple paragraphs):
//   <LegalCard id="legal-commitment" num="01" title="Our Commitment"
//              paragraphs={['First paragraph…', 'Second paragraph…']} />
//
// Or pass rich JSX as children when you need lists, strong text, links:
//   <LegalCard id="legal-commitment" num="01" title="Our Commitment">
//     <p>We target <strong>WCAG 2.1 AA</strong>…</p>
//   </LegalCard>
export default function LegalCard({
  id,
  num,
  title,
  icon,            // Optional `.ch-icon` glyph prefix (e.g. 'bi-power')
  paragraphs = [],
  children,
}) {
  return (
    <section aria-label="LegalCard" id={id} className="card-base legal-card">
      <h2>
        {icon && (
          <span className="ch-icon"><i className={`bi ${icon}`}></i></span>
        )}
        {num && <span className="num">{num}</span>} {title}
      </h2>
      {children || paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </section>
  )
}
