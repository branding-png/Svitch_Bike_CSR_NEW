import InputControl from '@/ui/InputControl'

// Input masks for card fields.
//   Card number: groups of 4, e.g. "1234 5678 9012 3456" (max 19 chars / 16 digits)
//   Expiry:      auto-inserts the slash → "MM/YY" (max 5 chars)
//   CVV / digit fields: digits only
const formatCardNumber = (raw) =>
  raw.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()

function formatExpiry(raw) {
  const digits = raw.replace(/\D/g, '').slice(0, 4)
  if (digits.length <= 2) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

const onlyDigits = (raw, max) => raw.replace(/\D/g, '').slice(0, max)

const BANKS     = ['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak Mahindra']
const EMI_PLANS = [
  '3 months — ₹42,086/mo',
  '6 months — ₹21,504/mo',
  '12 months — ₹11,213/mo',
]

const METHODS = [
  { id: 'upi',        label: 'UPI',                 icon: 'bi-qr-code' },
  { id: 'card',       label: 'Credit / Debit Card', icon: 'bi-credit-card-2-front' },
  { id: 'netbanking', label: 'Net Banking',         icon: 'bi-bank' },
  { id: 'emi',        label: 'EMI',                 icon: 'bi-calendar-check' },
  { id: 'cod',        label: 'Cash on Delivery',    icon: 'bi-cash-stack' },
]

// Checkout — Payment Method section.
// Clicking anywhere on a `.payment-method` card selects it (same UX as legacy
// shop.js). All bodies stay mounted so form state survives method switches;
// CSS toggles visibility via `.is-active .payment-method-body { display:block }`.
export default function PaymentSection({ form, errors = {}, onChange }) {
  return (
    <div className="card-base checkout-section">
      <h3><i className="bi bi-credit-card"></i> Payment Method</h3>

      <div className="payment-methods">
        {METHODS.map((m) => {
          const isActive = form.payment === m.id
          return (
            <div aria-label="PaymentSection"
              key={m.id}
              className={`payment-method${isActive ? ' is-active' : ''}`}
              data-pay={m.id}
              onClick={() => onChange('payment', m.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onChange('payment', m.id)
                }
              }}
            >
              <div className="payment-method-head">
                <input
                  type="radio" name="payment" value={m.id}
                  checked={isActive}
                  onChange={() => onChange('payment', m.id)}
                  onClick={(e) => e.stopPropagation()}
                />
                <label className="rajdhani-lbl-text-sm">{m.label}</label>
                <i className={`bi ${m.icon}`}></i>
              </div>

              {m.id === 'upi' && (
                <div className="payment-method-body" onClick={(e) => e.stopPropagation()}>
                  <div data-field="upiId">
                    <InputControl
                      label="UPI ID" placeholder="yourname@okbank"
                      value={form.upiId}
                      onChange={(v) => onChange('upiId', v)}
                      error={errors.upiId}
                    />
                  </div>
                </div>
              )}

              {m.id === 'card' && (
                <div className="payment-method-body" onClick={(e) => e.stopPropagation()}>
                  <div data-field="cardNumber" style={{ marginBottom: 12 }}>
                    <InputControl
                      label="Card Number" placeholder="1234 5678 9012 3456"
                      value={form.cardNumber}
                      onChange={(v) => onChange('cardNumber', formatCardNumber(v))}
                      error={errors.cardNumber}
                      maxLength={19}
                      inputMode="numeric"
                      autoComplete="cc-number"
                    />
                  </div>
                  <div data-field="cardName" style={{ marginBottom: 12 }}>
                    <InputControl
                      label="Cardholder Name" placeholder="As printed on card"
                      value={form.cardName}
                      onChange={(v) => onChange('cardName', v.toUpperCase())}
                      error={errors.cardName}
                      autoComplete="cc-name"
                    />
                  </div>
                  <div className="form-grid">
                    <div data-field="expiry">
                      <InputControl
                        label="Expiry" placeholder="MM/YY"
                        value={form.expiry}
                        onChange={(v) => onChange('expiry', formatExpiry(v))}
                        error={errors.expiry}
                        maxLength={5}
                        inputMode="numeric"
                        autoComplete="cc-exp"
                      />
                    </div>
                    <div data-field="cvv">
                      <InputControl
                        label="CVV" type="password" placeholder="•••"
                        value={form.cvv}
                        onChange={(v) => onChange('cvv', onlyDigits(v, 4))}
                        error={errors.cvv}
                        maxLength={4}
                        inputMode="numeric"
                        autoComplete="cc-csc"
                      />
                    </div>
                  </div>
                </div>
              )}

              {m.id === 'netbanking' && (
                <div className="payment-method-body" onClick={(e) => e.stopPropagation()}>
                  <InputControl
                    as="select" label="Select Bank"
                    value={form.bank}
                    onChange={(v) => onChange('bank', v)}
                    options={BANKS}
                  />
                </div>
              )}

              {m.id === 'emi' && (
                <div className="payment-method-body" onClick={(e) => e.stopPropagation()}>
                  <InputControl
                    as="select" label="EMI Plan"
                    value={form.emi}
                    onChange={(v) => onChange('emi', v)}
                    options={EMI_PLANS}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { BANKS, EMI_PLANS }
