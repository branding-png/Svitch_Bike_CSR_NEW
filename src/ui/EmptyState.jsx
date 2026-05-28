import Card from './Card'

// Generic empty-state card. Centered icon + title + description + optional
// action button. Used by Cart, Wishlist, Orders, Returns, Ticket — anywhere
// a list might be empty.
//
// Usage:
//   <EmptyState icon="cart-x" title="Your cart is empty"
//               description="Browse the lineup..."
//               action={<Button to={PATHS.shop}>Shop Now</Button>} />
export default function EmptyState({ icon = 'inbox', title, description, action, className = '' }) {
  return (
    <Card className={`account-empty ${className}`}>
      {icon && <i className={`bi bi-${icon}`}></i>}
      {title && <h3 style={{ color: 'var(--white)' }}>{title}</h3>}
      {description && <p>{description}</p>}
      {action && <div style={{ marginTop: 14 }}>{action}</div>}
    </Card>
  )
}
