import { useMemo, useState } from 'react'
import TicketSearch     from './TicketSearch'
import TicketFilterTabs from './TicketFilterTabs'
import TicketList       from './TicketList'

// Sidebar pane on the Support Tickets page.
// New Ticket → calls `onNewTicket` (parent opens the modal / scrolls form).
// Selecting a ticket → calls `onSelect`.
export default function TicketAside({ tickets, activeId, onNewTicket, onSelect }) {
  const [filter, setFilter] = useState('all')
  const [query, setQuery]   = useState('')

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return tickets.filter((t) => {
      if (filter !== 'all' && t.status !== filter) return false
      if (q && !`${t.id} ${t.subject}`.toLowerCase().includes(q)) return false
      return true
    })
  }, [tickets, filter, query])

  return (
    <aside aria-label="TicketAside" className="tkt-aside">
      <button type="button" className="btn-csr primary new-tkt-btn" onClick={onNewTicket}>
        <i className="bi bi-plus-lg"></i> Raise New Ticket
      </button>

      <TicketSearch value={query} onChange={setQuery} />
      <TicketFilterTabs active={filter} onChange={setFilter} />
      <TicketList tickets={visible} activeId={activeId} onSelect={onSelect} />
    </aside>
  )
}
