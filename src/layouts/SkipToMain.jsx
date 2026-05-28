// Accessibility: visible-on-focus skip link. Renders at the top of <AppLayout>.
// CSS lives in components.css under .skip-to-main.
export default function SkipToMain() {
  function handleClick() {
    const el = document.getElementById('main-content')
    if (el) {
      el.setAttribute('tabindex', '-1')
      el.focus()
    }
  }
  return (
    <a href="#main-content" className="skip-to-main" onClick={handleClick}>
      Skip to main content
    </a>
  )
}
