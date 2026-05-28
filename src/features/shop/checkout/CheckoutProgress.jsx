// 4-step pill bar used at the top of Checkout, Payment, OrderConfirmation.
// Pass `step` 0–3 (Cart=0, Address=1, Payment=2, Confirmation=3).
const STEPS = ['Cart', 'Address', 'Payment', 'Confirmation']

export default function CheckoutProgress({ step = 0, className = '' }) {
  return (
    <div aria-label="CheckoutProgress" role="region"
      className={`checkout-progress ${className}`}
      style={{ display: 'flex', gap: 8, margin: '20px 0 28px', flexWrap: 'wrap' }}
    >
      {STEPS.map((s, i) => (
        <span
          key={s}
          className={'rajdhani-lbl-text-sm filter-pill' + (i === step ? ' is-active' : '')}
        >
          {i + 1}. {s}
        </span>
      ))}
    </div>
  )
}
