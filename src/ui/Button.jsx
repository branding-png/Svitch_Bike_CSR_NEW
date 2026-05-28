import { Link } from 'react-router-dom'

// Wrapper around .btn-csr. Renders <button> by default; pass `to` to
// render as <Link>, or `href` to render as an external <a>. Icon support
// via the `icon` prop (Bootstrap Icons class without the "bi " prefix).
export default function Button({
  variant = 'primary',     // 'primary' | 'secondary'
  size,                    // undefined | 'sm'
  to,
  href,
  icon,
  iconRight,
  type = 'button',
  className = '',
  children,
  ...rest
}) {
  const cls = ['btn-csr', variant, size, 'rajdhani-lbl-text-sm', className]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {icon && <i className={`bi bi-${icon}`}></i>}
      {children}
      {iconRight && <i className={`bi bi-${iconRight}`}></i>}
    </>
  )

  if (to) return <Link to={to} className={cls} {...rest}>{content}</Link>
  if (href) return <a href={href} className={cls} {...rest}>{content}</a>
  return <button type={type} className={cls} {...rest}>{content}</button>
}
