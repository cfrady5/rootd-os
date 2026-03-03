import { PageHeader, SectionCard } from '../../components/shared/UI.jsx'
import { palette } from '../../lib/theme.js'
import { ShieldCheck } from 'lucide-react'

export default function BusinessCompliance() {
  const items = [
    { label: 'NCAA NIL Policy', status: 'Compliant', desc: 'All deals reviewed against NCAA guidelines' },
    { label: 'State Law Review', status: 'Compliant', desc: 'California NIL statutes applied' },
    { label: 'Brand Category', status: 'Pre-Approved', desc: 'Food & Drink is pre-approved for athlete partnerships' },
    { label: 'Contract Templates', status: 'On File', desc: 'Standard agreement templates stored' },
  ]

  return (
    <div>
      <PageHeader title="Compliance" description="Your compliance status and guidelines" />
      <div style={{ padding: '32px 36px' }}>
        <SectionCard title="Compliance Status" tone="mint">
          {items.map(i => (
            <div key={i.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid #c8e0c8' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <ShieldCheck size={18} color="#15803d" />
                <div>
                  <p style={{ fontWeight: 600, fontSize: '14px' }}>{i.label}</p>
                  <p style={{ fontSize: '12px', color: palette.charcoalMuted }}>{i.desc}</p>
                </div>
              </div>
              <span style={{ background: '#dcfce7', color: '#15803d', padding: '3px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 600 }}>{i.status}</span>
            </div>
          ))}
        </SectionCard>
      </div>
    </div>
  )
}
