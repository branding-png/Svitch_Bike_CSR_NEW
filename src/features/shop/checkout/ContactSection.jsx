import InputControl from '@/ui/InputControl'

// Checkout — Contact Information section.
// Controlled: parent owns `form`/`errors` and passes `onChange(key, value)`.
export default function ContactSection({ form, errors = {}, onChange }) {
  return (
    <div aria-label="ContactSection" role="region" className="card-base checkout-section">
      <h3><i className="bi bi-person-vcard"></i> Contact Information</h3>

      <div className="form-grid">
        <div data-field="firstName">
          <InputControl
            label="First Name" required
            placeholder="Enter your first name"
            value={form.firstName}
            onChange={(v) => onChange('firstName', v)}
            error={errors.firstName} minLength={2}
          />
        </div>

        <div data-field="lastName">
          <InputControl
            label="Last Name" required
            placeholder="Enter your last name"
            value={form.lastName}
            onChange={(v) => onChange('lastName', v)}
            error={errors.lastName} minLength={2}
          />
        </div>

        <div data-field="email">
          <InputControl
            label="Email" required type="email"
            placeholder="rider@svitch.bike"
            value={form.email}
            onChange={(v) => onChange('email', v)}
            error={errors.email}
          />
        </div>

        <div data-field="mobile">
          <InputControl
            label="Mobile" required type="tel"
            placeholder="10-digit mobile number"
            value={form.mobile}
            onChange={(v) => onChange('mobile', v.replace(/\D/g, '').slice(0, 10))}
            error={errors.mobile}
            maxLength={10}
            inputMode="numeric"
            autoComplete="tel-national"
          />
        </div>
      </div>
    </div>
  )
}
