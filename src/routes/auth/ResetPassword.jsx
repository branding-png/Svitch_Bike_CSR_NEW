import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ResetForm    from '@/features/auth/reset-password/ResetForm'
import ResetSuccess from '@/features/auth/reset-password/ResetSuccess'
import ResetInvalid from '@/features/auth/reset-password/ResetInvalid'
import '@/styles/sections/auth.css'
import '@/styles/pages/verify-email.css'

// status values: 'form' (default, valid token), 'success' (after reset), 'invalid' (bad/expired token)
export default function ResetPassword() {
  const [params] = useSearchParams()
  // Reset link arrives as /auth/reset-password?token=<resetToken>. Bad links
  // can also force the invalid state via ?status=invalid.
  const tokenParam = params.get('token') || ''
  const initial = params.get('status') === 'invalid' || !tokenParam ? 'invalid' : 'form'
  const name = (typeof localStorage !== 'undefined' && localStorage.getItem('svitchUser')) || 'rider'

  const [state, setState] = useState(initial)

  return (
    <div className="wrapper-body verify-email-page">
      <section id="auth-main">
        <div className="container">
          {state === 'form' && (
            <ResetForm
              name={name}
              resetToken={tokenParam}
              onReset={() => setState('success')}
            />
          )}
          {state === 'success' && <ResetSuccess />}
          {state === 'invalid' && <ResetInvalid />}
        </div>
      </section>
    </div>
  )
}
