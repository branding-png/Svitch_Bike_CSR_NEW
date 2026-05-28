export function scorePassword(pw = '') {
  let s = 0
  if (pw.length >= 8)              s += 1
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s += 1
  if (/\d/.test(pw))               s += 1
  if (/[^A-Za-z0-9]/.test(pw))     s += 1
  return s
}

export default function PasswordStrength({ value }) {
  const level = scorePassword(value)
  return (
    <div className="password-strength" data-level={level}>
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className={i < level ? 'is-on' : ''} />
      ))}
    </div>
  )
}
