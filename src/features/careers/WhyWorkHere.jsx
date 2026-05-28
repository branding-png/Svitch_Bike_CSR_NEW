import SectionHeader from '@/ui/SectionHeader'

// "Why work here" — mirrors CSR_New_web `#career-why`.
const BENEFITS = [
  { icon: 'bi-lightning-charge-fill', title: 'High-Impact Work',     desc: 'Every person at Svitch owns a piece of something real. Your work directly shapes the product millions will ride.' },
  { icon: 'bi-graph-up-arrow',        title: 'Rapid Growth',         desc: 'Svitch is growing 3x year-on-year. The opportunities to grow with us are real, fast, and everywhere.'             },
  { icon: 'bi-people-fill',           title: 'People-First Culture', desc: 'Great work comes from happy people. Flexible hours, no micromanagement, and genuine care for our team.'           },
  { icon: 'bi-bicycle',               title: 'Free Svitch Bike',     desc: 'Every new full-time hire gets a Svitch e-bike after 6 months. Ride to work, ride for fun — just ride.'            },
  { icon: 'bi-mortarboard-fill',      title: 'Learning Budget',      desc: '₹15,000 annual learning budget for courses, books, conferences, and certifications — we invest in you.'           },
  { icon: 'bi-building-fill',         title: 'Ahmedabad HQ',         desc: 'Our beautiful office on Sindhu Bhavan Road is designed for collaboration, comfort, and creative energy.'          },
  { icon: 'bi-heart-pulse-fill',      title: 'Full Benefits',        desc: 'Health insurance for you and your family, PF, gratuity, paid leaves, and festival bonuses.'                       },
  { icon: 'bi-tree-fill',             title: 'Green Mission',        desc: "Work on something that genuinely helps the planet. Every bike sold reduces carbon — you're part of that story."   },
]

const STATS = [
  { value: '85+', label: 'Team Members'      },
  { value: '8',   label: 'Departments'       },
  { value: '4.7', label: 'Glassdoor Rating'  },
  { value: '92%', label: 'Would Recommend'   },
]

export default function WhyWorkHere({ benefits = BENEFITS, stats = STATS }) {
  return (
    <section id="career-why">
      <div className="container">
        <SectionHeader
          label="Life at Svitch"
          titleStart="Why Ride"
          titleAccent="With Svitch?"
          description="Every person at Svitch owns a piece of something real. Here's what you get when you come on board."
        />

        <div className="benefits-grid">
          {benefits.map((b) => (
            <div key={b.title} className="card-base benefit-card">
              <div className="card-base-icon card-base-icon-center">
                <i className={`bi ${b.icon}`}></i>
              </div>
              <h3 className="card-base-title">{b.title}</h3>
              <p className="card-base-desc">{b.desc}</p>
            </div>
          ))}
        </div>

        <div className="career-stats">
          {stats.map((s) => (
            <div key={s.label} className="stat-cell">
              <h3 className="stat-value">{s.value}</h3>
              <p className="stat-label rajdhani-lbl-text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
