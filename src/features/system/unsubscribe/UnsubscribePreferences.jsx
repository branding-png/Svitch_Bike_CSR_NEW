import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'

// Email-preferences card — mirrors CSR_New_web `#unsubPrefs`.
// First option is forced-on (transactional). Save + "Unsubscribe from all"
// both call `onComplete()` so the parent can flip to the done state.
const PREFS = [
  {
    name:     'Order & Account Updates',
    desc:     'Order confirmations, shipping, account security.',
    note:     'Required — transactional only.',
    required: true,
  },
  {
    name: 'Product News & Launches',
    desc: 'New variants, OTA features, charging-network expansion.',
  },
  {
    name: 'Offers & Promotions',
    desc: 'Limited-time discounts, festive offers, FAME II subsidy alerts.',
  },
  {
    name: 'Owner Tips & Maintenance',
    desc: 'Care guides, OTA release notes, service reminders.',
  },
  {
    name: 'Refer-a-Friend & Rewards',
    desc: 'Tier upgrades, friend-referral credits, exclusive perks.',
  },
]

export default function UnsubscribePreferences({ email, onComplete }) {
  const [picks, setPicks] = useState(() => PREFS.map((p) => Boolean(p.required)))
  const toggle = (i) => setPicks((arr) => arr.map((v, j) => (j === i ? !v : v)))

  const save = (e) => { e.preventDefault(); onComplete?.() }
  const unsubAll = () => {
    setPicks(PREFS.map((p) => Boolean(p.required)))
    onComplete?.()
  }

  return (
    <>
    <div className="card-base unsub-card">
      <Link to={PATHS.home} className="unsub-logo">
        <img src="/images/logos/Svitch-LOGO-white.png" alt="Svitch Bike" height="34" style={{height:34}} />
      </Link>
      <span className="section-label">Email Preferences</span>
      <h2 className="section-title">
        Manage your <span className="highlight">subscriptions</span>
      </h2>
      <p>
        We&apos;d hate to see you go — but we get it. Choose what to keep,
        or unsubscribe from everything.
      </p>

      <p className="unsub-current">
        Updating preferences for: <strong>{email}</strong>
      </p>

      <form onSubmit={save}>
        <div className="pref-list">
          {PREFS.map((p, i) => (
            <label key={p.name} className="pref-item">
              <input
                type="checkbox"
                checked={picks[i]}
                disabled={p.required}
                onChange={() => toggle(i)}
              />
              <span>
                <span className="pref-name">{p.name}</span>
                <span className="pref-desc">
                  {p.desc}
                  {p.note && <> <em>({p.note})</em></>}
                </span>
              </span>
            </label>
          ))}
        </div>

        <button type="submit" className="btn-csr primary full-w unsub-btn">
          <i className="bi bi-check2-circle"></i> Save Preferences
        </button>
        <button
          type="button"
          className="btn-csr secondary full-w unsub-btn unsub-btn-alt"
          onClick={unsubAll}
        >
          <i className="bi bi-envelope-x"></i> Unsubscribe from All
        </button>
      </form>

      <p className="unsub-note">
        We&apos;ll still send essential emails about your purchases, account
        security, and policy changes — even if you unsubscribe from everything
        else.
      </p>
    </div>

    <Link to={PATHS.home} className="unsub-back rajdhani-lbl-text-sm">
      <i className="bi bi-arrow-left"></i> Back to Home
    </Link>
    </>
  )
}
