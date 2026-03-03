import { useState, useEffect } from 'react'
import { useProfile } from '../../context/ProfileContext.jsx'
import { getAthleteMatches, getAthleteActivity } from '../../lib/api/index.js'
import { PageHeader, StatCard, SectionCard, StatusBadge, ScoreMeter, LoadingSpinner } from '../../components/shared/UI.jsx'
import { palette } from '../../lib/theme.js'
import { Handshake, TrendingUp, Star, Activity, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function AthleteOverview() {
  const { profile } = useProfile()
  const navigate = useNavigate()
  const [matches, setMatches] = useState([])
  const [activity, setActivity] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getAthleteMatches(profile?.id), getAthleteActivity(profile?.id)])
      .then(([m, a]) => { setMatches(m); setActivity(a); setLoading(false) })
  }, [profile?.id])

  if (loading) return <LoadingSpinner />
  const activeDeals = matches.filter(m => m.status === 'approved' || m.status === 'active').length

  return (
    <div>
      <PageHeader title={`Welcome back, ${profile?.name?.split(' ')[0] ?? 'Athlete'}`} description={`${profile?.sport} · ${profile?.institution}`} />
      <div style={{ padding: '32px 36px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          <StatCard label="Rootd Score" value={profile?.rootdScore ?? 82} tone="mint" icon={Star} helper="Top 20% of athletes" />
          <StatCard label="Active Deals" value={activeDeals} tone="sky" icon={Handshake} />
          <StatCard label="Total Matches" value={matches.length} tone="sage" icon={TrendingUp} />
          <StatCard label="Profile Views" value="1.2k" tone="default" icon={Activity} helper="This month" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
          <SectionCard title="Top Matches" tone="mint" action={
            <button onClick={() => navigate('/athlete/matches')} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: palette.pine, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
              View all <ArrowRight size={14} />
            </button>
          }>
            {matches.slice(0, 3).map(m => (
              <div key={m.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '14px', color: palette.charcoal }}>{m.business}</p>
                  <p style={{ fontSize: '12px', color: palette.charcoalMuted }}>{m.category}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ScoreMeter score={m.score} size="sm" />
                  <StatusBadge status={m.status} />
                </div>
              </div>
            ))}
          </SectionCard>

          <SectionCard title="Recent Activity" tone="sky">
            {activity.map(a => (
              <div key={a.id} style={{ display: 'flex', gap: '12px', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
                <div style={{ width: '32px', height: '32px', background: palette.sage, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Activity size={15} color={palette.pine} />
                </div>
                <div>
                  <p style={{ fontSize: '13px', color: palette.charcoal }}>{a.text}</p>
                  <p style={{ fontSize: '12px', color: palette.charcoalMuted }}>{a.time}</p>
                </div>
              </div>
            ))}
          </SectionCard>
        </div>

        <SectionCard title="Profile Completion" tone="sage">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ flex: 1, background: '#e5e7eb', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
              <div style={{ width: '78%', height: '100%', background: palette.pine, borderRadius: '999px' }} />
            </div>
            <span style={{ fontSize: '14px', fontWeight: 600, color: palette.pine, whiteSpace: 'nowrap' }}>78% Complete</span>
          </div>
          <p style={{ fontSize: '13px', color: palette.charcoalMuted, marginTop: '10px' }}>Add your social media handles and bio to improve your match quality.</p>
        </SectionCard>
      </div>
    </div>
  )
}
