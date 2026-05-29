// Single chat bubble. `side` is 'them' (left) or 'you' (right).
// The avatar sits on the opposite end of the bubble per the legacy markup
// (left of bubble for 'them', right of bubble for 'you').
export default function TicketMessage({ msg }) {
  const avatar = (msg.sender || '?').trim()[0].toUpperCase()
  const bubble = (
    <div className="msg-bubble">
      <div className="msg-header">
        <span>
          <span className="msg-sender">{msg.sender}</span>
          {msg.role && <span className="msg-role">{msg.role}</span>}
        </span>
        <span className="msg-time">{msg.time}</span>
      </div>
      {msg.bodyHtml ? (
        <p dangerouslySetInnerHTML={{ __html: msg.bodyHtml }} />
      ) : (
        <p>{msg.body}</p>
      )}
    </div>
  )

  return (
    <div aria-label="TicketMessage" className={`msg ${msg.side}`}>
      {msg.side === 'them' ? (
        <>
          <div className="msg-avatar">{avatar}</div>
          {bubble}
        </>
      ) : (
        <>
          {bubble}
          <div className="msg-avatar">{avatar}</div>
        </>
      )}
    </div>
  )
}
