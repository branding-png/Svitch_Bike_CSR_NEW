import { useEffect, useState } from 'react'
import { Modal } from '@/ui'
import { useToast } from '@/contexts/ToastContext'

// Star rating + comment modal. Opened by TestRideCompleted's "Leave Feedback"
// button. Resets internal state whenever a different booking is opened.
export default function TestRideFeedbackModal({ isOpen, onClose, bookingId }) {
  const { show } = useToast()
  const [rating, setRating]   = useState(0)
  const [hover, setHover]     = useState(0)
  const [comment, setComment] = useState('')
  const [err, setErr]         = useState('')

  useEffect(() => {
    if (isOpen) {
      setRating(0)
      setHover(0)
      setComment('')
      setErr('')
    }
  }, [isOpen, bookingId])

  function submit(ev) {
    ev.preventDefault()
    if (rating === 0) {
      setErr('Please pick a star rating.')
      return
    }
    show(`Thanks! Feedback submitted for booking ${bookingId}.`, 'success', 3500)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Leave Feedback"
      subtitle={<>Tell us about your ride <span>{bookingId ? `— #${bookingId}` : '—'}</span></>}
    >
      <form onSubmit={submit} noValidate>
        <div className={`form-group${err ? ' is-invalid' : ''}`}>
          <label className="rajdhani-lbl-text-sm">
            Your Rating <span className="required-star">*</span>
          </label>
          <div className="feedback-stars" role="radiogroup" aria-label="Rating">
            {[1, 2, 3, 4, 5].map((n) => {
              const filled = (hover || rating) >= n
              return (
                <i
                  key={n}
                  className={`bi ${filled ? 'bi-star-fill is-active' : 'bi-star'}`}
                  role="radio"
                  aria-checked={rating === n}
                  tabIndex={0}
                  onMouseEnter={() => setHover(n)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => { setRating(n); setErr('') }}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { setRating(n); setErr('') } }}
                ></i>
              )
            })}
          </div>
          {err && <div className="invalid-feedback" style={{ display: 'block' }}>{err}</div>}
        </div>

        <div className="form-group">
          <label className="rajdhani-lbl-text-sm" htmlFor="feedbackComment">Your Comments</label>
          <textarea
            id="feedbackComment"
            rows={4}
            placeholder="What did you like? What could we improve?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-csr primary full-w">
          <i className="bi bi-send-fill"></i> Submit Feedback
        </button>
      </form>
    </Modal>
  )
}
