import { useState, useEffect } from 'react'
import { useProfile } from '../../context/ProfileContext.jsx'
import { getAthleteMatches, getAthleteActivity } from '../../lib/api/index.js'
import { StatCard, SectionCard, StatusBadge, ScoreMeter, LoadingSpinner } from '../../components/shared/UI.jsx'
import { palette } from '../../lib/theme.js'
import { Handshake, TrendingUp, Star, Activity, ArrowRight, Zap, CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const QUICK_ACTIONS = [
  { icon: Zap,       label: 'Find Matches',   sub: 'See who fits your brand',    route: '/athlete/matches',      color: palette.pine },
  { icon: Handshake, label: 'View Deals',     sub: 'Track active partnerships',  route: '/athlete/matches',      color: '#1d4ed8'    },
  { icon: Star,      label: 'Update Profile', sub: 'Boost your match score',     route: '/athlete/edit-profile', color: '#7e22ce'    },
]

// Compute profile completion from actual profile data
function calcProfileCompletion(profile) {
  const checks = [
    { label: 'Basic info',      done: !!(profile?.name && profile?.email) },
    { label: 'Sport & school',  done: !!(profile?.sport && profile?.institution) },
    { label: 'Brand interests', done: !!(profile?.categories?.length) },
    { label: 'Social handles',  done: !!(profile?.socialFollowers?.instagram || profile?.socialFollowers?.tiktok) },
  ]
  const pct = Math.round((checks.filter(c => c.done).length / checks.length) * 100)
  return { checks, pct }
}

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

  const firstName = profile?.name?.split(' ')[0] ?? 'Athlete'
  const score = profile?.rootdScore ?? null
  const activeDeals = matches.filter(m => m.status === 'approved' || m.status === 'active').length
  const { checks, pct: profilePct } = calcProfileCompletion(profile)

  return (
    <div>
      {/* Hero welcome strip */}
      <div style={{
        background: `linear-gradient(135deg, ${palette.pine} 0%, ${palette.pineDark} 100%)`,
        color: '#fff', padding: '32px 36px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px',
        flexWrap: 'wrap',
      }}>
        <div>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '4px', fontWeight: 500 }}>
            {profile?.sport ?? 'Athlete'} · {profile?.institution ?? 'Rootd OS'}
          </p>
          <h1 style={{ fontSize: '26px', fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif', marginBottom: '6px' }}>
            Welcome back, {firstName} 👋
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.72)' }}>
            You have <strong>{matches.length}</strong> matches and <strong>{activeDeals}</strong> active deals.
          </p>
        </div>

        {/* Rootd Score — only show if athlete has taken quiz */}
        {score !== null && (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px', padding: '20px 28px', textAlign: 'center', backdropFilter: 'blur(8px)' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>Your RootdScore</p>
            <ScoreMeter score={score} size="lg" />
          </motion.div>
        )}

        {/* Prompt to take quiz if no score yet */}
        {score === null && (
          <motion.button initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}
            onClick={() => navigate('/quiz')}
            style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '16px', padding: '20px 28px', textAlign: 'center', cursor: 'pointer', fontFamily: 'inherit', color: '#fff' }}>
            <p style={{ fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>Get Your RootdScore</p>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>Take the 10-min quiz to unlock matches</p>
          </motion.button>
        )}
      </div>

      <div style={{ padding: '32px 36px' }}>

        {/* Quick Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '32px' }}>
          {QUICK_ACTIONS.map((a, i) => (
            <motion.button key={a.label}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              onClick={() => navigate(a.route)}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '14px 16px', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', transition: 'all 0.15s' }}
              whileHover={{ borderColor: a.color, boxShadow: `0 4px 16px ${a.color}22` }}>
              <div style={{ width: '36px', height: '36px', background: `${a.color}15`, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <a.icon size={18} color={a.color} />
              </div>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 600, color: palette.charcoal }}>{a.label}</p>
                <p style={{ fontSize: '12px', color: palette.charcoalMuted }}>{a.sub}</p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Stat cards — no fake numbers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {score !== null && <StatCard label="Rootd Score" value={score} tone="mint" icon={Star} />}
          <StatCard label="Active Deals" value={activeDeals} tone="sky" icon={Handshake} />
          <StatCard label="Total Matches" value={matches.length} tone="sage" icon={TrendingUp} />
          <StatCard label="Profile Complete" value={`${profilePct}%`} tone="default" icon={Activity} />
        </div>

        {/* Matches + Activity */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
          <SectionCard title="Top Matches" tone="mint" action={
            <button onClick={() => navigate('/athlete/matches')}
              style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: palette.pine, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500 }}>
              View all <ArrowRight size={14} />
            </button>
          }>
            {matches.length === 0 ? (
              <p style={{ fontSize: '14px', color: palette.charcoalMuted, padding: '12px 0' }}>
                No matches yet. <button onClick={() => navigate('/quiz')} style={{ color: palette.pine, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>Take the quiz</button> to get matched.
              </p>
            ) : matches.slice(0, 3).map(m => (
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
            {activity.length === 0 ? (
              <p style={{ fontSize: '14px', color: palette.charcoalMuted, padding: '12px 0' }}>No activity yet.</p>
            ) : activity.map(a => (
              <div key={a.id} style={{ display: 'flex', gap: '12px', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
                <div style={{ width: '32px', height: '32px', background: '#eff6ff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Activity size={15} color="#1d4ed8" />
                </div>
                <div>
                  <p style={{ fontSize: '13px', color: palette.charcoal }}>{a.text}</p>
                  <p style={{ fontSize: '12px', color: palette.charcoalMuted }}>{a.time}</p>
                </div>
              </div>
            ))}
          </SectionCard>
        </div>

        {/* Profile completion — computed from real data */}
        <SectionCard title="Profile Completion" tone="sage" subtitle="A complete profile unlocks more business matches">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
            <div style={{ flex: 1, background: '#e5e7eb', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${profilePct}%` }} transition={{ duration: 0.8, delay: 0.3 }}
                style={{ height: '100%', background: `linear-gradient(90deg, ${palette.pine}, ${palette.pineLight})`, borderRadius: '999px' }} />
            </div>
            <span style={{ fontSize: '14px', fontWeight: 700, color: palette.pine, whiteSpace: 'nowrap' }}>{profilePct}%</span>
          </div>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {checks.map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: item.done ? palette.pine : palette.charcoalMuted }}>
                <CheckCircle size={13} color={item.done ? palette.pine : '#d1d5db'} />
                {item.label}
              </div>
            ))}
          </div>
        </SectionCard>

      </div>
    </div>
  )
}
