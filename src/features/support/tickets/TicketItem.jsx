// Single ticket card in the sidebar list. Highlights when active or unread.
const PRIORITY_ICON = { high: 'exclamation-triangle-fill' }

export default function TicketItem({ ticket, isActive, onSelect }) {
  const cls = [
    'card-base',
    'tkt-item',
    isActive       && 'is-active',
    ticket.unread  && 'unread',
  ].filter(Boolean).join(' ')

  const priIcon = PRIORITY_ICON[ticket.priority]

  return (
    <div aria-label="TicketItem"
      className={cls}
      data-id={ticket.id}
      data-filter={ticket.status}
      onClick={() => onSelect?.(ticket)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect?.(ticket) }}
    >
      <div className="tkt-item-head">
        <h6>{ticket.subject}</h6>
        <span className={`tkt-status ${ticket.status}`}>{ticket.statusLabel}</span>
      </div>
      <div className="tkt-item-meta">
        <strong>#{ticket.id}</strong>{' '}
        <span>&middot;</span>{' '}
        <span><i className="bi bi-clock"></i> {ticket.updated}</span>{' '}
        <span className={`tkt-priority ${ticket.priority}`}>
          {priIcon && <i className={`bi bi-${priIcon}`}></i>} {ticket.priorityLabel}
        </span>
      </div>
    </div>
  )
}
