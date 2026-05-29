import { useCallback, useEffect, useRef, useState } from 'react'
import SectionHeader from '@/ui/SectionHeader'

// 360° interactive product viewer — exact React port of CSR_New_web/main.js
// section 13. Drag to rotate, click a colour to swap. 121 webp frames per
// colour live under /public/images/360/{red|black|gray}/frame_NN.webp.
const COLORS = [
  { id: 'red',   label: 'Crimson Red',     swatch: '#8b0000' },
  { id: 'gray',  label: 'Steel Gray',      swatch: '#6b7280' },
  { id: 'black', label: 'Midnight Black',  swatch: '#0a0a0a' },
]
const TOTAL_FRAMES = 121
const PIX_PER_FRAME = 5 // drag distance to advance one frame

export default function Rotate360() {
  const viewerRef = useRef(null)
  const canvasRef = useRef(null)
  const framesCache = useRef({}) // { red: [HTMLImageElement × 121], ... }

  const [color, setColor] = useState('red')
  const [frame, setFrame] = useState(0)
  const [progress, setProgress] = useState(0) // 0-100 for current colour load
  const [loaded, setLoaded] = useState(false) // current colour fully loaded
  const [hintHidden, setHintHidden] = useState(false)

  // Refs for drag state — values change every mousemove, don't trigger renders
  const drag = useRef({ active: false, startX: 0, frameAt: 0 })

  // ─── Drawing ──────────────────────────────────────────────────────
  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const colorFrames = framesCache.current[color]
    if (!colorFrames?.[frame] || !colorFrames[frame].complete) return
    const img = colorFrames[frame]
    const ctx = canvas.getContext('2d')
    const cw = canvas.width
    const ch = canvas.height
    ctx.clearRect(0, 0, cw, ch)
    const scale = Math.min(cw / img.naturalWidth, ch / img.naturalHeight)
    const w = img.naturalWidth * scale
    const h = img.naturalHeight * scale
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h)
  }, [color, frame])

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const viewer = viewerRef.current
    if (!canvas || !viewer) return
    const rect = viewer.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    drawFrame()
  }, [drawFrame])

  // ─── Frame loading (lazy per colour) ──────────────────────────────
  useEffect(() => {
    // Already loaded? Just redraw.
    if (framesCache.current[color]?.length === TOTAL_FRAMES &&
        framesCache.current[color].every((img) => img.complete)) {
      setLoaded(true)
      setProgress(100)
      resizeCanvas()
      return
    }

    setLoaded(false)
    setProgress(0)
    framesCache.current[color] = []
    let done = 0
    let cancelled = false

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image()
      const handle = () => {
        if (cancelled) return
        done++
        setProgress(Math.round((done / TOTAL_FRAMES) * 100))
        if (done === TOTAL_FRAMES) {
          setLoaded(true)
          resizeCanvas()
        }
      }
      img.onload = handle
      img.onerror = handle
      const num = String(i + 1).padStart(2, '0')
      img.src = `/images/360/${color}/frame_${num}.webp`
      framesCache.current[color][i] = img
    }

    return () => { cancelled = true }
  }, [color, resizeCanvas])

  // Redraw whenever the frame index changes
  useEffect(() => { drawFrame() }, [drawFrame])

  // Resize listener
  useEffect(() => {
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [resizeCanvas])

  // ─── Drag handlers ────────────────────────────────────────────────
  function onPointerDown(clientX) {
    drag.current.active = true
    drag.current.startX = clientX
    drag.current.frameAt = frame
    setHintHidden(true)
  }
  function onPointerMove(clientX) {
    if (!drag.current.active) return
    const dx = clientX - drag.current.startX
    const delta = Math.round(dx / PIX_PER_FRAME)
    const next = ((drag.current.frameAt + delta) % TOTAL_FRAMES + TOTAL_FRAMES) % TOTAL_FRAMES
    setFrame(next)
  }
  function onPointerUp() { drag.current.active = false }

  useEffect(() => {
    const onMouseMove = (e) => onPointerMove(e.clientX)
    const onMouseUp = () => onPointerUp()
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [frame])

  return (
    <section id="rotate360" aria-label="Rotate360">
      <div className="container p-0">
        <SectionHeader
          label="Interactive View"
          titleStart="360°"
          titleAccent="Explore"
          description="Scroll or drag to rotate. Click a color to switch."
          descriptionClassName="rajdhani-lbl-text-sm"
        />

        <div className="rotate-color-selector reveal">
          {COLORS.map((c) => (
            <button
              key={c.id}
              type="button"
              className={'rotate-color-btn rajdhani-lbl-text-sm' + (color === c.id ? ' active' : '')}
              onClick={() => setColor(c.id)}
            >
              <span className="rc-swatch" style={{ background: c.swatch }} />
              {c.label}
            </button>
          ))}
        </div>

        <div
          className="rotate-viewer"
          id="rotateViewer"
          ref={viewerRef}
          onMouseDown={(e) => { e.preventDefault(); onPointerDown(e.clientX) }}
          onTouchStart={(e) => onPointerDown(e.touches[0].clientX)}
          onTouchMove={(e) => { e.preventDefault(); onPointerMove(e.touches[0].clientX) }}
          onTouchEnd={onPointerUp}
        >
          <canvas id="rotateCanvas" ref={canvasRef} />
          <div className={'rotate-hint rajdhani-lbl-text-sm' + (hintHidden ? ' hidden' : '')}>
            <i className="bi bi-arrows-move"></i> Drag to rotate
          </div>
          <div
            className={'rotate-progress' + (loaded ? ' loaded' : '')}
            id="rotateProgress"
          >
            <span className="rajdhani-lbl-text-sm">Loading 360°...</span>
            <div className="rotate-progress-bar">
              <div
                className="rotate-progress-fill"
                id="rotateProgressFill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
