// "Our Story" section for the About page — mirrors CSR_New_web `#our-story`.
const STORY_STATS = [
  { value: '6+',   label: 'Years Strong'    },
  { value: '40K+', label: 'EOI Registered'  },
  { value: '500+', label: 'Service Centers' },
]

export default function OurStory() {
  return (
    <section id="our-story">
      <div className="container">
        <div className="story-wrap">
          <div className="story-image" />
          <div className="story-content">
            <span className="section-label">Our Story</span>
            <span className="story-founded">EST. 2018</span>
            <h2>A Journey <span className="accent">Powered By Passion</span></h2>
            <p>
              Svitch Motocorp was founded in 2018 in Ahmedabad with one
              audacious vision — to build an electric motorcycle worthy of
              Indian roads, Indian riders, and Indian dreams. What began in
              a small workshop with a handful of engineers has grown into a
              nationwide movement for sustainable mobility.
            </p>
            <p>
              The CSR 762 is the embodiment of that vision — a motorcycle
              inspired by the Asiatic Lion, built with aerospace-grade
              engineering, and crafted for every rider who refuses to
              compromise between performance and the planet.
            </p>
            <div className="story-stats">
              {STORY_STATS.map((s) => (
                <div key={s.label} className="story-stat">
                  <h3>{s.value}</h3>
                  <span className="rajdhani-lbl-text-sm">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
