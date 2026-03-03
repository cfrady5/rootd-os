import { useProfile } from '../../context/ProfileContext.jsx'
import { PageHeader, SectionCard, InfoRow, TextInput, Button } from '../../components/shared/UI.jsx'
import { palette } from '../../lib/theme.js'

export default function BusinessProfile() {
  const { profile } = useProfile()
  return (
    <div>
      <PageHeader title="Business Profile" />
      <div style={{ padding: '32px 36px', maxWidth: '600px' }}>
        <SectionCard title="Company Information" tone="sage">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ width: '56px', height: '56px', background: palette.pine, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontSize: '22px', fontWeight: 700 }}>{profile?.name?.[0] ?? 'F'}</span>
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: '17px' }}>{profile?.name ?? 'Fresh Roots Cafe'}</p>
              <p style={{ fontSize: '14px', color: palette.charcoalMuted }}>{profile?.category}</p>
            </div>
          </div>
          <InfoRow label="Category" value={profile?.category ?? 'Food & Drink'} />
          <InfoRow label="Location" value={profile?.location ?? 'Palo Alto, CA'} />
          <InfoRow label="Monthly Budget" value={profile?.budget ?? '$5,000/mo'} />
          <InfoRow label="Primary Contact" value={profile?.contact ?? 'Jamie Torres'} />
        </SectionCard>
      </div>
    </div>
  )
}
