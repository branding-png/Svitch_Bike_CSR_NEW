// Open application CTA — mirrors CSR_New_web `#career-cta`.
export default function OpenApplicationCta({
  label   = 'Open Application',
  titleStart  = "Don't See Your",
  titleAccent = 'Role?',
  description = "We're always on the lookout for exceptional talent. Send us your resume and tell us what you'd bring to the Svitch team.",
  email   = 'hrhead@svitch.bike',
  note    = 'We review every application within 5 business days.',
}) {
  return (
    <section id="career-cta">
      <div className="container">
        <div className="cta-box">
          <div className="cta-content">
            <span className="section-label">{label}</span>
            <h2 className="cta-heading">
              {titleStart} <span className="accent">{titleAccent}</span>
            </h2>
            <p className="cta-desc">{description}</p>
          </div>
          <div className="cta-action">
            <a href={`mailto:${email}`} className="btn-csr primary">
              <i className="bi bi-envelope-fill"></i> {email}
            </a>
            <small className="cta-note">{note}</small>
          </div>
        </div>
      </div>
    </section>
  )
}
