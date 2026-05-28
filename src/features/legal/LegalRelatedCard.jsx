import { Link } from 'react-router-dom'

// Single "Related Policies" card — mirrors CSR_New_web `.legal-related-card`.
// `to` is required (router path). External / mailto / tel can use `href` instead.
export default function LegalRelatedCard({
  to,
  href,
  icon = 'bi-file-earmark-text-fill',
  title,
  description,
  cta = 'Read More',
}) {
  const inner = (
    <>
      <div className="card-base-icon"><i className={`bi ${icon}`}></i></div>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="legal-related-link">
        {cta} <i className="bi bi-arrow-right"></i>
      </span>
    </>
  )
  if (href) {
    return <a href={href} className="card-base legal-related-card">{inner}</a>
  }
  return (
    <Link to={to} className="card-base legal-related-card">{inner}</Link>
  )
}
