import { useState, useEffect } from 'react'
import { getDeals } from '../../lib/api/index.js'
import { PageHeader, DataTable, StatusBadge, LoadingSpinner, FilterBar, Select } from '../../components/shared/UI.jsx'

export default function DirectorDeals() {
  const [deals, setDeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')

  useEffect(() => { getDeals('institution-001', 'director').then(d => { setDeals(d); setLoading(false) }) }, [])

  const filtered = filter ? deals.filter(d => d.status === filter) : deals
  const columns = [
    { key: 'athlete', label: 'Athlete' },
    { key: 'business', label: 'Business' },
    { key: 'type', label: 'Type' },
    { key: 'value', label: 'Value' },
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
    { key: 'created', label: 'Created' },
  ]

  if (loading) return <LoadingSpinner />

  return (
    <div>
      <PageHeader title="All Deals" description="Monitor and approve all NIL deals across your roster" />
      <div style={{ padding: '24px 36px' }}>
        <FilterBar>
          <Select value={filter} onChange={setFilter} options={['active','pending','completed','negotiation','cancelled']} placeholder="All statuses" />
        </FilterBar>
        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
          <DataTable columns={columns} rows={filtered} />
        </div>
      </div>
    </div>
  )
}
