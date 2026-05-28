import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'

export default function SavedJobEmpty() {
  return (
    <div className="card-base account-empty">
      <i className="bi bi-bookmark-x"></i>
      <h3>No Saved Jobs</h3>
      <p>Save career openings you&apos;re interested in &mdash; we&apos;ll keep them here until you apply.</p>
      <Link to={PATHS.career} className="rajdhani-lbl-text-sm btn-csr primary">
        <i className="bi bi-briefcase"></i> Browse Openings
      </Link>
    </div>
  )
}
