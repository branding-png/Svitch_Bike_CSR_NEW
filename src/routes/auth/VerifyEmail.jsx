import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import EmailVerifying from '@/features/auth/verify-email/EmailVerifying'
import EmailSuccess   from '@/features/auth/verify-email/EmailSuccess'
import EmailInvalid   from '@/features/auth/verify-email/EmailInvalid'
import EmailPending   from '@/features/auth/verify-email/EmailPending'
import { verifyEmail } from '@/services/auth'
import '@/styles/sections/auth.css'
import '@/styles/pages/verify-email.css'

// Initial state from URL params:
//   1. explicit ?status= override (pending | invalid | success | verifying)
//   2. ?token=… present → 'verifying'  (we'll hit the API and flip to success/invalid)
//   3. nothing → 'invalid'
function resolveInitial(params) {
  const status = params.get('status')
  if (status) return status
  if (params.get('token')) return 'verifying'
  return 'invalid'
}

export default function VerifyEmail() {
  const [params] = useSearchParams()
  const email    = params.get('email') || ''
  const token    = params.get('token') || ''
  const name     = (typeof localStorage !== 'undefined' && localStorage.getItem('svitchUser')) || 'Rider'

  const [state, setState] = useState(() => resolveInitial(params))
  const calledRef = useRef(false)

  useEffect(() => {
    if (state !== 'verifying' || calledRef.current) return
    calledRef.current = true
    let cancelled = false
    ;(async () => {
      const res = await verifyEmail(token)
      if (cancelled) return
      setState(res.ok ? 'success' : 'invalid')
    })()
    return () => { cancelled = true }
  }, [state, token])

  return (
    <div className="wrapper-body verify-email-page">
      <section id="auth-main">
        <div className="container">
          {state === 'verifying' && <EmailVerifying />}
          {state === 'success'   && <EmailSuccess name={name} />}
          {state === 'invalid'   && <EmailInvalid />}
          {state === 'pending'   && <EmailPending email={email || 'your@email.com'} />}
        </div>
      </section>
    </div>
  )
}
