import { Link } from 'react-router-dom'
import PageHero from '@/layouts/PageHero'
import ProductDetailGallery from '@/features/shop/product-detail/ProductDetailGallery'
import ProductDetailInfo from '@/features/shop/product-detail/ProductDetailInfo'
import ProductDetailTabs from '@/features/shop/product-detail/ProductDetailTabs'
import RelatedProducts from '@/features/shop/product-detail/RelatedProducts'
import { PATHS } from '@/utils/routes'
import '@/styles/pages/shop.css'

const GALLERY_IMAGES = [
  { src: '/images/product/csr-762-black.webp',      alt: 'CSR 762 electric motorcycle in Matte Black' },
  { src: '/images/product/speed_csr_762-1.webp',    alt: 'CSR 762 at speed on open road' },
  { src: '/images/product/side-profile.webp',       alt: 'CSR 762 side profile view' },
  { src: '/images/product/CSR-762-black-rider.webp', alt: 'Rider on CSR 762 Matte Black' },
]

export default function ProductDetail() {
  return (
    <>
      <PageHero
        id="pd-hero"
        className="grad-tc pd-hero"
        label={
          <>
            <Link className="rajdhani-lbl-text-sm" to={PATHS.home}>Home</Link>
            &nbsp;/&nbsp;
            <Link className="rajdhani-lbl-text-sm" to={PATHS.shop}>Shop</Link>
            &nbsp;/&nbsp;
            <Link className="rajdhani-lbl-text-sm" to={`${PATHS.shop}?category=motorcycles`}>
              Electric Motorcycles
            </Link>
            &nbsp;/&nbsp;
            <span className="pd-breadcrumb-current">CSR 762</span>
          </>
        }
        titleStart="Born "
        titleHighlight="Electric"
        titleEnd=". Built Different."
        description="The flagship CSR 762 — engineered in Ahmedabad, tested on Indian roads. Configure your bike below."
      />

      <section id="product-detail">
        <div className="container">
          <div className="pd-layout">
            <ProductDetailGallery images={GALLERY_IMAGES} productName="CSR 762" />
            <ProductDetailInfo productName="CSR 762" />
          </div>

          <ProductDetailTabs />
        </div>
      </section>

      <RelatedProducts productId="csr-762-black" category="motorcycles" />
    </>
  )
}
