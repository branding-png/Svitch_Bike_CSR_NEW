import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import InputControl from '@/ui/InputControl'
import { PATHS } from '@/utils/routes'
import { useToast } from '@/contexts/ToastContext'
import { useUser } from '@/contexts/UserContext'

// Lookup form on the Track Order page. Prefills order id + email from the
// URL (when arriving via the "Track" button on the order-detail page) or
// from the logged-in user's profile. Auto-submits when both fields are
// populated by the URL so the result appears without an extra click.
export default function TrackOrderForm({ onLookup }) {
  const { show } = useToast()
  const { user } = useUser()
  const [params] = useSearchParams()

  const urlOrder = params.get('id') || params.get('order') || ''
  const urlEmail = params.get('email') || ''

  const [form, setForm] = useState({
    order: urlOrder,
    email: urlEmail || user?.email || '',
  })
  const [errors, setErrors] = useState({})

  function validateFields(f) {
    const e = {}
    if (!f.order || f.order.trim().length < 4) e.order = 'Please enter your order number.'
    if (!/^\S+@\S+\.\S+$/.test(f.email))       e.email = 'Please enter a valid email address.'
    return e
  }

  const set = (key) => (v) => {
    setForm((f) => {
      const next  = { ...f, [key]: v }
      const fresh = validateFields(next)
      setErrors((errs) => ({ ...errs, [key]: fresh[key] }))
      return next
    })
  }

  function submit(ev) {
    ev?.preventDefault?.()
    const errs = validateFields(form)
    setErrors(errs)
    if (Object.keys(errs).length) {
      show('Please complete the form before tracking.', 'error')
      return
    }
    onLookup?.(form.order.trim(), form.email.trim())
  }

  // Auto-lookup when both fields are populated by the URL — fires exactly once.
  const autoFiredRef = useRef(false)
  useEffect(() => {
    if (autoFiredRef.current) return
    if (urlOrder && (urlEmail || user?.email)) {
      autoFiredRef.current = true
      const o = urlOrder.trim()
      const e = (urlEmail || user?.email || '').trim()
      if (o.length >= 4 && /^\S+@\S+\.\S+$/.test(e)) onLookup?.(o, e)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlOrder, urlEmail, user?.email])

  return (
    <div aria-label="TrackOrderForm" role="region" className="card-base track-form-card">
      <h3>Track Order</h3>
      <form id="trackForm" noValidate onSubmit={submit}>
        <InputControl
          label="Order Number" placeholder="SVT-847291"
          value={form.order} onChange={set('order')}
          required error={errors.order}
        />
        <InputControl
          label="Email Address" type="email" placeholder="rider@svitch.bike"
          value={form.email} onChange={set('email')}
          required error={errors.email}
        />

        <button type="submit" className="btn-csr primary full-w">
          <i className="bi bi-search"></i> Track Order
        </button>
      </form>

      <p className="track-form-signin">
        Have a Svitch account?{' '}
        <Link to={PATHS.login} className="rajdhani-lbl-text-sm">Sign in</Link>{' '}
        to see all orders in your dashboard.
      </p>
    </div>
  )
}
