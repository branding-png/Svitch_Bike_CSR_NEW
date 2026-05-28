// Sidebar — category filter widget. Mirrors CSR_New_web `#categoryFilters`.
// Multi-select: parent owns `value` (array of category ids, empty == "all")
// and gets the new array via `onChange(next)`. Selecting "All Products" clears
// every other tick; ticking any specific category un-ticks "All".
const CATEGORIES = [
  { id: 'all',          label: 'All Products'         },
  { id: 'motorcycles',  label: 'Electric Motorcycles' },
  { id: 'ebikes',       label: 'E-Bicycles'           },
]

export default function CategoryFilter({ value = [], counts = {}, onChange }) {
  const isAllActive = value.length === 0

  function toggle(id) {
    if (id === 'all') {
      onChange?.([])
      return
    }
    const next = value.includes(id)
      ? value.filter((v) => v !== id)
      : [...value, id]
    onChange?.(next)
  }

  return (
    <div className="card-base filter-widget">
      <h3 className="filter-title">Category</h3>

      <div className="filter-list" id="categoryFilters">
        {CATEGORIES.map((c) => {
          const checked = c.id === 'all' ? isAllActive : value.includes(c.id)
          return (
            <label key={c.id} className="filter-check">
              <input
                type="checkbox"
                data-cat={c.id}
                checked={checked}
                onChange={() => toggle(c.id)}
              />
              {' '}{c.label}{' '}
              {counts[c.id] != null && (
                <span className="count" data-count={c.id}>{counts[c.id]}</span>
              )}
            </label>
          )
        })}
      </div>
    </div>
  )
}

export { CATEGORIES }
