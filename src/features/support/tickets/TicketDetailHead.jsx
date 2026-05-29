export default function TicketDetailHead({ ticket }) {
  if (!ticket) return null
  return (
    <div aria-label="TicketDetailHead" className="tkt-detail-head">
      <div>
        <h3>{ticket.subject}</h3>
        <div className="tkt-detail-meta">
          <span><strong>#{ticket.id}</strong></span>
          {ticket.category && (
            <span><i className="bi bi-tag"></i> {ticket.category}</span>
          )}
          <span>
            <i className="bi bi-exclamation-triangle-fill" style={{ color: '#fbbf24' }}></i>{' '}
            <strong>{ticket.priorityLabel}</strong> priority
          </span>
          {ticket.sla && (
            <span><i className="bi bi-clock-history"></i> {ticket.sla}</span>
          )}
        </div>
      </div>
      <span className={`tkt-status ${ticket.status}`}>{ticket.statusLabel}</span>
    </div>
  )
}
