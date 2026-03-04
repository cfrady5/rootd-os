import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { TextInput } from '../components/shared/UI.jsx'
import { palette } from '../lib/theme.js'
import { Trophy, ArrowRight, Shield, Users, Building2 } from 'lucide-react'
import { motion } from 'framer-motion'

const ROLES = [
  { id: 'athlete',   icon: Trophy,    label: 'College Athlete',    desc: 'Find NIL deals that match my brand' },
  { id: 'director',  icon: Shield,    label: 'Athletic Director',   desc: 'Manage my roster\'s NIL activity' },
  { id: 'business',  icon: Building2, label: 'Local Business',      desc: 'Connect with athletes near me' },
]

export default function SignUp() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('athlete')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e?.preventDefault()
    setLoading(true)
    // In demo mode just navigate through
    await new Promise(r => setTimeout(r, 500))
    navigate('/onboarding')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f6f4', padding: '32px' }}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: '480px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '52px', height: '52px', background: palette.pine, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 4px 16px rgba(76,89,55,0.3)' }}>
            <Trophy size={26} color="#fff" />
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: palette.charcoal, fontFamily: 'Space Grotesk, sans-serif', marginBottom: '6px' }}>Join Rootd</h1>
          <p style={{ fontSize: '14px', color: palette.charcoalMuted }}>Free for college athletes · No credit card needed</p>
        </div>

        <div style={{ background: '#fff', borderRadius: '20px', padding: '36px', boxShadow: '0 2px 20px rgba(0,0,0,0.07)', border: '1px solid #f0f0f0' }}>

          {/* Role selector */}
          <p style={{ fontSize: '13px', fontWeight: 600, color: palette.charcoal, marginBottom: '10px' }}>I am a…</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
            {ROLES.map(r => (
              <div key={r.id} onClick={() => setRole(r.id)}
                style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', borderRadius: '10px', border: `2px solid ${role === r.id ? palette.pine : '#e5e7eb'}`, background: role === r.id ? palette.sage : '#fff', cursor: 'pointer', transition: 'all 0.12s' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: role === r.id ? palette.pine : '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <r.icon size={18} color={role === r.id ? '#fff' : palette.charcoalMuted} />
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: palette.charcoal }}>{r.label}</p>
                  <p style={{ fontSize: '12px', color: palette.charcoalMuted }}>{r.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <TextInput label="Full Name" value={name} onChange={setName} placeholder="Your name" />
            <TextInput label="Email" type="email" value={email} onChange={setEmail} placeholder="you@university.edu" helper={role === 'athlete' ? 'Use your .edu email to verify eligibility' : undefined} />
            <TextInput label="Password" type="password" value={password} onChange={setPassword} placeholder="Create a password" helper="At least 8 characters" />

            <button type="submit" disabled={loading}
              style={{ background: loading ? palette.charcoalMuted : palette.pine, color: '#fff', border: 'none', borderRadius: '10px', padding: '13px', fontSize: '15px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background 0.15s' }}>
              {loading ? 'Creating account…' : <>Create Free Account <ArrowRight size={16} /></>}
            </button>

            <p style={{ fontSize: '12px', color: palette.charcoalMuted, textAlign: 'center', marginTop: '4px' }}>
              By signing up you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: palette.charcoalMuted }}>
          Already have an account?{' '}
          <Link to="/signin" style={{ color: palette.pine, fontWeight: 600, textDecoration: 'none' }}>Sign in →</Link>
        </p>
      </motion.div>
    </div>
  )
}
