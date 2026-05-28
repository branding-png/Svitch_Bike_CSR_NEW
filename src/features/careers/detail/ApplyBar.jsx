import { useToast } from '@/contexts/ToastContext'
import { useSavedJobs } from '@/contexts/SavedJobsContext'

// Sticky apply bar — mirrors CSR_New_web `.apply-bar`.
// "Save Job" toggles the role in the shared SavedJobs store so it shows up
// instantly under Account → Saved Jobs.
export default function ApplyBar({
  job = {
    id:         'senior-electrical-engineer',
    title:      'Senior Electrical Engineer',
    department: 'Engineering',
    location:   'Ahmedabad, Gujarat',
    type:       'Full Time',
    experience: '3–6 Years',
    deadline:   'Apr 25, 2026',
  },
  applyHref = '#job-apply',
}) {
  const { show } = useToast()
  const { has, toggle } = useSavedJobs()

  // Bridge the local job-shape to what the store expects (slug/deptLabel/exp).
  const slug = job.slug || job.id
  const saved = has(slug)

  function toggleSave() {
    toggle({
      slug,
      title:     job.title,
      deptLabel: job.department || job.deptLabel,
      location:  job.location,
      type:      job.type,
      exp:       job.experience || job.exp,
      applyBy:   job.deadline   || job.applyBy,
    })
    show(
      saved ? 'Removed from saved jobs' : 'Job saved. Check Account → Saved Jobs.',
      saved ? 'info' : 'success',
      2500,
    )
  }

  return (
    <div
      className="card-base apply-bar"
      data-job-id={job.id}
      data-job-title={job.title}
      data-job-department={job.department}
      data-job-location={job.location}
      data-job-type={job.type}
      data-job-experience={job.experience}
      data-job-deadline={job.deadline}
    >
      <div className="apply-bar-info">
        <h5>{job.title}</h5>
        <span>{job.department} · {job.location} · {job.type}</span>
      </div>
      <div className="apply-bar-actions">
        <button
          type="button"
          className={`btn-csr secondary sm js-save-job${saved ? ' is-saved' : ''}`}
          onClick={toggleSave}
          aria-pressed={saved}
        >
          <i className={`bi ${saved ? 'bi-bookmark-check-fill' : 'bi-bookmark'}`}></i>{' '}
          <span className="save-label">{saved ? 'Saved' : 'Save Job'}</span>
        </button>
        <a href={applyHref} className="rajdhani-lbl-text-sm btn-csr primary sm">
          <i className="bi bi-send-fill"></i> Apply Now
        </a>
      </div>
    </div>
  )
}
