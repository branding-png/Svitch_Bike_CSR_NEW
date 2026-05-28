// "Key Skills" — mirrors CSR_New_web `.job-section` (Skills variant).
// Each skill is `{ name, must }` — must-have skills get the `.is-must` class.
const DEFAULT_SKILLS = [
  { name: 'BLDC Motors',      must: true  },
  { name: 'BMS Design',       must: true  },
  { name: 'PCB Design',       must: true  },
  { name: 'Embedded C',       must: true  },
  { name: 'Altium Designer',  must: true  },
  { name: 'FOC Control',      must: false },
  { name: 'ESP32',            must: false },
  { name: 'STM32',            must: false },
  { name: 'CAN / UART',       must: false },
  { name: 'Power Electronics', must: false },
  { name: 'BLE / IoT',        must: false },
  { name: 'KiCad',            must: false },
  { name: 'Li-Ion Batteries', must: false },
  { name: 'EMC Testing',      must: false },
]

export default function KeySkills({
  title  = 'Key Skills',
  icon   = 'bi-stars',
  skills = DEFAULT_SKILLS,
}) {
  return (
    <section aria-label="KeySkills" className="card-base job-section">
      <h2><i className={`bi ${icon}`}></i> {title}</h2>
      <div className="skills-wrap">
        {skills.map((s) => (
          <span
            key={s.name}
            className={'skill-chip rajdhani-lbl-text-sm' + (s.must ? ' is-must' : '')}
          >
            {s.name}
          </span>
        ))}
      </div>
      <p style={{ marginTop: 16 }}>
        <i className="bi bi-info-circle" style={{ color: 'var(--accent)', marginRight: 6 }}></i>
        White chips are must-have. Grey chips are nice-to-have.
      </p>
    </section>
  )
}
