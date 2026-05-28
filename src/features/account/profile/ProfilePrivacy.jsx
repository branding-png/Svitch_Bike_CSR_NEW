import { useState } from 'react'
import ProfileToggleRow from './ProfileToggleRow'
import { useToast } from '@/contexts/ToastContext'

export default function ProfilePrivacy() {
  const { show } = useToast()
  const [prefs, setPrefs] = useState({ telemetry: true, ads: false })

  return (
    <div aria-label="ProfilePrivacy" role="region" className="card-base checkout-section" id="privacy">
      <h3><i className="bi bi-eye-slash"></i> Privacy &amp; Data</h3>
      <p style={{ marginBottom: 8, color: 'var(--gray-400)', fontSize: 'var(--fs-sm)' }}>
        Control what data Svitch stores about you.
      </p>

      <ProfileToggleRow
        title="Ride telemetry"
        desc="Anonymous usage data helps us improve the CSR 762"
        checked={prefs.telemetry}
        onChange={(v) => setPrefs((p) => ({ ...p, telemetry: v }))}
      />
      <ProfileToggleRow
        title="Personalized ads"
        desc="Across partner sites"
        checked={prefs.ads}
        onChange={(v) => setPrefs((p) => ({ ...p, ads: v }))}
      />
      <ProfileToggleRow
        asLabel={false}
        title="Download my data"
        desc="Get a ZIP of everything we have (under DPDP Act 2023)"
      >
        <button type="button" className="btn-csr secondary sm" onClick={() => show('Data export requested. We will email you when ready.', 'success', 3500)}>
          <i className="bi bi-download"></i> Request Export
        </button>
      </ProfileToggleRow>
    </div>
  )
}
