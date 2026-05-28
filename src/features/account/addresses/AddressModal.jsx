import { useEffect, useState } from 'react'
import { Modal } from '@/ui'
import InputControl from '@/ui/InputControl'

const EMPTY = {
  id:      '',
  label:   'Home',
  name:    '',
  line1:   '',
  line2:   '',
  city:    '',
  state:   '',
  pincode: '',
  country: 'India',
  phone:   '',
  isDefault: false,
}

const LABEL_OPTIONS = [
  { value: 'Home',  icon: 'bi-house-fill'     },
  { value: 'Work',  icon: 'bi-briefcase-fill' },
  { value: 'Other', icon: 'bi-geo-alt-fill'   },
]

function validate(f) {
  const e = {}
  if (!f.name  || f.name.trim().length  < 3) e.name  = "Please enter the recipient's full name."
  if (!/^[6-9]\d{9}$/.test(f.phone))          e.phone = 'Please enter a valid 10-digit mobile number.'
  if (!f.line1 || f.line1.trim().length < 4) e.line1 = 'Please enter your street address.'
  if (!f.city)                                e.city  = 'Please enter your city.'
  if (!f.state)                               e.state = 'Please enter your state.'
  if (!/^\d{6}$/.test(f.pincode))             e.pincode = 'Please enter a valid 6-digit PIN code.'
  return e
}

// Reusable Add/Edit address modal. Drives the AddressContext upsert.
export default function AddressModal({ isOpen, onClose, address, onSave }) {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (isOpen) {
      setForm(address ? { ...EMPTY, ...address } : EMPTY)
      setErrors({})
    }
  }, [isOpen, address])

  const set = (key) => (v) => {
    setForm((f) => {
      let val = v
      if (key === 'pincode') val = String(val).replace(/\D/g, '').slice(0, 6)
      if (key === 'phone')   val = String(val).replace(/\D/g, '').slice(0, 10)
      const next  = { ...f, [key]: val }
      const fresh = validate(next)
      setErrors((errs) => ({ ...errs, [key]: fresh[key] }))
      return next
    })
  }

  function submit(ev) {
    ev.preventDefault()
    const e = validate(form)
    setErrors(e)
    if (Object.keys(e).length) return
    onSave?.(form)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      title={address?.id ? 'Edit Address' : 'Add Address'}
      subtitle={address?.id ? `Editing ${address.label}` : 'Save a delivery address for faster checkout'}
      footer={
        <>
          <button type="button" className="btn-csr secondary" onClick={onClose}>
            <i className="bi bi-x-lg"></i> Cancel
          </button>
          <button type="submit" form="addressForm" className="btn-csr primary">
            <i className="bi bi-check2-circle"></i>{' '}
            {address?.id ? 'Save Changes' : 'Save Address'}
          </button>
        </>
      }
    >
      <form id="addressForm" onSubmit={submit} noValidate>
        {/* Label picker — segmented buttons matching the addr-type-group style. */}
        <div className="form-group">
          <label className="rajdhani-lbl-text-sm">Address Type <span className="required-star">*</span></label>
          <div className="addr-type-group">
            {LABEL_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className={`addr-type-btn${form.label === opt.value ? ' is-active' : ''}`}
              >
                <input
                  type="radio"
                  name="address-label"
                  value={opt.value}
                  checked={form.label === opt.value}
                  onChange={() => set('label')(opt.value)}
                />
                <i className={`bi ${opt.icon}`}></i> {opt.value}
              </label>
            ))}
          </div>
        </div>

        <InputControl
          label="Full Name"
          placeholder="Recipient's full name"
          value={form.name} onChange={set('name')}
          required error={errors.name}
          autoComplete="name"
        />
        <InputControl
          label="Mobile" type="tel"
          placeholder="10-digit mobile number"
          value={form.phone} onChange={set('phone')}
          required error={errors.phone}
          maxLength={10}
          inputMode="numeric"
          autoComplete="tel"
        />
        <InputControl
          label="Address Line 1"
          placeholder="House / Flat no., Building, Street"
          value={form.line1} onChange={set('line1')}
          required error={errors.line1}
          autoComplete="address-line1"
        />
        <InputControl
          label="Address Line 2"
          placeholder="Area, Landmark (optional)"
          value={form.line2} onChange={set('line2')}
          autoComplete="address-line2"
        />

        <div className="form-row">
          <InputControl
            label="City"
            placeholder="e.g. Ahmedabad"
            value={form.city} onChange={set('city')}
            required error={errors.city}
            autoComplete="address-level2"
          />
          <InputControl
            label="State"
            placeholder="e.g. Gujarat"
            value={form.state} onChange={set('state')}
            required error={errors.state}
            autoComplete="address-level1"
          />
        </div>

        <InputControl
          label="PIN Code"
          placeholder="6-digit PIN"
          value={form.pincode} onChange={set('pincode')}
          required error={errors.pincode}
          maxLength={6}
          inputMode="numeric"
          autoComplete="postal-code"
        />

        <label className="form-check rajdhani-lbl-text-sm" style={{ textTransform: 'none', marginTop: 8 }}>
          <input
            type="checkbox"
            checked={!!form.isDefault}
            onChange={(e) => set('isDefault')(e.target.checked)}
          />{' '}
          Set as default delivery address
        </label>
      </form>
    </Modal>
  )
}
