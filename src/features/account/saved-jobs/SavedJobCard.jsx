import { Link } from 'react-router-dom'
import { MetaRow } from '@/ui'
import { PATHS } from '@/utils/routes'

export default function SavedJobCard({ job, onRemove }) {
  const detailPath = PATHS.careerDetail.replace(':slug', job.slug)

  const pills = [
    { icon: 'building',  label: job.dept },
    { icon: 'geo-alt',   label: job.location },
    { icon: 'clock',     label: job.type },
    ...(job.experience ? [{ icon: 'briefcase', label: job.experience }] : []),
  ]

  return (
    <div aria-label="SavedJobCard" role="region" className="card-base saved-job-card">
      <span className="saved-job-icon"><i className="bi bi-briefcase-fill"></i></span>

      <div className="saved-job-info">
        <h4>{job.title}</h4>
        <MetaRow variant="pills" className="saved-job-pills" items={pills} />
        <div className="saved-job-meta rajdhani-lbl-text-sm">
          Saved on {job.savedOn} &middot; Apply by <strong>{job.applyBy}</strong>
        </div>
      </div>

      <div className="saved-job-actions">
        <Link to={detailPath} className="rajdhani-lbl-text-sm btn-csr primary">
          <i className="bi bi-send"></i> Apply Now
        </Link>
        <Link to={detailPath} className="rajdhani-lbl-text-sm btn-csr secondary">
          <i className="bi bi-eye"></i> View Details
        </Link>
        <button type="button" className="btn-csr secondary remove-job" onClick={() => onRemove?.(job)}>
          <i className="bi bi-trash3"></i> Remove
        </button>
      </div>
    </div>
  )
}
