import { useProfile } from '../../context/ProfileContext.jsx'
import { PageHeader, SectionCard, InfoRow } from '../../components/shared/UI.jsx'
import { palette } from '../../lib/theme.js'

export default function DirectorProfile() {
  const { profile } = useProfile()
  return (
    <div>
      <PageHeader title="Director Profile" />
      <div style={{ padding: '32px 36px', maxWidth: '600px' }}>
        <SectionCard title="Profile Information" tone="mint">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ width: '56px', height: '56px', background: palette.pine, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontSize: '22px', fontWeight: 700 }}>{profile?.name?.[0] ?? 'D'}</span>
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: '17px' }}>{profile?.name ?? 'Dr. Patricia Wells'}</p>
              <p style={{ fontSize: '14px', color: palette.charcoalMuted }}>{profile?.title ?? 'NIL Director'}</p>
            </div>
          </div>
          <InfoRow label="Institution" value={profile?.institution ?? 'Stanford University'} />
          <InfoRow label="Department" value={profile?.department ?? 'Athletics'} />
        </SectionCard>
      </div>
    </div>
  )
}
