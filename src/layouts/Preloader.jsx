import { useEffect, useState } from 'react'

// Site preloader — mirrors CSR_New_web's #csr-preloader markup and behaviour.
// Counts 0→100% on a fast tick (~2s total), then waits for window.load
// before fading out. A 3s hard fallback guarantees we never trap the user
// if an asset hangs. Shows on every full page refresh (matches static site);
// SPA route changes do NOT re-trigger it because AppLayout stays mounted.
const PATH_LENGTH = 2000 // matches stroke-dasharray on the SVG border path

export default function Preloader() {
  const [visible, setVisible] = useState(true)
  const [pct, setPct] = useState(0)
  const [finishing, setFinishing] = useState(false)

  useEffect(() => {
    if (!visible) return

    let percentage = 0
    let windowLoaded = false
    let animationDone = false

    function tryFinish() {
      if (!windowLoaded || !animationDone) return
      setFinishing(true)
      setTimeout(() => setVisible(false), 400)
    }

    // Gate 1: window load event
    const onLoad = () => { windowLoaded = true; tryFinish() }
    if (document.readyState === 'complete') windowLoaded = true
    else window.addEventListener('load', onLoad, { once: true })

    // Safety net: force-close after 3 s no matter what
    const safety = setTimeout(() => { windowLoaded = true; tryFinish() }, 3000)

    // Gate 2: 0→100 animation (~2 s total)
    const tick = setInterval(() => {
      if (percentage <= 100) {
        setPct(percentage)
        percentage++
      } else {
        clearInterval(tick)
        animationDone = true
        tryFinish()
      }
    }, 20)

    return () => {
      window.removeEventListener('load', onLoad)
      clearInterval(tick)
      clearTimeout(safety)
    }
  }, [visible])

  if (!visible) return null

  const strokeOffset = PATH_LENGTH - (PATH_LENGTH * (pct / 100))

  return (
    <div id="csr-preloader" className={finishing ? 'preloader-finish' : ''}>
      <div className="preloader-content">
        <svg className="logo-svg" viewBox="0 0 500 600" xmlns="http://www.w3.org/2000/svg">
          <path
            className="border-path"
            d="M250,50 L450,150 L450,300 Q450,450 250,550 Q50,450 50,300 L50,150 Z"
            style={{ strokeDashoffset: strokeOffset }}
          />
        </svg>
        <img
          src="/images/icons/preloader-w.png"
          alt="CSR 762 Logo"
          className="preloader-logo"
          style={pct > 50 ? { opacity: 1, transform: 'translateY(0)' } : undefined}
          loading="eager"
          decoding="async"
        />
        <div className="percentage-text">{pct}%</div>
        <div className="loading-bar-container">
          <div className="loading-bar" style={{ width: `${pct}%` }}></div>
        </div>
      </div>
    </div>
  )
}
