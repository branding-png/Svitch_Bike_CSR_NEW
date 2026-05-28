// Wrapper around the .form-group pattern from components.css. Bundles label,
// optional required marker, the input (passed as `children` so consumers
// control type/placeholder), and an error message slot.
// Pass `valid={true}` (e.g. when the field has a value and no error) to flip
// the wrapper into the green `.is-valid` state.
export default function FormGroup({
  label,
  htmlFor,
  required,
  error,
  valid,
  hint,
  className = '',
  children,
}) {
  const hasError = Boolean(error)
  const isValid  = !hasError && Boolean(valid)
  const cls = [
    'form-group',
    hasError ? 'is-invalid' : '',
    isValid  ? 'is-valid'   : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div className={cls}>
      {label && (
        <label className="rajdhani-lbl-text-sm" htmlFor={htmlFor}>
          {label}
          {required && <span className="required-star"> *</span>}
        </label>
      )}
      {children}
      {hint && !hasError && <div className="form-hint">{hint}</div>}
      {hasError && <div className="invalid-feedback" style={{ display: 'block' }}>{error}</div>}
    </div>
  )
}
