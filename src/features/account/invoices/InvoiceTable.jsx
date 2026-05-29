const ACTIONS = [
  { key: 'view',     icon: 'eye',       title: 'View' },
  { key: 'download', icon: 'download',  title: 'Download PDF' },
  { key: 'email',    icon: 'envelope',  title: 'Email' },
  { key: 'print',    icon: 'printer',   title: 'Print' },
]

export default function InvoiceTable({ invoices, onAction }) {
  if (!invoices.length) {
    return (
      <div className="card-base account-empty">
        <i className="bi bi-receipt"></i>
        <h3>No invoices match your filters</h3>
        <p>Try clearing the search or selecting a different year / type.</p>
      </div>
    )
  }

  return (
    <div aria-label="InvoiceTable" style={{ overflowX: 'auto' }}>
      <table className="inv-table">
        <thead>
          <tr>
            <th>Invoice #</th>
            <th>Date</th>
            <th>Order</th>
            <th>Type</th>
            <th>Amount</th>
            <th>GST</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv.id} className={inv.credit ? 'is-credit' : undefined}>
              <td data-label="Invoice #">{inv.id}</td>
              <td data-label="Date">{inv.date}</td>
              <td data-label="Order">{inv.order}</td>
              <td data-label="Type">{inv.type}</td>
              <td data-label="Amount">{inv.amount}</td>
              <td data-label="GST">{inv.gst}</td>
              <td data-label="Actions">
                <div className="inv-actions">
                  {ACTIONS.map((a) => (
                    <button
                      key={a.key}
                      type="button"
                      aria-label={a.title}
                      title={a.title}
                      onClick={() => onAction?.(a.key, inv)}
                    >
                      <i className={`bi bi-${a.icon}`}></i>
                    </button>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
