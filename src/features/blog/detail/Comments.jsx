import { useRef, useState } from 'react'
import InputControl from '@/ui/InputControl'
import { useToast } from '@/contexts/ToastContext'

// Comments list + leave-a-comment form — mirrors CSR_New_web `.comments-block`.
// New comments are added to local state on submit.
// Pass `initial` to seed per-post comments from src/data/blog.js.
const SEED = [
  { name: 'Arjun Rao',     date: 'March 28, 2026 · 2:14 PM',  rating: 5,   text: 'Finally! Been waiting for the NXE Pro since the teasers. Ordered mine in Crimson Red.' },
  { name: 'Priya Shah',    date: 'March 28, 2026 · 4:45 PM',  rating: 4.5, text: 'The dual suspension is the real game changer for me.' },
  { name: 'Mehul Kothari', date: 'March 29, 2026 · 10:22 AM', rating: 5,   text: 'The Bafang motor is a huge deal. This alone justifies the ₹1.25L price in my opinion.' },
]

function initials(name = '') {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()
}

function Stars({ rating }) {
  return (
    <div className="comment-stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const cls = i + 1 <= Math.floor(rating)
          ? 'bi-star-fill'
          : (i + 0.5 <= rating ? 'bi-star-half' : 'bi-star')
        return <i key={i} className={`bi ${cls}`}></i>
      })}
    </div>
  )
}

function StarPicker({ value, hover, onPick, onHover }) {
  const shown = hover || value
  return (
    <div className="star-picker" role="radiogroup" aria-label="Your rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <i
          key={n}
          role="radio"
          aria-checked={value === n}
          tabIndex={0}
          data-val={n}
          className={`bi ${n <= shown ? 'bi-star-fill' : 'bi-star'}`}
          onClick={() => onPick(n)}
          onMouseEnter={() => onHover(n)}
          onMouseLeave={() => onHover(0)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPick(n) } }}
          style={{ cursor: 'pointer' }}
        />
      ))}
    </div>
  )
}

const EMPTY = { name: '', email: '', rating: 0, text: '' }

function nowStamp() {
  const d = new Date()
  const date = d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  return `${date} · ${time}`
}

export default function Comments({ initial = SEED }) {
  const { show } = useToast()
  const formRef = useRef(null)
  const [comments, setComments] = useState(initial)
  const [form, setForm]         = useState(EMPTY)
  const [errors, setErrors]     = useState({})
  const [hover, setHover]       = useState(0)
  const [busy, setBusy]         = useState(false)

  // Live per-field validation → green/red InputControl border as the user types.
  const set = (key) => (v) => {
    setForm((f) => {
      const next  = { ...f, [key]: v }
      const fresh = validate(next)
      setErrors((errs) => ({ ...errs, [key]: fresh[key] }))
      return next
    })
  }

  function validate(f) {
    const e = {}
    if (f.name.trim().length < 2)       e.name   = 'Please enter your full name.'
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email  = 'Please enter a valid email address.'
    if (!f.rating)                       e.rating = 'Please pick a rating.'
    if (f.text.trim().length < 10)       e.text   = 'Comment must be at least 10 characters.'
    return e
  }

  function submit(ev) {
    ev.preventDefault()
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length) {
      show('Please complete the form before posting.', 'error', 4000)
      return
    }
    setBusy(true)
    setTimeout(() => {
      setComments((list) => [
        ...list,
        { name: form.name.trim(), date: nowStamp(), rating: form.rating, text: form.text.trim() },
      ])
      setForm(EMPTY)
      setBusy(false)
      show('Comment posted — thanks for joining the conversation!', 'success', 4000)
    }, 800)
  }

  return (
    <div aria-label="Comments" role="region" className="card-base comments-block">
      <h3>Comments ({comments.length})</h3>

      {comments.length === 0 && (
        <p className="rajdhani-lbl-text-sm" style={{ opacity: 0.7, marginBottom: 24 }}>
          No comments yet — be the first to share your thoughts.
        </p>
      )}

      {comments.map((c, i) => (
        <div key={i} className="comment">
          <div className="comment-avatar">{initials(c.name)}</div>
          <div className="comment-body">
            <div className="comment-head">
              <h5>{c.name}</h5>
              <span className="comment-date rajdhani-lbl-text-sm">{c.date}</span>
            </div>
            <Stars rating={c.rating} />
            <p>{c.text}</p>
          </div>
        </div>
      ))}

      <form ref={formRef} className="comment-form" noValidate onSubmit={submit}>
        <h3>Leave a Comment</h3>

        <div className="form-row">
          <InputControl label="Full Name"     value={form.name}  onChange={set('name')}  required error={errors.name} />
          <InputControl label="Email Address" type="email" value={form.email} onChange={set('email')} required error={errors.email} />
        </div>

        <div className={'form-field' + (errors.rating ? ' is-invalid' : '')}>
          <label className="rajdhani-lbl-text-sm">Your Rating</label>
          <StarPicker value={form.rating} hover={hover} onPick={set('rating')} onHover={setHover} />
          {errors.rating && <div className="invalid-feedback">{errors.rating}</div>}
        </div>

        <InputControl
          as="textarea"
          label="Comment"
          placeholder="Share your thoughts on this article..."
          rows={4}
          value={form.text}
          onChange={set('text')}
          required
          error={errors.text}
        />

        <button
          type="submit"
          className="btn-csr primary"
          disabled={busy}
          style={busy ? { opacity: 0.7 } : undefined}
        >
          {busy ? (
            <><i className="bi bi-arrow-repeat spin-icon"></i> Posting...</>
          ) : (
            <><i className="bi bi-send-fill"></i> Post Comment</>
          )}
        </button>
      </form>
    </div>
  )
}
