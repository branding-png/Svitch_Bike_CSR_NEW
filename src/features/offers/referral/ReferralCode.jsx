import { useState } from 'react'
import SectionHeader from '@/ui/SectionHeader'
import { useToast } from '@/contexts/ToastContext'

// "Your Code" section — mirrors CSR_New_web `#ref-code`.
// Copy-to-clipboard for the code itself + 3 share channels (WhatsApp / Email /
// Copy link). All use `navigator.clipboard` where appropriate and fall back to
// a friendly error toast if the browser blocks the API.
const SHARE_TEXT = (code) =>
  `I'm loving my Svitch CSR 762 — use my code ${code} to get ₹2,000 off your booking!`

const SHARE_URL = (code) =>
  typeof window !== 'undefined'
    ? `${window.location.origin}/?ref=${code}`
    : `https://svitch.bike/?ref=${code}`

export default function ReferralCode({ code = 'SVITCH-RIDER-7X42' }) {
  const { show } = useToast()
  const [copied, setCopied] = useState(false)

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      return false
    }
  }

  async function copyCode() {
    const ok = await copyToClipboard(code)
    if (ok) {
      setCopied(true)
      show('Code copied to clipboard', 'success', 2500)
      setTimeout(() => setCopied(false), 2000)
    } else {
      show('Copy failed — long-press to select the code', 'error', 3000)
    }
  }

  function openShare(channel) {
    return async (e) => {
      e.preventDefault()
      const text = SHARE_TEXT(code)
      const url  = SHARE_URL(code)
      if (channel === 'whatsapp') {
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank', 'noopener')
      } else if (channel === 'email') {
        window.location.href = `mailto:?subject=${encodeURIComponent('Get ₹2,000 off the Svitch CSR 762')}&body=${encodeURIComponent(text + '\n\n' + url)}`
      } else if (channel === 'copy') {
        const ok = await copyToClipboard(url)
        show(ok ? 'Referral link copied' : 'Copy failed — please copy manually', ok ? 'success' : 'error', 2500)
      }
    }
  }

  return (
    <section id="ref-code">
      <div className="container">
        <SectionHeader
          label="Your Code"
          titleStart="Copy, Share,"
          titleAccent="Earn"
          description="Send this unique code to your friends — they get ₹2,000 off, you get ₹3,000 credit once their purchase is confirmed."
        />

        <div className="card-base code-card">
          <span className="code-label rajdhani-lbl-text-sm">Your referral code</span>

          <div className="code-row">
            <div className="code-text">{code}</div>
            <button
              type="button"
              className="code-copy-btn"
              onClick={copyCode}
            >
              <i className={`bi ${copied ? 'bi-check2' : 'bi-clipboard'}`}></i>{' '}
              {copied ? 'Copied!' : 'Copy code'}
            </button>
          </div>

          <span className="code-msg">
            Share this — they get ₹2,000 off, you get ₹3,000 credit
          </span>

          <div className="share-row">
            <a href="#" className="rajdhani-lbl-text-sm share-btn" onClick={openShare('whatsapp')}>
              <i className="bi bi-whatsapp"></i> WhatsApp
            </a>
            <a href="#" className="rajdhani-lbl-text-sm share-btn" onClick={openShare('email')}>
              <i className="bi bi-envelope-fill"></i> Email
            </a>
            <a href="#" className="rajdhani-lbl-text-sm share-btn" onClick={openShare('copy')}>
              <i className="bi bi-share-fill"></i> Share link
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
