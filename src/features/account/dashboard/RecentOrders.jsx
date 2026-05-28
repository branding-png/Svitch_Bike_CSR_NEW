import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'

const STATUS_MAP = {
  delivered:  { icon: 'check-circle-fill', label: 'Delivered' },
  shipped:    { icon: 'truck',             label: 'Shipped' },
  processing: { icon: 'clock-history',     label: 'Processing' },
}

const ORDERS = [
  {
    id:    'SVT-847291',
    title: 'NXE Pro — Crimson Red',
    date:  'Mar 22, 2026',
    img:   '/images/product/csr-762-red.webp',
    alt:   'CSR 762 electric motorcycle in Racing Red',
    price: '₹1,25,000',
    status:'delivered',
  },
  {
    id:    'SVT-731048',
    title: 'Lite XE — Sunburst Yellow',
    date:  'Mar 10, 2026',
    img:   '/images/product/csr-762-gray-Swappable-Battery.webp',
    alt:   'CSR 762 with swappable battery in Graphite Grey',
    price: '₹96,950',
    status:'shipped',
  },
  {
    id:    'SVT-619204',
    title: 'XE Foldable — Stealth',
    date:  'Feb 28, 2026',
    img:   '/images/product/csr-762-gray-1.webp',
    alt:   'CSR 762 in Graphite Grey — side profile',
    price: '₹74,999',
    status:'processing',
  },
]

export default function RecentOrders() {
  return (
    <div className="account-section">
      <div className="account-section-head">
        <h3>Recent Orders</h3>
        <Link to={PATHS.orders}>View All</Link>
      </div>

      {ORDERS.map((o) => {
        const status = STATUS_MAP[o.status]
        return (
          <div aria-label="RecentOrders" role="region" key={o.id} className="card-base order-card">
            <div className="order-item-row">
              <div className="order-item-img">
                <img src={o.img} alt={o.alt} loading="lazy" decoding="async" />
              </div>
              <div className="order-item-info">
                <h5>{o.title}</h5>
                <span>Order #{o.id} &middot; {o.date}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className={`order-status ${o.status} rajdhani-lbl-text-sm`}>
                  <i className={`bi bi-${status.icon}`}></i> {status.label}
                </span>
                <div className="order-item-price" style={{ marginTop: 6 }}>{o.price}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
