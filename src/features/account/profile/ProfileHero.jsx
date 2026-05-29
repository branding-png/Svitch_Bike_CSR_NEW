import { useUser } from '@/contexts/UserContext'
import { useToast } from '@/contexts/ToastContext'

export default function ProfileHero({ memberSince = 'March 2026' }) {
  const { user } = useUser()
  const { show } = useToast()

  const name    = user?.name  || 'Rider'
  const email   = user?.email || ''
  const initial = (name.trim()[0] || 'R').toUpperCase()

  function onUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    show(`Avatar uploaded: ${file.name}`, 'success', 3000)
  }

  return (
    <div aria-label="ProfileHero" className="card-base profile-hero">
      <div className="profile-avatar-wrap">
        <div className="account-avatar">{initial}</div>
        <label className="profile-avatar-upload" title="Upload avatar">
          <i className="bi bi-camera-fill" style={{ fontSize: 14 }}></i>
          <input type="file" accept="image/*" hidden onChange={onUpload} />
        </label>
      </div>
      <div className="profile-hero-info">
        <h2>{name}</h2>
        {email && <span>{email}</span>}
        <span>Svitch Member since {memberSince}</span>
      </div>
    </div>
  )
}
