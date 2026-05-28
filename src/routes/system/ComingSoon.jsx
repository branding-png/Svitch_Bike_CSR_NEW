import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'
import { useToast } from '@/contexts/ToastContext'
import '@/styles/pages/coming-soon.css'

// Coming Soon — counts down to launch + email-notify form + social links.
// Demo target = 30 days from page load. Swap for a real launch date later.
const SOCIAL = [
  { icon: 'bi-facebook',  href: 'https://www.facebook.com/csr762.official'  },
  { icon: 'bi-instagram', href: 'https://www.instagram.com/csr762.official/' },
  { icon: 'bi-youtube',   href: 'https://www.youtube.com/@csr762'             },
]

function diff(target) {
  const ms   = Math.max(0, target - Date.now())
  const days = Math.floor(ms / 86400000)
  const h    = Math.floor((ms / 3600000) % 24)
  const m    = Math.floor((ms / 60000) % 60)
  const s    = Math.floor((ms / 1000) % 60)
  return { d: days, h, m, s }
}

const pad = (n) => String(n).padStart(2, '0')

export default function ComingSoon() {
  const target = useMemo(() => Date.now() + 30 * 86400000, [])
  const [t, setT] = useState(() => diff(target))
  const { show } = useToast()
  const [email, setEmail] = useState('')

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  function subscribe(e) {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      show('Please enter a valid email address.', 'error')
      return
    }
    setEmail('')
    show("You're on the list — we'll email you the moment it goes live.", 'success', 4500)
  }

  return (
    <section id="cs-main">
      <div className="container">
        <div className="cs-wrap">
          <div className="cs-logo">
            <Link to={PATHS.home}>
              <img src="/images/logos/Svitch-LOGO-white.png" alt="Svitch" height="44" />
            </Link>
          </div>

          <span className="section-label">Charging up…</span>
          <h1 className="section-title">
            Coming <span className="highlight">Soon</span>
          </h1>
          <p className="cs-lead">
            We&apos;re building something we think you&apos;ll love. Drop your
            email to get an early-access invite.
          </p>

          <div className="cs-countdown">
            <Cell label="Days"    value={pad(t.d)} />
            <Cell label="Hours"   value={pad(t.h)} />
            <Cell label="Minutes" value={pad(t.m)} />
            <Cell label="Seconds" value={pad(t.s)} />
          </div>

          <form className="cs-form" onSubmit={subscribe} noValidate>
            <input
              type="email"
              required
              placeholder="your@email.com"
              aria-label="Email address for launch notification"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="btn-csr primary">
              <i className="bi bi-bell-fill"></i> Notify Me
            </button>
          </form>

          <div className="cs-social">
            {SOCIAL.map((s) => (
              <a key={s.icon} href={s.href} target="_blank" rel="noreferrer" aria-label={s.icon}>
                <i className={`bi ${s.icon}`}></i>
              </a>
            ))}
          </div>

          <p className="cs-back">
            <Link to={PATHS.home} className="accent">
              <i className="bi bi-arrow-left"></i> Back to Home
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

function Cell({ label, value }) {
  return (
    <div className="cs-cell">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  )
}
