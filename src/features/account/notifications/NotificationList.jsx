import NotificationItem from './NotificationItem'

export default function NotificationList({ items, onToggleRead }) {
  if (items.length === 0) {
    return (
      <div aria-label="NotificationList" className="card-base account-empty">
        <i className="bi bi-bell-slash"></i>
        <h3>No notifications</h3>
        <p>You&apos;re all caught up. Switch filter or come back later.</p>
      </div>
    )
  }
  return items.map((n) => (
    <NotificationItem key={n.id} item={n} onToggleRead={onToggleRead} />
  ))
}
