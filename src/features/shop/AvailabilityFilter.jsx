// Sidebar — availability filter. Mirrors CSR_New_web `#stockFilters`.
// Multi-select: parent owns `active` (array of stock ids) and passes
// `onChange(nextArray)`. `counts` is optional — per-status count badge.
const STATUSES = [
  { id: 'in-stock',    label: 'In Stock'    },
  { id: 'pre-order',   label: 'Pre-Order'   },
  { id: 'coming-soon', label: 'Coming Soon' },
]

export default function AvailabilityFilter({ active = [], counts = {}, onChange }) {
  const toggle = (id) => {
    const set = new Set(active)
    set.has(id) ? set.delete(id) : set.add(id)
    onChange?.([...set])
  }

  return (
    <div aria-label="AvailabilityFilter" role="region" className="card-base filter-widget">
      <h3 className="filter-title">Availability</h3>

      <div className="filter-list" id="stockFilters">
        {STATUSES.map((s) => (
          <label key={s.id} className="filter-check">
            <input
              type="checkbox"
              data-stock={s.id}
              checked={active.includes(s.id)}
              onChange={() => toggle(s.id)}
            />
            {' '}{s.label}{' '}
            {counts[s.id] != null && (
              <span className="count" data-stock-count={s.id}>{counts[s.id]}</span>
            )}
          </label>
        ))}
      </div>
    </div>
  )
}

export { STATUSES }
