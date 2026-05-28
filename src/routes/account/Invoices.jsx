import { useMemo, useState } from 'react'
import AccountLayout    from '@/features/account/AccountLayout'
import AccountContent   from '@/features/account/AccountContent'
import InvoiceStats     from '@/features/account/invoices/InvoiceStats'
import InvoiceToolbar   from '@/features/account/invoices/InvoiceToolbar'
import InvoiceTable     from '@/features/account/invoices/InvoiceTable'
import InvoiceFooterNote from '@/features/account/invoices/InvoiceFooterNote'
import { INVOICES, INVOICE_YEARS, INVOICE_TYPES } from '@/features/account/invoices/invoices-data'
import { useToast } from '@/contexts/ToastContext'
import { useUser } from '@/contexts/UserContext'
import '@/styles/pages/invoices.css'

const ACTION_TOAST = {
  view:     (id) => `Opening invoice ${id}…`,
  download: (id) => `Downloading ${id}.pdf`,
  email:    (id, to) => `Emailed ${id} to ${to}.`,
  print:    (id) => `Preparing ${id} for print…`,
}

export default function Invoices() {
  const { show } = useToast()
  const { user } = useUser()
  const [query, setQuery] = useState('')
  const [year, setYear]   = useState(INVOICE_YEARS[0])
  const [type, setType]   = useState(INVOICE_TYPES[0])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return INVOICES.filter((inv) => {
      if (q && !`${inv.id} ${inv.order}`.toLowerCase().includes(q)) return false
      if (type !== INVOICE_TYPES[0] && inv.type !== type) return false
      if (year !== INVOICE_YEARS[0]) {
        // FY 2025–26 = Apr 2025 → Mar 2026, etc.
        const [, fromYear] = year.match(/(\d{4})/) || []
        if (fromYear) {
          const dt = new Date(inv.date)
          const fyStart = new Date(`${fromYear}-04-01`)
          const fyEnd   = new Date(`${Number(fromYear) + 1}-03-31`)
          if (dt < fyStart || dt > fyEnd) return false
        }
      }
      return true
    })
  }, [query, year, type])

  function handleAction(action, invoice) {
    if (action === 'email') {
      const to = user?.email || 'your inbox'
      show(ACTION_TOAST.email(invoice.id, to), 'success', 3500)
    } else {
      show(ACTION_TOAST[action](invoice.id), 'info', 3000)
    }
  }

  function handleBulkDownload() {
    if (!filtered.length) {
      show('No invoices match your filters to download.', 'error', 3000)
      return
    }
    show(`Bundling ${filtered.length} invoice${filtered.length === 1 ? '' : 's'} as a ZIP…`, 'success', 3500)
  }

  return (
    <AccountLayout>
      <AccountContent
        crumbLabel="Invoices & GST"
        title="Invoices & GST"
        description="All your tax invoices in one place — download, print, or email anytime."
      >
        <InvoiceStats />
        <InvoiceToolbar
          query={query} onQueryChange={setQuery}
          year={year}   onYearChange={setYear}
          type={type}   onTypeChange={setType}
          onBulkDownload={handleBulkDownload}
        />
        <InvoiceTable invoices={filtered} onAction={handleAction} />
        <InvoiceFooterNote />
      </AccountContent>
    </AccountLayout>
  )
}
