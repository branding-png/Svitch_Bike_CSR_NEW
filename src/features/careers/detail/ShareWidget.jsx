import { useToast } from '@/contexts/ToastContext'

// Sidebar "Share This Job" widget â€” mirrors CSR_New_web `.share-grid`.
// WhatsApp / LinkedIn / Twitter open in new tabs with the current URL prefilled;
// "Copy Link" writes the URL to the clipboard and fires a toast.
export default function ShareWidget({
  title = 'Share This Job',
  shareTitle = 'Career opening at Svitch Motocorp',
}) {
  const { show } = useToast()

  function getUrl() {
    return typeof window !== 'undefined' ? window.location.href : ''
  }

  function open(href) {
    return (e) => {
      e.preventDefault()
      window.open(href, '_blank', 'noopener')
    }
  }

  async function copyLink(e) {
    e.preventDefault()
    try {
      await navigator.clipboard.writeText(getUrl())
      show('Link copied to clipboard', 'success', 2500)
    } catch {
      show('Could not copy link â€” please copy it manually.', 'error', 3000)
    }
  }

  const url = getUrl()
  const encoded = encodeURIComponent(url)
  const text = encodeURIComponent(shareTitle)

  return (
    <div aria-label="ShareWidget" className="card-base snapshot-widget">
      <h4>{title}</h4>
      <div className="share-grid">
        <a
          className="rajdhani-lbl-text-sm"
          href={`https://wa.me/?text=${text}%20${encoded}`}
          onClick={open(`https://wa.me/?text=${text}%20${encoded}`)}
        >
          <i className="bi bi-whatsapp"></i> WhatsApp
        </a>
        <a
          className="rajdhani-lbl-text-sm"
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
          onClick={open(`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`)}
        >
          <i className="bi bi-linkedin"></i> LinkedIn
        </a>
        <a
          className="rajdhani-lbl-text-sm"
          href={`https://twitter.com/intent/tweet?text=${text}&url=${encoded}`}
          onClick={open(`https://twitter.com/intent/tweet?text=${text}&url=${encoded}`)}
        >
          <i className="bi bi-twitter-x"></i> Twitter
        </a>
        <a
          className="rajdhani-lbl-text-sm"
          href="#"
          id="copyJobLink"
          onClick={copyLink}
        >
          <i className="bi bi-link-45deg"></i> Copy Link
        </a>
      </div>
    </div>
  )
}
