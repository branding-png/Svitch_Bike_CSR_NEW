import TwoFactorCard from '@/features/auth/two-factor/TwoFactorCard'
import '@/styles/sections/auth.css'
import '@/styles/pages/verify-email.css'
import '@/styles/pages/two-factor.css'

export default function TwoFactor() {
  return (
    <div className="wrapper-body verify-email-page">
      <section id="auth-main">
        <div className="container">
          <TwoFactorCard />
        </div>
      </section>
    </div>
  )
}
