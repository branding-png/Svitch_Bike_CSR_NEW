// Covered vs Not Covered — mirrors CSR_New_web `#scope`.
// Two side-by-side scope cards driven by the COVERED + NOT_COVERED arrays.
const COVERED = [
  'Battery pack, cells & BMS',
  'PMSM motor & controller',
  'Drivetrain, chain & sprockets',
  'Chassis, frame & sub-frame',
  'Suspension & steering',
  'Brakes (Combi Brake System)',
  'Factory-fit LED lighting & wiring',
  '7" Android Console & firmware',
  'Charging adapter & port',
  'Manufacturing defects',
  'Labour cost during warranty',
  'OTA software updates',
]

const NOT_COVERED = [
  'Normal wear & tear (tyres, pads)',
  'Accident or collision damage',
  'Damage from flooding beyond IP68 limit',
  'Unauthorised modifications / re-wiring',
  'Non-genuine parts & batteries',
  'Commercial / racing use',
  'Service done at unauthorised workshops',
  'Cosmetic damage (paint, decals)',
  'Overloading beyond 175 kg capacity',
  'Neglect & improper storage',
  'Consumables (lubricants, fuses)',
  'Natural calamities (force majeure)',
]

const COLUMNS = [
  {
    cls:        'scope-covered',
    iconCls:    'scope-icon-yes',
    icon:       'bi-check2-circle',
    label:      "What's Covered",
    title:      'Fully Protected',
    listCls:    'scope-list',
    bulletIcon: 'bi-check2',
    items:      COVERED,
  },
  {
    cls:        'scope-not-covered',
    iconCls:    'scope-icon-no',
    icon:       'bi-x-circle',
    label:      'Not Covered',
    title:      'Out Of Scope',
    listCls:    'scope-list scope-list-no',
    bulletIcon: 'bi-x',
    items:      NOT_COVERED,
  },
]

export default function WarrantyScope({ columns = COLUMNS }) {
  return (
    <section aria-label="WarrantyScope" id="scope">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Warranty Scope</span>
          <h2 className="section-title">
            Covered <span className="accent">vs. Not Covered</span>
          </h2>
          <p className="section-desc">
            Clear, upfront. We believe in no surprises — here&apos;s exactly
            what the warranty does and doesn&apos;t include.
          </p>
        </div>

        <div className="scope-grid">
          {columns.map((col) => (
            <div key={col.title} className={`card-base scope-card ${col.cls}`}>
              <div className="scope-head">
                <div className={`scope-icon ${col.iconCls}`}>
                  <i className={`bi ${col.icon}`}></i>
                </div>
                <div>
                  <span className="scope-label rajdhani-lbl-text-sm">{col.label}</span>
                  <h3>{col.title}</h3>
                </div>
              </div>

              <ul className={col.listCls}>
                {col.items.map((item) => (
                  <li key={item}>
                    <i className={`bi ${col.bulletIcon}`}></i> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
