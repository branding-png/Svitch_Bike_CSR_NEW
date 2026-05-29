import { useEffect, useState } from 'react'

// "Back to top" button. Shown on every page via <AppLayout>.
// The site's scroll container is `.wrapper-body` (html/body have
// overflow: hidden), so we listen to *its* scroll — not the window — and
// scroll *it* back to top on click.
export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const wrap = document.querySelector('.wrapper-body')
    if (!wrap) return
    const onScroll = () => setVisible(wrap.scrollTop > 400)
    onScroll() // sync initial state
    wrap.addEventListener('scroll', onScroll, { passive: true })
    return () => wrap.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    const wrap = document.querySelector('.wrapper-body')
    if (wrap) wrap.scrollTo({ top: 0, behavior: 'smooth' })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div id="move-top" className={visible ? 'active' : ''}>
      <button type="button" onClick={scrollToTop} aria-label="Back to top">
        <span className="bi bi-arrow-up"></span>
      </button>
    </div>
  )
}
