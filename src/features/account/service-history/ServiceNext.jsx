import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'
import { NEXT_SERVICE } from './service-history-data'

export default function ServiceNext({ next = NEXT_SERVICE }) {
  return (
    <div aria-label="ServiceNext" className="card-base svc-next">
      <div className="svc-next-icon"><i className="bi bi-calendar-event"></i></div>
      <div className="svc-next-body">
        <h4 style={{ color: 'var(--white)', marginBottom: 4 }}>{next.title}</h4>
        <p style={{ fontSize: 'var(--fs-sm)' }}>
          {next.description} <strong style={{ color: 'var(--white)' }}>{next.due}</strong>{' '}
          (or {next.kmAway} from now).
        </p>
      </div>
      <Link to={PATHS.bookService} className="btn-csr primary sm">
        <i className="bi bi-calendar-plus"></i> Book Now
      </Link>
    </div>
  )
}
