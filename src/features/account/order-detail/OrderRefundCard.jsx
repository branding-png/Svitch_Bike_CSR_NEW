import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'

// Refund status card — only shown on the order-detail page when the order
// is cancelled and has a `refund` block. Mirrors the timeline visual
// language but in a more compact horizontal layout, with status colours
// matching the rest of the app (green=done, amber=current, gray=pending).
export default function OrderRefundCard({ refund }) {
  if (!refund) return null

  const isComplete = refund.progress >= refund.steps.length
  const badge = isComplete
    ? { cls: 'delivered',  icon: 'check-circle-fill', label: 'Refund Completed' }
    : { cls: 'processing', icon: 'arrow-repeat',      label: 'Refund In Progress' }

  return (
    <div className="card-base order-card refund-card">
      <div className="order-card-head">
        <div>
          <div className="order-id"><i className="bi bi-cash-coin"></i> Refund Status</div>
          <span className="order-date rajdhani-lbl-text-sm">
            Reference {refund.id} &middot; Expected by {refund.eta}
          </span>
        </div>
        <span className={`order-status ${badge.cls} rajdhani-lbl-text-sm`}>
          <i className={`bi bi-${badge.icon}`}></i> {badge.label}
        </span>
      </div>

      {/* Refund headline */}
      <div className="refund-meta">
        <div className="refund-meta-cell">
          <span className="refund-meta-label rajdhani-lbl-text-sm">Amount</span>
          <span className="refund-meta-val refund-amount">{refund.amount}</span>
        </div>
        <div className="refund-meta-cell">
          <span className="refund-meta-label rajdhani-lbl-text-sm">Refund Method</span>
          <span className="refund-meta-val">{refund.method}</span>
        </div>
        <div className="refund-meta-cell">
          <span className="refund-meta-label rajdhani-lbl-text-sm">Expected By</span>
          <span className="refund-meta-val">{refund.eta}</span>
        </div>
      </div>

      {/* Refund progress steps */}
      <ol className="refund-steps">
        {refund.steps.map((step, i) => {
          const idx = i + 1
          let state
          if (idx < refund.progress)       state = 'done'
          else if (idx === refund.progress) state = isComplete ? 'final' : 'current'
          else                              state = 'pending'

          return (
            <li aria-label="OrderRefundCard" role="region" key={step.title} className={`refund-step is-${state}`}>
              <span className="refund-step-num">
                {state === 'done' || state === 'final'
                  ? <i className="bi bi-check2"></i>
                  : <span>{idx}</span>}
              </span>
              <div className="refund-step-body">
                <strong>{step.title}</strong>
                <span>{step.when}</span>
              </div>
            </li>
          )
        })}
      </ol>

      <div className="refund-foot">
        <span className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)' }}>
          <i className="bi bi-info-circle"></i> Refunds reflect on your statement within 5–7 working days.
        </span>
        <Link to={PATHS.ticket} className="btn-csr secondary sm">
          <i className="bi bi-headset"></i> Raise a Ticket
        </Link>
      </div>
    </div>
  )
}
