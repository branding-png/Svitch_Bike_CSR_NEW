import { useEffect } from 'react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import PageHero from '@/layouts/PageHero'
import JobHeader from '@/features/careers/detail/JobHeader'
import ApplyBar from '@/features/careers/detail/ApplyBar'
import JobAbout from '@/features/careers/detail/JobAbout'
import Responsibilities from '@/features/careers/detail/Responsibilities'
import Requirements from '@/features/careers/detail/Requirements'
import KeySkills from '@/features/careers/detail/KeySkills'
import JobBenefits from '@/features/careers/detail/JobBenefits'
import InterviewProcess from '@/features/careers/detail/InterviewProcess'
import ApplyForm from '@/features/careers/detail/ApplyForm'
import JobSnapshot from '@/features/careers/detail/JobSnapshot'
import ApplyCta from '@/features/careers/detail/ApplyCta'
import SimilarOpenings from '@/features/careers/detail/SimilarOpenings'
import ShareWidget from '@/features/careers/detail/ShareWidget'
import BackToAllJobs from '@/features/careers/detail/BackToAllJobs'
import OpenApplicationCta from '@/features/careers/OpenApplicationCta'
import { getJobBySlug, getSimilarJobs } from '@/data/jobs'
import '@/styles/pages/career.css'

export default function CareerDetail() {
  const { slug } = useParams()
  const { hash } = useLocation()
  const job = getJobBySlug(slug)

  // Honour `/careers/{slug}#job-apply` from the listing "Apply Now" button by
  // scrolling the form into view after content mounts.
  useEffect(() => {
    if (!job || !hash) return
    const el = document.querySelector(hash)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [job, hash])

  if (!job) return <Navigate to="/careers" replace />

  const similar = getSimilarJobs(job.slug)

  return (
    <>
      <PageHero
        id="career-detail-hero"
        label="Careers"
        titleStart={<>Career</>}
        titleHighlight="Details"
        description={
          <Link
            className="rajdhani-lbl-text-sm"
            to="/careers"
            style={{ color: 'var(--white)', textDecoration: 'underline', textUnderlineOffset: 4 }}
          >
            <i className="bi bi-arrow-left"></i> Back to All Openings
          </Link>
        }
      />

      {/* JOB HEADER */}
      <section style={{ padding: 'var(--section-pad) 0', background: 'var(--gray-950)' }}>
        <div className="container">
          <JobHeader
            dept={job.deptLabel}
            title={job.title}
            meta={[
              { icon: 'bi-geo-alt-fill',   text: job.location },
              { icon: 'bi-clock-fill',     text: job.type     },
              { icon: 'bi-award-fill',     text: `${job.exp} Experience` },
              { icon: 'bi-calendar-event', text: `Posted ${job.postedOn}` },
              { icon: 'bi-people-fill',    text: `${job.openings} Opening${job.openings === 1 ? '' : 's'}` },
            ]}
          />
          <ApplyBar
            job={{
              id:         job.slug,
              title:      job.title,
              department: job.deptLabel,
              location:   job.location,
              type:       job.type,
              experience: job.exp,
              deadline:   job.applyBy,
            }}
          />

          <div className="job-layout">
            <div className="job-content">
              <JobAbout paragraphs={job.about} />
              <Responsibilities items={job.responsibilities} />
              <Requirements groups={job.requirements} />
              <KeySkills skills={job.keySkills} />
              <JobBenefits />
              <InterviewProcess />
              <ApplyForm jobTitle={job.title} />
            </div>

            <aside className="job-sidebar">
              <JobSnapshot
                rows={[
                  { label: 'Department', value: job.deptLabel },
                  { label: 'Location',   value: job.location  },
                  { label: 'Job Type',   value: job.type      },
                  { label: 'Experience', value: job.exp       },
                  { label: 'Openings',   value: `${job.openings} Position${job.openings === 1 ? '' : 's'}` },
                  { label: 'CTC Range',  value: job.ctcRange  },
                  { label: 'Posted On',  value: job.postedOn  },
                  { label: 'Apply By',   value: job.applyBy   },
                ]}
              />
              <ApplyCta job={job} />
              <SimilarOpenings items={similar} />
              <ShareWidget shareTitle={`${job.title} — Svitch Motocorp`} />
              <BackToAllJobs />
            </aside>
          </div>
        </div>
      </section>

      <OpenApplicationCta />
    </>
  )
}
