import SavedJobCard from './SavedJobCard'
import SavedJobEmpty from './SavedJobEmpty'

export default function SavedJobList({ jobs, onRemove }) {
  if (!jobs || jobs.length === 0) return <SavedJobEmpty />
  return (
    <div className="saved-jobs-list">
      {jobs.map((j) => (
        <SavedJobCard key={j.id} job={j} onRemove={onRemove} />
      ))}
    </div>
  )
}
