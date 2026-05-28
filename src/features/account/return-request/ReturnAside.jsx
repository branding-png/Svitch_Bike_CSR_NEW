import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'
import { PHONES, phoneHref } from '@/data/contact-info'

// Return Request — right-side aside with "How it works" steps + Need help.
// Mirrors CSR_New_web `.rr-aside`.
const STEPS = [
  'Submit this form within 7 days of delivery',
  'We review and approve (usually within 24 hours)',
  'Free pickup from your registered address',
  'Inspection at our warehouse (2–3 days)',
  'Refund or replacement dispatched',
]

export default function ReturnAside() {
  return (
    <aside className="card-base rr-aside">
      <h5>How it works</h5>
      <ul>
        {STEPS.map((s, i) => (
          <li key={s}>
            <i className={`bi bi-${i + 1}-circle-fill`}></i>{s}
          </li>
        ))}
      </ul>

      <hr className="rr-aside-divider" />

      <h5>Need help?</h5>
      <p className="rr-aside-help">
        Call{' '}
        <a className="accent" href={phoneHref('headOffice')}>
          {PHONES.headOffice.phone}
        </a>{' '}
        or{' '}
        <Link className="accent" to={PATHS.ticket}>raise a ticket</Link>.
      </p>
    </aside>
  )
}
