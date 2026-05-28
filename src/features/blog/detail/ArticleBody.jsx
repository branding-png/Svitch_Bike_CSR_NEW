// Long-form article body — mirrors CSR_New_web `.article-body`.
// Renders a structured `blocks` array (see src/data/blog.js for the shape) so
// the same component can paint any post. If no blocks are passed it falls back
// to the original hardcoded NXE Pro demo content so existing imports still work.

const FALLBACK_BLOCKS = [
  { type: 'p',       text: 'The wait is over. After 18 months of R&D, 40+ prototype revisions, and thousands of kilometres of test rides, the Svitch NXE Pro is finally here — and it redefines what an electric bicycle can be in India.' },
  { type: 'callout', icon: 'bi-stars', label: 'TL;DR', text: "The NXE Pro is Svitch's flagship — 250W Bafang motor, 120 km range, dual suspension, fat 20×4 tyres, hydraulic disc brakes, Shimano 7-speed gears, starting at ₹1,25,000." },
]

function Block({ block }) {
  switch (block.type) {
    case 'p':
      return <p>{block.text}</p>

    case 'h2':
      return <h2 id={block.id}>{block.text}</h2>

    case 'ul':
      return (
        <ul>
          {block.items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      )

    case 'quote':
      return (
        <blockquote className="article-quote">
          {block.text}
          {block.cite && <cite className="rajdhani-lbl-text-sm">{block.cite}</cite>}
        </blockquote>
      )

    case 'callout':
      return (
        <div className="article-callout">
          <i className={`bi ${block.icon || 'bi-info-circle'}`}></i>
          <div>
            {block.label && <span className="callout-label">{block.label}</span>}
            <p>{block.text}</p>
          </div>
        </div>
      )

    case 'specs':
      return (
        <div className="article-specs">
          {block.items.map(([label, value]) => (
            <div key={label} className="article-specs-item">
              <span className="rajdhani-lbl-text-sm">{label}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      )

    case 'figure':
      return (
        <figure className="article-figure">
          <img src={block.src} alt={block.alt || ''} loading="lazy" decoding="async" />
          {block.caption && (
            <figcaption className="rajdhani-lbl-text-sm">{block.caption}</figcaption>
          )}
        </figure>
      )

    default:
      return null
  }
}

export default function ArticleBody({ blocks = FALLBACK_BLOCKS, children }) {
  if (children) {
    return <article className="rajdhani-lbl-text-sm card-base article-body">{children}</article>
  }
  return (
    <article className="card-base article-body">
      {blocks.map((b, i) => <Block key={i} block={b} />)}
    </article>
  )
}
