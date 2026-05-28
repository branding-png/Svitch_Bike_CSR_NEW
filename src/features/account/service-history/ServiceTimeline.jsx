import ServiceEntry from './ServiceEntry'

export default function ServiceTimeline({ entries }) {
  if (!entries || entries.length === 0) {
    return (
      <div className="card-base account-empty">
        <i className="bi bi-tools"></i>
        <h3>No service records yet</h3>
        <p>Once you visit a Svitch service centre, your visits will appear here.</p>
      </div>
    )
  }

  return (
    <div aria-label="ServiceTimeline" role="region" className="svc-timeline">
      {entries.map((e, i) => <ServiceEntry key={`${e.when}-${i}`} entry={e} />)}
    </div>
  )
}
