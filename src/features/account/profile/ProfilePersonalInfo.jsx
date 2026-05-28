import { useState } from 'react'
import InputControl from '@/ui/InputControl'
import { useToast } from '@/contexts/ToastContext'
import { useUser } from '@/contexts/UserContext'

const GENDER_OPTS = ['Male', 'Female', 'Non-binary', 'Prefer not to say']

function buildInitial(user) {
  // Resolve first/last from the user object, falling back to splitting
  // `user.name` for older sessions that don't carry explicit fields.
  const [splitFirst = '', ...splitRest] = (user?.name || '').trim().split(/\s+/)
  return {
    firstName: user?.firstName || splitFirst || '',
    lastName:  user?.lastName  || splitRest.join(' ') || '',
    email:     user?.email     || '',
    mobile:    user?.mobile    || '',
    dob:       user?.dob       || '',
    gender:    user?.gender    || 'Male',
    city:      user?.city      || '',
  }
}

function validate(f) {
  const e = {}
  if (!f.firstName || f.firstName.trim().length < 2) e.firstName = 'Please enter your first name (min 2 characters).'
  if (!f.lastName  || f.lastName.trim().length  < 2) e.lastName  = 'Please enter your last name (min 2 characters).'
  if (!/^\S+@\S+\.\S+$/.test(f.email))               e.email     = 'Please enter a valid email address.'
  if (!/^[6-9]\d{9}$/.test(f.mobile))                e.mobile    = 'Mobile must be a 10-digit number starting with 6–9.'
  return e
}

export default function ProfilePersonalInfo() {
  const { show } = useToast()
  const { user, login } = useUser()
  const [initial] = useState(() => buildInitial(user))
  const [form, setForm]     = useState(initial)
  const [errors, setErrors] = useState({})

  const set = (key) => (v) => {
    setForm((f) => {
      let val = v
      if (key === 'mobile' && typeof val === 'string') val = val.replace(/\D/g, '').slice(0, 10)
      const next  = { ...f, [key]: val }
      const fresh = validate(next)
      setErrors((errs) => ({ ...errs, [key]: fresh[key] }))
      return next
    })
  }

  function save(ev) {
    ev.preventDefault()
    const e = validate(form)
    setErrors(e)
    if (Object.keys(e).length) {
      show('Please fix the highlighted fields.', 'error', 3500)
      return
    }
    // Persist the change to the global user so AccountAside + ProfileHero
    // pick it up immediately.
    login({
      ...user,
      firstName: form.firstName,
      lastName:  form.lastName,
      name:      `${form.firstName} ${form.lastName}`.trim(),
      email:     form.email,
      mobile:    form.mobile,
      dob:       form.dob,
      gender:    form.gender,
      city:      form.city,
    })
    show('Profile updated.', 'success', 3000)
  }

  function reset() {
    setForm(initial)
    setErrors({})
  }

  return (
    <div aria-label="ProfilePersonalInfo" role="region" className="card-base checkout-section">
      <h3><i className="bi bi-person-vcard"></i> Personal Information</h3>
      <form onSubmit={save} noValidate>
        <div className="form-row">
          <InputControl label="First Name" value={form.firstName} onChange={set('firstName')} required minLength={2} error={errors.firstName} />
          <InputControl label="Last Name"  value={form.lastName}  onChange={set('lastName')}  required minLength={2} error={errors.lastName} />
        </div>
        <div className="form-row">
          <InputControl label="Email" type="email" value={form.email}  onChange={set('email')}  required error={errors.email} />
          <InputControl label="Mobile" type="tel"  value={form.mobile} onChange={set('mobile')} required error={errors.mobile} maxLength={10} />
        </div>
        <div className="form-row">
          <InputControl label="Date of Birth" type="date" value={form.dob}    onChange={set('dob')} />
          <InputControl as="select" label="Gender" value={form.gender} onChange={set('gender')} options={GENDER_OPTS} />
        </div>
        <InputControl label="City / Location" value={form.city} onChange={set('city')} />

        <div style={{ marginTop: 8, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button type="submit" className="btn-csr primary"><i className="bi bi-check2-circle"></i> Save Changes</button>
          <button type="button" className="btn-csr secondary" onClick={reset}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
