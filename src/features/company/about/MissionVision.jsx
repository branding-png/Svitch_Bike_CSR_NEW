import SectionHeader from '@/ui/SectionHeader'

// Mission + Vision cards for the About page — mirrors CSR_New_web `#mission-vision`.
const MV_CARDS = [
  {
    icon:  'bi-bullseye',
    label: 'Our Mission',
    title: <>Electrify Every<br />Indian Road</>,
    desc:  'To design and deliver the most reliable, affordable, and exhilarating electric motorcycles that empower every Indian rider to make the switch to clean mobility — without compromising power, style, or soul.',
  },
  {
    icon:  'bi-eye',
    label: 'Our Vision',
    title: <>Leading India's<br />EV Revolution</>,
    desc:  "To become India's most trusted electric motorcycle brand by 2030 — building a nation-wide ecosystem of intelligent, connected, and sustainable two-wheelers that redefine how India rides, commutes, and dreams.",
  },
]

export default function MissionVision() {
  return (
    <section aria-label="MissionVision" id="mission-vision">
      <div className="container">
        <SectionHeader
          label="What Drives Us"
          titleStart="Mission &"
          titleAccent="Vision"
        />
        <div className="mv-grid">
          {MV_CARDS.map((c) => (
            <div key={c.label} className="card-base mv-card">
              <div className="card-base-icon"><i className={`bi ${c.icon}`}></i></div>
              <span className="mv-label">{c.label}</span>
              <h3 className="mv-title">{c.title}</h3>
              <p className="mv-desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
