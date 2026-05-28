import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'
import { RETURN_TABS } from '@/data/returns-data'

// Tab row that also hosts the "New Return" CTA on the right.
// Counts come from the parent so they reflect the current dataset.
export default function ReturnTabs({ active, onChange, counts = {} }) {
  return (
    <div className="returns-tabs">
      {RETURN_TABS.map((t) => (
        <button
          key={t.id}
          type="button"
          className={`returns-tab${active === t.id ? ' active' : ''}`}
          data-filter={t.id}
          onClick={() => onChange(t.id)}
        >
          {t.label} ({counts[t.id] || 0})
        </button>
      ))}
      <Link to={PATHS.returnRequest} className="btn-csr primary sm" style={{ marginLeft: 'auto' }}>
        <i className="bi bi-plus-lg"></i> New Return
      </Link>
    </div>
  )
}
