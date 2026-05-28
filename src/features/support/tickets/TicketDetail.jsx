import TicketDetailHead from './TicketDetailHead'
import TicketThread     from './TicketThread'
import TicketReply      from './TicketReply'

// Right-pane card on the Support Tickets page. Combines the header + chat
// thread + reply box. Parent owns the thread state so replies are reactive.
export default function TicketDetail({ ticket, thread = [], onSendReply, onResolve }) {
  if (!ticket) {
    return (
      <div className="card-base tkt-detail">
        <div className="account-empty" style={{ padding: 32 }}>
          <i className="bi bi-ticket-detailed"></i>
          <h3>Select a ticket</h3>
          <p>Pick a conversation from the list to view the full thread.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card-base tkt-detail">
      <TicketDetailHead ticket={ticket} />
      <TicketThread entries={thread} />
      <TicketReply
        ticket={ticket}
        onSend={(msg) => onSendReply?.(ticket, msg)}
        onResolve={onResolve}
      />
    </div>
  )
}
