// Cost accent → colour: 'accent' = orange/yellow (paid), 'free' = green
const COST_COLOUR = {
  accent: 'var(--accent)',
  free:   '#4ade80',
}

export default function ServiceEntry({ entry }) {
  return (
    <div className="card-base svc-entry">
      <div className="svc-entry-head">
        <div>
          <h4>{entry.title}</h4>
          <span className="svc-entry-meta">
            {entry.when} &middot; {entry.center} &middot; Tech: {entry.tech}
          </span>
        </div>
        <span
          className="rajdhani-lbl-text-sm"
          style={{ color: COST_COLOUR[entry.cost?.accent] || 'var(--accent)' }}
        >
          {entry.cost?.label}
        </span>
      </div>

      <p>{entry.summary}</p>

      {entry.parts && entry.parts.length > 0 && (
        <div className="svc-parts">
          {entry.parts.map((p) => (
            <span key={p} className="svc-part-chip">{p}</span>
          ))}
        </div>
      )}
    </div>
  )
}
