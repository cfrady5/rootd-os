import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { getPersonaPortalPath } from '../lib/personaRoutes.js'
import { Button, TextInput } from '../components/shared/UI.jsx'
import { palette } from '../lib/theme.js'

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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: palette.bodyBg, padding: '32px' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ width: '48px', height: '48px', background: palette.pine, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <span style={{ color: '#fff', fontSize: '20px', fontWeight: 700 }}>R</span>
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 700, color: palette.charcoal, fontFamily: 'Space Grotesk, sans-serif' }}>Welcome back</h1>
          <p style={{ fontSize: '14px', color: palette.charcoalMuted, marginTop: '6px' }}>Sign in to your Rootd account</p>
        </div>

        {isDemoMode && (
          <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: '10px', padding: '12px 16px', marginBottom: '24px', fontSize: '13px', color: '#15803d' }}>
            <strong>Demo Mode:</strong> Click "Sign In" to enter the demo with sample data. No credentials needed.
          </div>
        )}

        <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
          {error && <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '8px', padding: '10px 14px', marginBottom: '20px', fontSize: '13px', color: '#991b1b' }}>{error}</div>}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            <TextInput label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
            <TextInput label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" />
          </div>

          <Button fullWidth onClick={handleSubmit} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </div>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: palette.charcoalMuted }}>
          Don't have an account? <Link to="/signup" style={{ color: palette.pine, fontWeight: 500 }}>Sign up</Link>
        </p>
      </div>
    </div>
  )
}
