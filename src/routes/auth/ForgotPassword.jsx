import { useState } from 'react'
import ForgetEmail       from '@/features/auth/forgot-password/ForgetEmail'
import ForgetOTP         from '@/features/auth/forgot-password/ForgetOTP'
import ForgetNewPassword from '@/features/auth/forgot-password/ForgetNewPassword'
import ForgetSuccess     from '@/features/auth/forgot-password/ForgetSuccess'
import '@/styles/sections/auth.css'
import '@/styles/pages/verify-email.css'

// 4-step orchestrator. Each step calls into `services/auth.js` and threads
// the resulting tokens (otpToken → resetToken) down to the next child.
export default function ForgotPassword() {
  const [step, setStep]       = useState(1)
  const [email, setEmail]     = useState('demo@svitch.bike')
  const [otpToken, setOtpTok] = useState(null)
  const [resetTok, setResetTok] = useState(null)

  return (
    <div className="wrapper-body verify-email-page">
      <section id="auth-main">
        <div className="container">
          {step === 1 && (
            <ForgetEmail
              email={email}
              setEmail={setEmail}
              onSubmit={(token) => { setOtpTok(token); setStep(2) }}
            />
          )}
          {step === 2 && (
            <ForgetOTP
              email={email}
              otpToken={otpToken}
              onChangeEmail={() => setStep(1)}
              onVerified={(token) => { setResetTok(token); setStep(3) }}
            />
          )}
          {step === 3 && (
            <ForgetNewPassword resetToken={resetTok} onReset={() => setStep(4)} />
          )}
          {step === 4 && <ForgetSuccess />}
        </div>
      </section>
    </div>
  )
}
