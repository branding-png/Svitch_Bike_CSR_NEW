import { Link } from 'react-router-dom'

// Blog detail sidebar "Related Articles" — mirrors CSR_New_web `.widget-related`.
const DEFAULT_ITEMS = [
  { slug: '10-tips-maximize-battery-life',  title: '10 Tips to Maximize Your E-Bike Battery Life',     date: 'Mar 20, 2026' },
  { slug: 'ahmedabad-to-vadodara-lite-xe',  title: 'Riding Ahmedabad to Vadodara on the Lite XE',      date: 'Mar 15, 2026' },
  { slug: 'bldc-vs-geared-hub-motor',       title: "BLDC vs Geared Hub Motor: What's Inside Your Svitch?", date: 'Feb 28, 2026' },
  { slug: 'svitch-expands-to-pune',         title: 'Svitch Expands to Pune with DAK Automotives',      date: 'Feb 20, 2026' },
]

export default function RelatedArticlesWidget({
  title = 'Related Articles',
  items = DEFAULT_ITEMS,
}) {
  return (
    <div aria-label="RelatedArticlesWidget" role="region" className="card-base widget">
      <h3 className="widget-title">{title}</h3>
      <div className="widget-related">
        {items.map((p) => (
          <Link key={p.slug} to={`/blog/${p.slug}`}>
            {p.title}
            <span className="rajdhani-lbl-text-sm">{p.date}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
