import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PATHS } from '@/utils/routes'
import { useToast } from '@/contexts/ToastContext'
import { useAuthRedirect } from '@/hooks/useAuthRedirect'
import { register } from '@/services/auth'
import RegisterStepTabs from './RegisterStepTabs'
import RegisterStepPersonal from './RegisterStepPersonal'
import RegisterStepSecurity from './RegisterStepSecurity'
import RegisterStepPreferences from './RegisterStepPreferences'

const INITIAL = {
  firstName: '', lastName: '', email: '', mobile: '', dob: '',
  password: '', password2: '',
  city: '', source: 'Social Media', terms: false, marketing: true,
}

function validateStep(step, f) {
  const e = {}
  if (step === 1) {
    if (!f.firstName || f.firstName.trim().length < 2) e.firstName = 'Please enter your first name (min 2 characters).'
    if (!f.lastName  || f.lastName.trim().length  < 2) e.lastName  = 'Please enter your last name (min 2 characters).'
    if (!/^\S+@\S+\.\S+$/.test(f.email))               e.email     = 'Please enter a valid email address.'
    if (!/^[6-9]\d{9}$/.test(f.mobile))                e.mobile    = 'Please enter a valid 10-digit mobile number.'
  }
  if (step === 2) {
    if (!f.password || f.password.length < 8 || !/[A-Za-z]/.test(f.password) || !/\d/.test(f.password))
      e.password = 'Password must be at least 8 characters with letters & numbers.'
    if (f.password2 !== f.password || !f.password2)
      e.password2 = 'Passwords do not match.'
  }
  if (step === 3) {
    if (!f.terms) e.terms = 'You must agree to the terms to continue.'
  }
  return e
}

const DRAFT_KEY = 'svitchRegisterDraft'

// Strip out anything sensitive before persisting. Passwords are NEVER
// written to sessionStorage even though the rest of the form is.
function sanitizeDraft(f) {
  return { ...f, password: '', password2: '' }
}

export default function RegisterForm() {
  useAuthRedirect()
  const navigate = useNavigate()
  const { show }  = useToast()
  const formRef   = useRef(null)

  // Restore in-progress draft on mount so accidental reload / tab-close
  // doesn't kill the user's progress. Passwords are never persisted.
  const initial = (() => {
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        return { form: { ...INITIAL, ...parsed.form }, step: parsed.step || 1 }
      }
    } catch {}
    return { form: INITIAL, step: 1 }
  })()

  const [step, setStep]     = useState(initial.step)
  const [form, setForm]     = useState(initial.form)
  const [errors, setErrors] = useState({})
  const [busy, setBusy]     = useState(false)

  // Persist the draft on every change.
  useEffect(() => {
    try {
      sessionStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({ step, form: sanitizeDraft(form) }),
      )
    } catch {}
  }, [step, form])

  // One-shot toast when a previously-saved draft was restored.
  const announcedRef = useRef(false)
  useEffect(() => {
    if (announcedRef.current) return
    announcedRef.current = true
    if (initial.step > 1 || initial.form.firstName || initial.form.email) {
      show('Welcome back â€” picked up where you left off.', 'info', 4000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Warn the user before they accidentally lose multi-step register progress
  // (page reload, browser back/close). Skip on step 1 where nothing is filled.
  useEffect(() => {
    const hasProgress = step > 1 || form.firstName || form.lastName || form.email || form.mobile
    if (!hasProgress) return
    function beforeUnload(e) {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', beforeUnload)
    return () => window.removeEventListener('beforeunload', beforeUnload)
  }, [step, form.firstName, form.lastName, form.email, form.mobile])

  const set = (key) => (v) => {
    setForm((f) => {
      let val = v
      if (key === 'mobile' && typeof val === 'string') {
        val = val.replace(/\D/g, '')
        if (val.length > 10 && val.startsWith('91')) val = val.slice(2)
        if (val.length === 11 && val.startsWith('0')) val = val.slice(1)
        val = val.slice(0, 10)
      }
      const next  = { ...f, [key]: val }
      const fresh = validateStep(step, next)
      setErrors((errs) => ({ ...errs, [key]: fresh[key] }))
      return next
    })
  }

  function focusInvalid() {
    requestAnimationFrame(() => {
      formRef.current?.querySelector(
        '.form-group.is-invalid input, .form-group.is-invalid select, .form-check-block.is-invalid input',
      )?.focus()
    })
  }

  function goNext() {
    const errs = validateStep(step, form)
    setErrors(errs)
    if (Object.keys(errs).length) {
      show('Please check the form â€” some fields need your attention.', 'error', 4000)
      focusInvalid()
      return
    }
    setStep((s) => Math.min(3, s + 1))
  }

  function goBack() {
    setStep((s) => Math.max(1, s - 1))
  }

  async function submit(ev) {
    ev.preventDefault()
    const errs = validateStep(3, form)
    setErrors(errs)
    if (Object.keys(errs).length) {
      show('Please check the form â€” some fields need your attention.', 'error', 4000)
      focusInvalid()
      return
    }
    setBusy(true)
    const res = await register(form)
    setBusy(false)
    if (!res.ok) {
      // Push field-level errors back into the right step.
      setErrors((prev) => ({ ...prev, ...(res.fieldErrors || {}) }))
      show(res.error || 'Could not create account.', 'error', 4000)
      if (res.fieldErrors?.email) setStep(1)
      return
    }
    try {
      localStorage.setItem('svitchUser', form.firstName || 'Rider')
      sessionStorage.removeItem(DRAFT_KEY)
    } catch {}
    const first = form.firstName || 'Rider'
    show(`Welcome, ${first}! Check your inbox to verify your email.`, 'success', 3500)
    setTimeout(() => {
      const qs = new URLSearchParams({ status: 'pending' })
      if (form.email) qs.set('email', form.email)
      if (res.data?.verifyToken) qs.set('token', res.data.verifyToken)
      navigate(`${PATHS.verifyEmail}?${qs.toString()}`)
    }, 800)
  }

  return (
    <div aria-label="RegisterForm" className="auth-form">
      <img
        src="/images/logos/Svitch-LOGO-white.png"
        alt="Svitch"
        className="auth-logo"
        loading="lazy"
        decoding="async"
      />
      <h2>Create Account</h2>
      <p className="auth-subtitle">
        Already a rider? <Link to={PATHS.login}>Sign in</Link>
      </p>

      <div className="social-login">
        <button
          type="button"
          className="btn-social"
          onClick={() => show('Google sign-in coming soon.', 'info')}
        >
          <i className="bi bi-google"></i> Continue with Google
        </button>
      </div>
      <div className="auth-divider rajdhani-lbl-text-sm">
        <span>Or register manually</span>
      </div>

      <RegisterStepTabs step={step} />

      <form
        ref={formRef}
        id="registerForm"
        className="auth-form-fields"
        noValidate
        onSubmit={submit}
      >
        {step === 1 && (
          <RegisterStepPersonal form={form} errors={errors} set={set} onNext={goNext} />
        )}
        {step === 2 && (
          <RegisterStepSecurity form={form} errors={errors} set={set} onBack={goBack} onNext={goNext} />
        )}
        {step === 3 && (
          <RegisterStepPreferences form={form} errors={errors} set={set} busy={busy} onBack={goBack} />
        )}
      </form>

      <p className="auth-footer-link rajdhani-lbl-text-sm">
        Have an account? <Link to={PATHS.login}>Sign in</Link>
      </p>
    </div>
  )
}
