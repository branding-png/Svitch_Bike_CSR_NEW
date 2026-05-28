// 4-step "How it works" row on the Trade-In page — mirrors CSR_New_web
// `#trade-in-process`. Step number renders via `bi-{n}-circle-fill` icons.
const STEPS = [
  { title: 'Tell us about your bike', desc: 'Brand, model, year, KM driven and condition.' },
  { title: 'Get instant quote',       desc: 'Algorithmic valuation in under 60 seconds.' },
  { title: 'Free pickup',             desc: 'Schedule pickup, hand over bike + RC.' },
  { title: 'Adjust against new bike', desc: 'Quote credited at CSR 762 dealer at booking.' },
]

const GRID_STYLE = {
  display:             'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap:                 18,
}

const CARD_STYLE = { padding: 24, textAlign: 'center' }
const ICON_STYLE = { fontSize: 34, color: 'var(--accent)', marginBottom: 10 }
const COPY_STYLE = { margin: 0 }

export default function TradeInProcess({ steps = STEPS }) {
  return (
    <section aria-label="TradeInProcess" id="trade-in-process" className="section-pad trade-sec">
      <div className="container">
        <div style={GRID_STYLE}>
          {steps.map((s, i) => (
            <div key={s.title} className="card-base" style={CARD_STYLE}>
              <div style={ICON_STYLE}>
                <i className={`bi bi-${i + 1}-square-fill`}></i>
              </div>
              <h3>{s.title}</h3>
              <p style={COPY_STYLE}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
