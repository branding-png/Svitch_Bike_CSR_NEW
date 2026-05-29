import InputControl from '@/ui/InputControl'

// Checkout â€” Order Notes (optional) section.
export default function NotesSection({ form, onChange }) {
  return (
    <div aria-label="NotesSection" className="card-base checkout-section">
      <h3><i className="bi bi-journal-text"></i> Order Notes (Optional)</h3>
      <InputControl
        as="textarea"
        placeholder="Delivery instructions, preferred time, etc."
        value={form.notes}
        onChange={(v) => onChange('notes', v)}
      />
    </div>
  )
}
