// Color swatch picker — controlled by parent via `value` + `onChange`.
// Keeps legacy .pd-color / .is-active markup so existing CSS keeps working.
export default function ProductDetailColorSelector({ colors = [], value, onChange }) {
  if (!colors.length) return null
  const active = colors.find((c) => c.id === value) || colors[0]

  return (
    <div aria-label="ProductDetailColorSelector" className="pd-selector">
      <label className="pd-selector-label rajdhani-lbl-text-sm">
        Color: <strong>{active.name}</strong>
      </label>
      <div className="pd-color-options" role="radiogroup" aria-label="Color">
        {colors.map((c) => (
          <span
            key={c.id}
            role="radio"
            tabIndex={0}
            aria-checked={c.id === active.id}
            aria-label={c.name}
            className={`pd-color${c.id === active.id ? ' is-active' : ''}`}
            style={{ background: c.hex }}
            onClick={() => onChange?.(c.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onChange?.(c.id)
              }
            }}
          />
        ))}
      </div>
    </div>
  )
}
