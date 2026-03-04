import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { getPersonaPortalPath } from '../lib/personaRoutes.js'
import { TextInput } from '../components/shared/UI.jsx'
import { palette } from '../lib/theme.js'
import { Trophy, ArrowRight, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

export default function SignIn() {
  const { login, isDemoMode } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e?.preventDefault()
    setLoading(true); setError('')
    const { error: err } = await login(email || 'demo@rootd.app', password || 'demo')
    if (err) { setError(err.message); setLoading(false); return }
    navigate(getPersonaPortalPath('athlete'))
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#f4f6f4' }}>
      {/* Left panel */}
      <div style={{ flex: 1, display: 'none', background: `linear-gradient(145deg, ${palette.pine} 0%, ${palette.pineDark} 100%)`, alignItems: 'center', justifyContent: 'center', padding: '60px', '@media(min-width:768px)': { display: 'flex' } }} className="auth-panel">
        <div style={{ maxWidth: '380px', color: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
            <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.15)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Trophy size={22} color="#fff" />
            </div>
            <span style={{ fontWeight: 800, fontSize: '20px', fontFamily: 'Space Grotesk, sans-serif' }}>Rootd OS</span>
          </div>
          <h2 style={{ fontSize: '34px', fontWeight: 800, lineHeight: 1.1, marginBottom: '16px', fontFamily: 'Space Grotesk, sans-serif' }}>
            Your NIL journey starts here.
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: '40px' }}>
            Connect with local businesses that actually fit your brand. No agent required.
          </p>
          {[
            'AI-matched to local businesses',
            'Compliance-ready deal management',
            'Free for college athletes',
          ].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '22px', height: '22px', background: 'rgba(163,201,122,0.25)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Zap size={12} color="#a3c97a" />
              </div>
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.85)' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px', maxWidth: '560px', margin: '0 auto', width: '100%' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: '420px' }}>
          {/* Logo for mobile */}
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div style={{ width: '52px', height: '52px', background: palette.pine, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 4px 16px rgba(76,89,55,0.3)' }}>
              <Trophy size={26} color="#fff" />
            </div>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: palette.charcoal, fontFamily: 'Space Grotesk, sans-serif', marginBottom: '6px' }}>Welcome back</h1>
            <p style={{ fontSize: '14px', color: palette.charcoalMuted }}>Sign in to your Rootd account</p>
          </div>

          {isDemoMode && (
            <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: '10px', padding: '12px 16px', marginBottom: '24px', fontSize: '13px', color: '#15803d' }}>
              <strong>Demo Mode:</strong> Click "Sign In" to explore with sample data — no credentials needed.
            </div>
          )}

          <div style={{ background: '#fff', borderRadius: '20px', padding: '36px', boxShadow: '0 2px 20px rgba(0,0,0,0.07)', border: '1px solid #f0f0f0' }}>
            {error && (
              <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '8px', padding: '10px 14px', marginBottom: '20px', fontSize: '13px', color: '#991b1b' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <TextInput label="Email" type="email" value={email} onChange={setEmail} placeholder="you@university.edu" />
              <TextInput label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" />

              <button type="submit" disabled={loading}
                style={{ background: loading ? palette.charcoalMuted : palette.pine, color: '#fff', border: 'none', borderRadius: '10px', padding: '13px', fontSize: '15px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', marginTop: '4px', transition: 'background 0.15s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                {loading ? 'Signing in…' : <>Sign In <ArrowRight size={16} /></>}
              </button>
            </form>
          </div>

          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: palette.charcoalMuted }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: palette.pine, fontWeight: 600, textDecoration: 'none' }}>Create one free →</Link>
          </p>
          <p style={{ textAlign: 'center', marginTop: '12px', fontSize: '13px', color: palette.charcoalMuted }}>
            <Link to="/quiz" style={{ color: palette.charcoalMuted, textDecoration: 'underline' }}>Take the personality quiz first</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
