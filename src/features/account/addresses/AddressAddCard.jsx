export default function AddressAddCard({ onAdd }) {
  return (
    <button aria-label="AddressAddCard" type="button" className="card-base address-add" onClick={onAdd}>
      <i className="bi bi-plus-circle"></i>
      <strong style={{ color: 'var(--white)', fontFamily: 'var(--font-display)', fontSize: 'var(--fs-lg)' }}>
        Add New Address
      </strong>
      <span style={{ fontFamily: 'var(--font-label)' }}>Home &middot; Work &middot; Other</span>
    </button>
  )
}
