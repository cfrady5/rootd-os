import { useState } from 'react'
import { useProfile } from '../../context/ProfileContext.jsx'
import { PageHeader, SectionCard, TextInput, Button } from '../../components/shared/UI.jsx'
import { palette } from '../../lib/theme.js'

const INTERESTS = ['Health & Wellness', 'Sustainability', 'Food & Drink', 'Fashion', 'Community', 'Technology', 'Gaming', 'Music', 'Travel', 'Sports']

export default function AthleteEditProfile() {
  const { profile, setProfile } = useProfile()
  const [bio, setBio] = useState(profile?.bio ?? '')
  const [instagram, setInstagram] = useState(profile?.socialFollowers?.instagram ?? '')
  const [interests, setInterests] = useState(profile?.interests ?? [])
  const [saved, setSaved] = useState(false)

  function toggleInterest(i) {
    setInterests(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])
  }

  function save() {
    setProfile(p => ({ ...p, bio, interests }))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <PageHeader title="Edit Profile" description="Customize your athlete profile to improve brand matching" actions={<Button onClick={save}>{saved ? 'Saved!' : 'Save Changes'}</Button>} />
      <div style={{ padding: '32px 36px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <SectionCard title="Identity" tone="mint">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <TextInput label="Full Name" value={profile?.name ?? ''} onChange={() => {}} disabled />
            <TextInput label="Sport" value={profile?.sport ?? ''} onChange={() => {}} disabled />
            <TextInput label="Institution" value={profile?.institution ?? ''} onChange={() => {}} disabled />
            <TextInput label="Year" value={profile?.year ?? ''} onChange={() => {}} disabled />
          </div>
          <p style={{ fontSize: '12px', color: palette.charcoalMuted, marginTop: '12px' }}>Identity fields are managed by your athletic department.</p>
        </SectionCard>

        <SectionCard title="Bio" tone="sky">
          <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="Tell brands about yourself..."
            style={{ width: '100%', minHeight: '120px', padding: '10px 13px', fontSize: '14px', fontFamily: 'inherit', border: '1px solid #d1d5db', borderRadius: '10px', outline: 'none', resize: 'vertical', color: palette.charcoal }} />
        </SectionCard>

        <SectionCard title="Social Media" tone="sage">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <TextInput label="Instagram Followers" type="number" value={instagram} onChange={setInstagram} placeholder="12400" />
            <TextInput label="TikTok Followers" value={profile?.socialFollowers?.tiktok ?? ''} onChange={() => {}} placeholder="8200" />
            <TextInput label="Twitter Followers" value={profile?.socialFollowers?.twitter ?? ''} onChange={() => {}} placeholder="3100" />
          </div>
        </SectionCard>

        <SectionCard title="Interests & Brand Categories" tone="default">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {INTERESTS.map(i => {
              const on = interests.includes(i)
              return (
                <div key={i} onClick={() => toggleInterest(i)}
                  style={{ padding: '6px 16px', borderRadius: '999px', border: `2px solid ${on ? palette.pine : '#e5e7eb'}`, background: on ? palette.pine : '#fff', color: on ? '#fff' : palette.charcoal, fontSize: '13px', fontWeight: 500, cursor: 'pointer', transition: 'all 0.12s' }}>
                  {i}
                </div>
              )
            })}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
