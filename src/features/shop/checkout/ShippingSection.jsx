import { useEffect, useMemo } from 'react'
import InputControl from '@/ui/InputControl'
import { useAddresses } from '@/contexts/AddressContext'
import { useUser } from '@/contexts/UserContext'

const STATES = [
  'Gujarat', 'Maharashtra', 'Karnataka', 'Delhi', 'Tamil Nadu',
  'Telangana', 'West Bengal', 'Rajasthan', 'Other',
]

// Checkout — Shipping Address section.
// Controlled: parent owns `form`/`errors` and passes `onChange(key, value)`.
//
// Pre-fills with the user's default saved address on first mount (and lets
// them swap to any other saved address from the picker).
export default function ShippingSection({ form, errors = {}, onChange }) {
  const { addresses, getDefault } = useAddresses()
  const { isAuthed } = useUser()

  // Only show saved addresses + auto-prefill for signed-in users. Guests
  // always start with an empty form.
  const savedOptions = useMemo(() => {
    if (!isAuthed) return null
    return [
      { value: '', label: '+ Use a new address' },
      ...addresses.map((a) => ({
        value: a.id,
        label: `${a.label} — ${a.line1}, ${a.city}${a.isDefault ? '  · default' : ''}`,
      })),
    ]
  }, [addresses, isAuthed])

  // Pre-fill from default address on first render — only when authenticated
  // and the form is still empty.
  useEffect(() => {
    if (!isAuthed) return
    if (form.address1 || form.savedAddr) return
    const def = getDefault()
    if (!def) return
    onChange('savedAddr', def.id)
    onChange('address1',  def.line1 || '')
    onChange('address2',  def.line2 || '')
    onChange('city',      def.city  || '')
    onChange('state',     def.state || '')
    onChange('pin',       def.pincode || '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthed])

  function pickAddress(id) {
    onChange('savedAddr', id)
    if (!id) {
      onChange('address1', '')
      onChange('address2', '')
      onChange('city', '')
      onChange('state', '')
      onChange('pin', '')
      return
    }
    const picked = addresses.find((a) => a.id === id)
    if (!picked) return
    onChange('address1', picked.line1 || '')
    onChange('address2', picked.line2 || '')
    onChange('city',     picked.city  || '')
    onChange('state',    picked.state || '')
    onChange('pin',      picked.pincode || '')
  }

  return (
    <div aria-label="ShippingSection" role="region" className="card-base checkout-section">
      <h3><i className="bi bi-truck"></i> Shipping Address</h3>

      {savedOptions && (
        <div className="form-grid cols-1">
          <InputControl
            as="select" label="Select Saved Address"
            value={form.savedAddr || ''}
            onChange={pickAddress}
            options={savedOptions}
          />
        </div>
      )}

      <div className="form-grid cols-1" style={{ marginTop: 14 }}>
        <div data-field="address1">
          <InputControl
            label="Address Line 1" required
            placeholder="Flat, house no., building, street"
            value={form.address1}
            onChange={(v) => onChange('address1', v)}
            error={errors.address1} minLength={5}
          />
        </div>
        <InputControl
          label="Address Line 2"
          placeholder="Landmark (optional)"
          value={form.address2}
          onChange={(v) => onChange('address2', v)}
        />
      </div>

      <div className="form-grid cols-3" style={{ marginTop: 14 }}>
        <div data-field="city">
          <InputControl
            label="City" required placeholder="e.g. Mumbai"
            value={form.city}
            onChange={(v) => onChange('city', v)}
            error={errors.city} minLength={2}
          />
        </div>
        <div data-field="state">
          <InputControl
            as="select" label="State" required
            placeholder="Select"
            value={form.state}
            onChange={(v) => onChange('state', v)}
            options={STATES}
            error={errors.state}
          />
        </div>
        <div data-field="pin">
          <InputControl
            label="PIN" required placeholder="6-digit PIN"
            value={form.pin}
            onChange={(v) => onChange('pin', v.replace(/\D/g, '').slice(0, 6))}
            error={errors.pin}
            maxLength={6}
            inputMode="numeric"
            autoComplete="postal-code"
          />
        </div>
      </div>
    </div>
  )
}
