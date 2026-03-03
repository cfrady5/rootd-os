import { useState, useEffect } from 'react'
import { getBusinessStats, getDeals } from '../../lib/api/index.js'
import { PageHeader, SectionCard, StatCard, LoadingSpinner } from '../../components/shared/UI.jsx'
import { BarChart3, TrendingUp, DollarSign, Target } from 'lucide-react'
import { palette } from '../../lib/theme.js'

export default function BusinessCockpit() {
  const [stats, setStats] = useState(null)

  useEffect(() => { getBusinessStats().then(setStats) }, [])
  if (!stats) return <LoadingSpinner />

  const barData = [
    { label: 'Jan', value: 60 }, { label: 'Feb', value: 75 }, { label: 'Mar', value: 82 },
    { label: 'Apr', value: 70 }, { label: 'May', value: 88 }, { label: 'Jun', value: 91 },
  ]
  const maxBar = Math.max(...barData.map(b => b.value))

  return (
    <div>
      <PageHeader title="Analytics Cockpit" description="Performance metrics and campaign insights" />
      <div style={{ padding: '32px 36px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
          <StatCard label="Match Quality" value={`${stats.avgMatchScore}%`} icon={Target} tone="mint" trend="+4%" />
          <StatCard label="Active Deals" value={stats.activeDeals} icon={TrendingUp} tone="sky" />
          <StatCard label="Total Spend" value={stats.totalSpend} icon={DollarSign} tone="sage" />
          <StatCard label="Completed" value={stats.completedDeals} icon={BarChart3} tone="default" />
        </div>

        <SectionCard title="Match Score Trend" tone="sky">
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '120px', padding: '0 8px' }}>
            {barData.map(b => (
              <div key={b.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '100%', background: palette.pine, borderRadius: '4px 4px 0 0', height: `${(b.value / maxBar) * 100}px`, transition: 'height 0.3s' }} />
                <span style={{ fontSize: '11px', color: palette.charcoalMuted }}>{b.label}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
