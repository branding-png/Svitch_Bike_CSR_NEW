// Card 1 â€” Order header + line item + carrier/AWB meta grid.
export default function TrackOrderHeader({ order }) {
  const badge = order.statusBadge

  return (
    <div className="card-base order-card">
      <div className="order-card-head">
        <div>
          <div className="order-id"><h3>Order #<span>{order.orderNum}</span></h3></div>
          <span className="order-date rajdhani-lbl-text-sm">
            Placed <span>{order.placedDate}</span>
          </span>
        </div>
        <span className={`order-status ${badge.cls} rajdhani-lbl-text-sm`}>
          <i className={`bi ${badge.icon}`}></i> {badge.label}
        </span>
      </div>

      <div className="order-item-row">
        <div className="order-item-img">
          <img src={order.image} alt={order.model} loading="lazy" decoding="async" />
        </div>
        <div className="order-item-info">
          <h5>{order.model}</h5>
          <span>{order.itemMeta}</span>
        </div>
        <span className="order-item-price">{order.total}</span>
      </div>

      <div className="track-meta">
        <Cell label="Carrier"           value={order.carrier} />
        <Cell label="AWB / Tracking #"  value={order.awb} />
        <Cell label="Status"            value={order.statusLabel} />
        <Cell label="Expected delivery" value={order.eta} />
      </div>
    </div>
  )
}

function Cell({ label, value }) {
  return (
    <div aria-label="TrackOrderHeader" className="track-meta-cell">
      <span className="track-meta-label rajdhani-lbl-text-sm">{label}</span>
      <span className="track-meta-val">{value}</span>
    </div>
  )
}
