import { NavLink, Outlet } from 'react-router-dom'
import { LayoutDashboard, Users2, Handshake, ShieldCheck, BarChart3, User, LogOut, Building2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useProfile } from '../context/ProfileContext.jsx'
import { palette } from '../lib/theme.js'

const NAV = [
  { to: '/dashboard/overview',   icon: LayoutDashboard, label: 'Overview'   },
  { to: '/dashboard/matches',    icon: Users2,          label: 'Matches'    },
  { to: '/dashboard/deals',      icon: Handshake,       label: 'Deals'      },
  { to: '/dashboard/compliance', icon: ShieldCheck,     label: 'Compliance' },
  { to: '/dashboard/cockpit',    icon: BarChart3,       label: 'Cockpit'    },
  { to: '/dashboard/profile',    icon: User,            label: 'Profile'    },
]

function NavItem({ to, icon: Icon, label }) {
  return (
    <NavLink to={to} style={({ isActive }) => ({
      display: 'flex', alignItems: 'center', gap: '10px',
      padding: '9px 12px', borderRadius: '8px', marginBottom: '2px',
      textDecoration: 'none', fontSize: '14px', fontWeight: isActive ? 600 : 400,
      color: isActive ? '#1d4ed8' : palette.charcoalMuted,
      background: isActive ? '#eff6ff' : 'transparent',
      transition: 'all 0.12s',
    })}>
      <Icon size={17} />
      {label}
    </NavLink>
  )
}

export function DashboardShell() {
  const { logout, isDemoMode } = useAuth()
  const { profile } = useProfile()

  const initials = profile?.name
    ? profile.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : 'B'

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f4f6f4' }}>

      {/* Sidebar */}
      <aside style={{
        width: '260px',
        minHeight: '100vh',
        position: 'sticky',
        top: 0,
        background: 'linear-gradient(180deg, #f8faff 0%, #eff3ff 100%)',
        borderRight: '1px solid #dde5f5',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 10,
      }}>

        {/* Logo */}
        <div style={{ padding: '22px 20px', borderBottom: '1px solid #dde5f5' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px', height: '32px', background: '#1d4ed8',
              borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(29,78,216,0.30)',
            }}>
              <Building2 size={16} color="#fff" />
            </div>
            <div>
              <span style={{ fontWeight: 800, color: '#1d4ed8', fontSize: '15px', fontFamily: 'Space Grotesk, sans-serif', display: 'block', lineHeight: 1 }}>Rootd OS</span>
              <span style={{ fontSize: '10px', color: palette.charcoalMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Business Portal</span>
            </div>
          </div>
        </div>

        {/* Demo Banner */}
        {isDemoMode && (
          <div style={{ margin: '12px', background: '#fef9c3', border: '1px solid #fde68a', borderRadius: '8px', padding: '8px 12px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#854d0e' }}>Demo Mode Active</p>
            <p style={{ fontSize: '11px', color: '#92400e' }}>{profile?.name ?? 'Demo Business'}</p>
          </div>
        )}

        {/* Profile */}
        {profile && !isDemoMode && (
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #dde5f5' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px', height: '40px', background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, boxShadow: '0 2px 8px rgba(29,78,216,0.25)',
              }}>
                <span style={{ color: '#fff', fontWeight: 700, fontSize: '14px' }}>{initials}</span>
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontWeight: 600, fontSize: '14px', color: palette.charcoal, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{profile.name}</p>
                <p style={{ fontSize: '12px', color: palette.charcoalMuted }}>{profile.category ?? 'Business'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 10px' }}>
          <p style={{ fontSize: '10px', fontWeight: 700, color: palette.charcoalMuted, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '4px 12px 8px' }}>Workspace</p>
          {NAV.map(item => <NavItem key={item.to} {...item} />)}
        </nav>

        {/* Footer */}
        <div style={{ padding: '12px 10px', borderTop: '1px solid #dde5f5' }}>
          <button onClick={logout} style={{
            display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
            padding: '9px 12px', borderRadius: '8px', background: 'none', border: 'none',
            cursor: 'pointer', fontSize: '14px', color: palette.charcoalMuted, fontFamily: 'inherit',
            transition: 'background 0.12s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#eef2ff'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}>
            <LogOut size={17} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, minHeight: '100vh', overflowY: 'auto' }}>
        <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '10px 36px', fontSize: '12px', color: palette.charcoalMuted, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Building2 size={12} color="#1d4ed8" />
          NIL Workspace · {profile?.institution ?? profile?.name ?? 'Business Dashboard'}
        </div>
        <Outlet />
      </main>
    </div>
  )
}
