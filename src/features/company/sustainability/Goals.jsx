import SectionHeader from '@/ui/SectionHeader'

// 2030 sustainability goals — mirrors CSR_New_web `#sus-goals`.
const GOALS = [
  {
    year:     '2025',
    title:    'Lakh tonnes of CO₂ avoided cumulatively',
    headline: '5 lakh tonnes of CO₂ avoided cumulatively',
    desc:     'Measured across all Svitch vehicles on Indian roads, calculated using government grid emission factors.',
    progress: 68,
  },
  {
    year:     '2026',
    headline: '100% recycled packaging across all products',
    desc:     'Vehicle packaging, charger boxes, and accessory packs to use 100% recycled or biodegradable materials.',
    progress: 45,
  },
  {
    year:     '2027',
    headline: 'Battery recycling programme in all 28 states',
    desc:     'Take-back kiosks at all authorised dealers. Partnership with CPCB-certified battery recyclers across India.',
    progress: 30,
  },
  {
    year:     '2030',
    headline: 'Carbon-neutral operations — Scope 1, 2 & 3',
    desc:     'Net-zero across manufacturing, logistics, dealer operations, and the entire supply chain — verified by third-party auditors.',
    progress: 18,
  },
]

export default function Goals({ items = GOALS }) {
  return (
    <section id="sus-goals">
      <div className="container">
        <SectionHeader
          label="2030 Targets"
          titleStart="Our"
          titleAccent="Commitments"
          description="Clear, measurable goals with third-party verification — so you can track our progress."
        />
        <div className="goals-list">
          {items.map((g) => (
            <div key={g.year} className="card-base goal-card">
              <span className="goal-year">{g.year}</span>
              <div className="goal-body">
                <h4>{g.headline}</h4>
                <p>{g.desc}</p>
              </div>
              <div className="goal-progress">
                <div className="goal-progress-head rajdhani-lbl-text-sm">
                  <span>Progress</span>
                  <span className="goal-pct">{g.progress}%</span>
                </div>
                <div className="goal-bar">
                  <div className="goal-bar-fill" style={{ width: `${g.progress}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
