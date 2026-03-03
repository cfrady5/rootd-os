import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext.jsx'
import { Button } from '../components/shared/UI.jsx'
import { palette } from '../lib/theme.js'
import { GraduationCap, Building2, Briefcase, Check } from 'lucide-react'

const PERSONAS = [
  { id: 'athlete',  icon: GraduationCap, label: 'Student-Athlete', desc: 'I want to find brand partnerships and manage my NIL deals.', color: palette.pine },
  { id: 'director', icon: Building2,     label: 'Athletic Director', desc: 'I manage NIL compliance and oversight for my institution.', color: '#1d4ed8' },
  { id: 'business', icon: Briefcase,     label: 'Business Partner', desc: 'I want to connect with college athletes for campaigns.', color: '#7e22ce' },
]

export default function Onboarding() {
  const { completeOnboarding } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleContinue() {
    if (step === 0) { setStep(1); return }
    if (!selected) return
    setLoading(true)
    const path = await completeOnboarding(selected)
    navigate(path)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${palette.pine} 0%, ${palette.pineDark} 100%)`, padding: '32px' }}>
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="welcome" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              style={{ background: '#fff', borderRadius: '20px', padding: '48px', textAlign: 'center', boxShadow: '0 8px 40px rgba(0,0,0,0.2)' }}>
              <div style={{ width: '64px', height: '64px', background: palette.pine, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <span style={{ color: '#fff', fontSize: '28px', fontWeight: 700 }}>R</span>
              </div>
              <h1 style={{ fontSize: '30px', fontWeight: 700, marginBottom: '12px', fontFamily: 'Space Grotesk, sans-serif' }}>Welcome to Rootd</h1>
              <p style={{ fontSize: '16px', color: palette.charcoalMuted, lineHeight: 1.6, marginBottom: '36px' }}>
                The NIL platform built for real communities. Let's set up your account in 60 seconds.
              </p>
              <Button size="lg" fullWidth onClick={handleContinue}>Get Started</Button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="persona" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              style={{ background: '#fff', borderRadius: '20px', padding: '40px', boxShadow: '0 8px 40px rgba(0,0,0,0.2)' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', fontFamily: 'Space Grotesk, sans-serif' }}>I am a...</h2>
              <p style={{ fontSize: '14px', color: palette.charcoalMuted, marginBottom: '28px' }}>Select your role to access your personalized portal.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
                {PERSONAS.map(p => {
                  const isSelected = selected === p.id
                  return (
                    <div key={p.id} onClick={() => setSelected(p.id)}
                      style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', borderRadius: '12px', border: `2px solid ${isSelected ? p.color : '#e5e7eb'}`, background: isSelected ? `${p.color}08` : '#fff', cursor: 'pointer', transition: 'all 0.15s' }}>
                      <div style={{ width: '44px', height: '44px', background: isSelected ? p.color : palette.sage, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <p.icon size={22} color={isSelected ? '#fff' : palette.pine} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: 600, color: palette.charcoal }}>{p.label}</p>
                        <p style={{ fontSize: '13px', color: palette.charcoalMuted, marginTop: '2px' }}>{p.desc}</p>
                      </div>
                      {isSelected && <Check size={20} color={p.color} />}
                    </div>
                  )
                })}
              </div>

              <Button size="lg" fullWidth onClick={handleContinue} disabled={!selected || loading}>
                {loading ? 'Setting up...' : 'Enter My Portal'}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
