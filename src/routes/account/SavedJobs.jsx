import { Link } from 'react-router-dom'
import AccountLayout  from '@/features/account/AccountLayout'
import AccountContent from '@/features/account/AccountContent'
import SavedJobList   from '@/features/account/saved-jobs/SavedJobList'
import { useSavedJobs } from '@/contexts/SavedJobsContext'
import { useToast } from '@/contexts/ToastContext'
import { PATHS } from '@/utils/routes'
import '@/styles/sections/account.css'

export default function SavedJobs() {
  const { show } = useToast()
  const { jobs, remove } = useSavedJobs()

  function removeJob(job) {
    if (!window.confirm(`Remove "${job.title}" from saved jobs?`)) return
    remove(job.slug)
    show(`Removed "${job.title}" from saved jobs.`, 'success', 2500)
  }

  return (
    <AccountLayout>
      <AccountContent
        crumbLabel="Saved Jobs"
        title="Saved Jobs"
        description={`${jobs.length} role${jobs.length === 1 ? '' : 's'} bookmarked from the careers page. Apply before the deadline.`}
        actions={
          <Link to={PATHS.career} className="btn-csr secondary sm">
            <i className="bi bi-briefcase"></i> Browse All Jobs
          </Link>
        }
      >
        <SavedJobList jobs={jobs} onRemove={removeJob} />
      </AccountContent>
    </AccountLayout>
  )
}
