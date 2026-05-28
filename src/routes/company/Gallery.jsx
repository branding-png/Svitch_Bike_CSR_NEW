import PageHero from '@/layouts/PageHero'
import GalleryGrid from '@/features/company/gallery/GalleryGrid'
import '@/styles/pages/gallery.css'

export default function Gallery() {
  return (
    <>
      <PageHero
        id="gallery-hero"
        label="Visual Archive"
        titleStart={<>Svitch</>}
        titleHighlight="Gallery"
        description="Every angle, every color, every road — the CSR 762 in pixels."
      />
      <GalleryGrid />
    </>
  )
}
