import { SERVICE_STATS } from './service-history-data'

export default function ServiceStats({ stats = SERVICE_STATS }) {
  return (
    <div className="svc-stats">
      {stats.map((s) => (
        <div className="card-base svc-stat" key={s.label}>
          <strong>{s.value}</strong>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  )
}
