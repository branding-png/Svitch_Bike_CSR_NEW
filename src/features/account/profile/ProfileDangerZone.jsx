import { useToast } from '@/contexts/ToastContext'

export default function ProfileDangerZone() {
  const { show } = useToast()

  function confirmDelete() {
    if (window.confirm('Delete your Svitch account permanently? This cannot be undone.')) {
      show('Account deletion requested. Check your inbox to confirm.', 'error', 5000)
    }
  }

  return (
    <div aria-label="ProfileDangerZone" role="region" className="card-base danger-zone">
      <h4><i className="bi bi-exclamation-triangle-fill"></i> Danger Zone</h4>
      <p>
        Permanently delete your Svitch account and all associated data (orders, addresses, wishlists).
        This action cannot be undone.
      </p>
      <button type="button" className="btn-csr" onClick={confirmDelete}>
        <i className="bi bi-trash3"></i> Delete My Account
      </button>
    </div>
  )
}
