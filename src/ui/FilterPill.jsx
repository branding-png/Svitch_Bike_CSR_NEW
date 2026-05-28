// Wrapper around .filter-pill (formerly .blog-pill / .dept-pill / .ev-tab /
// .faq-tab / .gl-filter — all unified into a single class).
export default function FilterPill({ active, children, className = '', ...rest }) {
  return (
    <button
      type="button"
      className={'filter-pill' + (active ? ' is-active' : '') + (className ? ' ' + className : '')}
      {...rest}
    >
      {children}
    </button>
  )
}
