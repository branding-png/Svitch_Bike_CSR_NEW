import Card from '@/ui/Card'
import { formatCurrency } from '@/utils/formatCurrency'

const SHIPPING_FREE_OVER = 50000
const GST_RATE = 0.18

// Shared right-rail summary block used by Cart, Checkout, Payment.
// Computes shipping (free over ₹50k), 18% GST, and total internally so
// every page renders the same numbers from the same source of truth.
export default function OrderSummary({
  items,
  subtotal,
  title = 'Order Summary',
  showLineItems = false,
  footerNote,
  cta,
  className = '',
}) {
  const shipping = subtotal === 0 ? 0 : subtotal >= SHIPPING_FREE_OVER ? 0 : 499
  const tax = Math.round(subtotal * GST_RATE)
  const total = subtotal + shipping + tax

  return (
    <Card
      className={className}
      style={{ padding: 24, height: 'fit-content', position: 'sticky', top: 100 }}
    >
      <h3 style={{ marginBottom: 16 }}>{title}</h3>

      {showLineItems && items?.length > 0 && (
        <>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 14px', display: 'grid', rowGap: 8 }}>
            {items.map((it) => (
              <li
                key={`${it.id}-${it.variant || ''}-${it.color || ''}`}
                className="rajdhani-lbl-text-sm"
                style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--gray-300)' }}
              >
                <span>{it.name} × {it.qty}</span>
                <span>{formatCurrency(it.price * it.qty)}</span>
              </li>
            ))}
          </ul>
          <hr style={{ borderColor: 'var(--border)' }} />
        </>
      )}

      <Row label="Subtotal"   value={formatCurrency(subtotal)} />
      <Row label="Shipping"   value={shipping === 0 ? 'Free' : formatCurrency(shipping)} />
      <Row label="GST (18%)"  value={formatCurrency(tax)} />
      <hr style={{ borderColor: 'var(--border)' }} />
      <Row label="Total"      value={formatCurrency(total)} strong />

      {footerNote && (
        <div className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)', marginTop: 8 }}>
          {footerNote}
        </div>
      )}
      {cta && <div style={{ marginTop: 14 }}>{cta}</div>}
    </Card>
  )
}

function Row({ label, value, strong }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
      <span className="rajdhani-lbl-text-sm" style={{ color: strong ? 'var(--white)' : 'var(--gray-400)' }}>{label}</span>
      <strong style={{ color: 'var(--white)', fontWeight: strong ? 700 : 400 }}>{value}</strong>
    </div>
  )
}
