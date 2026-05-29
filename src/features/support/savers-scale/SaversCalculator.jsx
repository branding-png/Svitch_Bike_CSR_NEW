import { useState } from 'react'

// Interactive Saver's Scale calculator — mirrors CSR_New_web `#calculator`.
// 4 range inputs feed a live cost-comparison table + headline savings card.
// CSR 762 efficiency assumed: 0.025 kWh per km (40 km per 1 kWh charge).
const EV_KWH_PER_KM = 0.025

const DEFAULTS = { km: 40, elec: 8, petrol: 100, mileage: 35 }

const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN')

export default function SaversCalculator() {
  const [form, setForm] = useState(DEFAULTS)
  const set = (key, n) => setForm((f) => ({ ...f, [key]: Number(n) }))
  const reset = () => setForm(DEFAULTS)

  const { km, elec, petrol, mileage } = form

  const evPerKm     = elec * EV_KWH_PER_KM
  const petrolPerKm = mileage > 0 ? petrol / mileage : 0
  const savePerKm   = Math.max(0, petrolPerKm - evPerKm)

  const evPerDay     = evPerKm     * km
  const petrolPerDay = petrolPerKm * km
  const savePerDay   = savePerKm   * km
  const saveMonth    = savePerDay * 30
  const saveYear     = savePerDay * 365
  const save5Year    = saveYear * 5

  return (
    <section id="calculator">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Calculator</span>
          <h2 className="section-title">
            Savings <span className="accent">Calculator</span>
          </h2>
          <p className="section-desc">
            Enter your daily commute and local rates. Numbers update live as you type.
          </p>
        </div>

        <div className="calc-wrap">
          {/* INPUTS */}
          <div className="card-base calc-inputs">
            <div className='calc-inputs-header'>
            <h3>Your Commute</h3>
            <p className="calc-inputs-sub">Edit any value — totals update instantly.</p>
</div>
            <RangeRow
              label="Daily Travel Distance" id="inputKm"
              value={km} min={1} max={200} step={1}
              onChange={(v) => set('km', v)}
              displayValue={<><strong>{km}</strong> <small>KM/Day</small></>}
              metaLeft="1 KM" metaRight="200 KM"
            />
            <RangeRow
              label="Electricity Rate (Your City)" id="inputElec"
              value={elec} min={1} max={20} step={0.5}
              onChange={(v) => set('elec', v)}
              displayValue={<>₹<strong>{elec}</strong> <small>/kWh</small></>}
              metaLeft="₹1" metaRight="₹20"
            />
            <RangeRow
              label="Petrol Rate" id="inputPetrol"
              value={petrol} min={50} max={150} step={0.5}
              onChange={(v) => set('petrol', v)}
              displayValue={<>₹<strong>{petrol}</strong> <small>/L</small></>}
              metaLeft="₹50" metaRight="₹150"
            />
            <RangeRow
              label="Petrol Bike Mileage" id="inputMileage"
              value={mileage} min={10} max={80} step={1}
              onChange={(v) => set('mileage', v)}
              displayValue={<><strong>{mileage}</strong> <small>KM/L</small></>}
              metaLeft="10 KM/L" metaRight="80 KM/L"
            />

            <div className="calc-actions">
              <button type="button" className="btn-csr secondary" onClick={reset}>
                <i className="bi bi-arrow-counterclockwise"></i> Reset
              </button>
            </div>
          </div>

          {/* RESULTS */}
          <div className="calc-results">
            <div className="calc-hero-card">
              <span className="calc-hero-label">You Save Approximately</span>
              <div className="calc-hero-value">
                {inr(saveYear)}<span className="unit">/Year</span>
              </div>
              <span className="calc-hero-period rajdhani-lbl-text-sm">
                Based on 365 riding days
              </span>
            </div>

            <div className="calc-breakdown">
              <div className="card-base calc-cell is-petrol">
                <span className="rajdhani-lbl-text-sm">Petrol Cost / Day</span>
                <strong>{inr(petrolPerDay)}</strong>
              </div>
              <div className="card-base calc-cell is-ev">
                <span className="rajdhani-lbl-text-sm">CSR 762 Cost / Day</span>
                <strong>{inr(evPerDay)}</strong>
              </div>
              <div className="card-base calc-cell">
                <span className="rajdhani-lbl-text-sm">Savings / Month</span>
                <strong>{inr(saveMonth)}</strong>
              </div>
              <div className="card-base calc-cell">
                <span className="rajdhani-lbl-text-sm">Savings / 5 Years</span>
                <strong>{inr(save5Year)}</strong>
              </div>
            </div>

            <div className="calc-table-wrap">
              <table className="calc-table">
                <thead>
                  <tr>
                    <th>Cost</th>
                    <th>Petrol Bike</th>
                    <th>CSR 762</th>
                    <th>Saving</th>
                  </tr>
                </thead>
                <tbody>
                  <Row label="Per KM"    petrol={petrolPerKm}            ev={evPerKm}            save={savePerKm} fmt="km" />
                  <Row label="Per Day"   petrol={petrolPerDay}           ev={evPerDay}           save={savePerDay} />
                  <Row label="Per Month" petrol={petrolPerDay * 30}      ev={evPerDay * 30}      save={saveMonth} />
                  <Row label="Per Year"  petrol={petrolPerDay * 365}     ev={evPerDay * 365}     save={saveYear} />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────
function RangeRow({ label, id, value, min, max, step, onChange, displayValue, metaLeft, metaRight }) {
  return (
    <div className="form-group range-group">
      <div className="range-head">
        <label className="rajdhani-lbl-text-sm" htmlFor={id}>{label}</label>
        <span className="range-value">{displayValue}</span>
      </div>
      <input
        type="range" id={id}
        value={value} min={min} max={max} step={step}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="range-meta">
        <span>{metaLeft}</span>
        <span>{metaRight}</span>
      </div>
    </div>
  )
}

function Row({ label, petrol, ev, save, fmt }) {
  // For the "Per KM" row use 2-decimal precision; everything else rounded.
  const f = fmt === 'km'
    ? (n) => '₹' + (Math.round(n * 100) / 100).toFixed(2)
    : inr
  return (
    <tr aria-label="SaversCalculator">
      <td>{label}</td>
      <td>{f(petrol)}</td>
      <td>{f(ev)}</td>
      <td className="is-saving">{f(save)}</td>
    </tr>
  )
}
