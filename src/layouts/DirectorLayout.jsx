import { NavLink, Outlet } from 'react-router-dom'
import { LayoutDashboard, Users, Handshake, ShieldCheck, User, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useProfile } from '../context/ProfileContext.jsx'
import { palette } from '../lib/theme.js'

const NAV = [
  { to: '/director/dashboard',   icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/director/roster',      icon: Users,           label: 'Roster' },
  { to: '/director/deals',       icon: Handshake,       label: 'Deals' },
  { to: '/director/compliance',  icon: ShieldCheck,     label: 'Compliance' },
  { to: '/director/profile',     icon: User,            label: 'Profile' },
]

export function DirectorLayout() {
  const { logout, isDemoMode } = useAuth()
  const { profile } = useProfile()

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f4f6f4' }}>
      <aside style={{ width: '260px', minHeight: '100vh', position: 'sticky', top: 0, background: 'linear-gradient(180deg, #f9faf5, #f0f4ea)', borderRight: '1px solid #dce6d0', display: 'flex', flexDirection: 'column', zIndex: 10 }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid #dce6d0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <div style={{ width: '28px', height: '28px', background: palette.pine, borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontSize: '12px', fontWeight: 700 }}>R</span>
            </div>
            <span style={{ fontWeight: 700, color: palette.pine, fontSize: '15px', fontFamily: 'Space Grotesk, sans-serif' }}>Rootd OS</span>
          </div>
          <p style={{ fontSize: '11px', color: palette.charcoalMuted, marginTop: '8px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Director Console</p>
        </div>

        {isDemoMode && (
          <div style={{ margin: '12px', background: '#fef9c3', border: '1px solid #fde68a', borderRadius: '8px', padding: '8px 12px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#854d0e' }}>Demo Mode</p>
            <p style={{ fontSize: '11px', color: '#92400e' }}>{profile?.name ?? 'Dr. Patricia Wells'}</p>
          </div>
        )}

        <nav style={{ flex: 1, padding: '12px 10px' }}>
          {NAV.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', borderRadius: '8px', marginBottom: '2px',
              textDecoration: 'none', fontSize: '14px', fontWeight: isActive ? 600 : 400,
              color: isActive ? palette.pine : palette.charcoalMuted, background: isActive ? palette.sage : 'transparent', transition: 'all 0.12s',
            })}>
              <Icon size={17} />{label}
            </NavLink>
          ))}
        </nav>

        <div style={{ padding: '12px 10px', borderTop: '1px solid #dce6d0' }}>
          <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '9px 12px', borderRadius: '8px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: palette.charcoalMuted, fontFamily: 'inherit' }}>
            <LogOut size={17} /> Sign Out
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, minHeight: '100vh', overflowY: 'auto' }}>
        <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '12px 36px', fontSize: '12px', color: palette.charcoalMuted }}>
          NIL Workspace / {profile?.institution ?? 'Athletic Department'}
        </div>
        <Outlet />
      </main>
    </div>
  )
}
