import { EMAILS, emailHref } from '@/data/contact-info'

// Press contact CTA — mirrors CSR_New_web `#mk-contact`.
// Same `.cta-box` pattern used on careers open-application & FAQ support.
// Defaults use the canonical hello@svitch.bike address from contact-info.
export default function MediaKitContact({
  id          = 'mk-contact',
  label       = 'Press & Editorial',
  titleStart  = 'Press',
  titleAccent = 'Inquiries',
  description = 'Interviews, embargoed releases, high-res asset requests, or exclusive access to our founders — direct line to our communications team.',
  emailKey    = 'press',
  note        = 'Response within 4 business hours.',
}) {
  const email = EMAILS[emailKey]
  return (
    <section aria-label="MediaKitContact" id={id}>
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
            <a href={emailHref(emailKey)} className="btn-csr primary">
              <i className="bi bi-envelope-fill"></i> {email.address}
            </a>
            <small className="cta-note">{note}</small>
          </div>
        </div>
      </div>
    </section>
  )
}
