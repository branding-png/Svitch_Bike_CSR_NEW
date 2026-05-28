import { PHONES } from '@/data/contact-info'

// "How It Works" — 3-step explainer on the Roadside Assistance page.
// Mirrors CSR_New_web `.section-pad-alt` block.
export default function RsaHowItWorks() {
  const tollFree = PHONES.tollFree.phone
  const STEPS = [
    {
      icon:  'bi-1-square-fill',
      title: 'Call or use app',
      body:  (
        <>
          Call <strong>{tollFree}</strong> or tap &ldquo;Get Help&rdquo;
          in the Svitch app.
        </>
      ),
    },
    {
      icon:  'bi-2-square-fill',
      title: 'Share location',
      body:  "App auto-shares your GPS. By phone we'll ask for nearest landmark.",
    },
    {
      icon:  'bi-3-square-fill',
      title: 'Crew arrives in 45 min',
      body:  'Average response 35 min in metro cities, 60 min in tier-2 & 90 min on highways.',
    },
  ]

  return (
    <section className="section-pad-alt">
      <div className="container">
        <div className="rsa-how-head">
          <span className="section-label">How It Works</span>
          <h2 className="section-title">
            Three steps to <span className="accent">be on the road</span>
          </h2>
        </div>

        <div className="rsa-how-grid">
          {STEPS.map((s) => (
            <div key={s.title} className="card-base rsa-how-card">
              <div className="rsa-how-icon">
                <i className={`bi ${s.icon}`}></i>
              </div>
              <h3 className="card-base-title">{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
