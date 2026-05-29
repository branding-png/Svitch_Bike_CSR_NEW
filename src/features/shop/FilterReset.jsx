// Sidebar — reset-all-filters button. Mirrors CSR_New_web `#resetAllFilters`.
export default function FilterReset({ onClick }) {
  return (
    <div aria-label="FilterReset" className="card-base filter-widget" style={{ textAlign: 'center' }}>
      <button
        type="button"
        id="resetAllFilters"
        className="btn-csr secondary sm"
        style={{ width: '100%', justifyContent: 'center' }}
        onClick={onClick}
      >
        <i className="bi bi-arrow-counterclockwise"></i> Reset All Filters
      </button>
    </div>
  )
}
