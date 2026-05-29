import { Modal } from '@/ui'
import { TRACK_TIMELINE } from '@/data/orders-data'
import { PHONES, phoneHref } from '@/data/contact-info'

const STATE_ICON = {
  done:      'check2',
  current:   'arrow-repeat',
  pending:   '',
  cancelled: 'x',
  final:     'check2',
}

export default function OrderTrackModal({ isOpen, onClose, order }) {
  const steps = order ? TRACK_TIMELINE[order.status] || [] : []
  return (
    <Modal aria-label="OrderTrackModal"
      isOpen={isOpen}
      onClose={onClose}
      title="Track Your Order"
      subtitle={order ? `Order #${order.id}` : 'Order #â€”'}
    >
      {!order ? null : (
        <>
          <div className="track-meta">
            <div className="track-meta-cell">
              <span className="track-meta-label rajdhani-lbl-text-sm">Carrier</span>
              <span className="track-meta-val">Svitch Express</span>
            </div>
            <div className="track-meta-cell">
              <span className="track-meta-label rajdhani-lbl-text-sm">AWB / Tracking #</span>
              <span className="track-meta-val">{order.awb}</span>
            </div>
            <div className="track-meta-cell">
              <span className="track-meta-label rajdhani-lbl-text-sm">Status</span>
              <span className="track-meta-val" style={{ textTransform: 'capitalize' }}>{order.status}</span>
            </div>
            <div className="track-meta-cell">
              <span className="track-meta-label rajdhani-lbl-text-sm">Expected delivery</span>
              <span className="track-meta-val">{order.eta}</span>
            </div>
          </div>

          <ol className="track-timeline">
            {steps.map((s, i) => (
              <li key={i} className={`track-step is-${s.state}`}>
                <span className="track-dot">
                  {STATE_ICON[s.state] && <i className={`bi bi-${STATE_ICON[s.state]}`}></i>}
                </span>
                <h5>{s.title}</h5>
                {s.date && <p className="track-step-date">{s.date}</p>}
                <p className="track-step-desc">{s.desc}</p>
              </li>
            ))}
          </ol>

          <div className="track-foot">
            <span className="track-courier rajdhani-lbl-text-sm">
              <i className="bi bi-headset"></i> Need help?{' '}
              <a href={phoneHref('headOffice')} style={{ color: 'var(--white)', textDecoration: 'none' }}>
                <strong>{PHONES.headOffice.phone}</strong>
              </a>
            </span>
            <button type="button" className="btn-csr secondary sm" onClick={onClose}>Close</button>
          </div>
        </>
      )}
    </Modal>
  )
}