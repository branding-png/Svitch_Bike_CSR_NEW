import { Link } from 'react-router-dom'
import { PATHS } from '@/utils/routes'

export default function InvoiceFooterNote() {
  return (
    <p aria-label="InvoiceFooterNote" style={{ marginTop: 18, fontSize: 'var(--fs-sm)' }}>
      For GST reconciliation or B2B invoicing, update your{' '}
      <Link to={PATHS.profile} className="accent">GSTIN in profile</Link>.
      FAME-II subsidy proofs are auto-attached to eligible invoices.
    </p>
  )
}
