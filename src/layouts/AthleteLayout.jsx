import { NavLink, Outlet } from 'react-router-dom'
import { LayoutDashboard, Handshake, User, LogOut, Trophy } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useProfile } from '../context/ProfileContext.jsx'
import { palette } from '../lib/theme.js'

const NAV = [
  { to: '/athlete/overview',     icon: LayoutDashboard, label: 'Overview',   section: null },
  { to: '/athlete/matches',      icon: Handshake,       label: 'My Matches', section: null },
  { to: '/athlete/edit-profile', icon: User,            label: 'My Profile', section: null },
]

function NavItem({ to, icon: Icon, label }) {
  return (
    <NavLink to={to} style={({ isActive }) => ({
      display: 'flex', alignItems: 'center', gap: '10px',
      padding: '9px 12px', borderRadius: '8px', marginBottom: '2px',
      textDecoration: 'none', fontSize: '14px', fontWeight: isActive ? 600 : 400,
      color: isActive ? palette.pine : palette.charcoalMuted,
      background: isActive ? palette.sage : 'transparent',
      transition: 'all 0.12s',
    })}>
      <Icon size={17} />
      {label}
    </NavLink>
  )
}

export function AthleteLayout() {
  const { logout, isDemoMode } = useAuth()
  const { profile } = useProfile()

  const initials = profile?.name
    ? profile.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : 'A'

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f4f6f4' }}>

      {/* Sidebar */}
      <aside style={{
        width: '260px',
        minHeight: '100vh',
        position: 'sticky',
        top: 0,
        background: 'linear-gradient(180deg, #f9faf5 0%, #f0f4ea 100%)',
        borderRight: '1px solid #dce6d0',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 10,
      }}>

        {/* Logo */}
        <div style={{ padding: '22px 20px', borderBottom: '1px solid #dce6d0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px', height: '32px', background: palette.pine,
              borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(76,89,55,0.3)',
            }}>
              <Trophy size={16} color="#fff" />
            </div>
            <div>
              <span style={{ fontWeight: 800, color: palette.pine, fontSize: '15px', fontFamily: 'Space Grotesk, sans-serif', display: 'block', lineHeight: 1 }}>Rootd OS</span>
              <span style={{ fontSize: '10px', color: palette.charcoalMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Athlete Portal</span>
            </div>
          </div>
        </div>

        {/* Profile */}
        {profile && (
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #dce6d0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px', height: '40px', background: `linear-gradient(135deg, ${palette.pine}, ${palette.pineLight})`,
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, boxShadow: '0 2px 8px rgba(76,89,55,0.25)',
              }}>
                <span style={{ color: '#fff', fontWeight: 700, fontSize: '14px' }}>{initials}</span>
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontWeight: 600, fontSize: '14px', color: palette.charcoal, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{profile.name}</p>
                <p style={{ fontSize: '12px', color: palette.charcoalMuted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {[profile.sport, profile.institution].filter(Boolean).join(' · ') || 'Athlete'}
                </p>
              </div>
            </div>
            {isDemoMode && (
              <div style={{ marginTop: '10px', background: '#fef9c3', border: '1px solid #fde68a', borderRadius: '6px', padding: '5px 10px', display: 'inline-block' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#854d0e' }}>Demo Mode</span>
              </div>
            )}
          </div>
        )}

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 10px' }}>
          <p style={{ fontSize: '10px', fontWeight: 700, color: palette.charcoalMuted, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '4px 12px 8px' }}>Workspace</p>
          {NAV.map(item => <NavItem key={item.to} {...item} />)}
        </nav>

        {/* Footer */}
        <div style={{ padding: '12px 10px', borderTop: '1px solid #dce6d0' }}>
          <button onClick={logout} style={{
            display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
            padding: '9px 12px', borderRadius: '8px', background: 'none', border: 'none',
            cursor: 'pointer', fontSize: '14px', color: palette.charcoalMuted, fontFamily: 'inherit',
            transition: 'background 0.12s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#f0f0ee'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}>
            <LogOut size={17} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, minHeight: '100vh', overflowY: 'auto' }}>
        <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '10px 36px', fontSize: '12px', color: palette.charcoalMuted, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Trophy size={12} color={palette.pine} />
          NIL Workspace · {profile?.institution ?? 'Athlete Dashboard'}
        </div>
        <Outlet />
      </main>
    </div>
  )
}
