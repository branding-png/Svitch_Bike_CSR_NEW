import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SectionHeader from '@/ui/SectionHeader'
import { MetaRow } from '@/ui'
import { JOBS, DEPTS } from '@/data/jobs'
import { useSavedJobs } from '@/contexts/SavedJobsContext'
import { useToast } from '@/contexts/ToastContext'

// Open positions — mirrors CSR_New_web `#career-jobs`.
// Department pills filter the jobs list. Each job links to the detail route
// `/careers/{slug}` which `CareerDetail.jsx` resolves via `getJobBySlug`.
// Bookmark icon toggles the job in the SavedJobs store; saved jobs get a
// "Saved" status pill so the user can spot them in the listing.
export default function JobOpenings({ jobs = JOBS, depts = DEPTS }) {
  const [active, setActive] = useState('all')
  const { has, toggle } = useSavedJobs()
  const { show } = useToast()

  const visible = useMemo(
    () => (active === 'all' ? jobs : jobs.filter((j) => j.dept === active)),
    [jobs, active],
  )

  function handleToggle(job) {
    const saved = has(job.slug)
    toggle(job)
    show(
      saved
        ? `Removed "${job.title}" from saved jobs.`
        : `Saved "${job.title}". Find it under Account → Saved Jobs.`,
      'success',
      3000,
    )
  }

  return (
    <section id="career-jobs">
      <div className="container">
        <SectionHeader
          label="Open Positions"
          titleStart="Join Our"
          titleAccent="Team"
          description="Pick your department, find your role, or tell us what you'd bring to the team."
        />

        <div className="dept-filters">
          {depts.map((d) => (
            <button
              key={d.id}
              type="button"
              className={'filter-pill rajdhani-lbl-text-sm' + (active === d.id ? ' is-active' : '')}
              onClick={() => setActive(d.id)}
            >
              <i className={`bi ${d.icon}`}></i> {d.label}
            </button>
          ))}
        </div>

        <div className="jobs-list">
          {visible.map((j) => {
            const isSaved = has(j.slug)
            return (
              <div key={j.slug} className={`card-base job-card${isSaved ? ' is-saved' : ''}`} data-dept={j.dept}>
                <div className="job-card-main">
                  <div className="job-card-tags">
                    <span className="job-dept-tag">{j.deptLabel}</span>
                    {isSaved && (
                      <span className="job-status-tag" title="In your saved jobs">
                        <i className="bi bi-bookmark-check-fill"></i> Saved Job
                      </span>
                    )}
                  </div>
                  <h3>{j.title}</h3>
                  <MetaRow
                    className="job-meta rajdhani-lbl-text-sm"
                    items={[
                      { icon: 'geo-alt-fill', label: j.location },
                      { icon: 'clock-fill',   label: j.type },
                      { icon: 'award-fill',   label: j.exp },
                    ]}
                  />
                  <p>{j.desc}</p>
                  <div className="job-skills">
                    {j.skills.map((s) => (
                      <span key={s} className="skill-tag rajdhani-lbl-text-sm">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="job-card-actions">
                  <Link to={`/careers/${j.slug}#job-apply`} className="btn-csr primary sm">
                    Apply Now
                  </Link>
                  <Link to={`/careers/${j.slug}`} className="btn-csr secondary sm">
                    More Details
                  </Link>
                  <button
                    type="button"
                    className={`btn-csr secondary sm job-save-toggle${isSaved ? ' is-saved' : ''}`}
                    onClick={() => handleToggle(j)}
                    aria-pressed={isSaved}
                    aria-label={isSaved ? 'Remove from saved jobs' : 'Save job'}
                  >
                    <i className={`bi bi-${isSaved ? 'bookmark-check-fill' : 'bookmark'}`}></i>{' '}
                    {isSaved ? 'Saved' : 'Save'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
