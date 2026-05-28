import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import SectionHeader from '@/ui/SectionHeader'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// Team carousel — mirrors CSR_New_web `#team`.
// Pagination lives INSIDE `.team-swiper` so the scoped bullet styles in
// about.css (`.team-swiper .swiper-pagination-bullet …`) apply.
const TEAM = [
  { photo: '/images/team/dhairya-thakkar.png',  name: 'Dhairya Thakkar',  desigantion: 'Country Sales Manager'   },
  { photo: '/images/team/nehul.png',            name: 'Dhameshiya Nehul', desigantion: 'Sr. Automobile Designer' },
  { photo: '/images/team/mayur_patel.png',      name: 'Mayur Patel',      desigantion: 'Team Leader'             },
  { photo: '/images/team/Nandish.png',          name: 'Nandish Patel',    desigantion: 'Sr. Sales Consultant'    },
  { photo: '/images/team/Hemang_Mehta.png',     name: 'Hemang Mehta',     desigantion: 'Sr. Sales Consultant'    },
  { photo: '/images/team/Gopal_Bharwad.png',    name: 'Gopal Bharwad',    desigantion: 'Driver'                  },
  { photo: '/images/team/Natubhai_Vaghela.png', name: 'Natubhai Vaghela', desigantion: 'Support Staff'           },
]

export default function TeamCarousel({ items = TEAM }) {
  return (
    <section aria-label="TeamCarousel" id="team">
      <div className="container">
        <SectionHeader
          label="Minds Behind Svitch"
          titleStart="Meet The"
          titleAccent="Team"
          description="A passionate team of engineers, designers, and dreamers driving India's electric future."
        />

        <Swiper
          className="team-swiper reveal"
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={1}
          spaceBetween={20}
          loop
          grabCursor
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ el: '.team-pagination', clickable: true }}
          navigation={{ prevEl: '.team-swiper-prev', nextEl: '.team-swiper-next' }}
          breakpoints={{
            576:  { slidesPerView: 2, spaceBetween: 20 },
            768:  { slidesPerView: 3, spaceBetween: 24 },
            1024: { slidesPerView: 4, spaceBetween: 24 },
          }}
        >
          {items.map((m) => (
            <SwiperSlide key={m.name}>
              <div className="card-base team-card p-0">
                <div className="team-photo">
                  <img src={m.photo} alt={m.name} loading="lazy" decoding="async" />
                  <a
                    href="#"
                    className="team-linkedin"
                    aria-label="LinkedIn (profile coming soon)"
                    aria-disabled="true"
                    tabIndex={-1}
                  >
                    <i className="bi bi-linkedin"></i>
                  </a>
                </div>
                <div className="team-info">
                  <h3 className="team-name">{m.name}</h3>
                  <span className="team-title">{m.desigantion}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
          {/* Rendered inside .team-swiper so scoped pagination CSS applies */}
          <div className="swiper-pagination team-pagination" slot="container-end" />
        </Swiper>

        <div className="team-swiper-nav">
          <button className="team-swiper-btn team-swiper-prev" aria-label="Previous">
            <i className="bi bi-chevron-left"></i>
          </button>
          <button className="team-swiper-btn team-swiper-next" aria-label="Next">
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  )
}
