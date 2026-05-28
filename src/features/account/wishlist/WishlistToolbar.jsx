export default function WishlistToolbar({ count, onClear }) {
  return (
    <div aria-label="WishlistToolbar" role="region" className="wishlist-toolbar">
      <span className="rajdhani-lbl-text-sm">
        <strong style={{ color: 'var(--white)' }}>{count}</strong> item{count === 1 ? '' : 's'} saved
      </span>
      <button type="button" className="btn-csr secondary" onClick={onClear}>
        <i className="bi bi-trash3"></i> Clear All
      </button>
    </div>
  )
}
