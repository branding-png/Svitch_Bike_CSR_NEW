import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'

// Bottom CTA strip on the Compare page — mirrors CSR_New_web `.cmp-cta`.
export default function CompareCta() {
  return (
    <div aria-label="CompareCta" role="region" className="cmp-cta">
      <span className="cmp-cta-eyebrow">Total Savings Calculator</span>
      <h2>
        Switch &amp; save up to <span className="accent">₹2,10,000</span>
        <br />
        over 5 years
      </h2>
      <p>
        That&apos;s the difference between owning a petrol 110cc bike and the CSR 762
        over 5 years of city riding (~15,000 km/year). See your exact numbers
        with our EMI &amp; savings calculators.
      </p>

      <div className="cmp-cta-actions">
        <Link to={PATHS.finance} className="btn-csr secondary">
          <i className="bi bi-calculator"></i> EMI Calculator
        </Link>
        <Link to={PATHS.saversScale} className="btn-csr secondary">
          See Saver&apos;s Scale <i className="bi bi-arrow-right"></i>
        </Link>
        <Link to={PATHS.bookTestRide} className="btn-csr primary">
          <i className="bi bi-bicycle"></i> Book Test Ride
        </Link>
      </div>
    </div>
  )
}
