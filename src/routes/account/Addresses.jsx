import { useState } from 'react'
import { Link } from 'react-router-dom'
import AccountLayout  from '@/features/account/AccountLayout'
import AccountContent from '@/features/account/AccountContent'
import AddressGrid    from '@/features/account/addresses/AddressGrid'
import AddressModal   from '@/features/account/addresses/AddressModal'
import { useAddresses } from '@/contexts/AddressContext'
import { useUser }      from '@/contexts/UserContext'
import { useToast }     from '@/contexts/ToastContext'
import { PATHS }        from '@/utils/routes'
import '@/styles/sections/account.css'

export default function Addresses() {
  const { addresses, upsert, remove, makeDefault } = useAddresses()
  const { isAuthed } = useUser()
  const { show } = useToast()
  const [editing, setEditing] = useState(null) // null = closed; {} = add; { id, ... } = edit

  function openAdd()      { setEditing({}) }
  function openEdit(addr) { setEditing(addr) }
  function close()        { setEditing(null) }

  function handleSave(draft) {
    upsert(draft)
    show(draft.id ? 'Address updated.' : 'Address added.', 'success', 3000)
    close()
  }

  function handleRemove(id) {
    if (window.confirm('Remove this address?')) {
      remove(id)
      show('Address removed.', 'success', 2500)
    }
  }

  function handleMakeDefault(id) {
    makeDefault(id)
    show('Default address updated.', 'success', 2500)
  }

  return (
    <AccountLayout>
      <AccountContent
        crumbLabel="Addresses"
        title="Addresses"
        description="Manage your delivery addresses. The default is used at checkout."
      >
        {!isAuthed ? (
          <div className="card-base account-empty">
            <i className="bi bi-geo-alt"></i>
            <h3>Sign in to manage addresses</h3>
            <p>Saved addresses speed up checkout. Sign in or create a free Svitch account to start saving them.</p>
            <Link to={PATHS.login} className="btn-csr primary">
              <i className="bi bi-box-arrow-in-right"></i> Sign In
            </Link>
          </div>
        ) : (
          <>
            <AddressGrid
              addresses={addresses}
              onEdit={openEdit}
              onAdd={openAdd}
              onMakeDefault={handleMakeDefault}
              onRemove={handleRemove}
            />
            <AddressModal
              isOpen={editing != null}
              address={editing}
              onClose={close}
              onSave={handleSave}
            />
          </>
        )}
      </AccountContent>
    </AccountLayout>
  )
}
