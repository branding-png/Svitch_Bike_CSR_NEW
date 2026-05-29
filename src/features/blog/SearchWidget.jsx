import InputControl from '@/ui/InputControl'

// Blog sidebar "Search" widget — mirrors CSR_New_web `.widget-search`.
// Uses the shared <InputControl> primitive so any future validation styling
// (is-invalid red border, hint text) comes for free.
// `.widget-search` is `position: relative` and the submit button is positioned
// absolutely on top of the input, so the InputControl wrapper sits inside the
// form without disturbing layout.
export default function SearchWidget({
  query    = '',
  onChange,
  onSubmit,
  title       = 'Search',
  placeholder = 'Search articles...',
}) {
  function submit(e) {
    e.preventDefault()
    onSubmit?.(query)
  }

  return (
    <div aria-label="SearchWidget" className="card-base widget">
      <h3 className="widget-title">{title}</h3>
      <form className="widget-search" onSubmit={submit} role="search">
        <InputControl
          type="search"
          id="blogSearch"
          placeholder={placeholder}
          value={query}
          onChange={(v) => onChange?.(v)}
        />
        <button type="submit" aria-label="Search">
          <i className="bi bi-search"></i>
        </button>
      </form>
    </div>
  )
}
