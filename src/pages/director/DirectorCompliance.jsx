import { useState, useEffect } from 'react'
import { getComplianceItems } from '../../lib/api/index.js'
import { PageHeader, DataTable, StatusBadge, LoadingSpinner, StatCard, SectionCard } from '../../components/shared/UI.jsx'
import { ShieldCheck, AlertTriangle, Clock, CheckCircle } from 'lucide-react'

export default function DirectorCompliance() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { getComplianceItems().then(c => { setItems(c); setLoading(false) }) }, [])

  if (loading) return <LoadingSpinner />

  const passed = items.filter(i => i.status === 'pass').length
  const warnings = items.filter(i => i.status === 'warning').length
  const todos = items.filter(i => i.status === 'todo').length

  const columns = [
    { key: 'athlete', label: 'Athlete' },
    { key: 'type', label: 'Review Type' },
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
    { key: 'date', label: 'Date', render: v => v ?? '—' },
    { key: 'notes', label: 'Notes' },
  ]

  return (
    <div>
      <PageHeader title="Compliance" description="Track and manage NIL compliance requirements" />
      <div style={{ padding: '32px 36px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
          <StatCard label="Passed" value={passed} icon={CheckCircle} tone="mint" />
          <StatCard label="Warnings" value={warnings} icon={AlertTriangle} tone="amber" />
          <StatCard label="To Do" value={todos} icon={Clock} tone="default" />
          <StatCard label="Compliance Rate" value={`${Math.round((passed / items.length) * 100)}%`} icon={ShieldCheck} tone="mint" />
        </div>
        <SectionCard title="Compliance Items" tone="default">
          <DataTable columns={columns} rows={items} />
        </SectionCard>
      </div>
    </div>
  )
}
