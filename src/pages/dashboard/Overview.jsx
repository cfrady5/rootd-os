import { useState, useEffect } from 'react'
import { useProfile } from '../../context/ProfileContext.jsx'
import { getBusinessStats, getBusinessMatches, getDeals } from '../../lib/api/index.js'
import { PageHeader, StatCard, SectionCard, StatusBadge, ScoreMeter, LoadingSpinner } from '../../components/shared/UI.jsx'
import { Users2, Handshake, DollarSign, BarChart3 } from 'lucide-react'
import { palette } from '../../lib/theme.js'

export default function BusinessOverview() {
  const { profile } = useProfile()
  const [stats, setStats] = useState(null)
  const [matches, setMatches] = useState([])
  const [deals, setDeals] = useState([])

  useEffect(() => {
    Promise.all([getBusinessStats(), getBusinessMatches(), getDeals('biz-001', 'business')])
      .then(([s, m, d]) => { setStats(s); setMatches(m); setDeals(d) })
  }, [])

  if (!stats) return <LoadingSpinner />

  return (
    <div>
      <PageHeader title="Business Overview" description={`${profile?.name ?? 'Fresh Roots Cafe'} · ${profile?.category ?? 'Food & Drink'}`} />
      <div style={{ padding: '32px 36px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          <StatCard label="Total Matches" value={stats.totalMatches} icon={Users2} tone="mint" />
          <StatCard label="Active Deals" value={stats.activeDeals} icon={Handshake} tone="sky" />
          <StatCard label="Total Spend" value={stats.totalSpend} icon={DollarSign} tone="sage" />
          <StatCard label="Avg Match Score" value={stats.avgMatchScore} icon={BarChart3} tone="mint" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <SectionCard title="Top Athlete Matches" tone="mint">
            {matches.slice(0, 4).map(m => (
              <div key={m.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '14px' }}>{m.business}</p>
                  <p style={{ fontSize: '12px', color: palette.charcoalMuted }}>{m.category}</p>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <ScoreMeter score={m.score} size="sm" />
                  <StatusBadge status={m.status} />
                </div>
              </div>
            ))}
          </SectionCard>

          <SectionCard title="Recent Deals" tone="sky">
            {deals.slice(0, 4).map(d => (
              <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '13px' }}>{d.athlete}</p>
                  <p style={{ fontSize: '12px', color: palette.charcoalMuted }}>{d.type}</p>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: palette.pine }}>{d.value}</span>
                  <StatusBadge status={d.status} />
                </div>
              </div>
            ))}
          </SectionCard>
        </div>
      </div>
    </div>
  )
}
