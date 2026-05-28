import { useMemo, useState } from 'react'
import { useGLightbox } from '@/hooks/useGLightbox'

// Gallery — mirrors CSR_New_web `#gl-main`.
// Filter pills + GLightbox-bound thumbnails. The lightbox is initialised once
// per filtered list via useGLightbox(selector, deps) so it rebinds when the
// visible items change.
const FILTERS = [
  { id: 'all',    label: 'All'           },
  { id: 'studio', label: 'Studio'        },
  { id: 'ride',   label: 'On the Road'   },
  { id: 'detail', label: 'Detail Shots'  },
  { id: 'video',  label: 'Video'         },
  { id: 'owner',  label: 'Owner Photos'  },
]

const ITEMS = [
  { cat: 'studio', src: '/images/product/csr-762-red.webp',          alt: 'CSR 762 in Crimson Red — studio shot',     title: 'Crimson Red',     sub: 'Studio',          desc: 'Studio shot, three-quarter front angle.'           },
  { cat: 'studio', src: '/images/product/csr-762-black.webp',        alt: 'CSR 762 in Matte Black',                   title: 'Matte Black',     sub: 'Studio',          desc: 'Hero shot of the matte-black variant.'             },
  { cat: 'studio', src: '/images/product/csr-762-gray-1.webp',       alt: 'CSR 762 in Steel Gray',                    title: 'Steel Gray',      sub: 'Studio',          desc: 'Profile view, low-angle studio lighting.'          },
  { cat: 'video',  src: '/images/hero/render.mp4',                   poster: '/images/hero/hero-render-media.webp',   alt: 'CSR 762 hero reveal video poster', title: 'Hero Reveal', sub: 'Video · 0:30', desc: '30-second cinematic reveal of the CSR 762.' },
  { cat: 'ride',   src: '/images/product/CSR-762-black-rider.webp',  alt: 'Rider on a CSR 762 in the city',           title: 'City Cruise',     sub: 'On the Road',     desc: 'Cruising the urban arterial at golden hour.'       },
  { cat: 'detail', src: '/images/product/wheel.webp',                alt: 'Close-up of CSR 762 alloy wheel',          title: 'Alloy Wheel',     sub: 'Detail',          desc: '17-inch tubeless alloy with disc brake assembly.'  },
  { cat: 'detail', src: '/images/product/lithium-battery.jpg',       alt: 'Swappable lithium battery pack',           title: 'Swappable Battery', sub: 'Detail',        desc: '3.6 kWh dual-pack, IP67 rated.'                    },
  { cat: 'detail', src: '/images/product/Seat.jpg',                  alt: 'Ergonomic dual-density rider seat',        title: 'Rider Seat',      sub: 'Detail',          desc: 'Dual-density foam with stitched leatherette.'      },
  { cat: 'detail', src: '/images/product/REAR-SUSPENSION.jpg',       alt: 'Rear monoshock suspension assembly',       title: 'Rear Suspension', sub: 'Detail',          desc: '5-step pre-load adjustable, gas-charged.'          },
  { cat: 'ride',   src: '/images/hero/banner.webp',                  alt: 'CSR 762 on an open highway',               title: 'Highway Run',     sub: 'On the Road',     desc: 'Open road, top-speed run on the CSR 762.'          },
  { cat: 'owner',  src: '/images/product/side-profile.webp',         alt: 'Owner-submitted side profile of CSR 762',  title: '@arjun.rides',    sub: 'Owner · Pune',    desc: 'Tagged #SvitchCSR762 by @arjun.rides.'             },
  { cat: 'owner',  src: '/images/product/black-bike.webp',           alt: 'Owner-submitted matte black CSR 762',      title: '@ev_diaries',     sub: 'Owner · Bengaluru', desc: 'Tagged #SvitchCSR762 by @ev_diaries.'            },
]

export default function GalleryGrid({ items = ITEMS, gallery = 'csr762' }) {
  const [cat, setCat] = useState('all')

  const visible = useMemo(
    () => (cat === 'all' ? items : items.filter((i) => i.cat === cat)),
    [items, cat],
  )

  // Rebind GLightbox whenever the visible set changes
  useGLightbox('.gl-item.glightbox', [cat, visible.length])

  return (
    <section id="gl-main">
      <div className="container">
        <div className="gl-filters">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={'filter-pill' + (cat === f.id ? ' is-active' : '')}
              onClick={() => setCat(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="gl-grid">
          {visible.map((it) => {
            const isVideo = it.cat === 'video'
            return (
              <a
                key={it.src}
                className={'gl-item glightbox' + (isVideo ? ' gl-video' : '')}
                href={it.src}
                data-gallery={gallery}
                data-glightbox={`title: ${it.title}; description: ${it.desc}`}
              >
                <img
                  src={isVideo ? (it.poster || it.src) : it.src}
                  alt={it.alt}
                  loading="lazy"
                  decoding="async"
                />
                <span className="gl-caption">
                  <h3>{it.title}</h3>
                  <small>{it.sub}</small>
                </span>
              </a>
            )
          })}
        </div>

        <p style={{ textAlign: 'center', marginTop: 30,  }}>
          Have a great CSR 762 shot? Tag{' '}
          <strong style={{ color: 'var(--white)' }}>#SvitchCSR762</strong> on
          Instagram — selected photos featured here monthly.
        </p>
      </div>
    </section>
  )
}
