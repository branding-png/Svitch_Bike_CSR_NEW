import PageHero from '@/layouts/PageHero'
import MediaKitAssets from '@/features/press/media-kit/MediaKitAssets'
import MediaKitFacts from '@/features/press/media-kit/MediaKitFacts'
import MediaKitContact from '@/features/press/media-kit/MediaKitContact'
import '@/styles/pages/media-kit.css'

export default function MediaKit() {
  return (
    <>
      <PageHero
        id="media-kit-hero"
        label="For Press & Partners"
        titleStart={<>Media</>}
        titleHighlight="Kit"
        description="Everything you need to write, design, or talk about Svitch — in one downloadable bundle."
      />

      <MediaKitAssets />
      <MediaKitFacts />
      <MediaKitContact />
    </>
  )
}
