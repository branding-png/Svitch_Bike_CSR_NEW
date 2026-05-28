import MediaKitContact from '@/features/press/media-kit/MediaKitContact'

// Press page CTA — same `.cta-box` shape as the Media-Kit contact card.
// Just a thin wrapper that passes press-page copy to the shared component.
export default function PressCta() {
  return (
    <MediaKitContact aria-label="PressCta" role="region"
      id="press-cta"
      label="Media Enquiry"
      titleStart="Working On A"
      titleAccent="Story?"
      description="Interviews, test rides, factory visits, or exclusive access to our founders — we're happy to help you tell the Svitch story right."
      emailKey="press"
      note="Response within 4 business hours."
    />
  )
}
