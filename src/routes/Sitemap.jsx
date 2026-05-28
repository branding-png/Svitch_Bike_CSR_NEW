import PageHero from '@/layouts/PageHero'
import SitemapGrid, { TOTAL_PAGES, TOTAL_GROUPS } from '@/features/system/sitemap/SitemapGrid'
import '@/styles/pages/sitemap.css'

export default function Sitemap() {
  return (
    <>
      <PageHero
        id="sitemap-hero"
        label="Sitemap"
        titleStart={<>Every </>}
        titleHighlight="Page"
        titleEnd=", One View."
        description={
          <>
            <strong>{TOTAL_PAGES}</strong> public pages across <strong>{TOTAL_GROUPS}</strong> sections — every route on Svitch.bike, grouped for crawlers, audits, and the occasional human.
          </>
        }
      />

      <SitemapGrid />
    </>
  )
}
