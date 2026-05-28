// Reusable section heading — handles all the section-header patterns used
// across Home.jsx and the rest of the site.
//
// Usage patterns:
//
//   1. Simple title + label + description:
//      <SectionHeader label="Shop" title="Featured Rides" description="…" />
//
//   2. Split title with `.accent` highlight on the last word
//      (mirrors the original CSR_New_web pattern):
//      <SectionHeader
//        label="Shop the Range"
//        titleStart="Pick Your"
//        titleAccent="CSR 762"
//        description="…"
//      />
//
//   3. Center-aligned variant (the `text-center reveal` block, used by the
//      blog section in CSR_New_web):
//      <SectionHeader … center />
//
//   4. JSX title for advanced cases:
//      <SectionHeader title={<>Two Wheels. <span className="accent">One Future.</span></>} />
//
// `reveal` is on by default — set `reveal={false}` to skip the scroll-fade.
export default function SectionHeader({
  label,
  title,            // string OR JSX — overrides titleStart/titleAccent if provided
  titleStart,       // first chunk of the headline
  titleAccent,      // accent-highlighted span (CSR_New_web's `.accent` class)
  description,
  descriptionClassName = '',   // extra classes for the description (e.g. 'rajdhani-lbl-text-sm')
  align = 'left',   // 'left' | 'center' (uses `.text-center` wrapper)
  center = false,   // shortcut for align="center"
  reveal = true,
  className = '',
  as = 'h2',        // 'h1' | 'h2' | 'h3' …
}) {
  const isCenter = center || align === 'center'
  const wrapperClass = [
    isCenter ? 'text-center' : 'section-header',
    reveal && 'reveal',
    className,
  ].filter(Boolean).join(' ')

  const Heading = as

  // Build the title node — prefer `title` prop, fall back to start/accent split
  let titleNode = null
  if (title != null) {
    titleNode = <Heading className="section-title">{title}</Heading>
  } else if (titleStart || titleAccent) {
    titleNode = (
      <Heading className="section-title">
        {titleStart}
        {titleAccent && (
          <>
            {titleStart ? ' ' : ''}
            <span className="accent">{titleAccent}</span>
          </>
        )}
      </Heading>
    )
  }

  return (
    <div className={wrapperClass}>
      {label && <span className="section-label">{label}</span>}
      {titleNode}
      {description && (
        <p className={`section-desc ${descriptionClassName}`.trim()}>{description}</p>
      )}
    </div>
  )
}
