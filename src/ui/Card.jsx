// Wrapper around .card-base. Use `as` to swap the underlying element.
export default function Card({ as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag className={`card-base ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
