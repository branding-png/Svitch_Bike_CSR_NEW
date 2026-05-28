import { useToast } from '@/contexts/ToastContext'
import { useUser } from '@/contexts/UserContext'

export default function ServiceReportDownload() {
  const { show } = useToast()
  const { user } = useUser()

  function download() {
    const target = user?.email || 'your inbox'
    show(`Service report PDF will be emailed to ${target}.`, 'success', 3500)
  }

  return (
    <div style={{ textAlign: 'center', marginTop: 24 }}>
      <button type="button" className="btn-csr secondary sm" onClick={download}>
        <i className="bi bi-download"></i> Download Full Service Report (PDF)
      </button>
    </div>
  )
}
