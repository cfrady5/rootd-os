import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, TextInput } from '../components/shared/UI.jsx'
import { palette } from '../lib/theme.js'

export default function SignUp() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: palette.bodyBg, padding: '32px' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ width: '48px', height: '48px', background: palette.pine, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <span style={{ color: '#fff', fontSize: '20px', fontWeight: 700 }}>R</span>
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 700, color: palette.charcoal, fontFamily: 'Space Grotesk, sans-serif' }}>Create your account</h1>
          <p style={{ fontSize: '14px', color: palette.charcoalMuted, marginTop: '6px' }}>Join the Rootd NIL platform</p>
        </div>

        <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            <TextInput label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
            <TextInput label="Password" type="password" value={password} onChange={setPassword} placeholder="Create a password" helper="At least 8 characters" />
          </div>
          <Button fullWidth onClick={() => navigate('/onboarding')}>Create Account</Button>
          <p style={{ fontSize: '12px', color: palette.charcoalMuted, textAlign: 'center', marginTop: '16px' }}>
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: palette.charcoalMuted }}>
          Already have an account? <Link to="/signin" style={{ color: palette.pine, fontWeight: 500 }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}
