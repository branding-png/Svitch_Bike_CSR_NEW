// Renders the block-based content shape used by legal page data files
// (see src/data/accessibility.js / cookie-policy.js for the schema).
// Keeping the renderer generic means every legal page reuses one component â€”
// the data file is the only thing that changes per page.
//
// Supported block `type`s:
//   { type: 'p',     text }
//   { type: 'h3',    text }
//   { type: 'inline', nodes: [...] }
//   { type: 'ul',    items: [string | inline-nodes] }
//   { type: 'callout', icon, text }
//   { type: 'table', headers: [string], rows: [[ cell | inline-nodes ]] }
//
// Inline `nodes` are { tag, text, href, className } tokens. Supported tags:
//   'strong', 'code', 'kbd', 'a'.

function Inline({ node, idx }) {
  if (typeof node === 'string') return node
  const { tag, text, href, className } = node
  if (!tag)        return text
  if (tag === 'a') return <a key={idx} href={href} className={className} target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}>{text}</a>
  const Tag = tag
  return <Tag key={idx}>{text}</Tag>
}

function renderInline(nodes) {
  if (typeof nodes === 'string') return nodes
  return nodes.map((n, i) => <Inline key={i} node={n} idx={i} />)
}

export default function LegalBlocks({ blocks = [] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'p':
            return <p key={i} className={b.className}>{renderInline(b.text)}</p>

          case 'h3':
            return <h3 key={i}>{b.text}</h3>

          case 'inline':
            return <p key={i}>{renderInline(b.nodes)}</p>

          case 'ul':
            return (
              <ul key={i}>
                {b.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ul>
            )

          case 'ol':
            return (
              <ol key={i}>
                {b.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ol>
            )

          case 'callout':
            return (
              <div
                key={i}
                className={`legal-callout${b.variant ? ` is-${b.variant}` : ''}`}
              >
                <i className={`bi ${b.icon || 'bi-info-circle-fill'}`}></i>
                <p>{renderInline(b.text)}</p>
              </div>
            )

          case 'kv':
            return (
              <div key={i} className="spec-kv-wrap">
                <table className="spec-kv">
                  <tbody>
                    {b.rows.map(([k, v], j) => (
                      <tr key={j}>
                        <td>{renderInline(k)}</td>
                        <td>{renderInline(v)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )

          case 'mode':
            return (
              <div key={i} className="mode-row">
                <span className="mode-pill">{b.label}</span>
                <p>{renderInline(b.text)}</p>
              </div>
            )

          case 'table':
            return (
              <div aria-label="LegalBlocks" key={i} className="legal-table-wrap">
                <table className="legal-table">
                  <thead>
                    <tr>{b.headers.map((h, j) => <th key={j}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, j) => (
                      <tr key={j}>
                        {row.map((cell, k) => <td key={k}>{renderInline(cell)}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )

          default:
            return null
        }
      })}
    </>
  )
}
