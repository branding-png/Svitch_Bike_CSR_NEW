import { useEffect, useState } from 'react'
import { Modal } from '@/ui'
import InputControl from '@/ui/InputControl'

const CATEGORIES = [
  { value: '', label: 'Select...' },
  'Battery & Charging',
  'Motor & Performance',
  'App & Connectivity',
  'Order / Delivery',
  'Invoice / Billing',
  'Service Booking',
  'Other',
]

const PRIORITIES = ['Low', 'Medium', 'High', 'Urgent (down)']

const EMPTY = {
  category: '',
  priority: 'Medium',
  subject:  '',
  ref:      '',
  message:  '',
  files:    [],
}

const MAX_FILES = 5
const MAX_SIZE_MB = 20

function validate(f) {
  const e = {}
  if (!f.category)                                  e.category = 'Please pick a category.'
  if (!f.subject || f.subject.trim().length < 4)    e.subject  = 'Please enter a short subject.'
  if (!f.message || f.message.trim().length < 10)   e.message  = 'Please describe the issue (min 10 characters).'
  return e
}

// "Raise New Ticket" modal — uses the shared .csr-modal shell via the
// Modal primitive, with Cancel + Submit in the footer.
export default function TicketNewModal({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setForm(EMPTY)
      setErrors({})
      setBusy(false)
    }
  }, [isOpen])

  const set = (key) => (v) => {
    setForm((f) => {
      const next  = { ...f, [key]: v }
      const fresh = validate(next)
      setErrors((errs) => ({ ...errs, [key]: fresh[key] }))
      return next
    })
  }

  function onFiles(e) {
    const files = Array.from(e.target.files || [])
    if (files.length > MAX_FILES) {
      setErrors((errs) => ({ ...errs, files: `Max ${MAX_FILES} files.` }))
      e.target.value = ''
      return
    }
    const tooBig = files.find((f) => f.size > MAX_SIZE_MB * 1024 * 1024)
    if (tooBig) {
      setErrors((errs) => ({ ...errs, files: `"${tooBig.name}" exceeds ${MAX_SIZE_MB} MB.` }))
      e.target.value = ''
      return
    }
    setErrors((errs) => ({ ...errs, files: undefined }))
    setForm((f) => ({ ...f, files }))
  }

  function submit(ev) {
    ev.preventDefault()
    const e = validate(form)
    setErrors(e)
    if (Object.keys(e).length) return
    setBusy(true)
    setTimeout(() => {
      setBusy(false)
      onSubmit?.(form)
    }, 800)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Raise New Ticket"
      subtitle="We respond within 4 working hours"
      footer={
        <>
          <button type="button" className="btn-csr secondary" onClick={onClose}>
            <i className="bi bi-x-lg"></i> Cancel
          </button>
          <button type="submit" form="newTicketForm" className="btn-csr primary" disabled={busy}>
            {busy ? (
              <span className="btn-spinner"><i className="bi bi-arrow-repeat spin-icon"></i> Submitting…</span>
            ) : (
              <><i className="bi bi-send-fill"></i> Submit Ticket</>
            )}
          </button>
        </>
      }
    >
      <form id="newTicketForm" onSubmit={submit} noValidate>
        <div className="form-row">
          <InputControl
            as="select" label="Category"
            value={form.category} onChange={set('category')}
            options={CATEGORIES}
            required error={errors.category}
          />
          <InputControl
            as="select" label="Priority"
            value={form.priority} onChange={set('priority')}
            options={PRIORITIES}
          />
        </div>

        <InputControl
          label="Subject"
          placeholder="One-line summary"
          maxLength={120}
          value={form.subject} onChange={set('subject')}
          required error={errors.subject}
        />

        <InputControl
          label="VIN / Order ID (if applicable)"
          placeholder="VIN or SVC-2026-xxxxx"
          value={form.ref} onChange={set('ref')}
        />

        <InputControl
          as="textarea" rows={5}
          label="Describe the issue"
          placeholder="Steps to reproduce, error messages, photos…"
          value={form.message} onChange={set('message')}
          required error={errors.message}
        />

        <div className={`form-group${errors.files ? ' is-invalid' : ''}`}>
          <label className="rajdhani-lbl-text-sm">
            Attachments (max {MAX_FILES} files, {MAX_SIZE_MB} MB)
          </label>
          <input type="file" multiple onChange={onFiles} />
          {errors.files
            ? <div className="invalid-feedback" style={{ display: 'block' }}>{errors.files}</div>
            : form.files.length > 0 && (
                <div className="form-hint">
                  {form.files.length} file{form.files.length === 1 ? '' : 's'} attached
                </div>
              )}
        </div>
      </form>
    </Modal>
  )
}
