// Sidebar "Job Snapshot" widget — mirrors CSR_New_web `.snapshot-widget`.
const DEFAULT_ROWS = [
  { label: 'Department', value: 'Engineering'    },
  { label: 'Location',   value: 'Ahmedabad, GJ'  },
  { label: 'Job Type',   value: 'Full Time'      },
  { label: 'Experience', value: '3–6 Years'      },
  { label: 'Openings',   value: '2 Positions'    },
  { label: 'CTC Range',  value: '₹8–15 LPA'      },
  { label: 'Posted On',  value: 'Mar 25, 2026'   },
  { label: 'Apply By',   value: 'Apr 25, 2026'   },
]

export default function JobSnapshot({ title = 'Job Snapshot', rows = DEFAULT_ROWS }) {
  return (
    <div className="card-base snapshot-widget">
      <h4>{title}</h4>
      <div className="snapshot-rows">
        {rows.map((r) => (
          <div key={r.label} className="snapshot-row">
            <span className="rajdhani-lbl-text-sm">{r.label}</span>
            <span>{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
