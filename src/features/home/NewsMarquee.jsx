// Horizontal press-logo marquee — mirrors CSR_New_web `.news-logo-slider`.
// The CSS animates `.news-track` via translateX, so we duplicate the array
// in render to make the loop seamless when the animation hits 50%.
//
// Logos with `href === '#'` (placeholder) render as a non-navigating link;
// real URLs open in a new tab with `rel="noopener"`.
//
// Usage:
//   <NewsMarquee />
//   <NewsMarquee logos={CUSTOM_LIST} className="mt-5" />
const NEWS_LOGOS = [
  { img: '/images/news/CNBC_logo.webp',                    alt: 'CNBC TV18',          href: 'https://www.cnbctv18.com/auto/svitch-bike-has-launched-lite-xe-at-rs-74999-check-details-here-15087841.htm' },
  { img: '/images/news/TOI_logo.webp',                     alt: 'Times of India',     href: 'https://timesofindia.indiatimes.com/auto/electric-bikes/svitch-lite-xe-foldable-e-cycle-launched-at-rs-74999-with-80-km-range/articleshow/95271665.cms' },
  { img: '/images/news/Financial_express_logo.webp',       alt: 'Financial Express',  href: 'https://www.financialexpress.com/business/express-mobility-svitch-opens-experience-centre-in-bengaluru-2651701/' },
  { img: '/images/news/ET_auto.webp',                      alt: 'ET Auto',            href: 'https://auto.economictimes.indiatimes.com/news/two-wheelers/motorcycles/svitch-motocorp-to-invest-inr-100-crore-in-electric-bike-project/91922670' },
  { img: '/images/news/Hindustan_Times_logo.webp',         alt: 'Hindustan Times',    href: 'https://www.hindustantimes.com/car-bike/this-e-bicycle-from-svitch-bike-is-foldable-choose-yours-from-5-colour-options-101667472568483.html' },
  { img: '/images/news/Drivespark.png',                    alt: 'DriveSpark',         href: 'https://www.drivespark.com/off-beat/switch-lite-xe-foldable-electric-bicycle-launched-rs-74999-specs-range-power-top-speed-details-036979.html' },
  { img: '/images/news/TimesDrive.webp',                   alt: 'Times Drive',        href: 'https://www.timesdrive.in/electric-vehicles/svitch-motocorp-expands-to-pune-partners-with-dak-automotives-for-retail-presence-article-151362737' },
  { img: '/images/news/BIS-LOGO-1.avif',                   alt: 'BIS Infotech',       href: 'https://www.bisinfotech.com/svitch-bike-expands-to-pune-with-dak-automotives-partnership/' },
  { img: '/images/news/Autoguide-logo-final-300x90.avif',  alt: 'AutoGuide India',    href: 'https://www.autoguideindia.com/e-mobility/svitch-bike-enters-pune-in-collaboration-with-dak-automotives/' },
  { img: '/images/news/evmechanica-logo.png',              alt: 'EV Mechanica',       href: 'https://www.evmechanica.com/svitch-bike-expands-to-pune-with-dak-automotives-partnership/' },
  { img: '/images/news/cars_bike.webp',                    alt: 'Cars & Bike',        href: '#' },
  { img: '/images/news/bnn.png',                           alt: 'BNN',                href: '#' },
  { img: '/images/news/droom.webp',                        alt: 'Droom',              href: '#' },
  { img: '/images/news/latestly.webp',                     alt: 'Latestly',           href: '#' },
  { img: '/images/news/Jansatta.webp',                     alt: 'Jansatta',           href: '#' },
  { img: '/images/news/newsbytes.webp',                    alt: 'NewsBytes',          href: '#' },
  { img: '/images/news/energyworld.webp',                  alt: 'Energy World',       href: '#' },
  { img: '/images/news/abp_news.png',                      alt: 'ABP News',           href: '#' },
  { img: '/images/news/bikes_4_sales.webp',                alt: 'Bikes4Sale',         href: '#' },
  { img: '/images/news/Asia_news.webp',                    alt: 'Asia News',          href: '#' },
  { img: '/images/news/rushlane.webp',                     alt: 'Rushlane',           href: '#' },
  { img: '/images/news/mediainsight.webp',                 alt: 'Media Insight',      href: '#' },
  { img: '/images/news/He_auto.webp',                      alt: 'HE Auto',            href: '#' },
  { img: '/images/news/Smart_Business_News.webp',          alt: 'Smart Business News',href: '#' },
  { img: '/images/news/auto_x.png',                        alt: 'autoX',              href: '#' },
  { img: '/images/news/E-vehicle_info.webp',               alt: 'E-Vehicle Info',     href: '#' },
]

export default function NewsMarquee({
  logos = NEWS_LOGOS,
  className = 'mt-5',
  reveal = true,
}) {
  // Duplicate the list so the CSS translateX(-50%) loop is seamless.
  const doubled = [...logos, ...logos]

  return (
    <div className={`news-logo-slider ${reveal ? 'reveal' : ''} ${className}`.trim()}>
      <div className="news-track" id="newsTrack">
        {doubled.map((logo, i) => {
          const external = logo.href && logo.href !== '#'
          return (
            <div key={i} className="news-logo">
              <a
                href={logo.href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
              >
                <img src={logo.img} alt={logo.alt} loading="lazy" decoding="async" />
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}
