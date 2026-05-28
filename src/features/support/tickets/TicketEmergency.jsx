import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'
import { PHONES, phoneHref } from '@/data/contact-info'

export default function TicketEmergency() {
  return (
    <div className="tkt-emergency">
      <i className="bi bi-exclamation-triangle-fill"></i>
      Emergency? Call{' '}
      <a className="accent" href={phoneHref('headOffice')}>{PHONES.headOffice.phone}</a>{' '}
      (24/7) &middot; Roadside:{' '}
      <Link className="accent" to={PATHS.roadsideAssistance}>request now</Link>
    </div>
  )
}
