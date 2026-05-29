import { Link } from 'react-router-dom'
import ReturnCard from './ReturnCard'
import { PATHS } from '@/utils/routes'

export default function ReturnList({ items }) {
  if (items.length === 0) {
    return (
      <div aria-label="ReturnList" className="card-base account-empty">
        <i className="bi bi-arrow-counterclockwise"></i>
        <h3>No returns to show</h3>
        <p>You don&apos;t have any returns matching this filter.</p>
        <Link to={PATHS.returnRequest} className="btn-csr primary">
          <i className="bi bi-arrow-counterclockwise"></i> Start a Return
        </Link>
      </div>
    )
  }

  return items.map((it) => <ReturnCard key={it.id} item={it} />)
}
