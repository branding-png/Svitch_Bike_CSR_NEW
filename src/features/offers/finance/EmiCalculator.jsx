import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

// Interactive EMI calculator — mirrors CSR_New_web `.fin-grid`.
// Four sliders feed into a memoised EMI calc using the standard formula:
//   EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)
// where  P = loan amount (price − down), r = monthly rate, n = tenure months.
const SLIDERS = [
  { key: 'amount', label: 'On-Road Price',   min: 80000, max: 300000, step: 1000, suffix: 'currency' },
  { key: 'down',   label: 'Down Payment',    min: 0,     max: 200000, step: 1000, suffix: 'currency' },
  { key: 'tenure', label: 'Tenure',          min: 12,    max: 60,     step: 6,    suffix: 'months'   },
  { key: 'rate',   label: 'Interest Rate',   min: 7,     max: 14,     step: 0.1,  suffix: 'percent'  },
]

const BANKS = [
  'HDFC Bank', 'ICICI Bank', 'Axis Bank',
  'Bajaj Finserv', 'Tata Capital', 'Kotak Mahindra',
  '+ 9 more',
]

const inr = (n) => Math.round(n).toLocaleString('en-IN')

function formatSuffix(value, suffix) {
  switch (suffix) {
    case 'currency': return `₹${inr(value)}`
    case 'months':   return `${value} months`
    case 'percent':  return `${value}%`
    default:         return value
  }
}

export default function EmiCalculator() {
  const [amount, setAmount] = useState(149999)
  const [down,   setDown]   = useState(25000)
  const [tenure, setTenure] = useState(36)
  const [rate,   setRate]   = useState(9.5)

  const state = { amount, down, tenure, rate }
  const setters = {
    amount: setAmount,
    down:   (v) => setDown(Math.min(v, amount)),  // cap down at price
    tenure: setTenure,
    rate:   setRate,
  }

  const { emi, principal, interest, total } = useMemo(() => {
    const principal = Math.max(0, amount - down)
    const r = (rate / 100) / 12
    const n = tenure
    let emi = 0
    if (principal > 0 && r > 0 && n > 0) {
      emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    }
    const total    = emi * n
    const interest = total - principal
    return { emi, principal, interest, total }
  }, [amount, down, tenure, rate])

  return (
    <section className="section-pad fin-sec">
      <div className="container" style={{ maxWidth: 1080 }}>
        <div className="fin-grid">
          {/* Sliders + result row */}
          <div className="card-base fin-card">
            <div className="fin-card-head">
            <h2 className="section-title">EMI Calculator</h2>
            <p>Drag the sliders to model your monthly payment.</p>
</div>
            {SLIDERS.map((s) => (
              <div key={s.key} className="fin-slider-row">
                <div className="fin-slider-head">
                  <span className="fin-slider-name">{s.label}</span>
                  <span className="fin-slider-val">{formatSuffix(state[s.key], s.suffix)}</span>
                </div>
                <input
                  type="range"
                  className="fin-slider"
                  min={s.min}
                  max={s.max}
                  step={s.step}
                  value={state[s.key]}
                  onChange={(e) => setters[s.key](Number(e.target.value))}
                  aria-label={s.label}
                  aria-valuemin={s.min}
                  aria-valuemax={s.max}
                  aria-valuenow={state[s.key]}
                />
              </div>
            ))}

            <div className="fin-result-row">
              <ResultTile value={`₹${inr(principal)}`} label="Loan Amount" />
              <ResultTile value={`₹${inr(interest)}`}  label="Total Interest" />
              <ResultTile value={`₹${inr(total)}`}     label="Total Payable" />
              <ResultTile value={`${tenure} mo`}        label="Tenure" />
            </div>
          </div>

          {/* Monthly EMI summary */}
          <div className="card-base fin-emi-card">
            <span className="fin-emi-lbl">Monthly EMI</span>
            <span className="fin-emi-num">₹{inr(emi)}</span>
            <p style={{ margin: '18px 0 24px' }}>
              Pre-approval in under 60 seconds — no documentation needed for amounts
              under ₹1.5L.
            </p>
            <Link
              to="/company/contact"
              className="rajdhani-lbl-text-sm btn-csr primary full-w"
             
            >
              <i className="bi bi-check2-circle"></i> Apply for Pre-Approval
            </Link>
            <p style={{ marginTop: 14, color: 'var(--gray-500)' }}>
              No impact on credit score · 0% processing fee
            </p>
          </div>
        </div>

        {/* Banking partners */}
        <div className="card-base" style={{ padding: 28, marginTop: 32 }}>
          <div className="fin-card-head">
          <h3 style={{ margin: '0 0 8px' }}>Banking Partners</h3>
          <p style={{ margin: '0 0 0px' }}>
            15+ partner banks & NBFCs offer instant pre-approval for Svitch buyers.
          </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center', opacity: 0.85 }}>
            {BANKS.map((b) => (
              <span key={b} style={BANK_PILL_STYLE}>{b}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ResultTile({ value, label }) {
  return (
    <div aria-label="EmiCalculator" role="region">
      <span className="fin-result-num">{value}</span>
      <span className="fin-result-lbl">{label}</span>
    </div>
  )
}

const BANK_PILL_STYLE = {
  padding:    '10px 18px',
  background: 'var(--gray-950)',
  border:     '1px solid var(--border)',
  fontFamily: 'var(--font-label)',
  fontWeight: 'var(--fw-semibold)',
}
