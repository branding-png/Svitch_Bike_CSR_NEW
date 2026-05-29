import { useToast } from '@/contexts/ToastContext'

// Top-right action row in the page header â€” Share + Add All to Cart.
export default function WishlistActions({ items }) {
  const { show } = useToast()
  const inStock = items.filter((p) => p.stock === 'in-stock')

  function share() {
    const text  = `I'm eyeing these on Svitch: ${items.map((p) => p.name).join(', ')}`
    const url   = typeof window !== 'undefined' ? window.location.href : ''
    if (navigator.share) {
      navigator.share({ title: 'My Svitch wishlist', text, url }).catch(() => {})
    } else if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(`${text}\n${url}`)
      show('Wishlist link copied to clipboard.', 'success', 3000)
    } else {
      show('Share not supported in this browser.', 'error', 3000)
    }
  }

  function addAll() {
    if (inStock.length === 0) {
      show('No in-stock items to add right now.', 'info', 3000)
      return
    }
    show(`Added ${inStock.length} item${inStock.length === 1 ? '' : 's'} to cart.`, 'success', 3500)
  }

  return (
    <div aria-label="WishlistActions" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <button type="button" className="btn-csr secondary sm" onClick={share}>
        <i className="bi bi-share"></i> Share
      </button>
      <button type="button" className="btn-csr primary sm" onClick={addAll}>
        <i className="bi bi-cart-plus"></i> Add All to Cart
      </button>
    </div>
  )
}
