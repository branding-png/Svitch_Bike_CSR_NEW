import InputControl from '@/ui/InputControl'

export default function RegisterStepPersonal({ form, errors, set, onNext }) {
  return (
    <div className="step-panel is-active" data-panel="1">
      <div className="auth-form-fields">
        <div className="form-grid">
          <InputControl
            label="First Name"
            value={form.firstName}
            onChange={set('firstName')}
            required
            minLength={2}
            error={errors.firstName}
            autoComplete="given-name"
          />
          <InputControl
            label="Last Name"
            value={form.lastName}
            onChange={set('lastName')}
            required
            minLength={2}
            error={errors.lastName}
            autoComplete="family-name"
          />
        </div>
        <InputControl
          label="Email" type="email"
          value={form.email} onChange={set('email')}
          required error={errors.email}
          autoComplete="email"
        />
        <div className="form-grid">
        <InputControl
          label="Mobile" type="tel"
          placeholder="10-digit mobile number"
          value={form.mobile} onChange={set('mobile')}
          required error={errors.mobile}
          maxLength={10}
          autoComplete="tel"
        />
        <InputControl
          label="Date of Birth" type="date"
          value={form.dob} onChange={set('dob')}
        /></div>
      </div>
      <div className="step-nav">
        <span></span>
        <button type="button" className="btn-csr primary next-step" onClick={onNext}>
          Continue <i className="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>
  )
}
