// Status timeline for the order-detail page. Reuses the same coloured
// `.track-timeline` markup as the Track modal so the visual language stays
// consistent (green=done/final, amber=current/processing, red=cancelled,
// gray=pending).
const STATE_ICON = {
  done:      'check2',
  final:     'check2',
  current:   'arrow-repeat',
  cancelled: 'x',
  pending:   '',
}

// Header badge text + icon mirrors the status pill on the Orders list, so
// "In progress" no longer overrides shipped/cancelled labels.
const STATUS_BADGE = {
  delivered:  { icon: 'check2-all',        label: 'Completed' },
  shipped:    { icon: 'truck',             label: 'Shipped' },
  processing: { icon: 'clock-history',     label: 'Processing' },
  cancelled:  { icon: 'x-circle-fill',     label: 'Cancelled' },
}

export default function OrderDetailStatusTimeline({ order }) {
  const { tracking, detailedTimeline = [] } = order
  const badge = STATUS_BADGE[order.status] || STATUS_BADGE.processing

  return (
    <div className="card-base order-card">
      <div className="order-card-head">
        <div>
          <div className="order-id">Status Timeline</div>
          <span className="order-date rajdhani-lbl-text-sm">
            Tracking ID {tracking?.id || 'â€”'} &middot; {tracking?.carrier || 'Svitch Express'}
          </span>
        </div>
        <span className={`order-status ${order.status} rajdhani-lbl-text-sm`}>
          <i className={`bi bi-${badge.icon}`}></i> {badge.label}
        </span>
      </div>

      <ol className="track-timeline">
        {detailedTimeline.map((step, i) => {
          const state = step.final ? 'final' : (step.state || 'pending')
          return (
            <li aria-label="OrderDetailStatusTimeline" key={i} className={`track-step is-${state}`}>
              <span className="track-dot">
                {STATE_ICON[state] && <i className={`bi bi-${STATE_ICON[state]}`}></i>}
              </span>
              <h5>{step.title}</h5>
              {step.when && <p className="track-step-date">{step.when}</p>}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
