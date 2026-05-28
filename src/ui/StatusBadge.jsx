// Status pill used across the app for orders, returns, refunds, tickets, etc.
// Wraps the `.order-status.{status}` CSS pattern (green/blue/amber/red) so
// the call-sites don't have to repeat the icon + class wiring.
//
// Each known status maps to:
//   • cls   — colour class (matches account.css .order-status.{cls})
//   • icon  — default Bootstrap-Icon
//   • label — human-readable text
//
// Override any field via props:
//   <StatusBadge status="shipped" />               → "Shipped" (blue truck)
//   <StatusBadge status="processing" label="In Progress" />  → custom label
//   <StatusBadge status="custom" cls="delivered" icon="check-all" label="Done" />
//
const PRESETS = {
  delivered:  { cls: 'delivered',  icon: 'check-circle-fill', label: 'Delivered' },
  shipped:    { cls: 'shipped',    icon: 'truck',             label: 'Shipped' },
  processing: { cls: 'processing', icon: 'clock-history',     label: 'Processing' },
  cancelled:  { cls: 'cancelled',  icon: 'x-circle-fill',     label: 'Cancelled' },
  pending:    { cls: 'processing', icon: 'clock-history',     label: 'Pending' },
  approved:   { cls: 'shipped',    icon: 'check2-circle',     label: 'Approved' },
  refunded:   { cls: 'delivered',  icon: 'cash-coin',         label: 'Refunded' },
  rejected:   { cls: 'cancelled',  icon: 'x-circle-fill',     label: 'Rejected' },
  paid:       { cls: 'delivered',  icon: 'check-circle-fill', label: 'Paid' },
  open:       { cls: 'shipped',    icon: 'circle-fill',       label: 'Open' },
  closed:     { cls: 'delivered',  icon: 'check2-circle',     label: 'Closed' },
}

export default function StatusBadge({ status, cls, icon, label, className = '' }) {
  const preset = PRESETS[status] || PRESETS.processing
  const finalCls   = cls   || preset.cls
  const finalIcon  = icon  || preset.icon
  const finalLabel = label || preset.label

  return (
    <span className={`order-status ${finalCls} rajdhani-lbl-text-sm ${className}`.trim()}>
      <i className={`bi bi-${finalIcon}`}></i> {finalLabel}
    </span>
  )
}
