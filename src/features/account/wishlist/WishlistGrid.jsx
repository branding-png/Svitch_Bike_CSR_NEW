import WishlistCard from './WishlistCard'

export default function WishlistGrid({ items, onRemove, onMoveToCart, onNotify }) {
  return (
    <div className="wishlist-grid">
      {items.map((p) => (
        <WishlistCard
          key={p.id}
          product={p}
          onRemove={onRemove}
          onMoveToCart={onMoveToCart}
          onNotify={onNotify}
        />
      ))}
    </div>
  )
}
