import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button, SectionCard, StatusBadge, ScoreMeter } from '../../components/shared/UI.jsx'
import { palette } from '../../lib/theme.js'
import { Trophy, Shield, Building2, ArrowRight } from 'lucide-react'

const PORTALS = [
  {
    icon: Trophy,
    color: palette.pine,
    bg: '#f0f4e8',
    border: '#c8d8a8',
    title: 'Athlete Portal',
    desc: 'View your matches, manage deals, and track profile completion.',
  },
  {
    icon: Shield,
    color: '#1d4ed8',
    bg: '#eff6ff',
    border: '#bfdbfe',
    title: 'Director Portal',
    desc: 'Monitor roster-wide NIL activity and compliance status.',
  },
  {
    icon: Building2,
    color: '#7e22ce',
    bg: '#f5f3ff',
    border: '#ddd6fe',
    title: 'Business Portal',
    desc: 'Discover athletes, initiate matches, and track campaign ROI.',
  },
]

export default function Demo() {
  const navigate = useNavigate()

  return (
    <div style={{ padding: '60px 32px', maxWidth: '1000px', margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '64px' }}>
        <p style={{ fontSize: '13px', fontWeight: 600, color: palette.pine, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>Live Demo</p>
        <h1 style={{ fontSize: '40px', fontWeight: 800, color: palette.charcoal, marginBottom: '14px', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}>
          Explore the Platform
        </h1>
        <p style={{ fontSize: '16px', color: palette.charcoalMuted, maxWidth: '520px', margin: '0 auto 32px', lineHeight: 1.65 }}>
          Sign in with demo credentials to walk through all three portals with sample data. No account required.
        </p>
        <Button size="lg" onClick={() => navigate('/signin')} icon={ArrowRight}>
          Enter Demo Mode
        </Button>
      </motion.div>

      {/* Portal previews */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '48px' }}>
        {PORTALS.map((p, i) => (
          <motion.div key={p.title}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            style={{ background: p.bg, border: `1.5px solid ${p.border}`, borderRadius: '16px', padding: '28px' }}>
            <div style={{ width: '44px', height: '44px', background: p.color, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <p.icon size={22} color="#fff" />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: palette.charcoal, marginBottom: '8px', fontFamily: 'Space Grotesk, sans-serif' }}>{p.title}</h3>
            <p style={{ fontSize: '14px', color: palette.charcoalMuted, lineHeight: 1.6 }}>{p.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Sample match card */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '48px' }}>
        <SectionCard title="Sample Match" tone="mint">
          <p style={{ fontSize: '12px', color: palette.charcoalMuted, marginBottom: '16px' }}>What a match looks like in the athlete portal</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <ScoreMeter score={91} size="lg" />
            <div>
              <p style={{ fontWeight: 600, color: palette.charcoal }}>Local Business Example</p>
              <p style={{ fontSize: '13px', color: palette.charcoalMuted, margin: '4px 0' }}>Food & Drink · Your Campus Town</p>
              <StatusBadge status="approved" />
            </div>
          </div>
        </SectionCard>
        <SectionCard title="How Matching Works" tone="sky">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              'Take the 30-question personality quiz',
              'Enter your campus location',
              'Get ranked local business matches',
              'Reach out with AI-generated emails',
            ].map((step, i) => (
              <div key={step} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ width: '22px', height: '22px', background: palette.pine, color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                <p style={{ fontSize: '14px', color: palette.charcoal, lineHeight: 1.5 }}>{step}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div style={{ textAlign: 'center', padding: '48px', background: palette.cream, borderRadius: '20px', border: `1px solid #e8eed8` }}>
        <h2 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '10px', fontFamily: 'Space Grotesk, sans-serif' }}>Ready to try it yourself?</h2>
        <p style={{ color: palette.charcoalMuted, marginBottom: '24px' }}>Sign in to the demo or take the quiz to get your real matches.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button size="lg" onClick={() => navigate('/signin')}>Enter Demo</Button>
          <Button size="lg" variant="outline" onClick={() => navigate('/quiz')}>Take the Quiz</Button>
        </div>
      </div>
    </div>
  )
}
