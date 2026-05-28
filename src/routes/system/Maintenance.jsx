import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'
import { PHONES, phoneHref } from '@/data/contact-info'
import '@/styles/pages/maintenance.css'

// Mirrors CSR_New_web `maintenance.html` — fully self-centered card.
// No <section>/.container wrappers (they fight `.mt-wrap`'s flex centring).
export default function Maintenance() {
  return (
    <div id="mt-main">
      <div className="mt-wrap">
        <Link to={PATHS.home} className="mt-logo">
          <img src="/images/logos/Svitch-LOGO-white.png" alt="Svitch" height="36" />
        </Link>

        <div className="mt-icon mt-spin">
          <i className="bi bi-gear-fill"></i>
        </div>

        <span className="section-label">Scheduled Maintenance</span>
        <h1 className="section-title">
          We&apos;ll be back <span className="highlight">shortly</span>
        </h1>
        <p className="mt-lead">
          We&apos;re rolling out improvements to make Svitch faster and more
          reliable. Hang tight — service resumes in a few minutes.
        </p>

        <div className="mt-meta">
          <div><strong>Started</strong>2026-05-13 · 03:00 IST</div>
          <div><strong>Expected end</strong>2026-05-13 · 04:30 IST</div>
          <div><strong>Affected</strong>Checkout &amp; Account</div>
        </div>

        <p className="mt-footer">
          Status updates:{' '}
          <a
            className="accent"
            target="_blank"
            rel="noreferrer"
            href="https://twitter.com/csr762.official"
          >
            @csr762.official
          </a>{' '}
          · Emergency calls:{' '}
          <a className="accent" href={phoneHref('headOffice')}>
            {PHONES.headOffice.phone}
          </a>
        </p>
      </div>
    </div>
  )
}
