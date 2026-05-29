// Sidebar — colour-swatch filter. Mirrors CSR_New_web `#colorFilters`.
// Controlled: parent owns `active` (color id or null) and passes `onChange(id)`.
// Click an active swatch to clear.
const COLORS = [
  { id: 'black',  title: 'Black',  bg: '#111'    },
  { id: 'red',    title: 'Red',    bg: '#ef4444' },
  { id: 'gray',   title: 'Gray',   bg: '#6b7280' },
  { id: 'blue',   title: 'Blue',   bg: '#2563eb' },
  { id: 'green',  title: 'Green',  bg: '#22c55e' },
  { id: 'yellow', title: 'Yellow', bg: '#eab308' },
  { id: 'white',  title: 'White',  bg: '#f1f5f9', border: '1px solid #555' },
]

export default function ColorFilter({ active = null, onChange }) {
  const toggle = (id) => onChange?.(active === id ? null : id)

  return (
    <div aria-label="ColorFilter" className="card-base filter-widget">
      <h3 className="filter-title">Color</h3>

      <div className="filter-colors" id="colorFilters">
        {COLORS.map((c) => (
          <span
            key={c.id}
            role="button"
            tabIndex={0}
            aria-pressed={active === c.id}
            className={`color-swatch${active === c.id ? ' is-active' : ''}`}
            data-color={c.id}
            title={c.title}
            style={{ background: c.bg, border: c.border }}
            onClick={() => toggle(c.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                toggle(c.id)
              }
            }}
          />
        ))}
      </div>

      <p
        style={{
          marginTop: 8,
          fontFamily: 'var(--font-label)',
          color: 'var(--gray-400)',
          fontSize: 'var(--fs-xs)',
        }}
      >
        Click a swatch to filter. Click again to clear.
      </p>
    </div>
  )
}

export { COLORS }
