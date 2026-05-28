// Step 9 Batch 4 — 13 pages (company + careers + blog + thank-you).
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)))
const w = (rel, body) => {
  const file = join(ROOT, 'src', 'routes', rel)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, body, 'utf8')
}

/* About */
w('company/About.jsx', `import { Link } from 'react-router-dom'
import { Button, Card, SectionHeader } from '@/ui'
import { PATHS } from '@/utils/routes'

const PILLARS = [
  { icon: 'lightning-charge-fill', title: 'Born Electric',  desc: 'No legacy compromises. Designed for batteries from the ground up.' },
  { icon: 'tools',                  title: 'Built In India',  desc: 'Ahmedabad-engineered. 78% local content. Made for our roads.' },
  { icon: 'shield-check',           title: 'Honestly Priced', desc: 'No dealer mark-ups. The price you see is the price you pay.' },
  { icon: 'people-fill',            title: 'Rider First',     desc: 'Real owners on our advisory board. Real feedback in every release.' },
]
const STATS = [
  { num: '50,000+', label: 'Riders' },
  { num: '80+',     label: 'Service Centres' },
  { num: '15M+',    label: 'Kilometres Ridden' },
  { num: '4.7/5',   label: 'Average Rating' },
]

export default function About() {
  return (
    <>
      <section className="section-pad">
        <div className="container">
          <SectionHeader label="Our Story" title="We're rewiring how India moves" description="Svitch Motocorp was founded in 2022 in Ahmedabad with a simple idea — Indians deserve electric motorcycles that are made for India, not adapted to it." />
        </div>
      </section>

      <section className="section-pad-alt">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            {PILLARS.map(p => (
              <Card key={p.title} style={{ padding: 24 }}>
                <i className={\`bi bi-\${p.icon}\`} style={{ fontSize: 26, color: 'var(--accent)' }}></i>
                <h3 style={{ marginTop: 12 }}>{p.title}</h3>
                <p className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)', marginTop: 6 }}>{p.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14 }}>
            {STATS.map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <strong style={{ fontSize: 38, color: 'var(--white)' }}>{s.num}</strong>
                <div className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad-alt">
        <div className="container">
          <div className="cta-box">
            <div>
              <span className="section-label">Visit Us</span>
              <h2 className="section-title">A-410 Stellar, Ahmedabad</h2>
              <p className="section-desc">Drop by the HQ for a factory tour or a coffee.</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Button to={PATHS.contact} variant="primary" icon="envelope">Get in Touch</Button>
              <Link to={PATHS.dealers} className="btn-csr secondary rajdhani-lbl-text-sm">Find a Dealer</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
`)

/* Contact */
w('company/Contact.jsx', `import { useState } from 'react'
import { Button, Card, FormGroup, SectionHeader } from '@/ui'
import { useToast } from '@/contexts/ToastContext'

const CHANNELS = [
  { icon: 'telephone-fill', label: 'Sales',    value: '+91 635 127 2002', href: 'tel:+916351272002' },
  { icon: 'headset',        label: 'Support',  value: 'support@svitch.bike', href: 'mailto:support@svitch.bike' },
  { icon: 'briefcase-fill', label: 'Careers',  value: 'hrhead@svitch.bike',  href: 'mailto:hrhead@svitch.bike' },
  { icon: 'newspaper',      label: 'Press',    value: 'press@svitch.bike',    href: 'mailto:press@svitch.bike' },
]

export default function Contact() {
  const { show } = useToast()
  const [form, setForm] = useState({ name: '', email: '', subject: 'General', message: '' })
  const [errors, setErrors] = useState({})

  function submit(e) {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = 'Required'
    if (!/^\\S+@\\S+\\.\\S+$/.test(form.email)) errs.email = 'Enter a valid email'
    if (form.message.trim().length < 10) errs.message = 'Tell us a bit more (10+ chars)'
    setErrors(errs)
    if (Object.keys(errs).length) return
    show('Message sent — we\\'ll reply within 24 hrs', 'success')
    setForm({ name: '', email: '', subject: 'General', message: '' })
  }

  return (
    <section className="section-pad">
      <div className="container">
        <SectionHeader label="Get in Touch" title="Contact Us" description="Sales, support, careers, or press — pick the right inbox below." />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 28, marginTop: 28 }}>
          <Card as="form" onSubmit={submit} style={{ padding: 28 }} noValidate>
            <h3 style={{ marginBottom: 18 }}>Send a Message</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <FormGroup label="Name" htmlFor="name" required error={errors.name}>
                <input id="name" value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} />
              </FormGroup>
              <FormGroup label="Email" htmlFor="email" required error={errors.email}>
                <input id="email" type="email" value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} />
              </FormGroup>
            </div>
            <FormGroup label="Subject" htmlFor="subject">
              <select id="subject" value={form.subject} onChange={(e) => setForm(f => ({ ...f, subject: e.target.value }))}>
                {['General', 'Sales', 'Support', 'Careers', 'Press'].map(o => <option key={o}>{o}</option>)}
              </select>
            </FormGroup>
            <FormGroup label="Message" htmlFor="message" required error={errors.message}>
              <textarea id="message" rows={6} value={form.message} onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))} />
            </FormGroup>
            <Button variant="primary" type="submit" icon="send">Send Message</Button>
          </Card>

          <div style={{ display: 'grid', gap: 12 }}>
            {CHANNELS.map(c => (
              <Card as="a" key={c.label} href={c.href} style={{ padding: 18, display: 'flex', gap: 14, alignItems: 'center', textDecoration: 'none' }}>
                <i className={\`bi bi-\${c.icon}\`} style={{ fontSize: 22, color: 'var(--accent)' }}></i>
                <div>
                  <div className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)' }}>{c.label}</div>
                  <strong style={{ color: 'var(--white)' }}>{c.value}</strong>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
`)

/* FAQ */
w('company/Faq.jsx', `import { useState } from 'react'
import { Accordion, FilterPill, SectionHeader } from '@/ui'
import { FAQS, FAQ_TOPICS } from '@/data/content'

export default function Faq() {
  const [topic, setTopic] = useState('All')
  const [q, setQ] = useState('')

  // Topic filter is a stub — all FAQs are returned unless searching.
  // Search filters by question + answer text.
  const items = FAQS.filter((f) => {
    if (q.trim()) {
      const s = q.toLowerCase()
      return f.q.toLowerCase().includes(s) || f.a.toLowerCase().includes(s)
    }
    return true
  })

  return (
    <section className="section-pad">
      <div className="container">
        <SectionHeader label="Help Centre" title="We're Here To Help" description="Quick answers to the most common questions." />
        <div style={{ maxWidth: 560, margin: '24px 0 14px', position: 'relative' }}>
          <i className="bi bi-search" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-500)' }}></i>
          <input
            placeholder="Search FAQs…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={{ width: '100%', paddingLeft: 42 }}
          />
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {FAQ_TOPICS.map(t => (
            <FilterPill key={t} active={topic === t} onClick={() => setTopic(t)}>{t}</FilterPill>
          ))}
        </div>
        <Accordion items={items.map(f => ({ q: f.q, a: f.a }))} />
      </div>
    </section>
  )
}
`)

/* Events */
w('company/Events.jsx', `import { Card, SectionHeader } from '@/ui'
import { EVENTS } from '@/data/content'

export default function Events() {
  return (
    <section className="section-pad">
      <div className="container">
        <SectionHeader label="What's On" title="Events & Meetups" description="Test rides, launches, factory tours, and rider gatherings." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14, marginTop: 28 }}>
          {EVENTS.map(e => (
            <Card key={e.id} style={{ padding: 0, overflow: 'hidden' }}>
              <img src={e.cover} alt={e.title} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
              <div style={{ padding: 18 }}>
                <span className="filter-pill" style={{ padding: '2px 8px', fontSize: 11 }}>{e.type}</span>
                <h3 style={{ margin: '10px 0 6px' }}>{e.title}</h3>
                <div className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)' }}>
                  <i className="bi bi-calendar3"></i> {e.date}
                </div>
                <div className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)' }}>
                  <i className="bi bi-geo-alt"></i> {e.loc}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
`)

/* Gallery */
w('company/Gallery.jsx', `import { useState } from 'react'
import { FilterPill, Lightbox, SectionHeader } from '@/ui'
import { GALLERY } from '@/data/content'

const FILTERS = ['All', 'Exterior', 'Detail', 'Studio']

export default function Gallery() {
  const [f, setF] = useState('All')
  return (
    <section className="section-pad">
      <div className="container">
        <SectionHeader label="Visuals" title="Gallery" description="Every angle of the CSR 762, captured." />
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '20px 0' }}>
          {FILTERS.map(x => <FilterPill key={x} active={f === x} onClick={() => setF(x)}>{x}</FilterPill>)}
        </div>
        <Lightbox images={GALLERY} />
      </div>
    </section>
  )
}
`)

/* Reviews */
w('company/Reviews.jsx', `import { Card, SectionHeader } from '@/ui'
import { REVIEWS } from '@/data/content'

function Stars({ n }) {
  return (
    <span style={{ color: 'var(--accent)' }}>
      {[0, 1, 2, 3, 4].map(i => <i key={i} className={\`bi \${i < n ? 'bi-star-fill' : 'bi-star'}\`} style={{ marginRight: 2 }} />)}
    </span>
  )
}

export default function Reviews() {
  const avg = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1)
  return (
    <section className="section-pad">
      <div className="container">
        <SectionHeader
          label="From Real Owners"
          title="Customer Reviews"
          description={\`\${avg} average from \${REVIEWS.length} verified buyers.\`}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14, marginTop: 28 }}>
          {REVIEWS.map((r, i) => (
            <Card key={i} style={{ padding: 22 }}>
              <Stars n={r.rating} />
              <p style={{ marginTop: 12, marginBottom: 14, color: 'var(--gray-200)' }}>&ldquo;{r.text}&rdquo;</p>
              <div className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)' }}>
                <strong style={{ color: 'var(--white)' }}>{r.name}</strong> • {r.city} • {r.date}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
`)

/* Sustainability */
w('company/Sustainability.jsx', `import { Card, SectionHeader } from '@/ui'

const COMMITMENTS = [
  { icon: 'tree-fill',        title: 'Zero Tailpipe',           desc: 'Every CSR 762 saves ~1.3 tonnes of CO₂ per year vs an equivalent ICE 150cc.' },
  { icon: 'recycle',          title: 'Battery Take-Back',       desc: 'End-of-life packs are recycled into new battery materials at our Pune partner facility.' },
  { icon: 'lightning-fill',   title: '100% Renewable Factory',  desc: 'Our Ahmedabad plant runs on 100% solar — net zero across Scope 1 and 2 by 2027.' },
  { icon: 'people-fill',      title: 'Fair-Wage Supply Chain',  desc: 'Every supplier audited for fair-wage and safety standards. Quarterly published audits.' },
]
const MILESTONES = [
  { year: '2024', text: 'First 10,000 bikes shipped — 13M km ridden electric.' },
  { year: '2025', text: 'Solar farm operational at Ahmedabad plant.' },
  { year: '2026', text: 'Battery recycling line goes live with Pune partner.' },
  { year: '2027', text: 'Target: net-zero across own operations (Scope 1 + 2).' },
]

export default function Sustainability() {
  return (
    <>
      <section className="section-pad">
        <div className="container">
          <SectionHeader label="Sustainability" title="Mobility, Without The Footprint" description="The road to net-zero, one bike at a time." />
        </div>
      </section>
      <section className="section-pad-alt">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            {COMMITMENTS.map(c => (
              <Card key={c.title} style={{ padding: 24 }}>
                <i className={\`bi bi-\${c.icon}\`} style={{ fontSize: 28, color: 'var(--accent)' }}></i>
                <h3 style={{ marginTop: 12 }}>{c.title}</h3>
                <p className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)', marginTop: 6 }}>{c.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad">
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: 24 }}>Our Roadmap</h2>
          <ol style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 14 }}>
            {MILESTONES.map(m => (
              <li key={m.year} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16, padding: 16, border: '1px solid var(--border)' }}>
                <strong style={{ color: 'var(--accent)', fontSize: 22 }}>{m.year}</strong>
                <span style={{ color: 'var(--gray-200)' }}>{m.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
`)

/* Sitemap */
w('Sitemap.jsx', `import { Link } from 'react-router-dom'
import { Card, SectionHeader } from '@/ui'
import { PATHS } from '@/utils/routes'

const SECTIONS = [
  { label: 'Shop',    links: [['Shop', PATHS.shop], ['Compare', PATHS.compare], ['Cart', PATHS.cart], ['Checkout', PATHS.checkout], ['Track Order', PATHS.trackOrder]] },
  { label: 'Account', links: [['Dashboard', PATHS.dashboard], ['Profile', PATHS.profile], ['Orders', PATHS.orders], ['Wishlist', PATHS.wishlist], ['Addresses', PATHS.addresses], ['Notifications', PATHS.notifications], ['Saved Jobs', PATHS.savedJobs]] },
  { label: 'Company', links: [['About', PATHS.about], ['Contact', PATHS.contact], ['Events', PATHS.events], ['Gallery', PATHS.gallery], ['Reviews', PATHS.reviews], ['Sustainability', PATHS.sustainability]] },
  { label: 'Support', links: [['FAQ', PATHS.faq], ['Tickets', PATHS.ticket], ['Dealers', PATHS.dealers], ['Charging Network', PATHS.chargingNetwork], ['Warranty', PATHS.warranty], ['Roadside', PATHS.roadsideAssistance], ['Owners Manual', PATHS.ownersManual], ['Book Service', PATHS.bookService], ['Specifications', PATHS.specifications]] },
  { label: 'Content', links: [['Blog', PATHS.blog], ['Careers', PATHS.career], ['Press', PATHS.press], ['Media Kit', PATHS.mediaKit]] },
  { label: 'Offers',  links: [['Book Test Ride', PATHS.bookTestRide], ['Finance', PATHS.finance], ['Insurance', PATHS.insurance], ['Refer & Earn', PATHS.referral], ['Trade-In', PATHS.tradeIn]] },
  { label: 'Legal',   links: [['Terms', PATHS.termCondition], ['Privacy', PATHS.privacyPolicy], ['Cookies', PATHS.cookiePolicy], ['Refund', PATHS.refundPolicy], ['Shipping', PATHS.shippingPolicy], ['Accessibility', PATHS.accessibility]] },
]

export default function Sitemap() {
  return (
    <section className="section-pad">
      <div className="container">
        <SectionHeader label="Site Index" title="Sitemap" description="Every page on the site, in one place." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginTop: 28 }}>
          {SECTIONS.map(s => (
            <Card key={s.label} style={{ padding: 22 }}>
              <h4 style={{ marginBottom: 12 }}>{s.label}</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 6 }}>
                {s.links.map(([label, to]) => (
                  <li key={to}><Link to={to} className="rajdhani-lbl-text-sm">{label}</Link></li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
`)

/* Blog (index) */
w('blog/Blog.jsx', `import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, FilterPill, SectionHeader } from '@/ui'
import { BLOGS, BLOG_CATS } from '@/data/content'

export default function Blog() {
  const [cat, setCat] = useState('All')
  const list = cat === 'All' ? BLOGS : BLOGS.filter(b => b.category === cat)

  return (
    <section className="section-pad">
      <div className="container">
        <SectionHeader label="Stories & Insight" title="The Svitch Blog" description="Long-form thinking from the people building the bikes." />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '24px 0' }}>
          {BLOG_CATS.map(c => <FilterPill key={c} active={cat === c} onClick={() => setCat(c)}>{c}</FilterPill>)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
          {list.map(b => (
            <Card key={b.slug} as={Link} to={\`/blog/\${b.slug}\`} style={{ padding: 0, overflow: 'hidden', textDecoration: 'none' }}>
              <img src={b.cover} alt={b.title} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
              <div style={{ padding: 20 }}>
                <span className="filter-pill" style={{ padding: '2px 8px', fontSize: 11 }}>{b.category}</span>
                <h3 style={{ margin: '10px 0 6px', color: 'var(--white)' }}>{b.title}</h3>
                <p className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)', marginBottom: 10 }}>{b.excerpt}</p>
                <div className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-500)' }}>
                  {b.author} • {b.date} • {b.readTime} min read
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
`)

/* BlogDetail */
w('blog/BlogDetail.jsx', `import { Link, useParams } from 'react-router-dom'
import { BreadCrumb, Card } from '@/ui'
import { PATHS } from '@/utils/routes'
import { BLOGS } from '@/data/content'

export default function BlogDetail() {
  const { slug } = useParams()
  const post = BLOGS.find(b => b.slug === slug)
  const related = BLOGS.filter(b => b.slug !== slug).slice(0, 3)

  if (!post) {
    return (
      <section className="section-pad">
        <div className="container">
          <h1 className="section-title">Post not found</h1>
          <p className="section-desc">No post with slug <code>{slug}</code>.</p>
          <Link to={PATHS.blog} className="btn-csr primary">Back to Blog</Link>
        </div>
      </section>
    )
  }

  return (
    <article className="section-pad">
      <div className="container" style={{ maxWidth: 820 }}>
        <BreadCrumb items={[{ label: 'Home', to: PATHS.home }, { label: 'Blog', to: PATHS.blog }, { label: post.title }]} />
        <span className="filter-pill" style={{ padding: '2px 8px', fontSize: 11, marginTop: 18, display: 'inline-block' }}>{post.category}</span>
        <h1 className="section-title" style={{ marginTop: 12 }}>{post.title}</h1>
        <div className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)', marginBottom: 24 }}>
          By <strong style={{ color: 'var(--white)' }}>{post.author}</strong> • {post.date} • {post.readTime} min read
        </div>
        <img src={post.cover} alt={post.title} style={{ width: '100%', maxHeight: 420, objectFit: 'cover', marginBottom: 28 }} />

        <div style={{ color: 'var(--gray-200)', lineHeight: 1.8, fontSize: 17 }}>
          <p><strong>{post.excerpt}</strong></p>
          <p>This is placeholder long-form copy for the article. The original CSR_New_web blog post would render here — pulled from a CMS or markdown file. For now this is enough scaffolding to validate routing, breadcrumb, related posts, and typography.</p>
          <p>Quisque mollis dapibus ipsum, eu lacinia massa tempor in. Cras blandit eros at urna pretium, nec vehicula nisi laoreet. Praesent at justo sed mauris malesuada cursus.</p>
          <h2 style={{ marginTop: 32 }}>Why this matters</h2>
          <p>Vivamus quis erat sit amet tortor finibus aliquam. Donec quis volutpat odio, in maximus lorem. Phasellus ac elit ut tellus volutpat porttitor.</p>
          <blockquote style={{ borderLeft: '3px solid var(--accent)', paddingLeft: 18, color: 'var(--gray-300)', fontStyle: 'italic', margin: '24px 0' }}>
            "The CSR 762 isn't just a product — it's a statement about what we think Indian engineering can be."
          </blockquote>
          <p>Mauris sit amet diam ut nibh placerat congue. Nulla et lorem nec turpis tempus aliquet. Suspendisse potenti.</p>
        </div>

        <h3 style={{ marginTop: 56, marginBottom: 16 }}>Read more</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {related.map(r => (
            <Card key={r.slug} as={Link} to={\`/blog/\${r.slug}\`} style={{ padding: 16, textDecoration: 'none' }}>
              <h4 style={{ color: 'var(--white)' }}>{r.title}</h4>
              <div className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)', marginTop: 4 }}>{r.readTime} min read</div>
            </Card>
          ))}
        </div>
      </div>
    </article>
  )
}
`)

/* Career */
w('careers/Career.jsx', `import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, FilterPill, SectionHeader } from '@/ui'
import { JOBS, JOB_DEPTS } from '@/data/content'

export default function Career() {
  const [dept, setDept] = useState('All')
  const list = dept === 'All' ? JOBS : JOBS.filter(j => j.dept === dept)

  return (
    <section className="section-pad">
      <div className="container">
        <SectionHeader label="Careers" title="Build the future with us" description="We're hiring across engineering, design, service, and growth." />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '24px 0' }}>
          {JOB_DEPTS.map(d => <FilterPill key={d} active={dept === d} onClick={() => setDept(d)}>{d}</FilterPill>)}
        </div>
        <div style={{ display: 'grid', gap: 12 }}>
          {list.map(j => (
            <Card key={j.slug} as={Link} to={\`/careers/\${j.slug}\`} style={{ padding: 22, textDecoration: 'none', display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'center' }}>
              <div>
                <h3 style={{ color: 'var(--white)' }}>{j.title}</h3>
                <p className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-400)', marginTop: 4, marginBottom: 8 }}>{j.summary}</p>
                <div className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-500)', display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                  <span><i className="bi bi-briefcase"></i> {j.dept}</span>
                  <span><i className="bi bi-geo-alt"></i> {j.loc}</span>
                  <span><i className="bi bi-clock"></i> {j.type}</span>
                  <span><i className="bi bi-bar-chart"></i> {j.exp}</span>
                </div>
              </div>
              <i className="bi bi-arrow-right" style={{ fontSize: 22, color: 'var(--accent)' }}></i>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
`)

/* CareerDetail */
w('careers/CareerDetail.jsx', `import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BreadCrumb, Card, Button, FormGroup } from '@/ui'
import { PATHS } from '@/utils/routes'
import { JOBS } from '@/data/content'
import { useToast } from '@/contexts/ToastContext'

export default function CareerDetail() {
  const { slug } = useParams()
  const job = JOBS.find(j => j.slug === slug)
  const { show } = useToast()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', linkedin: '', cover: '' })
  const [errors, setErrors] = useState({})

  function apply(e) {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = 'Required'
    if (!/^\\S+@\\S+\\.\\S+$/.test(form.email)) errs.email = 'Enter a valid email'
    setErrors(errs)
    if (Object.keys(errs).length) return
    show('Application sent — we\\'ll be in touch within 5 days', 'success')
    navigate('/thank-you')
  }

  if (!job) {
    return (
      <section className="section-pad">
        <div className="container">
          <h1 className="section-title">Job not found</h1>
          <Link to={PATHS.career} className="btn-csr primary">Back to Careers</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="section-pad">
      <div className="container" style={{ maxWidth: 880 }}>
        <BreadCrumb items={[{ label: 'Home', to: PATHS.home }, { label: 'Careers', to: PATHS.career }, { label: job.title }]} />
        <h1 className="section-title" style={{ marginTop: 18 }}>{job.title}</h1>
        <div className="rajdhani-lbl-text-sm" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', color: 'var(--gray-400)', marginBottom: 24 }}>
          <span><i className="bi bi-briefcase"></i> {job.dept}</span>
          <span><i className="bi bi-geo-alt"></i> {job.loc}</span>
          <span><i className="bi bi-clock"></i> {job.type}</span>
          <span><i className="bi bi-bar-chart"></i> {job.exp}</span>
        </div>

        <Card style={{ padding: 26, marginBottom: 20 }}>
          <h3>About the role</h3>
          <p style={{ marginTop: 8, color: 'var(--gray-200)', lineHeight: 1.8 }}>{job.summary}</p>
          <h4 style={{ marginTop: 20 }}>What you'll do</h4>
          <ul className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-300)', paddingLeft: 20, lineHeight: 1.9, marginTop: 6 }}>
            <li>Own a critical part of the {job.dept.toLowerCase()} stack end-to-end.</li>
            <li>Partner with product, design, and ops on weekly release cycles.</li>
            <li>Mentor 1–2 junior engineers and review their PRs.</li>
          </ul>
          <h4 style={{ marginTop: 20 }}>What we offer</h4>
          <ul className="rajdhani-lbl-text-sm" style={{ color: 'var(--gray-300)', paddingLeft: 20, lineHeight: 1.9, marginTop: 6 }}>
            <li>Competitive salary + ESOPs from day one.</li>
            <li>Generous leave + 4-day week pilot.</li>
            <li>Free CSR 762 after 18 months of tenure.</li>
          </ul>
        </Card>

        <Card as="form" onSubmit={apply} style={{ padding: 26 }}>
          <h3 style={{ marginBottom: 14 }}>Apply</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <FormGroup label="Full Name" htmlFor="name" required error={errors.name}>
              <input id="name" value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} />
            </FormGroup>
            <FormGroup label="Email" htmlFor="email" required error={errors.email}>
              <input id="email" type="email" value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} />
            </FormGroup>
          </div>
          <FormGroup label="LinkedIn / Portfolio" htmlFor="linkedin">
            <input id="linkedin" value={form.linkedin} onChange={(e) => setForm(f => ({ ...f, linkedin: e.target.value }))} placeholder="https://" />
          </FormGroup>
          <FormGroup label="Cover Note" htmlFor="cover" hint="Optional but appreciated.">
            <textarea id="cover" rows={4} value={form.cover} onChange={(e) => setForm(f => ({ ...f, cover: e.target.value }))} />
          </FormGroup>
          <Button variant="primary" type="submit" icon="send">Submit Application</Button>
        </Card>
      </div>
    </section>
  )
}
`)

/* ThankYou */
w('ThankYou.jsx', `import { Link } from 'react-router-dom'
import { Button, Card } from '@/ui'
import { PATHS } from '@/utils/routes'

export default function ThankYou() {
  return (
    <section className="section-pad">
      <div className="container" style={{ textAlign: 'center', maxWidth: 620 }}>
        <i className="bi bi-emoji-smile" style={{ fontSize: 64, color: 'var(--accent)' }}></i>
        <span className="section-label" style={{ marginTop: 12 }}>Thank You</span>
        <h1 className="section-title">We received your submission</h1>
        <p className="section-desc">A real human will reply within 1–2 working days. Meanwhile, here are some things you might enjoy.</p>

        <Card style={{ padding: 22, marginTop: 28, textAlign: 'left' }}>
          <h3 style={{ marginBottom: 12 }}>While you wait</h3>
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 8 }}>
            <li><Link to={PATHS.blog}><i className="bi bi-newspaper"></i> Read the Svitch Blog</Link></li>
            <li><Link to={PATHS.bookTestRide}><i className="bi bi-calendar-event"></i> Book a Test Ride</Link></li>
            <li><Link to={PATHS.dealers}><i className="bi bi-geo-alt"></i> Find a Dealer Near You</Link></li>
            <li><Link to={PATHS.faq}><i className="bi bi-patch-question"></i> Browse the FAQ</Link></li>
          </ul>
        </Card>

        <Button to={PATHS.home} variant="primary" icon="house" className="mt-4">Back to Home</Button>
      </div>
    </section>
  )
}
`)

console.log('Batch 4 generation complete — 13 pages written.')
