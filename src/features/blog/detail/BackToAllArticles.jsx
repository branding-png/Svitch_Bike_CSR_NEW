import { Link } from 'react-router-dom'

// Sidebar "Back to All Articles" link — mirrors CSR_New_web's footer
// sidebar widget on the blog-detail page. Single-purpose, but kept here so
// the sidebar is composed of consistently named widgets.
export default function BackToAllArticles({
  label = 'Back to All Articles',
  to    = '/blog',
}) {
  return (
    <div className="card-base widget" style={{ textAlign: 'center' }}>
      <Link to={to} className="rajdhani-lbl-text-sm btn-csr secondary sm full-w">
        <i className="bi bi-arrow-left"></i> {label}
      </Link>
    </div>
  )
}
