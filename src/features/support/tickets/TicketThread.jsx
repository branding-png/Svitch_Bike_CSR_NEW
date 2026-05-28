import TicketMessage from './TicketMessage'

// Renders the message stream. A `{ day: '…' }` entry becomes a `.tkt-day`
// separator label; anything else is a `.msg` bubble.
export default function TicketThread({ entries = [] }) {
  return (
    <div aria-label="TicketThread" role="region" className="tkt-thread">
      {entries.map((entry, i) =>
        entry.day ? (
          <span key={`d-${i}`} className="tkt-day">{entry.day}</span>
        ) : (
          <TicketMessage key={i} msg={entry} />
        ),
      )}
    </div>
  )
}
