import { Link } from 'react-router-dom'

// Support CTA — mirrors CSR_New_web `#faq-support`.
// Used at the bottom of the FAQ page as a fallback "still have questions" prompt.
export default function SupportCta({
  id          = 'faq-support',
  icon        = 'bi-headset',
  label       = 'Still have questions?',
  titleStart  = "We're Here To",
  titleAccent = 'Help',
  description = "Can't find what you're looking for? Our support team answers within 24 hours on email, or live on chat & phone Mon–Sat, 10AM–7PM IST.",
  contactHref = '/company/contact',
  phone       = '+91 1800-123-456',
  phoneTel    = '+911800123456',
}) {
  return (
    <section id={id}>
      <div className="container">
        <div className="support-cta">
          <div className="support-cta-icon">
            <i className={`bi ${icon}`}></i>
          </div>
          <div className="support-cta-content">
            <span className="section-label">{label}</span>
            <h2 className="section-title">
              {titleStart} <span className="accent">{titleAccent}</span>
            </h2>
            <p>{description}</p>
          </div>
          <div className="support-cta-actions">
            <Link to={contactHref} className="btn-csr primary">
              <i className="bi bi-envelope-fill"></i> Contact Support
            </Link>
            <a href={`tel:${phoneTel}`} className="btn-csr secondary">
              <i className="bi bi-telephone-fill"></i> {phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
