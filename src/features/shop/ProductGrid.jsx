import ProductCard from './ProductCard'
import ShopEmpty   from './ShopEmpty'

// Shop product-grid — renders cards or the empty state when `products` is [].
export default function ProductGrid({
  products = [],
  query    = '',
  onReset,
  onSuggest,
  onQuickView,
}) {
  if (products.length === 0) {
    return <ShopEmpty query={query} onReset={onReset} onSuggest={onSuggest} />
  }

  return (
    <div aria-label="ProductGrid" role="region" className="product-grid-shop" id="productGrid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onQuickView={onQuickView} />
      ))}
    </div>
  )
}
