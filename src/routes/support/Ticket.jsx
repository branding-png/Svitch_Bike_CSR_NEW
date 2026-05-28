import { useState } from 'react'
import AccountLayout    from '@/features/account/AccountLayout'
import AccountContent   from '@/features/account/AccountContent'
import TicketAside      from '@/features/support/tickets/TicketAside'
import TicketDetail     from '@/features/support/tickets/TicketDetail'
import TicketEmergency  from '@/features/support/tickets/TicketEmergency'
import TicketNewModal   from '@/features/support/tickets/TicketNewModal'
import { TICKETS, TICKET_THREADS } from '@/data/tickets-data'
import { useToast }     from '@/contexts/ToastContext'
import { useUser }      from '@/contexts/UserContext'
import '@/styles/pages/ticket.css'

export default function Ticket() {
  const { show } = useToast()
  const { user } = useUser()
  const [tickets, setTickets] = useState(TICKETS)
  const [threads, setThreads] = useState(TICKET_THREADS)
  const [activeId, setActiveId] = useState(TICKETS[0]?.id || null)
  const [newOpen, setNewOpen] = useState(false)

  const activeTicket  = tickets.find((t) => t.id === activeId) || null
  const activeThread  = (activeId && threads[activeId]) || []

  function openNewTicket() {
    setNewOpen(true)
  }

  function selectTicket(t) {
    setActiveId(t.id)
    // Clear the unread dot when the ticket is opened.
    setTickets((rows) => rows.map((r) => (r.id === t.id ? { ...r, unread: false } : r)))
  }

  function sendReply(ticket, msg) {
    if (!msg) return
    const senderName = (user?.firstName) || (user?.name?.split(/\s+/)[0]) || 'You'
    const now = new Date()
    const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false })
    const newMsg = { side: 'them', sender: senderName, role: 'You', time, body: msg }

    setThreads((prev) => ({
      ...prev,
      [ticket.id]: [...(prev[ticket.id] || []), newMsg],
    }))
    // Bump "updated" tag on the sidebar entry.
    setTickets((rows) =>
      rows.map((r) => (r.id === ticket.id ? { ...r, updated: 'just now' } : r)),
    )
    show(`Reply sent on #${ticket.id}.`, 'success', 3000)
  }

  function resolveTicket(ticket) {
    setTickets((rows) =>
      rows.map((r) =>
        r.id === ticket.id ? { ...r, status: 'closed', statusLabel: 'Closed' } : r,
      ),
    )
    show(`Ticket #${ticket.id} marked as resolved.`, 'success', 3000)
  }

  function submitNewTicket(form) {
    const id = `TKT-${Math.floor(2000 + Math.random() * 7999)}`
    const ticket = {
      id,
      subject:       form.subject,
      status:        'open',
      statusLabel:   'Open',
      updated:       'just now',
      priority:      form.priority.toLowerCase().replace(/\s.*$/, ''),
      priorityLabel: form.priority,
      unread:        false,
      category:      form.category,
      sla:           'Replies in ~4 hrs',
    }
    setTickets((rows) => [ticket, ...rows])
    setActiveId(id)
    setNewOpen(false)
    show(`Ticket #${id} opened. We'll reply within 4 working hours.`, 'success', 4000)
  }

  return (
    <AccountLayout>
      <AccountContent
        crumbLabel="Support Tickets"
        title="Support Tickets"
        description="We respond within 4 working hours. 24/7 phone line for roadside emergencies."
      >
        <div className="tkt-layout">
          <TicketAside
            tickets={tickets}
            activeId={activeId}
            onNewTicket={openNewTicket}
            onSelect={selectTicket}
          />
          <TicketDetail
            ticket={activeTicket}
            thread={activeThread}
            onSendReply={sendReply}
            onResolve={resolveTicket}
          />
        </div>

        <TicketEmergency />

        <TicketNewModal
          isOpen={newOpen}
          onClose={() => setNewOpen(false)}
          onSubmit={submitNewTicket}
        />
      </AccountContent>
    </AccountLayout>
  )
}
