import { Link } from 'react-router-dom'
import { useState } from 'react'
import { PATHS } from '@/utils/routes'
import { useToast } from '@/contexts/ToastContext'

const REF_CODE = 'SVITCH-RIDER-7X42'
const SHARE_MSG = 'Get %E2%82%B92%2C000%20off%20your%20Svitch%20CSR%20762%20with%20my%20code%20'
const EMAIL_SUBJ = 'Get %E2%82%B92%2C000 off your Svitch CSR 762'

export default function ReferralPromo({ code = REF_CODE }) {
  const { show } = useToast()
  const [copied, setCopied] = useState(false)

  function copy() {
    const ok = () => {
      setCopied(true)
      show('Referral code copied to clipboard.', 'success', 3000)
      setTimeout(() => setCopied(false), 2000)
    }
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(code).then(ok)
    } else {
      show('Copy not supported in this browser.', 'error', 3000)
    }
  }

  const waHref    = `https://wa.me/?text=${SHARE_MSG}${code}`
  const emailHref = `mailto:?subject=${EMAIL_SUBJ}&body=Use%20my%20referral%20code%20${code}%20for%20%E2%82%B92%2C000%20off%20your%20CSR%20762.`

  return (
    <div aria-label="ReferralPromo" role="region" className="account-section">
      <div className="card-base referral-promo">
        <div className="referral-promo-head">
          <span className="referral-promo-label"><i className="bi bi-gift-fill"></i> Refer &amp; Earn</span>
          <h3 className="referral-promo-title">
            Share Svitch. Earn <span className="accent">&#8377;3,000</span> per friend.
          </h3>
          <p className="referral-promo-desc">
            Send your code &mdash; they get &#8377;2,000 off, you get &#8377;3,000 in Svitch
            credits when their CSR 762 is delivered.
          </p>
        </div>

        <div className="referral-promo-code">
          <span className="referral-promo-code-label rajdhani-lbl-text-sm">Your referral code</span>
          <div className="referral-promo-code-row">
            <code>{code}</code>
            <button type="button" className="btn-csr secondary sm" onClick={copy}>
              <i className={`bi ${copied ? 'bi-clipboard-check' : 'bi-clipboard'}`}></i>
              {copied ? ' Copied' : ' Copy'}
            </button>
          </div>
        </div>

        <div className="referral-promo-stats">
          <div className="referral-promo-stat">
            <span className="referral-promo-stat-num">2</span>
            <span className="referral-promo-stat-lbl">Friends referred</span>
          </div>
          <div className="referral-promo-stat">
            <span className="referral-promo-stat-num">&#8377;6,000</span>
            <span className="referral-promo-stat-lbl">Credits earned</span>
          </div>
          <div className="referral-promo-stat">
            <span className="referral-promo-stat-num">Starter</span>
            <span className="referral-promo-stat-lbl">Current tier</span>
          </div>
        </div>

        <div className="referral-promo-actions">
          <a href={waHref} target="_blank" rel="noopener" className="rajdhani-lbl-text-sm btn-csr secondary sm">
            <i className="bi bi-whatsapp"></i> WhatsApp
          </a>
          <a href={emailHref} className="rajdhani-lbl-text-sm btn-csr secondary sm">
            <i className="bi bi-envelope-fill"></i> Email
          </a>
          <Link to={PATHS.referral} className="rajdhani-lbl-text-sm btn-csr primary sm">
            View Rewards <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
      </div>
    </div>
  )
}
