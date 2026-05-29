import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHero from '@/layouts/PageHero'
import { Pagination } from '@/ui'
import CategoryFilter     from '@/features/shop/CategoryFilter'
import PriceFilter        from '@/features/shop/PriceFilter'
import ColorFilter        from '@/features/shop/ColorFilter'
import AvailabilityFilter from '@/features/shop/AvailabilityFilter'
import FilterReset        from '@/features/shop/FilterReset'
import SearchBanner       from '@/features/shop/SearchBanner'
import ResultsBar         from '@/features/shop/ResultsBar'
import ProductGrid        from '@/features/shop/ProductGrid'
import {
  PRODUCTS, categoryCounts, stockCounts, filterProducts, sortProducts,
} from '@/data/products'
import '@/styles/pages/shop.css'

const PER_PAGE = 6

const DEFAULTS = {
  category: [],           // empty == "All Products"
  maxPrice: 200000,
  color:    null,
  stock:    ['in-stock', 'pre-order'],
  sort:     'featured',
}

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = (searchParams.get('q') || '').trim()

  const [category, setCategory] = useState(DEFAULTS.category)
  const [maxPrice, setMaxPrice] = useState(DEFAULTS.maxPrice)
  const [color, setColor]       = useState(DEFAULTS.color)
  const [stock, setStock]       = useState(DEFAULTS.stock)
  const [sort, setSort]         = useState(DEFAULTS.sort)
  const [page, setPage]         = useState(1)
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('shop-filter-open', filtersOpen)
    return () => document.body.classList.remove('shop-filter-open')
  }, [filtersOpen])

  const filtered = useMemo(
    () => sortProducts(
      filterProducts(PRODUCTS, { category, maxPrice, color, stock, query }),
      sort,
    ),
    [category, maxPrice, color, stock, query, sort],
  )

  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const safePage  = Math.min(page, pageCount)
  const start     = (safePage - 1) * PER_PAGE
  const visible   = filtered.slice(start, start + PER_PAGE)

  // Reset to page 1 whenever the filter / sort / query changes
  useEffect(() => { setPage(1) }, [category, maxPrice, color, stock, query, sort])

  const catCounts = useMemo(() => categoryCounts(PRODUCTS), [])
  const stkCounts = useMemo(() => stockCounts(PRODUCTS),    [])

  const resetAll = () => {
    setCategory(DEFAULTS.category)
    setMaxPrice(DEFAULTS.maxPrice)
    setColor(DEFAULTS.color)
    setStock(DEFAULTS.stock)
    setSort(DEFAULTS.sort)
  }

  const clearSearch = () => {
    const next = new URLSearchParams(searchParams)
    next.delete('q')
    setSearchParams(next, { replace: true })
  }

  const quickSearch = (term) => {
    const next = new URLSearchParams(searchParams)
    next.set('q', term)
    setSearchParams(next, { replace: true })
  }

  return (
    <>
      <PageHero
        id="shop-hero"
        label="Shop"
        titleStart={<>The </>}
        titleHighlight="Svitch"
        titleEnd=" Range"
        description="Explore the full line of electric motorcycles and e-bicycles — every model, every color, every spec."
      />

      <section id="shop-main">
        <div className="container">
          <div className="shop-layout">
            <button
              type="button"
              className="shop-filter-toggle"
              onClick={() => setFiltersOpen(true)}
              aria-label="Open filters"
            >
              <i className="bi bi-sliders" />
              Filters
            </button>

            <div
              className={`shop-filter-backdrop${filtersOpen ? ' is-open' : ''}`}
              onClick={() => setFiltersOpen(false)}
              aria-hidden="true"
            />

            <aside className={`rajdhani-lbl-text-sm shop-sidebar${filtersOpen ? ' is-open' : ''}`}>
              <button
                type="button"
                className="shop-sidebar-close"
                onClick={() => setFiltersOpen(false)}
                aria-label="Close filters"
              >
                <i className="bi bi-x-lg" />
              </button>
              <CategoryFilter     value={category} counts={catCounts} onChange={setCategory} />
              <PriceFilter        value={maxPrice}                     onChange={setMaxPrice} />
              <ColorFilter        active={color}                       onChange={setColor} />
              <AvailabilityFilter active={stock}    counts={stkCounts} onChange={setStock} />
              <FilterReset        onClick={resetAll} />
            </aside>

            <div className="shop-content">
              <SearchBanner query={query} count={filtered.length} onClear={clearSearch} />
              <ResultsBar
                start={filtered.length === 0 ? 0 : start + 1}
                end={Math.min(start + PER_PAGE, filtered.length)}
                total={filtered.length}
                sort={sort}
                onSortChange={setSort}
              />
              <ProductGrid
                products={visible}
                query={query}
                onReset={() => { resetAll(); clearSearch() }}
                onSuggest={quickSearch}
              />

              <Pagination
                page={safePage}
                pageCount={pageCount}
                onChange={setPage}
                className="mt-5"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
