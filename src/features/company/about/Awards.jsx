import SectionHeader from '@/ui/SectionHeader'

// Awards & Recognition — mirrors CSR_New_web `#awards`.
const AWARDS = [
  { icon: 'bi-patch-check-fill',      year: '2024', title: 'GARC Approved',           desc: 'Global Automotive Research Centre'           },
  { icon: 'bi-award-fill',            year: '2024', title: 'ARAI Certified',          desc: 'Automotive Research Association of India'    },
  { icon: 'bi-shield-fill-check',     year: '2023', title: 'ICAT Certified',          desc: 'International Centre for Automotive Tech.'   },
  { icon: 'bi-trophy-fill',           year: '2023', title: 'EV Startup of the Year', desc: 'BIS Infotech — EV Mechanica Awards'          },
  { icon: 'bi-star-fill',              year: '2022', title: 'Best Design Innovation', desc: 'AutoGuide India'                             },
  { icon: 'bi-lightning-charge-fill', year: '2022', title: 'FAME II Eligible',        desc: 'Ministry of Heavy Industries, GoI'           },
  { icon: 'bi-gem',                    year: '2021', title: 'India Design Mark',      desc: 'India Design Council'                        },
  { icon: 'bi-globe2',                 year: '2021', title: 'Make in India Certified', desc: 'Government of India'                        },
]

export default function Awards({ items = AWARDS }) {
  return (
    <section id="awards">
      <div className="container">
        <SectionHeader
          label="Trusted & Certified"
          titleStart="Awards &"
          titleAccent="Recognition"
          description="Recognised by India's most respected automotive and technology bodies."
        />
        <div className="awards-grid">
          {items.map((a) => (
            <div key={a.title} className="card-base award-badge">
              <div className="card-base-icon card-base-icon-center">
                <i className={`bi ${a.icon}`}></i>
              </div>
              <span className="award-year">{a.year}</span>
              <h3 className="card-base-title">{a.title}</h3>
              <p className="card-base-desc">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
