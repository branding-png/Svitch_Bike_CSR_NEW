// Bottom-of-page inquiry/CTA panel. Wraps the .cta-box class from components.css.
// Used on Home, About, Press, Dealers — any "talk to us / take action" block.
//
//   <CtaBox label="Test Ride" title="Experience It For Yourself"
//           description="Book a free 30-minute test ride."
//           actions={<><Button …/><Button …/></>} />
export default function CtaBox({ label, title, description, actions, className = '' }) {
  return (
    <div className={`cta-box ${className}`}>
      <div>
        {label && <span className="section-label">{label}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {description && <p className="section-desc">{description}</p>}
      </div>
      {actions && <div className="cta-box-actions" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>{actions}</div>}
    </div>
  )
}
