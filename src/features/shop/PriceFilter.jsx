import { formatCurrency } from '@/utils/formatCurrency'

// Sidebar — price-range filter. Mirrors CSR_New_web `#priceRange`.
// Controlled: parent owns `value` (max price ₹) and passes `onChange(value)`.
export default function PriceFilter({
  min = 100,
  max = 200000,
  step = 100,
  value = 200000,
  onChange,
}) {
  return (
    <div aria-label="PriceFilter" role="region" className="card-base filter-widget">
      <h3 className="filter-title">Price Range</h3>

      <input
        type="range"
        id="priceRange"
        className="filter-range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange?.(Number(e.target.value))}
        aria-label="Maximum price"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={formatCurrency(value)}
      />

      <div className="filter-range-labels rajdhani-lbl-text-sm">
        <span>{formatCurrency(min)}</span>
        <span>
          Up to <strong id="priceLabel">{formatCurrency(value)}</strong>
        </span>
      </div>
    </div>
  )
}
