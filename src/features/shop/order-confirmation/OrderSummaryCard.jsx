import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'
import { formatCurrency } from '@/utils/formatCurrency'

// Order Summary card — line items + subtotal/shipping/GST/total.
// Prop-driven so the route can wire real order data later.
const DEFAULT_ITEMS = [
  {
    id:    'csr-762-nxe-pro-red',
    name:  'CSR 762 NXE Pro — Crimson Red',
    sku:   'CSR-NXE-PRO-RED',
    qty:   1,
    price: 125000,
    image: '/images/products/csr-762-red.webp',
  },
]

export default function OrderSummaryCard({
  items    = DEFAULT_ITEMS,
  shipping = 0,
  gstRate  = 0.18,
}) {
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0)
  const gst      = Math.round(subtotal * gstRate)
  const total    = subtotal + shipping + gst

  return (
    <div className="card-base" style={{ padding: 32 }}>
      <div className="account-section-head">
        <h3>Order Summary</h3>
        <Link to={PATHS.orders} className="rajdhani-lbl-text-sm">
          View all orders
        </Link>
      </div>

      {items.map((it) => (
        <div key={it.id} className="card-base order-card" style={{ marginTop: 16 }}>
          <div className="order-item-row">
            <div className="order-item-img">
              <img src={it.image} alt={it.name} loading="lazy" decoding="async" />
            </div>
            <div className="order-item-info">
              <h4>{it.name}</h4>
              <span>Qty {it.qty} · SKU {it.sku}</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="order-item-price">{formatCurrency(it.price * it.qty)}</div>
            </div>
          </div>
        </div>
      ))}

      <div
        style={{
          display: 'flex', flexDirection: 'column', gap: 8,
          marginTop: 24, paddingTop: 18,
          borderTop: '1px solid var(--border)',
        }}
      >
        <div style={ROW}><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
        <div style={ROW}>
          <span>Shipping</span>
          <span style={{ color: shipping === 0 ? '#22c55e' : undefined }}>
            {shipping === 0 ? 'FREE' : formatCurrency(shipping)}
          </span>
        </div>
        <div style={ROW}><span>GST ({Math.round(gstRate * 100)}%)</span><span>{formatCurrency(gst)}</span></div>
        <div
          style={{
            ...ROW,
            paddingTop: 10, marginTop: 6,
            borderTop: '1px solid var(--border)',
            color: 'var(--white)',
            fontSize: 'var(--fs-base)',
            fontWeight: 'var(--fw-bold)',
          }}
        >
          <span>Total Paid</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  )
}

const ROW = { display: 'flex', justifyContent: 'space-between' }
