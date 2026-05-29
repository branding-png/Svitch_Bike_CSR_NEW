const STEPS = [
  { num: 1, label: 'Personal' },
  { num: 2, label: 'Security' },
  { num: 3, label: 'Preferences' },
]

// Step indicator with a thin progress bar above the tabs. Bar fills from 0%
// at step 1 â†’ 50% at step 2 â†’ 100% at step 3 so users see how far along
// they are.
export default function RegisterStepTabs({ step }) {
  const total = STEPS.length
  const pct = total > 1 ? Math.round(((step - 1) / (total - 1)) * 100) : 100

  return (
    <>
      <div
        className="step-progress"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        aria-label={`Step ${step} of ${total}`}
      >
        <div className="step-progress-bar" style={{ width: `${pct}%` }} />
      </div>

      <div className="step-tabs">
        {STEPS.map((s) => {
          const done = step > s.num
          const active = step === s.num
          return (
            <div aria-label="RegisterStepTabs"
              key={s.num}
              className={
                'step-tab rajdhani-lbl-text-sm' +
                (active ? ' is-active' : '') +
                (done   ? ' is-done'   : '')
              }
            >
              <span className="step-tab-num rajdhani-lbl-text-sm">
                {done ? <i className="bi bi-check2"></i> : s.num}
              </span>
              {s.label}
            </div>
          )
        })}
      </div>
    </>
  )
}
