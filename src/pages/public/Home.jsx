import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Shield, TrendingUp, Users, ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '../../components/shared/UI.jsx'
import { palette } from '../../lib/theme.js'

export default function Home() {
  const navigate = useNavigate()
  const features = [
    { icon: Sparkles, title: 'AI-Powered Matching', desc: 'Match athletes to brands using a 30-dimension personality quiz and local influence scoring.' },
    { icon: Shield, title: 'Compliance-First', desc: 'Every deal flows through a compliance layer built for NCAA and institutional policies.' },
    { icon: TrendingUp, title: 'Real-Time Analytics', desc: 'Directors get full roster visibility. Businesses get ROI dashboards. Athletes see their score.' },
    { icon: Users, title: 'Three Portals, One Platform', desc: 'Athletes, directors, and businesses each get a purpose-built workspace.' },
  ]
  const personas = [
    { label: 'Athlete', color: palette.pine, desc: 'Build your NIL portfolio, get matched to brands, track deals and earnings.' },
    { label: 'Athletic Director', color: '#1d4ed8', desc: 'Manage your full roster, review compliance, approve deals across all sports.' },
    { label: 'Business Partner', color: '#7e22ce', desc: 'Discover local athlete talent, launch campaigns, and track activation ROI.' },
  ]

  return (
    <div>
      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, ${palette.pine} 0%, ${palette.pineDark} 60%, #2d3a1f 100%)`, color: '#fff', padding: '100px 32px 80px', textAlign: 'center', overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.05) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.03) 0%, transparent 50%)' }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ maxWidth: '780px', margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.12)', borderRadius: '999px', padding: '6px 16px', marginBottom: '24px', fontSize: '13px', fontWeight: 500 }}>
            <span style={{ width: '6px', height: '6px', background: '#4ade80', borderRadius: '50%', display: 'inline-block' }} />
            Now in beta — demo available
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 700, lineHeight: 1.1, marginBottom: '20px', fontFamily: 'Space Grotesk, sans-serif' }}>
            NIL Management,<br /><span style={{ color: '#a3c97a' }}>Rootd in Community</span>
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.82)', lineHeight: 1.6, marginBottom: '36px', maxWidth: '560px', margin: '0 auto 36px' }}>
            The compliance-first platform connecting college athletes to local businesses through AI-powered matching and transparent deal management.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button size="lg" onClick={() => navigate('/signup')} style={{ background: '#fff', color: palette.pine }}>
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/demo')} style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}
              icon={ArrowRight}>
              View Demo
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Persona Cards */}
      <section style={{ padding: '80px 32px', background: palette.cream }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '32px', fontWeight: 700, marginBottom: '8px', color: palette.charcoal }}>Built for Every Stakeholder</h2>
          <p style={{ textAlign: 'center', color: palette.charcoalMuted, marginBottom: '48px' }}>One platform, three purpose-built portals</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {personas.map(p => (
              <motion.div key={p.label} whileHover={{ y: -4 }} style={{ background: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: `2px solid ${p.color}20` }}>
                <div style={{ width: '40px', height: '40px', background: p.color, borderRadius: '10px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={20} color="#fff" />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: palette.charcoal, marginBottom: '10px' }}>{p.label}</h3>
                <p style={{ fontSize: '14px', color: palette.charcoalMuted, lineHeight: 1.6 }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 32px', background: '#fff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '32px', fontWeight: 700, marginBottom: '48px', color: palette.charcoal }}>Platform Features</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {features.map(f => (
              <div key={f.title} style={{ padding: '28px', border: '1px solid #e5e7eb', borderRadius: '14px', background: palette.cream }}>
                <div style={{ background: palette.sage, borderRadius: '10px', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <f.icon size={22} color={palette.pine} />
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px', color: palette.charcoal }}>{f.title}</h3>
                <p style={{ fontSize: '14px', color: palette.charcoalMuted, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: palette.pine, color: '#fff', padding: '80px 32px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '16px', fontFamily: 'Space Grotesk, sans-serif' }}>Ready to get Rootd?</h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', marginBottom: '32px' }}>Join the NIL platform built for real communities.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button size="lg" onClick={() => navigate('/signup')} style={{ background: '#fff', color: palette.pine }}>Create Account</Button>
          <Button size="lg" onClick={() => navigate('/quiz')} style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }}>Take the Quiz</Button>
        </div>
      </section>
    </div>
  )
}
