import { useState, useEffect } from 'react'
import { getDeals } from '../../lib/api/index.js'
import { PageHeader, DataTable, StatusBadge, LoadingSpinner, FilterBar, Select, StatCard, Drawer, InfoRow } from '../../components/shared/UI.jsx'
import { Handshake, Clock, CheckCircle, DollarSign } from 'lucide-react'

export default function BusinessDeals() {
  const [deals, setDeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => { getDeals('biz-001', 'business').then(d => { setDeals(d); setLoading(false) }) }, [])

  if (loading) return <LoadingSpinner />

  const active = deals.filter(d => d.status === 'active').length
  const pending = deals.filter(d => d.status === 'pending' || d.status === 'pending_payment').length
  const completed = deals.filter(d => d.status === 'completed').length
  const filtered = filter ? deals.filter(d => d.status === filter) : deals

  const columns = [
    { key: 'athlete', label: 'Athlete' },
    { key: 'type', label: 'Deal Type' },
    { key: 'value', label: 'Value' },
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
    { key: 'created', label: 'Created' },
    { key: 'expires', label: 'Expires', render: v => v ?? '—' },
  ]

  return (
    <div>
      <PageHeader title="Deals" description="Track all your NIL partnerships and activations" />
      <div style={{ padding: '32px 36px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
          <StatCard label="Active" value={active} icon={Handshake} tone="mint" />
          <StatCard label="Pending" value={pending} icon={Clock} tone="amber" />
          <StatCard label="Completed" value={completed} icon={CheckCircle} tone="sky" />
          <StatCard label="Total Deals" value={deals.length} icon={DollarSign} tone="default" />
        </div>
        <FilterBar>
          <Select value={filter} onChange={setFilter} options={['active','pending','pending_payment','completed','negotiation','cancelled']} placeholder="All statuses" />
        </FilterBar>
        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
          <DataTable columns={columns} rows={filtered} onRowClick={setSelected} />
        </div>
      </div>
      <Drawer open={!!selected} onClose={() => setSelected(null)} title="Deal Details">
        {selected && <>
          <InfoRow label="Athlete" value={selected.athlete} />
          <InfoRow label="Type" value={selected.type} />
          <InfoRow label="Value" value={selected.value} />
          <InfoRow label="Status" value={<StatusBadge status={selected.status} />} />
          <InfoRow label="Created" value={selected.created} />
          <InfoRow label="Expires" value={selected.expires ?? '—'} />
        </>}
      </Drawer>
    </div>
  )
}
