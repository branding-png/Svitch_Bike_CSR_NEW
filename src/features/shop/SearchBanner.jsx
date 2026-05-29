// Shop search-results banner â€” mirrors CSR_New_web `#shopSearchBanner`.
// Renders nothing when `query` is empty. `onClear` removes the search term.
export default function SearchBanner({ query, count = 0, onClear }) {
  if (!query) return null

  return (
    <div aria-label="SearchBanner" className="shop-search-banner" id="shopSearchBanner">
      <div className="shop-search-banner-info">
        <span className="rajdhani-lbl-text-sm shop-search-banner-label">
          Search results for
        </span>
        <strong className="shop-search-banner-query" id="shopSearchQuery">
          &ldquo;{query}&rdquo;
        </strong>
        <span className="rajdhani-lbl-text-sm shop-search-banner-count" id="shopSearchCount">
          {count} {count === 1 ? 'match' : 'matches'}
        </span>
      </div>
      <button
        type="button"
        id="shopSearchClear"
        className="shop-search-clear"
        aria-label="Clear search"
        onClick={onClear}
      >
        <i className="bi bi-x-lg"></i> Clear search
      </button>
    </div>
  )
}
