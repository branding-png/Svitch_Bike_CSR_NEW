import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import AccountLayout  from '@/features/account/AccountLayout'
import AccountContent from '@/features/account/AccountContent'
import ReturnTabs     from '@/features/account/returns/ReturnTabs'
import ReturnList     from '@/features/account/returns/ReturnList'
import { RETURNS, countByStatus } from '@/data/returns-data'
import { PATHS } from '@/utils/routes'
import '@/styles/pages/returns.css'

export default function Returns() {
  const [tab, setTab] = useState('all')

  const counts   = useMemo(() => countByStatus(RETURNS), [])
  const filtered = useMemo(
    () => (tab === 'all' ? RETURNS : RETURNS.filter((r) => r.status === tab)),
    [tab],
  )

  return (
    <AccountLayout>
      <AccountContent
        crumbLabel="Returns & Refunds"
        title="Returns & Refunds"
        description="Track every return, replacement, and refund — from request to bank credit."
      >
        <ReturnTabs active={tab} onChange={setTab} counts={counts} />
        <ReturnList items={filtered} />

        <p style={{ textAlign: 'center', fontSize: 'var(--fs-sm)', marginTop: 24 }}>
          Need help? Read the{' '}
          <Link to={PATHS.refundPolicy} className="accent">Refund Policy</Link>{' '}
          or{' '}
          <Link to={PATHS.ticket} className="accent">raise a ticket</Link>.
        </p>
      </AccountContent>
    </AccountLayout>
  )
}
