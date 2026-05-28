// Environmental impact summary — mirrors CSR_New_web `#environmental`.
// Numbers default to the "average rider" scenario (40 km/day, 35 km/L petrol).
// Pass `inputs={{ kmPerDay, mileage }}` to drive them off the calculator later.
const KG_CO2_PER_LITRE_PETROL = 2.31

function compute({ kmPerDay, mileage }) {
  const litres = (kmPerDay * 365) / Math.max(1, mileage)
  const kgCO2  = litres * KG_CO2_PER_LITRE_PETROL
  // A mature tree absorbs ~22 kg CO₂ per year.
  const trees  = kgCO2 / 22
  return {
    fuelLitres: Math.round(litres),
    co2Kg:      Math.round(kgCO2),
    trees:      Math.round(trees),
  }
}

export default function EnvironmentalImpact({
  inputs = { kmPerDay: 40, mileage: 35 },
}) {
  const { fuelLitres, co2Kg, trees } = compute(inputs)

  return (
    <section id="environmental">
      <div className="container">
        <div className="section-header">
          <span className="section-label rajdhani-lbl-text-sm">Beyond Savings</span>
          <h2 className="section-title">
            Environmental <span className="accent">Impact</span>
          </h2>
          <p className="section-desc">
            Every CSR 762 ride replaces a petrol ride — fewer emissions, less
            fuel burned, quieter streets.
          </p>
        </div>

        <div className="env-grid">
          <div className="card-base env-card">
            <div className="card-base-icon card-base-icon-center">
              <i className="bi bi-cloud-haze2"></i>
            </div>
            <div className="env-value">
              {co2Kg.toLocaleString('en-IN')}
              <span className="unit rajdhani-lbl-text-sm">kg</span>
            </div>
            <h3>CO₂ Saved / Year</h3>
            <p>Equivalent to planting roughly <strong>{trees}</strong> trees annually.</p>
          </div>

          <div className="card-base env-card">
            <div className="card-base-icon card-base-icon-center">
              <i className="bi bi-fuel-pump"></i>
            </div>
            <div className="env-value">
              {fuelLitres.toLocaleString('en-IN')}
              <span className="unit rajdhani-lbl-text-sm">L</span>
            </div>
            <h3>Petrol Saved / Year</h3>
            <p>Fuel you don&apos;t burn, queues you don&apos;t stand in.</p>
          </div>

          <div className="card-base env-card">
            <div className="card-base-icon card-base-icon-center">
              <i className="bi bi-volume-mute"></i>
            </div>
            <div className="env-value">
              0<span className="unit rajdhani-lbl-text-sm">dB</span>
            </div>
            <h3>Engine Noise</h3>
            <p>Our electric drivetrain is silent — zero engine noise, zero vibration.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
