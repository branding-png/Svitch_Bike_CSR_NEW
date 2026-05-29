import AddressCard from './AddressCard'
import AddressAddCard from './AddressAddCard'

export default function AddressGrid({ addresses, onEdit, onAdd, onMakeDefault, onRemove }) {
  return (
    <div aria-label="AddressGrid" className="address-grid">
      {addresses.map((a) => (
        <AddressCard
          key={a.id}
          address={a}
          onEdit={onEdit}
          onMakeDefault={onMakeDefault}
          onRemove={onRemove}
        />
      ))}
      <AddressAddCard onAdd={onAdd} />
    </div>
  )
}
