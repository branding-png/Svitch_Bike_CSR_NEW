import { useState } from 'react'
import { useToast } from '@/contexts/ToastContext'

export default function TicketReply({ ticket, onSend, onResolve }) {
  const { show } = useToast()
  const [text, setText] = useState('')

  function send() {
    if (!text.trim()) {
      show('Type a reply before sending.', 'error', 2500)
      return
    }
    onSend?.(text.trim())
    setText('')
  }

  function attach() { show('Attachment picker coming soon.', 'info', 2500) }
  function emoji()  { show('Emoji picker coming soon.', 'info', 2500) }

  return (
    <div aria-label="TicketReply" role="region" className="tkt-reply">
      <label className="tkt-reply-label" htmlFor="reply">Your Reply</label>
      <textarea
        id="reply"
        placeholder="Type your reply..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="tkt-actions-bar">
        <button type="button" className="btn-csr secondary sm" onClick={attach}>
          <i className="bi bi-paperclip"></i> Attach
        </button>
        <button type="button" className="btn-csr secondary sm" onClick={emoji} aria-label="Emoji">
          <i className="bi bi-emoji-smile"></i>
        </button>
        <button type="button" className="btn-csr primary sm" onClick={send}>
          <i className="bi bi-send-fill"></i> Send Reply
        </button>
        {ticket?.status !== 'closed' && (
          <button type="button" className="btn-csr secondary sm resolve" onClick={() => onResolve?.(ticket)}>
            <i className="bi bi-check-circle"></i> Mark Resolved
          </button>
        )}
      </div>
    </div>
  )
}
