// Icon + label meta strip — the pattern repeated everywhere across the app:
//   <span><i class="bi bi-geo-alt"></i> Mumbai</span>
//   <span><i class="bi bi-clock"></i> Full Time</span>
//   <span><i class="bi bi-briefcase"></i> 3–6 yrs</span>
//
// Two styles via `variant`:
//   • 'inline'  (default) — plain spans separated by gap. Use inside an
//                            element that already has `.job-meta`, `.order-meta`,
//                            `.svc-entry-meta` etc. styling.
//   • 'pills'             — bordered pill chips. Use stand-alone (no wrapper).
//
// Usage:
//   <MetaRow items={[
//     { icon: 'geo-alt-fill',  label: job.location },
//     { icon: 'clock-fill',    label: job.type },
//     { icon: 'award-fill',    label: job.exp },
//   ]} />
//
//   <MetaRow variant="pills" className="job-skills" items={skills.map((s) => ({ label: s }))} />
//
// Each item: { icon?: string, label: ReactNode, key?: string }
//   `icon` is optional — omit for plain labels.
//   `key` falls back to the label string.
export default function MetaRow({ items = [], variant = 'inline', className = '', tag: Tag = 'div' }) {
  if (!items.length) return null
  const baseCls = variant === 'pills' ? 'meta-pills' : 'meta-inline'

  return (
    <Tag className={`${baseCls} ${className}`.trim()}>
      {items.map((it, i) => (
        <span
          key={it.key ?? (typeof it.label === 'string' ? it.label : i)}
          className={variant === 'pills' ? 'meta-pill' : undefined}
        >
          {it.icon && <i className={`bi bi-${it.icon}`}></i>}
          {it.icon && ' '}
          {it.label}
        </span>
      ))}
    </Tag>
  )
}
