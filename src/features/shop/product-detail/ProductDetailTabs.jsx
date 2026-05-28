import { useState } from 'react'
import ProductDetailOverview from './ProductDetailOverview'
import ProductDetailSpecs from './ProductDetailSpecs'
import ProductDetailFeatures from './ProductDetailFeatures'
import ProductDetailReviews from './ProductDetailReviews'

// Tabbed section beneath the gallery/info. Owns the active-tab state so the
// route doesn't have to. Pass props through to override defaults per tab.
const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'specs',    label: 'Specifications' },
  { id: 'features', label: 'Features' },
  { id: 'reviews',  label: 'Reviews' },
]

export default function ProductDetailTabs({
  overview,
  specs,
  features,
  reviews,
  initialTab = 'overview',
}) {
  const [active, setActive] = useState(initialTab)

  return (
    <>
      <div className="pd-tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={active === t.id}
            className={`pd-tab${active === t.id ? ' is-active' : ''}`}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div
        className={`pd-tab-panel pd-tab-panel-overview${active === 'overview' ? ' is-active' : ''}`}
        role="tabpanel"
        hidden={active !== 'overview'}
      >
        <ProductDetailOverview>{overview}</ProductDetailOverview>
      </div>

      <div
        className={`pd-tab-panel${active === 'specs' ? ' is-active' : ''}`}
        role="tabpanel"
        hidden={active !== 'specs'}
      >
        <ProductDetailSpecs {...(specs || {})} />
      </div>

      <div
        className={`pd-tab-panel${active === 'features' ? ' is-active' : ''}`}
        role="tabpanel"
        hidden={active !== 'features'}
      >
        <ProductDetailFeatures {...(features || {})} />
      </div>

      <div
        id="reviews"
        className={`pd-tab-panel${active === 'reviews' ? ' is-active' : ''}`}
        role="tabpanel"
        hidden={active !== 'reviews'}
      >
        <ProductDetailReviews {...(reviews || {})} />
      </div>
    </>
  )
}
