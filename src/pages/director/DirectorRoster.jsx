import { useState, useEffect } from 'react'
import { getRoster } from '../../lib/api/index.js'
import { PageHeader, DataTable, StatusBadge, FilterBar, Select, LoadingSpinner, ScoreMeter, Drawer, InfoRow } from '../../components/shared/UI.jsx'

export default function DirectorRoster() {
  const [roster, setRoster] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => { getRoster().then(r => { setRoster(r); setLoading(false) }) }, [])

  const filtered = filter ? roster.filter(r => r.status === filter) : roster
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'sport', label: 'Sport' },
    { key: 'year', label: 'Year' },
    { key: 'rootdScore', label: 'Score', render: v => <ScoreMeter score={v} size="sm" /> },
    { key: 'deals', label: 'Deals' },
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
    { key: 'compliance', label: 'Compliance', render: v => <StatusBadge status={v} /> },
  ]

  if (loading) return <LoadingSpinner />

  return (
    <div>
      <PageHeader title="Roster" description="Manage all athletes under your NIL oversight" />
      <div style={{ padding: '24px 36px' }}>
        <FilterBar>
          <Select value={filter} onChange={setFilter} options={['active','inactive']} placeholder="All athletes" />
        </FilterBar>
        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
          <DataTable columns={columns} rows={filtered} onRowClick={setSelected} />
        </div>
      </div>
      <Drawer open={!!selected} onClose={() => setSelected(null)} title={selected?.name ?? ''}>
        {selected && <>
          <InfoRow label="Sport" value={selected.sport} />
          <InfoRow label="Year" value={selected.year} />
          <InfoRow label="Rootd Score" value={<ScoreMeter score={selected.rootdScore} size="sm" />} />
          <InfoRow label="Active Deals" value={selected.deals} />
          <InfoRow label="Status" value={<StatusBadge status={selected.status} />} />
          <InfoRow label="Compliance" value={<StatusBadge status={selected.compliance} />} />
        </>}
      </Drawer>
    </div>
  )
}
