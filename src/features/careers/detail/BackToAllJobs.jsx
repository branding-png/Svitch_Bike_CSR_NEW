import { Link } from 'react-router-dom'

// Sidebar "View All Openings" link — mirrors CSR_New_web inline card at the
// bottom of the career-detail sidebar. Single-purpose, but kept here so the
// sidebar is composed of consistently named feature components.
export default function BackToAllJobs({
  label = 'View All Openings',
  to    = '/careers',
}) {
  return (
    <div aria-label="BackToAllJobs" className="card-base" style={{ padding: 18, textAlign: 'center' }}>
      <Link to={to} className="rajdhani-lbl-text-sm btn-csr secondary sm full-w">
        <i className="bi bi-arrow-left"></i> {label}
      </Link>
    </div>
  )
}
