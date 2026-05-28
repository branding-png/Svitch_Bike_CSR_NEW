// Inner-page hero — reusable header block for every non-home page.
// Mirrors CSR_New_web's `.page-hero` pattern. Supports a split title with
// `.highlight` on the second half (same accent pattern as section headers).
//
// Usage:
//   <PageHero
//     id="about-hero"
//     label="About Svitch Motocorp"
//     titleStart={<>Born Electric.<br />Built</>}
//     titleHighlight="Different"
//     titleEnd="."
//     description="We are building India's next-generation electric motorcycle…"
//   />
//
// Or with a single string title:
//   <PageHero label="Support" title="Get Help" description="…" />
export default function PageHero({
  id,
  label,
  title,                  // string OR JSX — overrides titleStart/Highlight/End
  titleStart,             // first chunk of the headline
  titleHighlight,         // accent-highlighted chunk
  titleEnd,               // trailing chunk (e.g. punctuation after highlight)
  description,
  children,               // optional extras rendered inside .page-hero-inner (e.g. CTAs)
  className = '',
}) {
  // Build the title node — prefer `title` prop, fall back to split parts
  let titleNode = title
  if (titleNode == null && (titleStart || titleHighlight || titleEnd)) {
    titleNode = (
      <>
        {titleStart}
        {titleHighlight && (
          <>
            {titleStart ? ' ' : ''}
            <span className="highlight">{titleHighlight}</span>
          </>
        )}
        {titleEnd}
      </>
    )
  }

  return (
    <section id={id} className={`page-hero ${className}`.trim()}>
      <div className="container">
        <div className="page-hero-inner">
          {label && <span className="section-label">{label}</span>}
          {titleNode && <h1 className="page-hero-title">{titleNode}</h1>}
          {description && <p className="page-hero-desc">{description}</p>}
          {children}
        </div>
      </div>
    </section>
  )
}
