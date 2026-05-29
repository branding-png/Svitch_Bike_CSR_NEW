// Shared row used inside the profile cards. Renders the label + sub-text on
// the left and either a checkbox toggle, a button, or arbitrary children on
// the right. Mirrors `.toggle-switch` markup used across the legacy page.
export default function ProfileToggleRow({ title, desc, checked, onChange, asLabel = true, children }) {
  const Tag = asLabel ? 'label' : 'div'
  return (
    <Tag aria-label="ProfileToggleRow" className="toggle-switch rajdhani-lbl-text-sm">
      <div className="toggle-switch-info">
        <strong>{title}</strong>
        {desc && <span>{desc}</span>}
      </div>
      {children != null ? children : (
        <input
          type="checkbox"
          checked={!!checked}
          onChange={(e) => onChange?.(e.target.checked)}
        />
      )}
    </Tag>
  )
}
