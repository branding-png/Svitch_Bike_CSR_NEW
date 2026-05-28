// Shop results / sort bar — mirrors CSR_New_web `.shop-results-bar`.
// Parent provides paging info (`start`, `end`, `total`) and sort state.
const SORTS = [
  { id: 'featured',  label: 'Featured'              },
  { id: 'price-asc', label: 'Price — Low to High'   },
  { id: 'price-desc', label: 'Price — High to Low'  },
  { id: 'newest',    label: 'Newest First'          },
  { id: 'rated',     label: 'Best Rated'            },
]

export default function ResultsBar({
  start = 0,
  end   = 0,
  total = 0,
  sort  = 'featured',
  onSortChange,
}) {
  return (
    <div className="shop-results-bar">
      <span className="shop-results-count rajdhani-lbl-text-sm">
        {total === 0 ? (
          'No products match'
        ) : (
          <>
            Showing <strong>{start}–{end}</strong> of <strong>{total}</strong> products
          </>
        )}
      </span>

      <div className="shop-sort">
        <label htmlFor="shopSortSelect" className="rajdhani-lbl-text-sm">Sort:</label>
        <select
          id="shopSortSelect"
          value={sort}
          onChange={(e) => onSortChange?.(e.target.value)}
          aria-label="Sort products"
        >
          {SORTS.map((s) => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export { SORTS }
