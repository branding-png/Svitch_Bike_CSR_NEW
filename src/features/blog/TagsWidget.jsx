// Blog sidebar "Popular Tags" widget — mirrors CSR_New_web `.widget-tags`.
// Optionally controlled: pass `active` + `onChange` to make a tag selectable
// (e.g. to filter the post list). Without those props it just renders inert
// chip-style links.
const DEFAULT_TAGS = [
  'E-Bike', 'Svitch', 'NXE Pro', 'Battery', 'Range', 'Bafang',
  'Fat Tyre', 'Foldable', 'EV India', 'Sustainability', 'Urban Commute',
]

export default function TagsWidget({
  title  = 'Popular Tags',
  tags   = DEFAULT_TAGS,
  active,
  onChange,
}) {
  return (
    <div aria-label="TagsWidget" role="region" className="card-base widget">
      <h3 className="widget-title">{title}</h3>
      <div className="widget-tags">
        {tags.map((t) => (
          <a
            key={t}
            href="#"
            className={'rajdhani-lbl-text-sm' + (active === t ? ' is-active' : '')}
            onClick={(e) => { e.preventDefault(); onChange?.(t) }}
          >
            {t}
          </a>
        ))}
      </div>
    </div>
  )
}
