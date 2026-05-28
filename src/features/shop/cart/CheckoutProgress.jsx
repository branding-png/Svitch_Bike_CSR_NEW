// Cart → Checkout → Payment → Confirm progress bar. Used by Cart, Checkout,
// Payment, and OrderConfirmation pages.
//   step=0 → Cart active
//   step=1 → Cart done, Checkout active
//   step=2 → Cart + Checkout done, Payment active
//   step=3 → Everything done, Confirm active (all-done state)
const STEPS = [
  { num: 1, label: 'Cart',     icon: 'bi-bag'                    },
  { num: 2, label: 'Checkout', icon: 'bi-truck'                  },
  { num: 3, label: 'Payment',  icon: 'bi-credit-card-2-front'    },
  { num: 4, label: 'Confirm',  icon: 'bi-check-circle'           },
]

export default function CheckoutProgress({ step = 0 }) {
  const lastIdx  = STEPS.length - 1
  const clamped  = Math.max(0, Math.min(step, lastIdx))
  const progress = Math.round((clamped / lastIdx) * 100)
  const allDone  = clamped >= lastIdx

  return (
    <div className="checkout-progress" data-progress={progress}>
      {STEPS.map((s, i) => {
        const done   = i < clamped || (i === clamped && allDone)
        const active = i === clamped
        const cls    = [
          'checkout-progress-step',
          done   ? 'is-done'   : '',
          active ? 'is-active' : '',
        ].filter(Boolean).join(' ')
        return (
          <div aria-label="CheckoutProgress" role="region" key={s.num} className={cls}>
            <span className="step-num">
              {done ? <i className="bi bi-check2" aria-hidden="true" /> : s.num}
            </span>
            <span className="step-label rajdhani-lbl-text-sm">
              <i className={`bi ${s.icon}`} aria-hidden="true" /> {s.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
