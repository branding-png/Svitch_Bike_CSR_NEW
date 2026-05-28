import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'

// "Who's covered?" eligibility card — mirrors CSR_New_web `.eligibility-card`.
export default function RsaEligibility() {
  return (
    <section className="section-pad">
      <div className="container">
        <div className="card-base rsa-eligibility">
          <h3>Who&apos;s covered?</h3>
          <ul>
            <li>
              All CSR 762 owners with bike registered within last{' '}
              <strong>12 months</strong> — included free.
            </li>
            <li>
              Owners beyond Year 1 can renew at{' '}
              <strong>₹1,499 per year</strong> or bundle with{' '}
              <Link to={PATHS.insurance}>EV Shield Plus</Link>.
            </li>
            <li>
              Service area: anywhere in mainland India. North-East and remote
              regions have 90-min ETA.
            </li>
            <li>
              Up to <strong>4 service requests per year</strong> — additional
              requests at standard rates.
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
