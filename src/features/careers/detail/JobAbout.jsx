// "About the Role" — mirrors CSR_New_web `.job-section` (About variant).
// Wrapped in .card-base + .job-section so it picks up the shared card styling.
const DEFAULT_PARAGRAPHS = [
  "Svitch Motocorp is looking for a sharp, passionate Senior Electrical Engineer to join our Product Engineering team at our Ahmedabad R&D centre. This is a hands-on, high-impact role where you will be directly responsible for designing, developing, and testing the electrical systems that power Svitch's next generation of electric bicycles.",
  'You will work at the intersection of hardware and firmware — designing motor drive circuits, battery management systems, power electronics, and embedded sensor systems. Your work will directly influence the products ridden by thousands of Svitch customers across India every day.',
  'This is not a desk job. You will be in the lab, in the workshop, and occasionally out on test rides. If you love the smell of solder and the sound of a silent motor humming at peak efficiency — this role is for you.',
]

export default function JobAbout({
  title = 'About the Role',
  icon  = 'bi-info-circle-fill',
  paragraphs = DEFAULT_PARAGRAPHS,
}) {
  return (
    <section className="card-base job-section">
      <h2><i className={`bi ${icon}`}></i> {title}</h2>
      {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
    </section>
  )
}
