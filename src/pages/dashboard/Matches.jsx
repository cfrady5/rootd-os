import { useState, useEffect } from 'react'
import { getBusinessMatches } from '../../lib/api/index.js'
import { PageHeader, DataTable, StatusBadge, ScoreMeter, LoadingSpinner, FilterBar, Select, Drawer, InfoRow, Button } from '../../components/shared/UI.jsx'
import { palette } from '../../lib/theme.js'

export default function BusinessMatches() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => { getBusinessMatches().then(m => { setMatches(m); setLoading(false) }) }, [])

  const filtered = filter ? matches.filter(m => m.status === filter) : matches
  const columns = [
    { key: 'business', label: 'Athlete' },
    { key: 'category', label: 'Category' },
    { key: 'score', label: 'Match Score', render: v => <ScoreMeter score={v} size="sm" /> },
    { key: 'value', label: 'Deal Value' },
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
  ]

  if (loading) return <LoadingSpinner />

  return (
    <div>
      <PageHeader title="Athlete Matches" description="Athletes matched to your brand profile" />
      <div style={{ padding: '24px 36px' }}>
        <FilterBar>
          <Select value={filter} onChange={setFilter} options={['approved','pending','negotiation']} placeholder="All statuses" />
        </FilterBar>
        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
          <DataTable columns={columns} rows={filtered} onRowClick={setSelected} />
        </div>
      </div>
      <Drawer open={!!selected} onClose={() => setSelected(null)} title="Athlete Match Details">
        {selected && <>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <ScoreMeter score={selected.score} size="lg" />
            <div>
              <p style={{ fontWeight: 700, fontSize: '17px' }}>{selected.business}</p>
              <p style={{ fontSize: '13px', color: palette.charcoalMuted }}>{selected.category}</p>
            </div>
          </div>
          <InfoRow label="Status" value={<StatusBadge status={selected.status} />} />
          <InfoRow label="Proposed Value" value={selected.value} />
          <InfoRow label="Match Date" value={selected.date} />
          <InfoRow label="Notes" value={selected.notes} />
          <div style={{ marginTop: '24px', display: 'flex', gap: '10px' }}>
            <Button fullWidth>Initiate Deal</Button>
            <Button fullWidth variant="secondary">Message</Button>
          </div>
        </>}
      </Drawer>
    </div>
  )
}
