import { useEffect, useRef } from 'react'

// 6-digit OTP grid with:
//   • auto-advance on input
//   • Backspace stepping back to previous box
//   • ArrowLeft / ArrowRight navigation
//   • Paste-anywhere (clipboard fills all boxes from any focused cell)
//   • Auto-focus first cell on mount
//
// Usage:
//   <OtpInput
//     value={digits}            // array of strings, length === length
//     onChange={setDigits}      // (next: string[]) => void
//     length={6}
//     ariaLabel="Enter the 6-digit code"
//     className="otp-row"       // 'otp-inputs' on auth pages, 'otp-row' on 2fa
//   />
//
// The component is fully controlled — parent owns `digits` state, so submit
// handlers can read it via `digits.join('')`.
export default function OtpInput({
  value = ['', '', '', '', '', ''],
  onChange,
  length = 6,
  ariaLabel = 'Enter the 6-digit code',
  className = 'otp-inputs',
  autoFocus = true,
  disabled = false,
}) {
  const refs = useRef([])

  useEffect(() => {
    if (autoFocus) refs.current[0]?.focus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function update(i, raw) {
    const clean = raw.replace(/\D/g, '').slice(0, 1)
    const next = [...value]
    next[i] = clean
    onChange?.(next)
    if (clean && i < length - 1) refs.current[i + 1]?.focus()
  }

  function handleKey(i, ev) {
    if (ev.key === 'Backspace' && !value[i] && i > 0) refs.current[i - 1]?.focus()
    if (ev.key === 'ArrowLeft'  && i > 0) refs.current[i - 1]?.focus()
    if (ev.key === 'ArrowRight' && i < length - 1) refs.current[i + 1]?.focus()
  }

  function handlePaste(ev) {
    const raw = (ev.clipboardData?.getData('text') || '').replace(/\D/g, '').slice(0, length)
    if (!raw) return
    ev.preventDefault()
    const next = Array(length).fill('')
    for (let i = 0; i < raw.length; i++) next[i] = raw[i]
    onChange?.(next)
    refs.current[Math.min(raw.length, length - 1)]?.focus()
  }

  // Pad / truncate `value` to match `length` so consumers can pass shorter arrays.
  const digits = (() => {
    const a = Array.from({ length }, (_, i) => value[i] ?? '')
    return a
  })()

  return (
    <div className={className} role="group" aria-label={ariaLabel} onPaste={handlePaste}>
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          type="text"
          maxLength={1}
          inputMode="numeric"
          pattern="[0-9]"
          autoComplete="one-time-code"
          aria-label={`Digit ${i + 1} of ${length}`}
          className={d ? 'is-filled' : ''}
          value={d}
          disabled={disabled}
          onChange={(e) => update(i, e.target.value)}
          onKeyDown={(e) => handleKey(i, e)}
          onPaste={handlePaste}
        />
      ))}
    </div>
  )
}
