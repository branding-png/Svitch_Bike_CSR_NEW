import { INVOICE_STATS } from './invoices-data'

export default function InvoiceStats({ stats = INVOICE_STATS }) {
  return (
    <div aria-label="InvoiceStats" className="card-base gst-card">
      <div className="gst-row">
        {stats.map((s) => (
          <div className="gst-cell" key={s.label}>
            <h6>{s.label}</h6>
            <strong>{s.value}</strong>
          </div>
        ))}
      </div>
    </div>
  )
}
