// CSR 762 — "What Riders Are Saying" testimonials. Mirrors svitch.bike
// `#testimonials`. Infinite marquee slider (CSS-driven via .testimonial-track
// animation in csr762.css) — the cards array is duplicated so the loop seam
// is invisible. Below the slider sits a ratings summary block.
const TESTIMONIALS = [
  {
    name: 'Rahul Mehta',
    location: 'Mumbai, Maharashtra',
    text: '"Switched from a 125cc petrol bike to the CSR 762. The 55 Nm instant torque feels incredible off the line. I\'m saving over ₹5,000 a month on fuel — just ₹0.25 per km. Absolutely worth every rupee."',
  },
  {
    name: 'Priya Nair',
    location: 'Bengaluru, Karnataka',
    text: '"The 6 driving modes are a game-changer — I use the Eco assist mode in Bengaluru traffic and the Sport mode on weekends. The smart dashboard keeps everything at my fingertips. Riding the future, daily."',
  },
  {
    name: 'Arjun Singh',
    location: 'Delhi, NCR',
    text: '"125 km certified range on a single charge handles my 40 km daily commute easily. I charge the 3.6 kWh Li-NMC battery twice a week at home. Smooth, silent, and zero tailpipe emissions. No regrets."',
  },
  {
    name: 'Karthik Reddy',
    location: 'Hyderabad, Telangana',
    text: '"Six months in with the CSR 762 — minimal maintenance and the 3-year battery warranty gives real peace of mind. The 6.5 kW motor has plenty of power for highway stretches. Technology that just works."',
  },
  {
    name: 'Sneha Joshi',
    location: 'Pune, Maharashtra',
    text: '"The reverse mode is genius for parking in tight spots. GPS tracking gives me peace of mind and the LED lighting is brilliant at night. My commute went from stressful to genuinely enjoyable."',
  },
  {
    name: 'Vikram Patel',
    location: 'Ahmedabad, Gujarat',
    text: '"Full charge in about 5.5 hours at home — I just plug it in overnight. At ₹0.25 per km, I\'m saving over ₹80,000 a year compared to my old petrol bike. The CSR 762 practically pays for itself."',
  },
  {
    name: 'Neha Sharma',
    location: 'Jaipur, Rajasthan',
    text: '"The design turns heads everywhere — people constantly stop me to ask about it. The 110 km/h top speed keeps up on expressways and 0 to 60 in 6 seconds feels punchy and smooth. Absolutely love it."',
  },
  {
    name: 'Manish Kulkarni',
    location: 'Pune, Maharashtra',
    text: '"After 8,000 km, the CSR 762 still rides like day one. The disc brakes and ground clearance handle Pune\'s rough roads without breaking a sweat. Build quality is top-notch — this bike is simply built different."',
  },
]

const RATINGS = {
  score: '4.8',
  count: 'Based on 2,400+ verified reviews',
  stats: [
    { value: '98%', label: 'Would Recommend' },
    { value: '96%', label: 'Satisfied with Range' },
    { value: '99%', label: 'Happy with Performance' },
    { value: '97%', label: 'Impressed by Features' },
  ],
}

function TestimonialCard({ t }) {
  return (
    <div className="testimonial-card">
      <div className="stars">★★★★★</div>
      <div className="testimonial-text">{t.text}</div>
      <div className="testimonial-author">
        <div className="author-avatar">{t.name.charAt(0)}</div>
        <div>
          <h4 className="author-name">{t.name}</h4>
          <div className="author-location">{t.location}</div>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials({
  label        = 'Reviews',
  titleStart   = 'What Riders',
  titleEnd     = 'Are Saying',
  testimonials = TESTIMONIALS,
  ratings      = RATINGS,
}) {
  // Duplicate the array so the CSS-driven marquee in csr762.css can loop
  // seamlessly (.testimonial-track translates -50% then snaps back).
  const loop = [...testimonials, ...testimonials]

  return (
    <section aria-label="Testimonials" id="testimonials">
      <div className="container">
        <div className="ts-heading reveal">
          <span className="section-label">{label}</span>
          <h2 className="section-title display">
            {titleStart}<br />{titleEnd}
          </h2>
        </div>
      </div>

      {/* Full-bleed infinite slider — sits outside .container on purpose */}
      <div className="testimonial-slider-wrap reveal">
        <div className="testimonial-track">
          {loop.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} t={t} />
          ))}
        </div>
      </div>

      <div className="container mt-5">
        <div className="ratings-summary reveal">
          <div>
            <div className="ratings-big">{ratings.score}</div>
            <div className="ratings-stars">★★★★★</div>
            <div className="ratings-count">{ratings.count}</div>
          </div>
          <div className="ratings-stats">
            {ratings.stats.map((s) => (
              <div key={s.label} className="ratings-stat">
                <span className="ratings-stat-val">{s.value}</span>
                {s.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
