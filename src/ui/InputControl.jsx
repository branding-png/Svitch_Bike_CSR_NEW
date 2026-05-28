// Generic form-control primitive — bundles label + input/select + required
// marker + error message in one component so consumers don't repeat the
// .form-group / .invalid-feedback boilerplate.
//
// Usage:
//   <InputControl label="Full Name" value={name} onChange={setName}
//                required error={errors.name} />
//
//   <InputControl label="Email" type="email" value={...} onChange={...} />
//
//   <InputControl as="select" label="City" value={city} onChange={setCity}
//                options={["Mumbai", "Delhi", ...]} required />
//
//   <InputControl as="textarea" label="Message" rows={5} value={...} onChange={...} />
//
// onChange is always called as `onChange(value, event)`. Consumers pick which:
//   onChange={(v) => setX(v)}      // most common — just the value
//   onChange={(value, e) => ...}   // if you need the raw DOM event too

let __idSeq = 0
function genId(label) {
  __idSeq += 1
  const slug = (label || "field").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
  return `fc-${slug || "input"}-${__idSeq}`
}

export default function InputControl({
  as = "input",
  type = "text",
  label,
  value,
  onChange,
  required,
  error,
  hint,
  placeholder,
  options,        // for select: array of strings or { value, label } objects
  rows = 4,       // for textarea
  className = "",
  id,
  ...rest
}) {
  // Lazy-init the id so it's stable across re-renders (closure captures it).
  const inputId = id || (InputControl.__cache.get(label) || (() => {
    const next = genId(label)
    InputControl.__cache.set(label, next)
    return next
  })())

  // Always call onChange with two positional arguments: (value, event).
  // Consumers pick which one they want — `(v) => setX(v)` for the value,
  // `(_, e) => ...` if they need the raw DOM event.
  function handleChange(e) {
    onChange?.(e.target.value, e)
  }

  const hasError = Boolean(error)
  // Mark the group as `.is-valid` (green border) once a required field has a
  // non-empty value AND no error has been set by the parent. Optional fields
  // stay neutral. Consumers can also pass `valid` explicitly to override.
  const filled  = value != null && String(value).trim() !== ""
  const isValid = !hasError && (rest.valid === true || (required && filled))
  // Strip our pseudo-prop so it doesn't land on the DOM node
  if ("valid" in rest) delete rest.valid

  const groupCls = [
    "form-group",
    hasError ? "is-invalid" : "",
    isValid  ? "is-valid"   : "",
    className,
  ].filter(Boolean).join(" ")

  return (
    <div className={groupCls}>
      {label && (
        <label className="rajdhani-lbl-text-sm" htmlFor={inputId}>
          {label}
          {required && <span className="required-star"> *</span>}
        </label>
      )}

      {as === "textarea" ? (
        <textarea
          id={inputId}
          value={value ?? ""}
          onChange={handleChange}
          placeholder={placeholder}
          rows={rows}
          {...rest}
        />
      ) : as === "select" ? (
        <select id={inputId} value={value ?? ""} onChange={handleChange} {...rest}>
          {placeholder && (
            <option value="" disabled>{placeholder}</option>
          )}
          {(options || []).map((opt) => {
            const v = typeof opt === "string" ? opt : opt.value
            const t = typeof opt === "string" ? opt : opt.label
            return <option key={v} value={v}>{t}</option>
          })}
        </select>
      ) : (
        <input
          id={inputId}
          type={type}
          value={value ?? ""}
          onChange={handleChange}
          placeholder={placeholder}
          {...rest}
        />
      )}

      {hint && !hasError && <div className="form-hint">{hint}</div>}
      {hasError && (
        <div className="invalid-feedback" style={{ display: "block" }}>
          {error}
        </div>
      )}
    </div>
  )
}

// Per-label id cache so the auto-generated id is stable across re-renders.
InputControl.__cache = new Map()
