import { useState, useEffect } from 'react'
import { useProfile } from '../../context/ProfileContext.jsx'
import { getDirectorStats, getRoster, getComplianceItems } from '../../lib/api/index.js'
import { PageHeader, StatCard, SectionCard, StatusBadge, LoadingSpinner, DataTable } from '../../components/shared/UI.jsx'
import { Users, Handshake, ShieldCheck, BarChart3 } from 'lucide-react'
import { palette } from '../../lib/theme.js'

export default function DirectorDashboard() {
  const { profile } = useProfile()
  const [stats, setStats] = useState(null)
  const [roster, setRoster] = useState([])
  const [compliance, setCompliance] = useState([])

  useEffect(() => {
    Promise.all([getDirectorStats(), getRoster(), getComplianceItems()])
      .then(([s, r, c]) => { setStats(s); setRoster(r); setCompliance(c) })
  }, [])

  if (!stats) return <LoadingSpinner />

  const columns = [
    { key: 'name', label: 'Athlete' },
    { key: 'sport', label: 'Sport' },
    { key: 'rootdScore', label: 'Score', render: v => <span style={{ fontWeight: 600, color: palette.pine }}>{v}</span> },
    { key: 'deals', label: 'Deals' },
    { key: 'compliance', label: 'Compliance', render: v => <StatusBadge status={v} /> },
  ]

  return (
    <div>
      <PageHeader title={`Director Dashboard`} description={`${profile?.institution ?? 'Stanford University'} · ${profile?.title ?? 'NIL Director'}`} />
      <div style={{ padding: '32px 36px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          <StatCard label="Total Athletes" value={stats.totalAthletes} icon={Users} tone="mint" />
          <StatCard label="Active Deals" value={stats.activeDeals} icon={Handshake} tone="sky" />
          <StatCard label="Total NIL Value" value={stats.totalValue} icon={BarChart3} tone="sage" />
          <StatCard label="Compliance Rate" value={stats.complianceRate} icon={ShieldCheck} tone="mint" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          <SectionCard title="Roster Overview" tone="default">
            <DataTable columns={columns} rows={roster} />
          </SectionCard>

          <SectionCard title="Pending Review" tone="amber">
            {compliance.filter(c => c.status === 'warning' || c.status === 'todo').map(c => (
              <div key={c.id} style={{ padding: '10px 0', borderBottom: '1px solid #fde68a' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '13px', color: palette.charcoal }}>{c.athlete}</p>
                    <p style={{ fontSize: '12px', color: palette.charcoalMuted }}>{c.type}</p>
                  </div>
                  <StatusBadge status={c.status} />
                </div>
              </div>
            ))}
          </SectionCard>
        </div>
      </div>
    </div>
  )
}
