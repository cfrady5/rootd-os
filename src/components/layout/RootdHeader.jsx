import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { getPersonaPortalPath } from '../../lib/personaRoutes.js'
import { palette } from '../../lib/theme.js'
import { Button } from '../shared/UI.jsx'

export function RootdHeader() {
  const { user, persona, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: '72px',
      background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)', borderBottom: '1px solid rgba(76,89,55,0.1)',
      zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 32px',
    }}>
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '32px', height: '32px', background: palette.pine,
          borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ color: '#fff', fontSize: '14px', fontWeight: 700 }}>R</span>
        </div>
        <span style={{ fontSize: '18px', fontWeight: 700, color: palette.pine, fontFamily: 'Space Grotesk, sans-serif' }}>
          Rootd<span style={{ color: palette.charcoalMuted, fontWeight: 400, fontSize: '14px' }}>OS</span>
        </span>
      </Link>

      <nav style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/demo">Demo</NavLink>
        {user ? (
          <>
            <NavLink to={getPersonaPortalPath(persona)}>Dashboard</NavLink>
            <Button size="sm" variant="secondary" onClick={logout}>Sign Out</Button>
          </>
        ) : (
          <>
            <NavLink to="/signin">Sign In</NavLink>
            <Button size="sm" onClick={() => navigate('/signup')}>Get Started</Button>
          </>
        )}
      </nav>
    </header>
  )
}

function NavLink({ to, children }) {
  return (
    <Link to={to} style={{
      padding: '6px 14px', fontSize: '14px', fontWeight: 500,
      color: palette.charcoalMuted, textDecoration: 'none',
      borderRadius: '6px', transition: 'all 0.15s',
    }}
    onMouseEnter={e => { e.target.style.color = palette.pine; e.target.style.background = palette.sage }}
    onMouseLeave={e => { e.target.style.color = palette.charcoalMuted; e.target.style.background = 'transparent' }}>
      {children}
    </Link>
  )
}
