// Maintenance schedule table — mirrors CSR_New_web `#schedule`.
// Each cell is one of: 'check' (inspect), 'replace', 'deep' (diagnostic), 'na'.
// Data lives in this file so the table is easy to tweak.
const INTERVALS = [
  { km: '1,000 km', sub: 'First free check' },
  { km: '5,000 km' },
  { km: '10,000 km' },
  { km: '20,000 km' },
  { km: '30,000 km' },
]

const ROWS = [
  { icon: 'bi-battery-charging',  label: 'Battery health & cells',  cells: ['check', 'check', 'check', 'check', 'deep'   ] },
  { icon: 'bi-cpu',               label: 'Motor & controller',      cells: ['check', 'check', 'check', 'check', 'check'  ] },
  { icon: 'bi-cloud-download',    label: 'Firmware / OTA updates',  cells: ['check', 'check', 'check', 'check', 'check'  ] },
  { icon: 'bi-disc',              label: 'Brake pads (front & rear)', cells: ['na', 'check', 'replace', 'replace', 'replace'] },
  { icon: 'bi-record-circle',     label: 'Tyres & alignment',       cells: ['check', 'check', 'check', 'replace', 'replace'] },
  { icon: 'bi-snow',              label: 'Coolant level & flush',   cells: ['na', 'check', 'check', 'replace', 'replace' ] },
  { icon: 'bi-wrench-adjustable', label: 'Suspension & bushings',   cells: ['check', 'check', 'check', 'check', 'check'  ] },
  { icon: 'bi-lightbulb',         label: 'LED lights & wiring',     cells: ['check', 'check', 'check', 'check', 'check'  ] },
  { icon: 'bi-droplet-half',      label: 'Cooling fluid',           cells: ['na', 'na', 'check', 'check', 'replace'      ] },
  { icon: 'bi-droplet',           label: 'Deep wash & detailing',   cells: ['check', 'check', 'check', 'check', 'check'  ] },
]

const CELL_META = {
  check:   { cls: 'cell-check',   icon: 'bi-check2',       title: 'Inspect'         },
  replace: { cls: 'cell-replace', icon: 'bi-arrow-repeat', title: 'Replace'         },
  deep:    { cls: 'cell-deep',    icon: 'bi-search',       title: 'Deep diagnostic' },
}

function Cell({ type }) {
  if (type === 'na') return <span className="cell-na">–</span>
  const meta = CELL_META[type]
  if (!meta) return <span className="cell-na">–</span>
  return (
    <span className={meta.cls} title={meta.title}>
      <i className={`bi ${meta.icon}`}></i>
    </span>
  )
}

export default function MaintenanceSchedule() {
  return (
    <section id="schedule">
      <div className="container">
        <div className="section-header">
          <span className="section-label rajdhani-lbl-text-sm">Maintenance Schedule</span>
          <h2 className="section-title">
            Service <span className="accent">Intervals</span>
          </h2>
          <p className="section-desc">
            The CSR 762 follows a simple periodic schedule. Most checks are
            routine — no oil, no clutch, no chain-drive mess.
          </p>
        </div>

        <div className="card-base schedule-wrap">
          <div className="schedule-table-scroll">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th scope="col">Service Item</th>
                  {INTERVALS.map((iv) => (
                    <th key={iv.km} scope="col">
                      {iv.km}
                      {iv.sub && <><br /><small>{iv.sub}</small></>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.label}>
                    <td className="schedule-label">
                      <i className={`bi ${r.icon}`}></i> {r.label}
                    </td>
                    {r.cells.map((c, i) => (
                      <td key={i}><Cell type={c} /></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="schedule-legend">
            <span className="legend-item rajdhani-lbl-text-sm">
              <span className="cell-check"><i className="bi bi-check2"></i></span> Inspect & clean
            </span>
            <span className="legend-item rajdhani-lbl-text-sm">
              <span className="cell-replace"><i className="bi bi-arrow-repeat"></i></span> Replace
            </span>
            <span className="legend-item rajdhani-lbl-text-sm">
              <span className="cell-deep"><i className="bi bi-search"></i></span> Deep diagnostic
            </span>
            <span className="legend-item rajdhani-lbl-text-sm">
              <span className="cell-na">–</span> Not required
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
