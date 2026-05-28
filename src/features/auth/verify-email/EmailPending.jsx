import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'
import { useToast } from '@/contexts/ToastContext'
import { useState } from 'react'

export default function EmailPending({ email = 'your@email.com' }) {
  const { show } = useToast()
  const [resent, setResent] = useState(false)

  function resend() {
    if (resent) return
    setResent(true)
    show('Verification email resent — check your inbox.', 'success', 3500)
  }

  return (
    <div className="auth-centered" id="vePending">
      <div className="auth-icon"><i className="bi bi-envelope-check-fill"></i></div>
      <h2>Check your inbox</h2>
      <p>
        We sent a verification link to <strong style={{ color: 'var(--white)' }}>{email}</strong>.
        Click the link in that email to activate your account.
      </p>
      <button
        type="button"
        className="btn-csr primary full-w"
       
        onClick={resend}
        disabled={resent}
      >
        <i className="bi bi-arrow-repeat"></i> {resent ? 'Email Sent' : 'Resend Email'}
      </button>
      <p className="auth-footer-link rajdhani-lbl-text-sm" style={{ marginTop: 12 }}>
        Wrong email? <Link to={PATHS.register}>Register again</Link>
      </p>
    </div>
  )
}
