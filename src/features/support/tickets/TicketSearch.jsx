export default function TicketSearch({ value, onChange }) {
  return (
    <div aria-label="TicketSearch" className="tkt-search">
      <i className="bi bi-search"></i>
      <input
        type="search"
        placeholder="Search by # or keyword..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search tickets by number or keyword"
      />
    </div>
  )
}
