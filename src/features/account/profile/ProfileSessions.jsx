import { useState } from 'react'
import ProfileToggleRow from './ProfileToggleRow'
import { useToast } from '@/contexts/ToastContext'

const INITIAL_SESSIONS = [
  { id: 's-1', title: 'Pixel 8 · Chrome · Ahmedabad',    desc: 'Current session · last active just now',   current: true  },
  { id: 's-2', title: 'MacBook · Safari · Pune',         desc: 'Last active 2026-05-10 16:42',             current: false },
  { id: 's-3', title: 'iPad · Svitch App · Bengaluru',   desc: 'Last active 2026-04-29',                   current: false },
]

export default function ProfileSessions() {
  const { show } = useToast()
  const [sessions, setSessions] = useState(INITIAL_SESSIONS)

  function signOut(id) {
    setSessions((s) => s.filter((row) => row.id !== id))
    show('Session signed out.', 'success', 3000)
  }
  function signOutAll() {
    setSessions((s) => s.filter((row) => row.current))
    show('All other sessions signed out.', 'success', 3000)
  }

  return (
    <div className="card-base checkout-section" id="sessions">
      <h3><i className="bi bi-laptop"></i> Connected Sessions</h3>
      <p style={{ marginBottom: 8, color: 'var(--gray-400)', fontSize: 'var(--fs-sm)' }}>
        Devices currently signed in to your account.
      </p>

      {sessions.map((s) => (
        <ProfileToggleRow key={s.id} asLabel={false} title={s.title} desc={s.desc}>
          {s.current ? (
            <span className="rajdhani-lbl-text-sm" style={{ color: '#4ade80' }}>Active</span>
          ) : (
            <button type="button" className="btn-csr secondary sm" onClick={() => signOut(s.id)}>
              Sign Out
            </button>
          )}
        </ProfileToggleRow>
      ))}

      <button type="button" className="btn-csr secondary sm" style={{ marginTop: 16 }} onClick={signOutAll}>
        <i className="bi bi-box-arrow-right"></i> Sign Out All Devices
      </button>
    </div>
  )
}
