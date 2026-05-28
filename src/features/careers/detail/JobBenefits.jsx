// "What We Offer" — mirrors CSR_New_web `.job-section` (Benefits variant).
const DEFAULT_BENEFITS = [
  { icon: 'bi-cash-stack',       title: 'Competitive CTC',  desc: 'Market-leading salary based on experience and skills.'              },
  { icon: 'bi-bicycle',          title: 'Free Svitch Bike', desc: 'Every full-timer gets a Svitch e-bike after 6 months.'              },
  { icon: 'bi-heart-pulse-fill', title: 'Health Insurance', desc: 'Full family coverage — you, spouse, and two children.'              },
  { icon: 'bi-mortarboard-fill', title: 'Learning Budget',  desc: '₹15,000/year for courses, conferences & certifications.'            },
  { icon: 'bi-graph-up-arrow',   title: 'Fast Growth',      desc: 'Clear promotion paths — 3x YoY growth means rapid advancement.'    },
  { icon: 'bi-clock-history',    title: 'Flexible Hours',   desc: 'Output-driven culture — no clock-watching, no micromanagement.'    },
  { icon: 'bi-calendar-heart',   title: 'Paid Leaves',      desc: '18 casual + 12 earned leaves + 8 festival holidays annually.'      },
  { icon: 'bi-tree-fill',        title: 'Green Mission',    desc: 'Work on products that genuinely help the planet.'                  },
]

export default function JobBenefits({
  title    = 'What We Offer',
  icon     = 'bi-gift-fill',
  benefits = DEFAULT_BENEFITS,
}) {
  return (
    <section aria-label="JobBenefits" className="card-base job-section">
      <h2><i className={`bi ${icon}`}></i> {title}</h2>
      <div className="job-benefits">
        {benefits.map((b) => (
          <div key={b.title} className="job-benefit">
            <i className={`bi ${b.icon}`}></i>
            <div>
              <h5>{b.title}</h5>
              <p>{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
