import { useScrollSpy, smoothScrollToId } from '@/hooks/useScrollSpy'

// Specifications page — table-of-contents sidebar (.specs-toc).
// Scroll-spy highlights the active section as the user scrolls.
const SECTIONS = [
  { id: 'spec-performance',  icon: 'bi-speedometer2',         title: 'Performance'        },
  { id: 'spec-range',        icon: 'bi-battery-charging',     title: 'Range & Charging'   },
  { id: 'spec-battery',      icon: 'bi-cpu-fill',             title: 'Battery & Motor'    },
  { id: 'spec-transmission', icon: 'bi-gear-fill',            title: 'Transmission'       },
  { id: 'spec-dimensions',   icon: 'bi-aspect-ratio-fill',    title: 'Dimensions'         },
  { id: 'spec-suspension',   icon: 'bi-wrench-adjustable',    title: 'Suspension & Frame' },
  { id: 'spec-wheels',       icon: 'bi-record-circle-fill',   title: 'Wheels & Tyres'     },
  { id: 'spec-brakes',       icon: 'bi-stop-circle-fill',     title: 'Brakes'             },
  { id: 'spec-lighting',     icon: 'bi-lightbulb-fill',       title: 'Lighting'           },
  { id: 'spec-tft',          icon: 'bi-phone-fill',           title: 'TFT Console'        },
  { id: 'spec-features',     icon: 'bi-stars',                title: 'Features'           },
  { id: 'spec-warranty',     icon: 'bi-shield-fill-check',    title: 'Warranty'           },
]

export default function SpecificationsAside({ sections = SECTIONS }) {
  const activeId = useScrollSpy(sections.map((s) => s.id), { spyOffset: 200 })

  const onClick = (e, id) => {
    e.preventDefault()
    smoothScrollToId(id, { clickOffset: 100 })
  }

  return (
    <aside className="rajdhani-lbl-text-sm card-base legal-toc specs-toc">
      <h3>On This Page</h3>
      <ol>
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`rajdhani-lbl-text-sm${activeId === s.id ? ' is-active' : ''}`}
              onClick={(e) => onClick(e, s.id)}
            >
              <i className={`bi ${s.icon}`}></i> {s.title}
            </a>
          </li>
        ))}
      </ol>
    </aside>
  )
}

export { SECTIONS as SPECIFICATIONS_SECTIONS }
