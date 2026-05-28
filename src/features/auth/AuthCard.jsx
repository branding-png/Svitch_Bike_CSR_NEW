import { Card } from '@/ui'

// Centered card used by every /auth/* page. Title + optional kicker + body.
export default function AuthCard({ label, title, subtitle, children, footer }) {
  return (
    <section aria-label="AuthCard" className="section-pad" style={{ display: 'grid', placeItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 460 }}>
        <Card style={{ padding: 32 }}>
          {label && <span className="section-label">{label}</span>}
          <h1 className="section-title" style={{ fontSize: 'var(--fs-h2)', marginTop: 6 }}>{title}</h1>
          {subtitle && <p className="section-desc" style={{ marginTop: 8, marginBottom: 20 }}>{subtitle}</p>}
          {children}
        </Card>
        {footer && <div style={{ textAlign: 'center', marginTop: 16 }}>{footer}</div>}
      </div>
    </section>
  )
}
