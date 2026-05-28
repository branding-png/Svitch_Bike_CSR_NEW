import InputControl from '@/ui/InputControl'

// Rich payment-method picker used on the Payment page. Same `.payment-methods`
// card design that used to live on Checkout — moved here so all payment-related
// inputs live on a single page. State is local; the parent only receives the
// final selection through `onChange` and the inline field values through
// `onFieldsChange` for the Razorpay prefill.
const BANKS = ['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak Mahindra']
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

const formatCardNumber = (raw) =>
  raw.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()

function formatExpiry(raw) {
  const digits = raw.replace(/\D/g, '').slice(0, 4)
  if (digits.length <= 2) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

const onlyDigits = (raw, max) => raw.replace(/\D/g, '').slice(0, max)

export default function PaymentMethodPicker({
  value,
  onChange,
  fields = {},
  onFieldsChange,
  errors = {},
}) {
  const setField = (k, v) => onFieldsChange?.({ ...fields, [k]: v })

  return (
    <div className="card-base checkout-section">
      <h3><i className="bi bi-credit-card" aria-hidden="true"></i> Payment Method</h3>

      <div className="payment-methods">
        {METHODS.map((m) => {
          const isActive = value === m.id
          return (
            <div aria-label="PaymentMethodPicker"
              key={m.id}
              className={`payment-method${isActive ? ' is-active' : ''}`}
              data-pay={m.id}
              role="button"
              tabIndex={0}
              onClick={() => onChange(m.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onChange(m.id)
                }
              }}
            >
              <div className="payment-method-head">
                <input
                  type="radio" name="payment" value={m.id}
                  checked={isActive}
                  onChange={() => onChange(m.id)}
                  onClick={(e) => e.stopPropagation()}
                />
                <label className="rajdhani-lbl-text-sm">{m.label}</label>
                <i className={`bi ${m.icon}`} aria-hidden="true"></i>
              </div>

              {m.id === 'upi' && (
                <div className="payment-method-body" onClick={(e) => e.stopPropagation()}>
                  <div data-field="upiId">
                    <InputControl
                      label="UPI ID" placeholder="yourname@okbank"
                      value={fields.upiId || ''}
                      onChange={(v) => setField('upiId', v)}
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
                      value={fields.cardNumber || ''}
                      onChange={(v) => setField('cardNumber', formatCardNumber(v))}
                      error={errors.cardNumber}
                      maxLength={19}
                      inputMode="numeric"
                      autoComplete="cc-number"
                    />
                  </div>
                  <div data-field="cardName" style={{ marginBottom: 12 }}>
                    <InputControl
                      label="Cardholder Name" placeholder="As printed on card"
                      value={fields.cardName || ''}
                      onChange={(v) => setField('cardName', v.toUpperCase())}
                      error={errors.cardName}
                      autoComplete="cc-name"
                    />
                  </div>
                  <div className="form-grid">
                    <div data-field="expiry">
                      <InputControl
                        label="Expiry" placeholder="MM/YY"
                        value={fields.expiry || ''}
                        onChange={(v) => setField('expiry', formatExpiry(v))}
                        error={errors.expiry}
                        maxLength={5}
                        inputMode="numeric"
                        autoComplete="cc-exp"
                      />
                    </div>
                    <div data-field="cvv">
                      <InputControl
                        label="CVV" type="password" placeholder="•••"
                        value={fields.cvv || ''}
                        onChange={(v) => setField('cvv', onlyDigits(v, 4))}
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
                    value={fields.bank || BANKS[0]}
                    onChange={(v) => setField('bank', v)}
                    options={BANKS}
                  />
                </div>
              )}

              {m.id === 'emi' && (
                <div className="payment-method-body" onClick={(e) => e.stopPropagation()}>
                  <InputControl
                    as="select" label="EMI Plan"
                    value={fields.emi || EMI_PLANS[0]}
                    onChange={(v) => setField('emi', v)}
                    options={EMI_PLANS}
                  />
                </div>
              )}

              {m.id === 'cod' && isActive && (
                <div className="payment-method-body" onClick={(e) => e.stopPropagation()}>
                  <p className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)', margin: 0 }}>
                    Pay a refundable ₹999 token now via Razorpay; the balance is collected on delivery.
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Map our method id to Razorpay's `method` config so the gateway opens on the
// right tab. COD pays only the token amount on the gateway.
export const METHOD_TO_RAZORPAY = {
  upi:        { upi: true },
  card:       { card: true },
  netbanking: { netbanking: true },
  emi:        { emi: true, card: true },
  cod:        { upi: true, card: true },
}

export { BANKS, EMI_PLANS, METHODS }
