const TYPE_ICON = {
  Home:   'house-fill',
  Work:   'briefcase-fill',
  Office: 'briefcase-fill',
  Other:  'geo-alt-fill',
}

// Single saved-address card. Buttons bubble up via the onâ€¦ props so the
// parent can drive the modal / context calls without leaking state here.
export default function AddressCard({ address, onEdit, onMakeDefault, onRemove }) {
  const icon = TYPE_ICON[address.label] || 'geo-alt-fill'

  return (
    <div aria-label="AddressCard" className={`card-base address-card${address.isDefault ? ' is-default' : ''}`} data-address-id={address.id}>
      <div className="address-card-head">
        <span className="address-type-icon"><i className={`bi bi-${icon}`}></i></span>
        <span className="address-type">{address.label}</span>
        {address.isDefault && (
          <span className="address-default-badge">
            <i className="bi bi-star-fill" style={{ fontSize: 10 }}></i> Default
          </span>
        )}
      </div>

      <strong>{address.name}</strong>
      <p>
        {address.line1}
        {address.line2 && (<><br />{address.line2}</>)}
        <br />{address.city}
        <br />{address.state} &mdash; {address.pincode}, {address.country || 'India'}
      </p>
      <span className="phone">
        <i className="bi bi-telephone-fill"></i> {address.phone}
      </span>

      <div className="address-actions">
        <button type="button" className="btn-csr secondary" onClick={() => onEdit?.(address)}>
          <i className="bi bi-pencil"></i> Edit
        </button>
        {!address.isDefault && (
          <button type="button" className="btn-csr secondary" onClick={() => onMakeDefault?.(address.id)}>
            <i className="bi bi-star"></i> Set Default
          </button>
        )}
        {!address.isDefault && (
          <button type="button" className="btn-csr secondary" onClick={() => onRemove?.(address.id)}>
            <i className="bi bi-trash3"></i> Remove
          </button>
        )}
      </div>
    </div>
  )
}
