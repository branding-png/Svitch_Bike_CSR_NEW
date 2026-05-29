import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import InputControl from '@/ui/InputControl'
import { useToast } from '@/contexts/ToastContext'
import { useUser } from '@/contexts/UserContext'
import { getOrder } from '@/data/orders-data'
import { PATHS } from '@/utils/routes'

// Return / Refund / Exchange request form â€” mirrors CSR_New_web `#returnForm`.
// Live red/green validation through InputControl, toast feedback on submit,
// 1.2s spinner and reset on success.
const PRODUCTS = [
  { value: '', label: 'Select an item from this order' },
  { value: 'helmet-black-l',  label: 'CSR Helmet â€” Matte Black (L)' },
  { value: 'spare-battery',   label: 'Spare Battery Pack 2.5kWh' },
  { value: 'gloves-carbon',   label: 'Riding Gloves â€” Carbon' },
  { value: 'phone-mount',     label: 'Universal Phone Mount' },
]

const REQUEST_TYPES = [
  { value: '',             label: 'Choose...' },
  { value: 'replacement',  label: 'Replacement' },
  { value: 'refund',       label: 'Refund' },
  { value: 'exchange',     label: 'Exchange (different variant)' },
]

const REASONS = [
  { value: '',           label: 'Choose a reason' },
  { value: 'defective',  label: 'Defective / damaged on arrival' },
  { value: 'wrong-size', label: 'Wrong size or variant received' },
  { value: 'not-as-described', label: 'Not as described' },
  { value: 'missing-parts',    label: 'Missing parts or accessories' },
  { value: 'changed-mind',     label: 'Changed my mind' },
  { value: 'other',            label: 'Other' },
]

const PICKUP_OPTIONS = [
  { value: 'registered', label: 'Use registered address (default)' },
  { value: 'new',        label: 'Add a new pickup address' },
]

const EMPTY = {
  orderId: '', product: '', qty: 1, type: '',
  reason: '', desc: '', pickup: 'registered',
  consent: false, files: [],
}

const MAX_FILES = 5
const MAX_SIZE_MB = 20

function validate(f) {
  const e = {}
  if (!f.orderId || f.orderId.trim().length < 4) e.orderId = 'Please enter your order ID.'
  if (!f.product)                                 e.product = 'Please pick the product to return.'
  if (!f.qty || Number(f.qty) < 1)                e.qty     = 'Quantity must be at least 1.'
  if (!f.type)                                    e.type    = 'Please choose a request type.'
  if (!f.reason)                                  e.reason  = 'Please pick a reason.'
  if (!f.desc || f.desc.trim().length < 10)       e.desc    = 'Please describe the issue (min 10 characters).'
  if (!f.consent)                                  e.consent = 'Please confirm and accept the Refund Policy.'
  return e
}

export default function ReturnRequestForm() {
  const { show } = useToast()
  const { isAuthed } = useUser()
  const [params] = useSearchParams()
  const formRef = useRef(null)

  // When arriving from OrderDetail "Return / Replace" with ?order=<id>,
  // look up the order so we can prefill the form. Only honoured for
  // signed-in users â€” guests always start with an empty form.
  const orderParam = params.get('order') || params.get('id')
  const linkedOrder = useMemo(
    () => (isAuthed && orderParam ? getOrder(orderParam) : null),
    [isAuthed, orderParam],
  )

  // Build the product dropdown from the linked order if we have one,
  // otherwise fall back to the generic options.
  const productOptions = useMemo(() => {
    if (!linkedOrder) return PRODUCTS
    return [
      { value: '', label: 'Select an item from this order' },
      ...linkedOrder.items.map((it, i) => ({
        value: `${linkedOrder.id}-item-${i}`,
        label: it.title,
      })),
    ]
  }, [linkedOrder])

  const [form, setForm] = useState(() => {
    if (!linkedOrder) return EMPTY
    return {
      ...EMPTY,
      orderId: linkedOrder.id,
      product: `${linkedOrder.id}-item-0`,
      // Default to "refund" for cancelled orders, leave blank otherwise so
      // the user has to pick.
      type:    linkedOrder.status === 'cancelled' ? 'refund' : '',
    }
  })
  const [errors, setErrors] = useState({})
  const [busy, setBusy]     = useState(false)

  // One-shot toast so the user knows the prefill happened.
  const announcedRef = useRef(false)
  useEffect(() => {
    if (announcedRef.current || !linkedOrder) return
    announcedRef.current = true
    show(`Starting a return for order #${linkedOrder.id}.`, 'info', 4000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkedOrder])

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
      show(`You can attach up to ${MAX_FILES} files.`, 'error')
      e.target.value = ''
      return
    }
    const tooBig = files.find((f) => f.size > MAX_SIZE_MB * 1024 * 1024)
    if (tooBig) {
      show(`"${tooBig.name}" exceeds the ${MAX_SIZE_MB} MB limit.`, 'error')
      e.target.value = ''
      return
    }
    setForm((f) => ({ ...f, files }))
  }

  function submit(ev) {
    ev.preventDefault()
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length) {
      show('Please check the form â€” some fields need your attention.', 'error', 5000)
      requestAnimationFrame(() => {
        formRef.current?.querySelector(
          '.form-group.is-invalid input, .form-group.is-invalid select, .form-group.is-invalid textarea',
        )?.focus()
      })
      return
    }
    setBusy(true)
    setTimeout(() => {
      const refId = 'RR-' + Math.floor(100000 + Math.random() * 900000)
      setForm(EMPTY)
      setErrors({})
      setBusy(false)
      show(`Return request submitted! Reference: ${refId}. Pickup within 48 hours.`, 'success', 5500)
    }, 1200)
  }

  return (
    <div aria-label="ReturnRequestForm" className="card-base form-card">
      <h3 className="form-card-title">Return Request</h3>

      <form ref={formRef} id="returnForm" noValidate onSubmit={submit}>
        <InputControl
          label="Order ID" placeholder="SVC-2026-04812"
          value={form.orderId} onChange={set('orderId')}
          required error={errors.orderId}
        />

        <InputControl
          as="select" label="Product"
          value={form.product} onChange={set('product')}
          options={productOptions}
          required error={errors.product}
        />

        <div className="form-row">
          <InputControl
            label="Quantity" type="number" min={1}
            value={form.qty} onChange={set('qty')}
            required error={errors.qty}
          />
          <InputControl
            as="select" label="Request Type"
            value={form.type} onChange={set('type')}
            options={REQUEST_TYPES}
            required error={errors.type}
          />
        </div>

        <InputControl
          as="select" label="Reason"
          value={form.reason} onChange={set('reason')}
          options={REASONS}
          required error={errors.reason}
        />

        <InputControl
          as="textarea" label="Describe the issue" rows={4}
          placeholder="Add as much detail as you can â€” helps us resolve faster"
          value={form.desc} onChange={set('desc')}
          required error={errors.desc}
        />

        <div className="form-group">
          <label className="rajdhani-lbl-text-sm">
            Upload photos / video (optional, max {MAX_FILES} files, {MAX_SIZE_MB} MB)
          </label>
          <input type="file" multiple accept="image/*,video/*" onChange={onFiles} />
          {form.files.length > 0 && (
            <div className="form-hint">
              {form.files.length} file{form.files.length === 1 ? '' : 's'} attached
            </div>
          )}
        </div>

        <InputControl
          as="select" label="Pickup Address"
          value={form.pickup} onChange={set('pickup')}
          options={PICKUP_OPTIONS}
        />

        <div className={'form-group form-check-group rajdhani-lbl-text-sm' + (errors.consent ? ' is-invalid' : '')}>
          <input
            type="checkbox"
            id="rrConsent"
            checked={form.consent}
            onChange={(e) => set('consent')(e.target.checked)}
          />
          <label className="rajdhani-lbl-text-sm" htmlFor="rrConsent">
            I confirm the item is unused, in original packaging (if applicable),
            and that I have read the{' '}
            <Link to={PATHS.refundPolicy} className="accent">Refund Policy</Link>.
          </label>
          {errors.consent && (
            <div className="invalid-feedback">{errors.consent}</div>
          )}
        </div>

        <button
          type="submit"
          className="btn-csr primary full-w rr-submit"
          disabled={busy}
        >
          {busy ? (
            <span className="btn-spinner">
              <i className="bi bi-arrow-repeat spin-icon"></i> Submitting...
            </span>
          ) : (
            <span className="btn-text">
              <i className="bi bi-send-fill"></i> Submit Return Request
            </span>
          )}
        </button>
      </form>
    </div>
  )
}
