// Single `.nf-item` row. Clicking marks it read (and the unread blue dot
// goes away). `tone` → icon-circle colour from notifications.css:
// warn (red), ok (green), info (blue), undefined (neutral grey).
export default function NotificationItem({ item, onToggleRead }) {
  return (
    <div aria-label="NotificationItem"
      className={`card-base nf-item${item.unread ? ' unread' : ''}`}
      data-cat={item.cat}
      onClick={() => onToggleRead?.(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onToggleRead?.(item) }}
    >
      <div className={`nf-icon${item.tone ? ` ${item.tone}` : ''}`}>
        <i className={`bi bi-${item.icon}`}></i>
      </div>
      <div className="nf-body">
        <strong>{item.title}</strong>
        <p>{item.body}</p>
      </div>
      <span className="nf-time">{item.time}</span>
    </div>
  )
}
