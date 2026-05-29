// Radio list of payment methods shown above the Pay button. Selection only
// changes which method Razorpay opens with; final processing is identical.
const METHODS = [
  { id: 'upi',        icon: 'phone-fill',          label: 'UPI / GPay / PhonePe', tag: 'Recommended' },
  { id: 'card',       icon: 'credit-card-2-front', label: 'Credit / Debit Card' },
  { id: 'netbanking', icon: 'bank',                label: 'Net Banking' },
  { id: 'wallet',     icon: 'wallet2',             label: 'Wallets (Paytm, Mobikwik, Freecharge)' },
  { id: 'emi',        icon: 'calendar-month',      label: 'EMI (No-Cost Available)' },
]

export default function PaymentMethodList({ value, onChange }) {
  return (
    <div className="pay-method-list">
      {METHODS.map((m) => {
        const selected = value === m.id
        return (
          <label aria-label="PaymentMethodList"
            key={m.id}
            className={`pay-method-item${selected ? ' is-active' : ''}`}
            style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
              border: `1px solid ${selected ? 'var(--white)' : 'var(--border)'}`,
              background: selected ? 'var(--gray-950)' : 'transparent',
              cursor: 'pointer', marginBottom: 10,
            }}
          >
            <input
              type="radio"
              name="payment-method"
              value={m.id}
              checked={selected}
              onChange={() => onChange(m.id)}
              style={{ accentColor: 'var(--white)' }}
            />
            <i className={`bi bi-${m.icon}`} style={{ fontSize: 20 }} aria-hidden="true" />
            <span style={{ flex: 1 }}>{m.label}</span>
            {m.tag && <span className="product-badge rajdhani-lbl-text-sm">{m.tag}</span>}
          </label>
        )
      })}
    </div>
  )
}

// Map our internal method id to the Razorpay `method` config so Checkout opens
// with the right tab pre-selected.
export const METHOD_TO_RAZORPAY = {
  upi:        { upi: true },
  card:       { card: true },
  netbanking: { netbanking: true },
  wallet:     { wallet: true },
  emi:        { emi: true, card: true },
}

export { METHODS }
