// Shown by ProductGrid when no products match the current filters/search.
// If `query` is present, shows a search-flavoured message and suggestion pills.
const SUGGESTIONS = ['bike', 'battery', 'helmet', 'charger', 'accessory']

export default function ShopEmpty({ query = '', onReset, onSuggest }) {
  const isSearch = Boolean(query)

  return (
    <div aria-label="ShopEmpty" role="region" className="card-base account-empty" id="shopEmpty" style={{ marginTop: 20 }}>
      <i id="shopEmptyIcon" className={`bi ${isSearch ? 'bi-search' : 'bi-bag-x'}`}></i>

      <h3 id="shopEmptyTitle" style={{ color: 'var(--white)', marginBottom: 8 }}>
        {isSearch ? `No results for "${query}"` : 'No products match your filters'}
      </h3>

      <p id="shopEmptyDesc">
        {isSearch
          ? 'We could not find any products matching your search. Try a different keyword.'
          : 'Try adjusting your filters, or clear them to see all products.'}
      </p>

      {isSearch && (
        <div className="shop-empty-suggest" id="shopEmptySuggest">
          <span className="rajdhani-lbl-text-sm">Try searching for:</span>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              className="filter-pill"
              data-suggest={s}
              onClick={() => onSuggest?.(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      )}

      <button
        type="button"
        id="shopResetFilter"
        className="btn-csr primary"
        onClick={onReset}
      >
        <i className="bi bi-grid-fill"></i> Show All Products
      </button>
    </div>
  )
}
