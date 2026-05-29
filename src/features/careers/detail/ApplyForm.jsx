import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import InputControl from '@/ui/InputControl'
import { useToast } from '@/contexts/ToastContext'

// "Apply for This Role" â€” mirrors CSR_New_web `#job-apply`.
// Mirrors the same validation/toast/spinner pattern used by ContactMain &
// TestRideBooking. Invalid fields get .form-group.is-invalid (red border).
const EXPERIENCE = ['0â€“1 Years', '1â€“3 Years', '3â€“5 Years', '5â€“8 Years', '8+ Years']
const NOTICE     = ['Immediate', '15 Days', '30 Days', '60 Days', '90 Days']
const SOURCES    = ['LinkedIn', 'Naukri', 'Svitch Website', 'Referral', 'Other']

const ACCEPT = '.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
const MAX_RESUME_MB = 5

const EMPTY = {
  first: '', last: '', email: '', mobile: '',
  city: '', exp: '',
  ctc: '', ectc: '',
  notice: '', link: '',
  resume: null, cover: '',
  source: '',
  privacy: false, consent: false,
}

export default function ApplyForm({ jobTitle = 'Senior Electrical Engineer' }) {
  const { show } = useToast()
  const formRef = useRef(null)
  const resumeInputRef = useRef(null)

  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)
  const [success, setSuccess] = useState(null) // null | applicationId

  // Live per-field validation â†’ green/red InputControl border as the user types.
  const set = (key) => (v) => {
    setForm((f) => {
      const next  = { ...f, [key]: v }
      const fresh = validate(next)
      setErrors((errs) => ({ ...errs, [key]: fresh[key] }))
      return next
    })
  }

  function pickResume(e) {
    const file = e.target.files?.[0] || null
    setErrors((er) => ({ ...er, resume: undefined }))
    if (!file) { setForm((f) => ({ ...f, resume: null })); return }
    if (file.size > MAX_RESUME_MB * 1024 * 1024) {
      setErrors((er) => ({ ...er, resume: `Resume is too large â€” max ${MAX_RESUME_MB} MB.` }))
      e.target.value = ''
      setForm((f) => ({ ...f, resume: null }))
      return
    }
    setForm((f) => ({ ...f, resume: file }))
  }

  function validate(f) {
    const e = {}
    if (f.first.trim().length < 2)            e.first  = 'Please enter your first name (min 2 characters).'
    if (f.last.trim().length < 2)             e.last   = 'Please enter your last name (min 2 characters).'
    if (!/^\S+@\S+\.\S+$/.test(f.email))      e.email  = 'Please enter a valid email address.'
    if (!/^[6-9][0-9]{9}$/.test(f.mobile))    e.mobile = 'Please enter a valid 10-digit Indian mobile number.'
    if (f.city.trim().length < 2)             e.city   = 'Please enter your current city.'
    if (!f.exp)                                e.exp    = 'Please select your years of experience.'
    if (!f.notice)                             e.notice = 'Please select your notice period.'
    if (f.link && !/^https?:\/\/.+/i.test(f.link)) e.link = 'Please enter a valid URL (starting with http or https).'
    if (!f.resume)                             e.resume = 'Please upload your resume (PDF, DOC, or DOCX, up to 5 MB).'
    if (f.cover.trim().length < 30)            e.cover  = 'Please write a brief cover letter (at least 30 characters).'
    if (!f.privacy)                            e.privacy = 'You must agree to the Privacy Policy to apply.'
    if (!f.consent)                            e.consent = 'You must consent to data processing to apply.'
    return e
  }

  function submit(ev) {
    ev.preventDefault()
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length) {
      show('Please check the form â€” some fields need your attention.', 'error', 5000)
      requestAnimationFrame(() => {
        const first = formRef.current?.querySelector('.form-group.is-invalid input, .form-group.is-invalid select, .form-group.is-invalid textarea')
        first?.focus()
      })
      return
    }
    setBusy(true)
    setTimeout(() => {
      const applicationId = String(Math.floor(100000 + Math.random() * 900000))
      setSuccess(applicationId)
      setBusy(false)
      show(`Application submitted! Your ID is APP-${applicationId}.`, 'success', 5000)
    }, 1200)
  }

  function reset() {
    setForm(EMPTY)
    setErrors({})
    if (resumeInputRef.current) resumeInputRef.current.value = ''
  }

  return (
    <section id="job-apply" className="card-base job-section">
      <h2><i className="bi bi-send-fill"></i> Apply for This Role</h2>

      {success ? (
        <SuccessState appId={success} jobTitle={jobTitle} />
      ) : (
        <>
          <p style={{ marginBottom: 22 }}>
            Fields marked with <span className="required-star">*</span> are required.
            We'll never share your data â€” see our{' '}
            <Link to="/legal/privacy-policy" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
              Privacy Policy
            </Link>.
          </p>

          <form ref={formRef} noValidate onSubmit={submit}>
            <div className="form-row">
              <InputControl label="First Name" placeholder="Your first name"
                value={form.first} onChange={set('first')} required error={errors.first} />
              <InputControl label="Last Name" placeholder="Your last name"
                value={form.last} onChange={set('last')} required error={errors.last} />
            </div>

            <div className="form-row">
              <InputControl label="Email Address" type="email" placeholder="you@example.com"
                value={form.email} onChange={set('email')} required error={errors.email} />
              <InputControl label="Mobile Number" type="tel" placeholder="10-digit mobile number"
                value={form.mobile} onChange={set('mobile')} required error={errors.mobile}
                maxLength={10} />
            </div>

            <div className="form-row">
              <InputControl label="Current City" placeholder="e.g. Mumbai"
                value={form.city} onChange={set('city')} required error={errors.city} />
              <InputControl as="select" label="Years of Experience" placeholder="Select experience"
                options={EXPERIENCE} value={form.exp} onChange={set('exp')}
                required error={errors.exp} />
            </div>

            <div className="form-row">
              <InputControl label="Current CTC (â‚¹ LPA)" type="number" placeholder="e.g. 10"
                value={form.ctc} onChange={set('ctc')} min={0} step="0.1" />
              <InputControl label="Expected CTC (â‚¹ LPA)" type="number" placeholder="e.g. 14"
                value={form.ectc} onChange={set('ectc')} min={0} step="0.1" />
            </div>

            <div className="form-row">
              <InputControl as="select" label="Notice Period" placeholder="Select notice period"
                options={NOTICE} value={form.notice} onChange={set('notice')}
                required error={errors.notice} />
              <InputControl label="LinkedIn / Portfolio URL" type="url"
                placeholder="https://linkedin.com/in/..."
                value={form.link} onChange={set('link')} error={errors.link} />
            </div>

            {/* Resume upload */}
            <div className={'form-group' + (errors.resume ? ' is-invalid' : '')}>
              <label className="rajdhani-lbl-text-sm" htmlFor="af-resume">
                Resume / CV <span className="required-star">*</span>
              </label>
              <label htmlFor="af-resume" className="rajdhani-lbl-text-sm file-upload-wrap">
                <i className="bi bi-cloud-upload-fill"></i>
                <span className="file-upload-text">
                  {form.resume
                    ? form.resume.name
                    : 'Click to upload PDF, DOC, or DOCX (max 5 MB)'}
                </span>
              </label>
              <input
                ref={resumeInputRef}
                type="file"
                id="af-resume"
                accept={ACCEPT}
                onChange={pickResume}
                hidden
              />
              {errors.resume && (
                <div className="invalid-feedback">{errors.resume}</div>
              )}
            </div>

            <InputControl as="textarea" label="Cover Letter / Why Svitch?" rows={5}
              placeholder="Tell us what makes you a great fit for this role..."
              value={form.cover} onChange={set('cover')} required error={errors.cover} />

            <InputControl as="select" label="How did you find this job?"
              placeholder="Select a source"
              options={SOURCES} value={form.source} onChange={set('source')} />

            {/* Privacy + consent */}
            <div className={'form-group form-check-group rajdhani-lbl-text-sm' + (errors.privacy ? ' is-invalid' : '')}>
              <input
                type="checkbox"
                id="af-privacy"
                checked={form.privacy}
                onChange={(e) => set('privacy')(e.target.checked)}
              />
              <label className="rajdhani-lbl-text-sm" htmlFor="af-privacy">
                I have read and agree to the{' '}
                <Link to="/legal/privacy-policy">Privacy Policy</Link>.{' '}
                <span className="required-star">*</span>
              </label>
              {errors.privacy && <div className="invalid-feedback">{errors.privacy}</div>}
            </div>

            <div className={'form-group form-check-group rajdhani-lbl-text-sm' + (errors.consent ? ' is-invalid' : '')}>
              <input
                type="checkbox"
                id="af-consent"
                checked={form.consent}
                onChange={(e) => set('consent')(e.target.checked)}
              />
              <label className="rajdhani-lbl-text-sm" htmlFor="af-consent">
                I consent to Svitch processing my personal data for recruitment purposes.{' '}
                <span className="required-star">*</span>
              </label>
              {errors.consent && <div className="invalid-feedback">{errors.consent}</div>}
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <button type="button" className="btn-csr secondary" onClick={reset} disabled={busy}>
                <i className="bi bi-arrow-counterclockwise"></i> Clear
              </button>
              <button type="submit" className="btn-csr primary" disabled={busy}
                style={busy ? { opacity: 0.7 } : undefined}>
                <span className="btn-text">
                  {busy ? (
                    <><i className="bi bi-arrow-repeat spin-icon"></i> Submitting...</>
                  ) : (
                    <><i className="bi bi-send-fill"></i> Submit Application</>
                  )}
                </span>
              </button>
            </div>
          </form>
        </>
      )}
    </section>
  )
}

function SuccessState({ appId, jobTitle }) {
  return (
    <div aria-label="ApplyForm"
      className="card-base"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '48px 32px',
        marginTop: 24,
        border: '3px solid var(--accent)',
      }}
    >
      <i className="bi bi-check-circle-fill"
        style={{ fontSize: 54, color: 'var(--accent)', marginBottom: 18 }}></i>
      <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--white)', fontSize: 'var(--fs-4xl)', marginBottom: 10 }}>
        Application Submitted!
      </h3>
      <p style={{ fontSize: 'var(--fs-md)', maxWidth: 520, marginBottom: 12 }}>
        Thank you for applying to Svitch Motocorp. We've received your application
        for <strong>{jobTitle}</strong>.
      </p>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '10px 18px', background: 'var(--gray-900)',
        border: '1px solid var(--border)', fontFamily: 'var(--font-label)',
        textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 18,
      }}>
        Application ID: APP-{appId}
      </div>
      <p style={{ maxWidth: 480, marginBottom: 22 }}>
        Our HR team will review your application and reach out within 3â€“5 business days.
        Save your Application ID for follow-ups.
      </p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/careers" className="btn-csr secondary">
          <i className="bi bi-briefcase-fill"></i> View More Jobs
        </Link>
        <Link to="/" className="btn-csr primary">
          <i className="bi bi-house-fill"></i> Back to Home
        </Link>
      </div>
    </div>
  )
}
