// "Our Interview Process" — mirrors CSR_New_web `.job-section` (Process variant).
// Step numbers are derived from the array index, so reordering Just Works.
const DEFAULT_STEPS = [
  { title: 'Application Review',     desc: 'Our HR team reviews your application within 48–72 hours. Shortlisted candidates receive a screening call.'                       },
  { title: 'Technical Screening',    desc: '30-minute phone screen with our Lead Engineer covering fundamentals — motor control, BMS, and embedded systems.'                  },
  { title: 'Technical Assignment',   desc: 'A take-home design problem (3–4 hours) — typically a BMS cell-balancing or motor-drive circuit-design challenge.'                 },
  { title: 'In-Person Panel Interview', desc: '2-hour session at our Ahmedabad office with the Engineering Head and CTO. Assignment review, system design, and culture fit.' },
  { title: 'Offer & Onboarding',     desc: 'Background verification and offer rollout within 5 working days. We aim to get great people onboard fast.'                         },
]

export default function InterviewProcess({
  title = 'Our Interview Process',
  icon  = 'bi-signpost-split-fill',
  steps = DEFAULT_STEPS,
}) {
  return (
    <section className="card-base job-section">
      <h2><i className={`bi ${icon}`}></i> {title}</h2>
      <div className="process-steps">
        {steps.map((s, i) => (
          <div key={s.title} className="process-step">
            <div className="process-num">{i + 1}</div>
            <div className="process-body">
              <h5>{s.title}</h5>
              <p>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
