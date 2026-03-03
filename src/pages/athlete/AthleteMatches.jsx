import { useState, useEffect } from 'react'
import { useProfile } from '../../context/ProfileContext.jsx'
import { getAthleteMatches } from '../../lib/api/index.js'
import { PageHeader, DataTable, StatusBadge, ScoreMeter, FilterBar, Select, LoadingSpinner, Drawer, InfoRow, Button } from '../../components/shared/UI.jsx'
import { palette } from '../../lib/theme.js'

export default function AthleteMatches() {
  const { profile } = useProfile()
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    getAthleteMatches(profile?.id).then(m => { setMatches(m); setLoading(false) })
  }, [profile?.id])

  const filtered = filter ? matches.filter(m => m.status === filter) : matches

  const columns = [
    { key: 'business', label: 'Business' },
    { key: 'category', label: 'Category' },
    { key: 'score', label: 'Match Score', render: (v) => <ScoreMeter score={v} size="sm" /> },
    { key: 'value', label: 'Deal Value' },
    { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
  ]

  if (loading) return <LoadingSpinner />

  return (
    <div>
      <PageHeader title="My Matches" description="Brand partners matched to your profile and interests" />
      <div style={{ padding: '24px 36px' }}>
        <FilterBar>
          <Select value={filter} onChange={setFilter} options={['approved','pending','negotiation','cancelled']} placeholder="All statuses" />
        </FilterBar>
        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
          <DataTable columns={columns} rows={filtered} onRowClick={setSelected} />
        </div>
      </div>

      <Drawer open={!!selected} onClose={() => setSelected(null)} title={selected?.business ?? ''}>
        {selected && <>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <ScoreMeter score={selected.score} size="lg" />
            <div>
              <p style={{ fontWeight: 600, fontSize: '16px' }}>{selected.business}</p>
              <p style={{ fontSize: '13px', color: palette.charcoalMuted }}>{selected.category}</p>
            </div>
          </div>
          <InfoRow label="Status" value={<StatusBadge status={selected.status} />} />
          <InfoRow label="Deal Value" value={selected.value} />
          <InfoRow label="Match Date" value={selected.date} />
          <InfoRow label="Notes" value={selected.notes} />
          <div style={{ marginTop: '24px' }}>
            <Button fullWidth>Accept Match</Button>
          </div>
        </>}
      </Drawer>
    </div>
  )
}
