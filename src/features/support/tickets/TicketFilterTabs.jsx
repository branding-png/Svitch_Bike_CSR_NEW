import { TICKET_FILTERS } from '@/data/tickets-data'

export default function TicketFilterTabs({ active, onChange }) {
  return (
    <div className="tkt-filter-tabs" role="tablist">
      {TICKET_FILTERS.map((t) => (
        <button
          key={t.id}
          type="button"
          className={active === t.id ? 'is-active' : undefined}
          data-filter={t.id}
          onClick={() => onChange(t.id)}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}
