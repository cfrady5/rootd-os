import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button, SectionCard, StatCard, StatusBadge, ScoreMeter } from '../../components/shared/UI.jsx'
import { palette } from '../../lib/theme.js'
import { Users, Handshake, BarChart3, Shield } from 'lucide-react'

export default function Demo() {
  const navigate = useNavigate()
  const demoStats = [
    { label: 'Active Matches', value: '5', tone: 'mint', icon: Users },
    { label: 'Active Deals', value: '2', tone: 'sky', icon: Handshake },
    { label: 'Total Earned', value: '$1,150', tone: 'sage', icon: BarChart3 },
    { label: 'Compliance', value: '92%', tone: 'mint', icon: Shield },
  ]

  return (
    <div style={{ padding: '60px 32px', maxWidth: '1100px', margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '64px' }}>
        <h1 style={{ fontSize: '40px', fontWeight: 700, color: palette.charcoal, marginBottom: '12px', fontFamily: 'Space Grotesk, sans-serif' }}>Interactive Demo</h1>
        <p style={{ fontSize: '16px', color: palette.charcoalMuted, marginBottom: '32px' }}>Explore the Rootd platform with sample data. No account required.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button onClick={() => navigate('/signin')}>Enter Athlete Portal</Button>
          <Button variant="secondary" onClick={() => navigate('/signin')}>Enter Director Portal</Button>
          <Button variant="outline" onClick={() => navigate('/signin')}>Enter Business Portal</Button>
        </div>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '48px' }}>
        {demoStats.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '48px' }}>
        <SectionCard title="Sample Athlete Match" tone="mint">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <ScoreMeter score={94} size="lg" />
            <div>
              <p style={{ fontWeight: 600, color: palette.charcoal }}>Fresh Roots Cafe</p>
              <p style={{ fontSize: '13px', color: palette.charcoalMuted, margin: '4px 0' }}>Food & Drink · Palo Alto, CA</p>
              <StatusBadge status="approved" />
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Sample Deal" tone="sky">
          <div>
            <p style={{ fontWeight: 600, color: palette.charcoal, marginBottom: '8px' }}>Lume Activewear — Brand Ambassador</p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <StatusBadge status="active" />
              <span style={{ fontSize: '14px', color: palette.charcoal }}>$650</span>
            </div>
            <p style={{ fontSize: '13px', color: palette.charcoalMuted }}>3-month content series campaign</p>
          </div>
        </SectionCard>
      </div>

      <div style={{ textAlign: 'center', padding: '48px', background: palette.cream, borderRadius: '20px', border: `1px solid ${palette.sageDark}` }}>
        <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '12px' }}>Ready to explore the full platform?</h2>
        <p style={{ color: palette.charcoalMuted, marginBottom: '24px' }}>Sign in with demo credentials or create a free account.</p>
        <Button size="lg" onClick={() => navigate('/signin')}>Enter Demo Mode</Button>
      </div>
    </div>
  )
}
