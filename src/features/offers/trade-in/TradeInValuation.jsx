import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import InputControl from '@/ui/InputControl'
import { useToast } from '@/contexts/ToastContext'

// Trade-in instant valuation form — mirrors CSR_New_web `#trade-in-valuation`.
// Submitting validates, shows a 1.2s spinner, then renders the estimated quote
// panel below the form (form stays visible so the user can iterate).
const BRANDS = [
  'Hero', 'Honda', 'TVS', 'Bajaj', 'Yamaha',
  'Royal Enfield', 'Suzuki', 'Ola', 'Ather', 'Other',
]

const CONDITIONS = [
  { value: 'excellent', label: 'Excellent' },
  { value: 'good',      label: 'Good'      },
  { value: 'fair',      label: 'Fair'      },
  { value: 'poor',      label: 'Poor'      },
]

const EMPTY = {
  brand: '', model: '', year: '', km: '',
  condition: 'good', city: '', phone: '',
}

const inr = (n) => Math.round(n).toLocaleString('en-IN')

// Rough estimator — replace with a real model later.
function estimate({ year, km, condition }) {
  const ageYears = Math.max(0, 2026 - Number(year || 2020))
  const base     = 90000
  const ageDrop  = ageYears * 8000
  const kmDrop   = (Number(km || 0) / 1000) * 250
  const mult     = condition === 'excellent' ? 1
                 : condition === 'good'      ? 0.85
                 : condition === 'fair'      ? 0.7
                 : 0.55
  return Math.max(20000, Math.round((base - ageDrop - kmDrop) * mult))
}

export default function TradeInValuation() {
  const { show } = useToast()
  const formRef = useRef(null)
  const [form, setForm]     = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [busy, setBusy]     = useState(false)
  const [quote, setQuote]   = useState(null)

  // Live per-field validation on every keystroke → green/red border on InputControl.
  const set = (key) => (v) => {
    setForm((f) => {
      const next  = { ...f, [key]: v }
      const fresh = validate(next)
      setErrors((errs) => ({ ...errs, [key]: fresh[key] }))
      return next
    })
  }

  function validate(f) {
    const e = {}
    if (!f.brand)                            e.brand = 'Please choose a brand.'
    if (f.model.trim().length < 2)           e.model = 'Please enter the model name.'
    const y = Number(f.year)
    if (!y || y < 2000 || y > 2026)          e.year  = 'Year must be between 2000 and 2026.'
    if (!f.km || Number(f.km) < 0)           e.km    = 'Please enter the kilometres driven.'
    if (!f.condition)                         e.condition = 'Please select condition.'
    if (f.city.trim().length < 2)            e.city  = 'Please enter your city.'
    if (!/^[0-9+\s-]{10,15}$/.test(f.phone)) e.phone = 'Please enter a valid phone number.'
    return e
  }

  function submit(ev) {
    ev.preventDefault()
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length) {
      show('Please check the form — some fields need your attention.', 'error', 5000)
      requestAnimationFrame(() => {
        const first = formRef.current?.querySelector('.form-group.is-invalid input, .form-group.is-invalid select')
        first?.focus()
      })
      return
    }
    setBusy(true)
    setTimeout(() => {
      const value = estimate(form)
      setQuote(value)
      setBusy(false)
      show(`Estimated quote: ₹${inr(value)} — schedule a pickup to lock it in.`, 'success', 4500)
    }, 1200)
  }

  return (
    <section aria-label="TradeInValuation" id="trade-in-valuation" className="section-pad">
      <div className="container" style={{ maxWidth: 760 }}>
        <div className="card-base" style={{ padding: 36 }}>
          <div className="trade-sec-head">
          <h2 className='section-title'>Get Instant Valuation</h2>
          <p>
            No documents needed at this stage — just basic details about your bike.
          </p>
</div>
          <form ref={formRef} noValidate onSubmit={submit}>
            <div style={GRID_2}>
              <InputControl as="select" label="Brand" placeholder="Choose"
                options={BRANDS}
                value={form.brand} onChange={set('brand')} required error={errors.brand} />
              <InputControl label="Model" placeholder="e.g. Splendor Plus"
                value={form.model} onChange={set('model')} required error={errors.model} />
            </div>

            <div style={GRID_3}>
              <InputControl label="Year" type="number" placeholder="2020" min={2000} max={2026}
                value={form.year} onChange={set('year')} required error={errors.year} />
              <InputControl label="KMs Driven" type="number" placeholder="35000" min={0}
                value={form.km} onChange={set('km')} required error={errors.km} />
              <InputControl as="select" label="Condition"
                options={CONDITIONS}
                value={form.condition} onChange={set('condition')} required error={errors.condition} />
            </div>

            <div style={GRID_2}>
              <InputControl label="City" placeholder="Mumbai"
                value={form.city} onChange={set('city')} required error={errors.city} />
              <InputControl label="Phone" type="tel" placeholder="+91 98765 43210"
                value={form.phone} onChange={set('phone')} required error={errors.phone} />
            </div>

            <button
              type="submit"
              className="btn-csr primary full-w"
              style={{ justifyContent: 'center', marginTop: 6, opacity: busy ? 0.7 : 1 }}
              disabled={busy}
            >
              {busy ? (
                <><i className="bi bi-arrow-repeat spin-icon"></i> Calculating…</>
              ) : (
                <><i className="bi bi-currency-rupee"></i> Get My Valuation</>
              )}
            </button>
          </form>

          {quote != null && (
            <div style={RESULT_STYLE}>
              <span style={{ fontFamily: 'var(--font-label)', letterSpacing: 1.5, textTransform: 'uppercase' }}>
                Estimated Quote
              </span>
              <div style={QUOTE_STYLE}>₹{inr(quote)}</div>
              <p style={{ margin: '6px 0 18px' }}>
                Final amount may vary up to ±10% after physical inspection.
              </p>
              <Link to="/company/contact" className="btn-csr primary">
                <i className="bi bi-truck"></i> Schedule Pickup
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

const GRID_2 = { display: 'grid', gridTemplateColumns: '1fr 1fr',        gap: 16 }
const GRID_3 = { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',    gap: 16 }

const RESULT_STYLE = {
  marginTop:   28,
  padding:     24,
  background:  'var(--gray-950)',
  border:      '1px dashed var(--border-bright)',
  textAlign:   'center',
}

const QUOTE_STYLE = {
  fontFamily: 'var(--font-display)',
  fontSize:   'clamp(36px, 5vw, 52px)',
  fontWeight: 'var(--fw-black)',
  color:      'var(--accent)',
}
