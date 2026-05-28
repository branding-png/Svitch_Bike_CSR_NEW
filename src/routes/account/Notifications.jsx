import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import AccountLayout    from '@/features/account/AccountLayout'
import AccountContent   from '@/features/account/AccountContent'
import NotificationToolbar from '@/features/account/notifications/NotificationToolbar'
import NotificationList    from '@/features/account/notifications/NotificationList'
import { NOTIFICATIONS }   from '@/data/notifications-data'
import { useToast } from '@/contexts/ToastContext'
import { PATHS } from '@/utils/routes'
import '@/styles/pages/notifications.css'

export default function Notifications() {
  const { show } = useToast()
  const [list, setList] = useState(NOTIFICATIONS)
  const [filter, setFilter] = useState('all')

  const visible = useMemo(
    () => (filter === 'all' ? list : list.filter((n) => n.cat === filter)),
    [list, filter],
  )

  const unreadCount = list.filter((n) => n.unread).length

  function toggleRead(item) {
    setList((rows) =>
      rows.map((r) => (r.id === item.id ? { ...r, unread: false } : r)),
    )
  }

  function markAllRead() {
    if (unreadCount === 0) return
    setList((rows) => rows.map((r) => ({ ...r, unread: false })))
    show('All notifications marked as read.', 'success', 2500)
  }

  return (
    <AccountLayout>
      <AccountContent
        crumbLabel="Notifications"
        title="Notifications"
        description={
          <>
            {list.length} updates &middot; {unreadCount} unread &middot; Manage what you receive in{' '}
            <Link className="accent" to={`${PATHS.profile}#security`}>settings</Link>.
          </>
        }
      >
        <NotificationToolbar
          active={filter}
          onChange={setFilter}
          onMarkAllRead={markAllRead}
        />
        <NotificationList items={visible} onToggleRead={toggleRead} />
      </AccountContent>
    </AccountLayout>
  )
}
