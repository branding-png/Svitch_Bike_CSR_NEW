// Claim process — 5-step timeline. Mirrors CSR_New_web `#claim-process`.
// Each step's body is JSX (so we keep the legacy <strong> emphasis).
const STEPS = [
  {
    num:  '01',
    icon: 'bi-phone',
    title: 'Reach Out',
    body: (
      <>
        Call our toll-free number, open the Svitch app, or walk into any
        authorised service centre. A warranty advisor will acknowledge
        within <strong>30 minutes</strong>.
      </>
    ),
  },
  {
    num:  '02',
    icon: 'bi-clipboard-check',
    title: 'Register Claim',
    body: (
      <>
        We log a <strong>digital job card</strong> with your VIN,
        registration number, and issue description. You receive an SMS +
        email reference number instantly.
      </>
    ),
  },
  {
    num:  '03',
    icon: 'bi-truck',
    title: 'Free Pickup',
    body: (
      <>
        A technician arrives at your address, inspects the bike on-site,
        and transports it to the service centre on a covered van —{' '}
        <strong>no cost to you</strong> during warranty.
      </>
    ),
  },
  {
    num:  '04',
    icon: 'bi-tools',
    title: 'Diagnose & Fix',
    body: (
      <>
        Certified technicians run full diagnostics, replace or repair
        using <strong>genuine parts</strong>, and perform road tests.
        Average turnaround: <strong>24–48 hours</strong>.
      </>
    ),
  },
  {
    num:  '05',
    icon: 'bi-check2-circle',
    title: 'Delivered Back',
    body: (
      <>
        Your CSR 762 is delivered back to your address, fully tested,
        cleaned, and ready to ride. You&apos;ll receive a{' '}
        <strong>detailed digital service report</strong>.
      </>
    ),
  },
]

export default function WarrantyClaim({ steps = STEPS }) {
  return (
    <section aria-label="WarrantyClaim" id="claim-process">
      <div className="container">
        <div className="section-header">
          <span className="section-label">How To Claim</span>
          <h2 className="section-title">
            Claim Process <span className="accent">In 5 Steps</span>
          </h2>
          <p className="section-desc">
            Hit a snag? Here&apos;s exactly how a warranty claim works —
            simple, transparent, and fast.
          </p>
        </div>

        <div className="claim-steps">
          {steps.map((s) => (
            <div key={s.num} className="card-base claim-step">
              <span className="claim-num">{s.num}</span>
              <div className="card-base-icon">
                <i className={`bi ${s.icon}`}></i>
              </div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
