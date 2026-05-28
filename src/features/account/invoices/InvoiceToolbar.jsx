import { INVOICE_YEARS, INVOICE_TYPES } from './invoices-data'

export default function InvoiceToolbar({
  query, onQueryChange,
  year, onYearChange,
  type, onTypeChange,
  onBulkDownload,
}) {
  return (
    <div className="inv-toolbar">
      <input
        type="search"
        placeholder="Search by invoice / order #"
        aria-label="Search invoices by number or order"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        style={{ flex: 1, minWidth: 200 }}
      />
      <select value={year} onChange={(e) => onYearChange(e.target.value)} aria-label="Filter invoices by year">
        {INVOICE_YEARS.map((y) => <option key={y}>{y}</option>)}
      </select>
      <select value={type} onChange={(e) => onTypeChange(e.target.value)} aria-label="Filter invoices by type">
        {INVOICE_TYPES.map((t) => <option key={t}>{t}</option>)}
      </select>
      <button type="button" className="btn-csr secondary sm" onClick={onBulkDownload}>
        <i className="bi bi-download"></i> Bulk Download
      </button>
    </div>
  )
}
