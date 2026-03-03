import { Outlet } from 'react-router-dom'
import { RootdHeader } from './RootdHeader.jsx'

export function AppShell() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: '72px' }}>
      <RootdHeader />
      <main><Outlet /></main>
      <footer style={{ background: '#1F1F1F', color: '#9ca3af', padding: '32px', textAlign: 'center', fontSize: '13px', marginTop: '80px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <span>© 2024 Rootd OS — NIL Management Platform</span>
          <span>Rootd in Community. Driven by Athletes.</span>
        </div>
      </footer>
    </div>
  )
}
