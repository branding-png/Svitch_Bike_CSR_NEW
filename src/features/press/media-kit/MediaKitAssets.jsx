import SectionHeader from '@/ui/SectionHeader'

// Media Kit asset library — mirrors CSR_New_web `#mk-assets`.
// Each asset has an icon, name, description, file meta, and a download href.
// All hrefs default to `#` until real CDN URLs are wired up.
const ASSETS = [
  {
    icon: 'bi-image',
    title: 'Brand Logos',
    desc:  'SVG, PNG, EPS · light & dark variants · clear-space spec.',
    meta:  '12 files · 8 MB',
    href:  '#',
  },
  {
    icon: 'bi-camera',
    title: 'Product Photography',
    desc:  'Hi-res studio + lifestyle photos of CSR 762 in all three colors.',
    meta:  '48 files · 96 MB',
    href:  '#',
  },
  {
    icon: 'bi-camera-video',
    title: 'Video B-Roll',
    desc:  '4K ride footage, studio reveals, factory tour clips.',
    meta:  '8 files · 240 MB',
    href:  '#',
  },
  {
    icon: 'bi-file-earmark-text',
    title: 'Fact Sheet',
    desc:  'Single-page spec + company snapshot. PDF + DOCX.',
    meta:  '2 files · 1 MB',
    href:  '#',
  },
  {
    icon: 'bi-palette',
    title: 'Brand Guidelines',
    desc:  'Color, type, layout, voice — the full 36-page manual.',
    meta:  '1 file · 22 MB',
    href:  '#',
  },
  {
    icon: 'bi-people',
    title: 'Leadership Photos',
    desc:  'Founders and key leadership headshots.',
    meta:  '7 files · 14 MB',
    href:  '#',
  },
]

export default function MediaKitAssets({
  assets   = ASSETS,
  fullKitHref = '#',
}) {
  return (
    <section aria-label="MediaKitAssets" id="mk-assets" className="section-pad">
      <div className="container">
        <SectionHeader
          label="Asset Library"
          titleStart="Download"
          titleAccent="Everything"
          description="Logos, photos, video, brand guidelines — production-ready and royalty-free for editorial and partner use."
        />

        <div style={{ textAlign: 'center', marginTop: -8, marginBottom: 32 }}>
          <a href={fullKitHref} className="btn-csr primary mk-hero-cta">
            <i className="bi bi-download"></i> Download Full Kit (180 MB ZIP)
          </a>
        </div>

        <div className="mk-grid">
          {assets.map((a) => (
            <div key={a.title} className="card-base mk-card">
              <div className="mk-card-icon"><i className={`bi ${a.icon}`}></i></div>
              <h3>{a.title}</h3>
              <p>{a.desc}</p>
              <span className="mk-card-meta">
                <i className="bi bi-file-earmark-zip"></i> {a.meta}
              </span>
              <a href={a.href} className="btn-csr">
                <span><i className="bi bi-download"></i> Download</span>
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
