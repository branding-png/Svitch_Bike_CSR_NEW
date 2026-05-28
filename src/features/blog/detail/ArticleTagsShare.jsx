import { useToast } from '@/contexts/ToastContext'

// Article footer — inline tags row + share buttons. Mirrors CSR_New_web
// `.article-tags-share`. Share links open in new tabs with the current URL
// prefilled; "Copy" writes the URL to clipboard and fires a toast.
const DEFAULT_TAGS = [
  'NXE Pro', 'Launch', 'Bafang Motor', 'E-Bike India', '120km Range', 'Fat Tyre',
]

const TAG_STYLE = {
  padding:       '5px 10px',
  background:    'var(--gray-900)',
  border:        '1px solid var(--border)',
  fontFamily:    'var(--font-label)',
  textTransform: 'uppercase',
}

export default function ArticleTagsShare({
  tags       = DEFAULT_TAGS,
  shareTitle = 'Read this on Svitch Motocorp',
}) {
  const { show } = useToast()

  function url() {
    return typeof window !== 'undefined' ? window.location.href : ''
  }

  function open(href) {
    return (e) => { e.preventDefault(); window.open(href, '_blank', 'noopener') }
  }

  async function copyLink(e) {
    e.preventDefault()
    try {
      await navigator.clipboard.writeText(url())
      show('Article link copied to clipboard', 'success', 2500)
    } catch {
      show('Could not copy — please copy the URL manually.', 'error', 3000)
    }
  }

  const u = encodeURIComponent(url())
  const t = encodeURIComponent(shareTitle)

  const shareLinks = [
    { id: 'whatsapp', icon: 'bi-whatsapp',   label: 'Share on WhatsApp', href: `https://wa.me/?text=${t}%20${u}` },
    { id: 'twitter',  icon: 'bi-twitter-x',  label: 'Share on Twitter',  href: `https://twitter.com/intent/tweet?text=${t}&url=${u}` },
    { id: 'linkedin', icon: 'bi-linkedin',   label: 'Share on LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { id: 'facebook', icon: 'bi-facebook',   label: 'Share on Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
  ]

  return (
    <div aria-label="ArticleTagsShare" role="region" className="card-base article-tags-share">
      <div className="tag-list">
        <span className="tag-label rajdhani-lbl-text-sm">Tags:</span>
        {tags.map((tag) => (
          <a key={tag} className="rajdhani-lbl-text-sm" href="#" style={TAG_STYLE}>
            {tag}
          </a>
        ))}
      </div>

      <div className="share-list">
        <span className="share-label rajdhani-lbl-text-sm">Share:</span>
        {shareLinks.map((s) => (
          <a
            key={s.id}
            className="rajdhani-lbl-text-sm"
            href={s.href}
            data-share={s.id}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            onClick={open(s.href)}
          >
            <i className={`bi ${s.icon}`}></i>
          </a>
        ))}
        <a
          className="rajdhani-lbl-text-sm"
          href="#"
          data-share="copy"
          aria-label="Copy link"
          onClick={copyLink}
        >
          <i className="bi bi-link-45deg"></i>
        </a>
      </div>
    </div>
  )
}
