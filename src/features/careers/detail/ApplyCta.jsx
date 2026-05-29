// Sidebar "Ready to Apply?" widget — mirrors CSR_New_web `.apply-cta`.
export default function ApplyCta({
  title       = 'Ready To Apply?',
  description = "Join 85+ passionate people building India's boldest e-bike brand.",
  applyHref   = '#job-apply',
}) {
  return (
    <div aria-label="ApplyCta" className="card-base apply-cta">
      <h4>{title}</h4>
      <p>{description}</p>
      <a href={applyHref} className="btn-csr primary sm">
        <i className="bi bi-send-fill"></i> Apply Now
      </a>
    </div>
  )
}
