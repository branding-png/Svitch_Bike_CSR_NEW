// Card 2 — Live tracking timeline. Mirrors CSR_New_web `.track-timeline`.
// Each step matches the legacy markup:
//   <li class="track-step is-{state}">
//     <span class="track-dot"><i /></span>
//     <h5>{title}</h5>
//     <span class="track-step-when rajdhani-lbl-text-sm">{when}</span>
//     <p class="track-step-desc">{desc}</p>
//   </li>
//
// `state` is one of: 'done' | 'current' | 'upcoming' | 'cancelled'.
// The dot icon is auto-picked from state when `icon` isn't passed.
const STATE_ICON = {
  done:      'bi-check-lg',
  current:   'bi-circle-fill',
  upcoming:  'bi-circle-fill',
  cancelled: 'bi-x-lg',
}

export default function TrackTimeline({ stages = [] }) {
  return (
    <div className="card-base order-card">
      <div className="account-section-head">
        <h3>Tracking Timeline</h3>
        <span className="track-live">
          <i className="bi bi-clock-history"></i> Live
        </span>
      </div>

      <ol className="track-timeline">
        {stages.map((s, i) => {
          const state = s.state || 'upcoming'
          const icon  = s.icon  || STATE_ICON[state]
          return (
            <li aria-label="TrackTimeline" role="region" key={i} className={`track-step is-${state}`}>
              <span className="track-dot">
                <i className={`bi ${icon}`}></i>
              </span>
              <h5>{s.title}</h5>
              {s.when && (
                <span className="track-step-when rajdhani-lbl-text-sm">{s.when}</span>
              )}
              {s.desc && <p className="track-step-desc">{s.desc}</p>}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
