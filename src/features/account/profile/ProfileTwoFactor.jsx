import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProfileToggleRow from './ProfileToggleRow'
import { PATHS } from '@/utils/routes'
import { useToast } from '@/contexts/ToastContext'
import { useUser } from '@/contexts/UserContext'
import { maskPhone } from '@/utils/mask'

export default function ProfileTwoFactor() {
  const { show } = useToast()
  const { user } = useUser()
  const [smsOn, setSmsOn] = useState(true)

  return (
    <div aria-label="ProfileTwoFactor" role="region" className="card-base checkout-section" id="security">
      <h3><i className="bi bi-shield-lock-fill"></i> Two-Factor Authentication</h3>
      <p style={{ marginBottom: 8, color: 'var(--gray-400)', fontSize: 'var(--fs-sm)' }}>
        Add an extra layer of security to your account.
      </p>

      <ProfileToggleRow
        title={`SMS to ${maskPhone(user?.mobile)}`}
        desc="Receive a 6-digit code at sign-in"
        checked={smsOn}
        onChange={setSmsOn}
      />

      <ProfileToggleRow asLabel={false} title="Authenticator App" desc="Use Google Authenticator, Authy or 1Password">
        <Link to={PATHS.twoFactor} className="btn-csr secondary sm">Set Up</Link>
      </ProfileToggleRow>

      <ProfileToggleRow
        asLabel={false}
        title="Backup Codes"
        desc="10 single-use codes — last regenerated 2026-03-12"
      >
        <button type="button" className="btn-csr secondary sm" onClick={() => show('New backup codes generated.', 'success', 3000)}>
          Regenerate
        </button>
      </ProfileToggleRow>
    </div>
  )
}
