import TicketItem from './TicketItem'

export default function TicketList({ tickets, activeId, onSelect }) {
  if (tickets.length === 0) {
    return (
      <div className="tkt-list">
        <div className="card-base account-empty" style={{ padding: 24 }}>
          <i className="bi bi-ticket-detailed"></i>
          <h3 style={{ fontSize: 'var(--fs-md)' }}>No tickets match</h3>
          <p style={{ fontSize: 'var(--fs-sm)' }}>Try a different filter or clear the search.</p>
        </div>
      </div>
    )
  }
  return (
    <div aria-label="TicketList" role="region" className="tkt-list">
      {tickets.map((t) => (
        <TicketItem
          key={t.id}
          ticket={t}
          isActive={t.id === activeId}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}
