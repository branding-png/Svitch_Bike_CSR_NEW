import { useToast } from '@/contexts/ToastContext'
import { useSavedJobs } from '@/contexts/SavedJobsContext'

// Sidebar "Ready to Apply?" widget â€” mirrors CSR_New_web `.apply-cta`.
// "Save Job" toggles the role in the shared SavedJobs store. If `job` is
// not provided the save button still works as a no-op toast so the layout
// doesn't break on pages without a current job.
export default function ApplyCta({
  job,
  title       = 'Ready To Apply?',
  description = "Join 85+ passionate people building India's boldest e-bike brand.",
  applyHref   = '#job-apply',
}) {
  const { show } = useToast()
  const { has, toggle } = useSavedJobs()

  const slug  = job && (job.slug || job.id)
  const saved = slug ? has(slug) : false

  function toggleSave() {
    if (!slug) {
      show('Open this role to save it.', 'info', 2500)
      return
    }
    toggle({
      slug,
      title:     job.title,
      deptLabel: job.deptLabel || job.department,
      location:  job.location,
      type:      job.type,
      exp:       job.exp || job.experience,
      applyBy:   job.applyBy || job.deadline,
    })
    show(
      saved ? 'Removed from saved jobs' : 'Job saved. Check Account â†’ Saved Jobs.',
      saved ? 'info' : 'success',
      2500,
    )
  }

  return (
    <div aria-label="ApplyCta" className="card-base apply-cta">
      <h4>{title}</h4>
      <p>{description}</p>
      <a href={applyHref} className="btn-csr primary sm">
        <i className="bi bi-send-fill"></i> Apply Now
      </a>
      <button
        type="button"
        className={`btn-csr secondary sm js-save-job${saved ? ' is-saved' : ''}`}
        onClick={toggleSave}
        aria-pressed={saved}
      >
        <i className={`bi ${saved ? 'bi-bookmark-check-fill' : 'bi-bookmark'}`}></i>{' '}
        <span className="save-label">{saved ? 'Saved' : 'Save Job'}</span>
      </button>
    </div>
  )
}
