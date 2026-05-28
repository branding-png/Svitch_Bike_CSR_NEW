import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductDetailPriceRow from './ProductDetailPriceRow'
import ProductDetailTrust from './ProductDetailTrust'
import ProductDetailColorSelector from './ProductDetailColorSelector'
import ProductDetailCta from './ProductDetailCta'
import ProductDetailQuickSpecs from './ProductDetailQuickSpecs'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/contexts/ToastContext'
import { PATHS } from '@/utils/routes'

const DEFAULT_COLORS = [
  { id: 'matte-black',  name: 'Matte Black',  hex: '#111' },
  { id: 'crimson-red',  name: 'Crimson Red',  hex: '#ef4444' },
  { id: 'stealth-gray', name: 'Stealth Gray', hex: '#6b7280' },
  { id: 'ocean-blue',   name: 'Ocean Blue',   hex: '#2563eb' },
  { id: 'goblin-green', name: 'Goblin Green', hex: '#22c55e' },
]

// "₹1,25,000" → 125000
function parsePrice(s) {
  if (typeof s === 'number') return s
  const n = Number(String(s).replace(/[^\d.]/g, ''))
  return Number.isFinite(n) ? n : 0
}

export default function ProductDetailInfo({
  id          = 'csr-762',
  image       = '/images/product/csr-762-black.webp',
  tagline     = 'Flagship Electric Motorcycle',
  productName = 'CSR 762',
  rating      = 4.8,
  reviewCount = 124,
  price       = '₹1,25,000',
  oldPrice    = '₹1,45,000',
  savings     = '₹20,000',
  colors      = DEFAULT_COLORS,
  onAddToCart,
  onBuyNow,
}) {
  const [colorId, setColorId] = useState(colors[0]?.id)
  const activeColor = colors.find((c) => c.id === colorId) || colors[0]
  const navigate   = useNavigate()
  const { addItem } = useCart()
  const toast      = useToast()

  const buildProduct = () => ({
    id,
    name:  productName,
    price: parsePrice(price),
    image,
    color: activeColor?.name || null,
  })

  const handleAddToCart = (qty) => {
    addItem(buildProduct(), qty)
    toast.show(`${productName}${activeColor ? ` (${activeColor.name})` : ''} added to cart`, 'success')
    onAddToCart?.(qty)
  }

  const handleBuyNow = (qty) => {
    addItem(buildProduct(), qty)
    onBuyNow?.(qty)
    navigate(PATHS.checkout)
  }

  return (
    <div aria-label="ProductDetailInfo" role="region" className="pd-info">
      <span className="product-tagline">{tagline}</span>
      <h2>{productName}{activeColor ? ` — ${activeColor.name}` : ''}</h2>

      <div className="product-rating">
        {Array.from({ length: 5 }).map((_, i) => (
          <i key={i} className={`bi ${i < Math.round(rating) ? 'bi-star-fill' : 'bi-star'}`} aria-hidden="true" />
        ))}
        {' '}
        {rating.toFixed(1)} &middot;{' '}
        <a className="rajdhani-lbl-text-sm pd-reviews-link" href="#reviews">{reviewCount} reviews</a>
      </div>

      <ProductDetailPriceRow price={price} oldPrice={oldPrice} savings={savings} />
      <ProductDetailTrust />
      <ProductDetailColorSelector colors={colors} value={colorId} onChange={setColorId} />
      <ProductDetailCta />
      <ProductDetailQuickSpecs />
    </div>
  )
}
