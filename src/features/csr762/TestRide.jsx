import { useState } from 'react'
import { useToast } from '@/contexts/ToastContext'

// CSR 762 — "Book Your Test Ride" form. Mirrors svitch.bike `#test-ride`.
// Left column: controlled form (name / mobile / city / date). Right column:
// available-city chips (the active chip auto-fills the city <select>) + an
// info box. Form errors are minimal client-side validation; on success we
// fire a toast and reset.
const CITIES = [
  'Mumbai', 'Delhi NCR', 'Bengaluru', 'Pune', 'Ahmedabad',
  'Chennai', 'Hyderabad', 'Kolkata', 'Jaipur',
]

const INFO_ITEMS = [
  { icon: 'bi-clock',          text: '30-minute free test ride experience' },
  { icon: 'bi-person-badge',   text: 'Valid driving licence (2-wheeler) required' },
  { icon: 'bi-shield-check',   text: 'Helmet and safety gear provided' },
  { icon: 'bi-calendar-check', text: 'Booking confirmation via SMS & email' },
  { icon: 'bi-telephone',      text: 'Need help? Call 1800-762-1234 (Toll Free)' },
]

const EMPTY = { name: '', mobile: '', city: '', date: '' }

export default function TestRide({
  label      = 'Experience It First',
  titleStart = 'Book Your',
  titleEnd   = 'Test Ride',
  desc       = 'Feel the instant torque. Experience the silence. Test the technology. Book a free 30-minute test ride at your nearest CSR dealership today.',
  cities     = CITIES,
  infoItems  = INFO_ITEMS,
}) {
  const toast = useToast()
  const [form, setForm]     = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [active, setActive] = useState(cities[0])

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  // Click a chip → set it active AND auto-select it in the <select>.
  const pickChip = (city) => {
    setActive(city)
    setForm((f) => ({ ...f, city }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim())                    e.name   = 'Name is required'
    if (!/^[\d+\s-]{10,15}$/.test(form.mobile)) e.mobile = 'Enter a valid mobile number'
    if (!form.city)                            e.city   = 'Please choose a city'
    if (!form.date)                            e.date   = 'Pick a preferred date'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    toast.show(`Test ride confirmed for ${form.name} in ${form.city}.`, 'success')
    setForm(EMPTY)
    setErrors({})
  }

  return (
    <section id="test-ride">
      <div className="container">
        <div className="tr-intro reveal">
          <div className="tr-intro-heading">
            <span className="section-label">{label}</span>
            <h2 className="section-title large">
              {titleStart}<br />{titleEnd}
            </h2>
          </div>
          <div className="tr-intro-copy">
            <p className="section-title-p">{desc}</p>
          </div>
        </div>

        <div className="tr-grid">
          {/* ── Form column ──────────────────────────────────────────── */}
          <div className="tr-form-col reveal-left">
            <form className="test-form" onSubmit={onSubmit} noValidate>
              <div className="form-group">
                <label className="form-label-custom" htmlFor="trName">Your Name</label>
                <input
                  type="text"
                  id="trName"
                  className="form-control-custom"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={set('name')}
                  required
                />
                {errors.name && <small className="form-error">{errors.name}</small>}
              </div>

              <div className="form-group">
                <label className="form-label-custom" htmlFor="trMobile">Mobile Number</label>
                <input
                  type="tel"
                  id="trMobile"
                  className="form-control-custom"
                  placeholder="+91 00000 00000"
                  inputMode="numeric"
                  maxLength={15}
                  value={form.mobile}
                  onChange={set('mobile')}
                  required
                />
                {errors.mobile && <small className="form-error">{errors.mobile}</small>}
              </div>

              <div className="tr-form-pair">
                <div className="form-group">
                  <label className="form-label-custom" htmlFor="trCity">Select City</label>
                  <select
                    id="trCity"
                    className="form-control-custom"
                    value={form.city}
                    onChange={set('city')}
                    required
                  >
                    <option value="">Choose city</option>
                    {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.city && <small className="form-error">{errors.city}</small>}
                </div>

                <div className="form-group">
                  <label className="form-label-custom" htmlFor="trDate">Preferred Date</label>
                  <input
                    type="date"
                    id="trDate"
                    className="form-control-custom"
                    value={form.date}
                    onChange={set('date')}
                    required
                  />
                  {errors.date && <small className="form-error">{errors.date}</small>}
                </div>
              </div>

              <button type="submit" className="btn-csr primary w-100 mt-2">
                <i className="bi bi-geo-alt-fill" /> Confirm Test Ride
              </button>
            </form>
          </div>

          {/* ── Info column ──────────────────────────────────────────── */}
          <div className="tr-info-col reveal-right">
            <p
              style={{
                fontFamily: 'var(--font-label)',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: 'var(--black)',
                marginBottom: 16,
              }}
            >
              Available Cities
            </p>
            <div className="city-chips">
              {cities.map((c) => (
                <button
                  type="button"
                  key={c}
                  className={`city-chip${active === c ? ' active' : ''}`}
                  onClick={() => pickChip(c)}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="test-info-box mt-4">
              {infoItems.map((item) => (
                <div key={item.text} className="test-info-item">
                  <i className={`bi ${item.icon}`} />
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
