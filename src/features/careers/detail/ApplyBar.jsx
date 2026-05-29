// Sticky apply bar — mirrors CSR_New_web `.apply-bar`.
export default function ApplyBar({
  job = {
    id:         'senior-electrical-engineer',
    title:      'Senior Electrical Engineer',
    department: 'Engineering',
    location:   'Ahmedabad, Gujarat',
    type:       'Full Time',
    experience: '3-6 Years',
    deadline:   'Apr 25, 2026',
  },
  applyHref = '#job-apply',
}) {
  return (
    <div aria-label="ApplyBar"
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
        <a href={applyHref} className="rajdhani-lbl-text-sm btn-csr primary sm">
          <i className="bi bi-send-fill"></i> Apply Now
        </a>
      </div>
    </div>
  )
}
