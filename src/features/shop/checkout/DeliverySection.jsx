// Checkout — Delivery Method radio group.
// Controlled: parent owns `form.delivery` and `onChange(key, value)`.
const METHODS = [
  { id: 'standard', label: 'Standard', price: 'Free', sub: '5–7 business days' },
  { id: 'express',  label: 'Express',  price: '₹499', sub: '2–3 business days' },
]

export default function DeliverySection({ form, onChange }) {
  return (
    <div aria-label="DeliverySection" role="region" className="card-base checkout-section">
      <h3><i className="bi bi-box-seam"></i> Delivery Method</h3>

      <div className="delivery-methods">
        {METHODS.map((m) => (
          <label
            key={m.id}
            className={`delivery-method rajdhani-lbl-text-sm${form.delivery === m.id ? ' is-active' : ''}`}
          >
            <div className="delivery-method-head">
              <input
                type="radio" name="delivery" value={m.id}
                checked={form.delivery === m.id}
                onChange={() => onChange('delivery', m.id)}
              />
              <strong>{m.label}</strong>
              <span className="price">{m.price}</span>
            </div>
            <span>{m.sub}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
