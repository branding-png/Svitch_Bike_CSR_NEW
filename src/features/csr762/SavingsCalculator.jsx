import { useMemo, useState } from 'react'

// CSR 762 — Interactive savings calculator. Mirrors svitch.bike `#calculator`.
// 3 sliders (daily km, petrol price, petrol mileage) → 5 derived values
// (5-year savings, monthly, annual, CO₂/year, payback period).
// Styles live in src/styles/pages/csr762.css (.calc-* classes).

// Format a rupee amount as Indian-style with lakhs (e.g. ₹3,82,500).
function formatINR(n) {
  return '₹' + Math.round(n).toLocaleString('en-IN')
}

const EV_COST_PER_KM = 0.25      // ₹/km — quoted from the cost-compare section
const KG_CO2_PER_LITRE = 2.31    // standard petrol burn factor

export default function SavingsCalculator({
  label        = 'Interactive Calculator',
  titleStart   = 'Calculate',
  titleEnd     = 'Your Savings',
  pricePremium = 50000,          // CSR 762 price premium over petrol bike → drives payback
}) {
  const [km, setKm]           = useState(50)
  const [petrol, setPetrol]   = useState(100)
  const [mileage, setMileage] = useState(35)

  const results = useMemo(() => {
    const petrolPerKm = petrol / mileage
    const dailySave   = km * (petrolPerKm - EV_COST_PER_KM)
    const monthly     = dailySave * 30
    const annual      = dailySave * 365
    const fiveYear    = annual * 5
    const litresYear  = (km * 365) / mileage
    const co2Tonnes   = (litresYear * KG_CO2_PER_LITRE) / 1000
    const payback     = annual > 0 ? pricePremium / annual : Infinity
    return { monthly, annual, fiveYear, co2Tonnes, payback }
  }, [km, petrol, mileage, pricePremium])

  return (
    <section id="calculator" >
      <div className="container">
        <div className="calc-heading reveal">
          <span className="section-label">{label}</span>
          <h2 className="section-title large">
            {titleStart}<br />{titleEnd}
          </h2>
        </div>

        <div className="calc-wrapper reveal">
          <div className="calc-grid">
            {/* SLIDERS */}
            <div className="calc-inputs">
              <SliderRow
                id="slider-km"
                label="Daily Riding Distance"
                value={km}
                onChange={setKm}
                min={10}
                max={200}
                step={5}
                suffix="km"
              />
              <SliderRow
                id="slider-petrol"
                label="Petrol Price (per litre)"
                value={petrol}
                onChange={setPetrol}
                min={80}
                max={150}
                step={1}
                prefix="₹"
              />
              <SliderRow
                id="slider-mileage"
                label="Petrol Bike Mileage"
                value={mileage}
                onChange={setMileage}
                min={20}
                max={60}
                step={1}
                suffix="km/l"
              />
            </div>

            {/* SUMMARY — big 5-year number */}
            <div className="calc-summary">
              <div className="calc-summary-inner">
                <div className="calc-summary-label">5-Year Savings</div>
                <div className="calc-summary-value">{formatINR(results.fiveYear)}</div>
                <div className="calc-summary-note">vs petrol equivalent</div>
              </div>
            </div>
          </div>

          {/* BREAKDOWN — 4 stat tiles */}
          <div className="calc-results">
            <ResultTile value={formatINR(results.monthly)} label="Monthly Saving" />
            <ResultTile value={formatINR(results.annual)}  label="Yearly Saving" />
            <ResultTile value={`${results.co2Tonnes.toFixed(2)} T`} label="CO₂ Saved/Year" />
            <ResultTile
              value={isFinite(results.payback) ? `${results.payback.toFixed(1)} Yrs` : '—'}
              label="Payback Period"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function SliderRow({ id, label, value, onChange, min, max, step = 1, prefix = '', suffix = '' }) {
  return (
    <div className="calc-input-group">
      <div className="calc-input-label">
        <span className="calc-input-name">{label}</span>
        <span className="calc-input-value">{prefix}{value}{suffix && ` ${suffix}`}</span>
      </div>
      <input
        type="range"
        className="calc-slider"
        id={id}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
      />
    </div>
  )
}

function ResultTile({ value, label }) {
  return (
    <div aria-label="SavingsCalculator" className="calc-result-item">
      <span className="calc-result-val">{value}</span>
      <span className="calc-result-label">{label}</span>
    </div>
  )
}
