import { palette } from '../../lib/theme.js'
import { Shield, Target, Heart, Zap } from 'lucide-react'

export default function About() {
  const values = [
    { icon: Heart, title: 'Community First', desc: 'We believe NIL should strengthen local ties, not just maximize individual brand deals.' },
    { icon: Shield, title: 'Compliance Always', desc: 'Every feature is designed with NCAA and institutional compliance as a first principle.' },
    { icon: Target, title: 'Athlete-Led', desc: 'Athletes control their own profiles, brand preferences, and deal approvals.' },
    { icon: Zap, title: 'Transparent Matching', desc: 'Our scoring system is explainable. Athletes and businesses always see why they matched.' },
  ]
  const milestones = [
    { year: '2023', event: 'Rootd concept developed at Purdue University' },
    { year: 'Early 2024', event: 'MVP built with React + Supabase stack' },
    { year: 'Mid 2024', event: 'Rootd Quiz v1 deployed — 30 dimensions, 7 categories' },
    { year: 'Late 2024', event: 'Three-persona portal system launched in beta' },
  ]

  return (
    <div>
      <section style={{ background: `linear-gradient(135deg, ${palette.pine}, ${palette.pineDark})`, color: '#fff', padding: '80px 32px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '16px', fontFamily: 'Space Grotesk, sans-serif' }}>About Rootd</h1>
        <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.82)', maxWidth: '560px', margin: '0 auto' }}>
          We're building the compliance-first NIL platform that roots college athletes in their local communities.
        </p>
      </section>

      <section style={{ padding: '80px 32px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 700, textAlign: 'center', marginBottom: '48px' }}>Our Values</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          {values.map(v => (
            <div key={v.title} style={{ background: palette.cream, border: '1px solid #e5e7eb', borderRadius: '14px', padding: '28px' }}>
              <div style={{ background: palette.sage, borderRadius: '10px', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <v.icon size={22} color={palette.pine} />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>{v.title}</h3>
              <p style={{ fontSize: '14px', color: palette.charcoalMuted, lineHeight: 1.6 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: palette.sage, padding: '80px 32px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700, textAlign: 'center', marginBottom: '48px' }}>Timeline</h2>
          {milestones.map((m, i) => (
            <div key={i} style={{ display: 'flex', gap: '24px', marginBottom: '32px', alignItems: 'flex-start' }}>
              <div style={{ width: '100px', flexShrink: 0, textAlign: 'right' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: palette.pine }}>{m.year}</span>
              </div>
              <div style={{ width: '12px', height: '12px', background: palette.pine, borderRadius: '50%', flexShrink: 0, marginTop: '3px' }} />
              <p style={{ fontSize: '15px', color: palette.charcoal }}>{m.event}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '80px 32px', textAlign: 'center', background: '#fff' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>The Tagline That Says It All</h2>
        <p style={{ fontSize: '24px', fontStyle: 'italic', color: palette.pine, fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600 }}>
          "Rootd in Community. Driven by Athletes."
        </p>
      </section>
    </div>
  )
}
