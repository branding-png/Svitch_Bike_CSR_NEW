import { useGLightbox } from '@/hooks/useGLightbox'

// CSR 762 — "How We Stack Up" comparison table. Mirrors svitch.bike
// `#comparison`. Multi-column comparison: CSR 762 vs Petrol Bike 150CC vs
// Other EV. A zoom badge opens the full table inside a GLightbox inline-
// type modal sized 1100 × 700 (scaled responsively).
//
// COLUMNS: each entry has `key`, `label`, optional `highlight: true` for
// the dark-bg accent column (CSR).
// ROWS: each row has `feature` (left-most label) + a value per column key.
//   value can be: string ('160+ km'), true (✓), false (✗), or '—' / null (dash).
const COLUMNS = [
  { key: 'csr',    label: 'CSR 762',           highlight: true },
  { key: 'petrol', label: 'Petrol Bike 150CC' },
  { key: 'other',  label: 'Other EV' },
]

const COMPARE_ROWS = [
  { feature: 'IDC Range',              csr: '160+ km',  petrol: '500–700 km', other: '90–100 km' },
  { feature: '0–60 km/h',              csr: '6 sec',    petrol: '7–9 sec',    other: '7–10 sec' },
  { feature: 'Top Speed',              csr: '110 km/h', petrol: '110 km/h',   other: '80–90 km/h' },
  { feature: 'Cost / km',              csr: '₹0.25',    petrol: '₹3.50+',     other: '₹0.35' },
  { feature: '40 ltr Bootspace',       csr: true,       petrol: false,        other: false },
  { feature: 'Dual Swappable Battery', csr: true,       petrol: false,        other: false },
  { feature: 'Phone Holder',           csr: true,       petrol: false,        other: false },
  { feature: 'GPS Tracking',           csr: true,       petrol: false,        other: '—' },
  { feature: 'Battery Warranty',       csr: '3 Years',  petrol: 'N/A',        other: '2–3 Years' },
  { feature: 'Auto Hill Hold',         csr: true,       petrol: false,        other: false },
  { feature: 'Maintenance Cost',       csr: 'Very Low', petrol: 'High',       other: 'Low' },
]

// Render a single cell value — handles strings, booleans, and the dash marker.
function Cell({ value, highlight }) {
  let content
  if (value === true) {
    content = <i className="bi bi-check-circle-fill check-icon" aria-label="Yes" />
  } else if (value === false) {
    content = <i className="bi bi-x-circle cross-icon" aria-label="No" />
  } else if (value == null || value === '—') {
    content = <i className="bi bi-dash cross-icon" aria-label="Not applicable" />
  } else {
    content = value
  }
  return <td className={highlight ? 'csr-col' : 'other-col'}>{content}</td>
}

function CompareRow({ row, columns }) {
  return (
    <tr>
      <td className="feature-name">{row.feature}</td>
      {columns.map((col) => (
        <Cell key={col.key} value={row[col.key]} highlight={col.highlight} />
      ))}
    </tr>
  )
}

export default function Comparison({
  label       = 'Comparison',
  titleStart  = 'How We',
  titleEnd    = 'Stack Up',
  rows        = COMPARE_ROWS,
  columns     = COLUMNS,
}) {
  // GLightbox inline-type modal — opens the table in a 1100×700 panel.
  useGLightbox('#comparison .cmp-zoom-trigger', [rows, columns])

  return (
    <section id="comparison">
      <div className="container">
        <div className="cmp-heading reveal">
          <span className="section-label">{label}</span>
          <h2 className="section-title large">
            {titleStart}<br />{titleEnd}
          </h2>

          {/* Zoom trigger — opens the table full-screen inside the lightbox */}
          <a
            href="#cmp-modal-content"
            className="cmp-zoom-trigger glightbox"
            data-glightbox="type: inline; width: 1100px; height: 700px"
            aria-label="Open comparison table in full-screen viewer"
          >
            <i className="bi bi-arrows-fullscreen" aria-hidden="true" /> Zoom
          </a>
        </div>

        <div className="cmp-table-wrap reveal">
          <table className="compare-table">
            <thead>
              <tr>
                <th style={{ width: '28%' }}>Feature</th>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={col.highlight ? 'highlight' : 'text-center'}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <CompareRow key={r.feature} row={r} columns={columns} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Hidden inline-modal source — GLightbox lifts this into the viewer.
            Same rows + columns, just rendered inside a 1100×700 panel. */}
        <div id="cmp-modal-content" className="cmp-modal-content">
          <div className="cmp-modal-inner">
            <header className="cmp-modal-head">
              <span className="section-label">{label}</span>
              <h3 className="cmp-modal-title">
                {titleStart} {titleEnd}
              </h3>
            </header>
            <div className="cmp-modal-table-wrap">
              <table className="compare-table cmp-modal-table">
                <thead>
                  <tr>
                    <th style={{ width: '32%' }}>Feature</th>
                    {columns.map((col) => (
                      <th
                        key={col.key}
                        className={col.highlight ? 'highlight' : 'text-center'}
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <CompareRow key={r.feature} row={r} columns={columns} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
