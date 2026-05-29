// Price block â€” current price, struck-through MRP, and a savings badge.
// All values are passed in so the same component works for any variant.
export default function ProductDetailPriceRow({ price, oldPrice, savings }) {
  return (
    <div aria-label="ProductDetailPriceRow" className="pd-price-row">
      <span className="pd-price">{price}</span>
      {oldPrice && <span className="pd-price-old">{oldPrice}</span>}
      {savings && <span className="pd-save-badge">Save {savings}</span>}
    </div>
  )
}
