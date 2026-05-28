// Wrapper around .toggle-switch. Controlled by `checked` + `onChange`.
export default function ToggleSwitch({ checked, onChange, label, disabled, id }) {
  const inputId = id || `toggle-${Math.random().toString(36).slice(2, 8)}`
  return (
    <label className="toggle-switch" htmlFor={inputId}>
      <input
        id={inputId}
        type="checkbox"
        checked={!!checked}
        onChange={(e) => onChange?.(e.target.checked, e)}
        disabled={disabled}
      />
      <span className="toggle-slider"></span>
      {label && <span className="toggle-label rajdhani-lbl-text-sm">{label}</span>}
    </label>
  )
}
