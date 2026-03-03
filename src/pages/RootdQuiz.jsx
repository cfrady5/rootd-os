import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../components/shared/UI.jsx'
import { palette } from '../lib/theme.js'
import { Check } from 'lucide-react'

const QUESTIONS = [
  // Professionalism (1-4)
  { id: 'q1', dim: 'Professionalism', type: 'likert', text: 'I always respond to messages and emails within 24 hours.' },
  { id: 'q2', dim: 'Professionalism', type: 'likert', text: 'I take pride in being punctual and prepared for commitments.' },
  { id: 'q3', dim: 'Professionalism', type: 'likert', text: 'I regularly update my social media profiles with quality content.' },
  { id: 'q4', dim: 'Professionalism', type: 'likert', text: 'I feel comfortable representing a brand in public settings.' },
  // Content Quality (5-8)
  { id: 'q5', dim: 'Content Quality', type: 'likert', text: 'I invest time in creating visually appealing social media posts.' },
  { id: 'q6', dim: 'Content Quality', type: 'likert', text: 'I have a consistent aesthetic or theme across my social platforms.' },
  { id: 'q7', dim: 'Content Quality', type: 'likert', text: 'I enjoy making videos or reels showcasing my daily life.' },
  { id: 'q8', dim: 'Content Quality', type: 'single_select', text: 'How often do you post on social media?', options: ['Daily', '3-4x per week', '1-2x per week', 'Rarely'] },
  // Local Influence (9-12)
  { id: 'q9', dim: 'Local Influence', type: 'likert', text: 'My followers are mostly from my college town or home city.' },
  { id: 'q10', dim: 'Local Influence', type: 'likert', text: 'I frequently visit and promote local businesses.' },
  { id: 'q11', dim: 'Local Influence', type: 'likert', text: 'Community involvement is important to my personal brand.' },
  { id: 'q12', dim: 'Local Influence', type: 'single_select', text: 'Where is most of your social media audience located?', options: ['Local/same city', 'Regional/same state', 'National', 'Mixed'] },
  // Food & Drink (13-16)
  { id: 'q13', dim: 'Food & Drink', type: 'likert', text: 'I post about restaurants, cafes, or food brands regularly.' },
  { id: 'q14', dim: 'Food & Drink', type: 'likert', text: 'I follow a specific diet (vegan, protein-focused, etc.) publicly.' },
  { id: 'q15', dim: 'Food & Drink', type: 'likert', text: 'I\'d be comfortable doing a meal review or taste test on camera.' },
  { id: 'q16', dim: 'Food & Drink', type: 'multi_select', text: 'Which food/drink categories interest you? (Select all that apply)', options: ['Coffee shops', 'Restaurants', 'Meal prep/nutrition', 'Beverages', 'Snacks', 'None'] },
  // Lifestyle & Retail (17-20)
  { id: 'q17', dim: 'Lifestyle & Retail', type: 'likert', text: 'I regularly share outfit posts or fashion content.' },
  { id: 'q18', dim: 'Lifestyle & Retail', type: 'likert', text: 'I use and recommend fitness or athletic gear on social media.' },
  { id: 'q19', dim: 'Lifestyle & Retail', type: 'likert', text: 'I\'d enjoy being a brand ambassador for a local retail store.' },
  { id: 'q20', dim: 'Lifestyle & Retail', type: 'multi_select', text: 'Which lifestyle categories fit your brand? (Select all)', options: ['Athleisure/Sports', 'Fashion', 'Beauty/Skincare', 'Tech/Gadgets', 'Home/Dorm', 'None'] },
  // Activation Preferences (21-24)
  { id: 'q21', dim: 'Activation', type: 'multi_select', text: 'Which types of brand activations interest you?', options: ['Social posts', 'Event appearances', 'Video content', 'Product giveaways', 'Podcast/interviews', 'Store openings'] },
  { id: 'q22', dim: 'Activation', type: 'single_select', text: 'How many brand partnerships are you comfortable managing at once?', options: ['1-2', '3-5', '5-10', '10+'] },
  { id: 'q23', dim: 'Activation', type: 'likert', text: 'I would be comfortable sharing sponsored content clearly labeled as such.' },
  { id: 'q24', dim: 'Activation', type: 'likert', text: 'I enjoy attending community events and being a public face.' },
  // Values & Communities (25-30)
  { id: 'q25', dim: 'Values', type: 'multi_select', text: 'Which values are most important to your personal brand?', options: ['Sustainability', 'Diversity & Inclusion', 'Mental Health', 'Community Service', 'Faith', 'Entrepreneurship'] },
  { id: 'q26', dim: 'Values', type: 'likert', text: 'I want brand partners that align with my personal values.' },
  { id: 'q27', dim: 'Values', type: 'likert', text: 'I would decline a deal if it conflicted with my beliefs.' },
  { id: 'q28', dim: 'Values', type: 'likert', text: 'I actively support causes or charities in my community.' },
  { id: 'q29', dim: 'Values', type: 'single_select', text: 'What matters most to you in a brand partnership?', options: ['Compensation', 'Brand alignment', 'Creative freedom', 'Community impact'] },
  { id: 'q30', dim: 'Values', type: 'likert', text: 'I see my NIL journey as a way to grow as a leader and entrepreneur.' },
]

const LIKERT = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']

function calcScore(answers) {
  let total = 0, count = 0
  Object.entries(answers).forEach(([id, val]) => {
    const q = QUESTIONS.find(q => q.id === id)
    if (!q) return
    if (q.type === 'likert') { total += (Number(val) / 4) * 100; count++ }
    else if (q.type === 'single_select') { total += 70; count++ }
    else if (q.type === 'multi_select') { total += Math.min(val.length * 20, 100); count++ }
  })
  return count ? Math.round(total / count) : 0
}

export default function RootdQuiz() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState(() => {
    try { return JSON.parse(localStorage.getItem('rootd_quiz_answers') || '{}') } catch { return {} }
  })
  const [showResume, setShowResume] = useState(false)
  const [completed, setCompleted] = useState(false)

  const q = QUESTIONS[current]
  const progress = ((current) / QUESTIONS.length) * 100
  const hasAnswer = answers[q?.id] !== undefined && answers[q?.id] !== null && (Array.isArray(answers[q?.id]) ? answers[q?.id].length > 0 : true)

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('rootd_quiz_answers') || '{}')
    if (Object.keys(saved).length > 0 && current === 0) setShowResume(true)
  }, [])

  useEffect(() => {
    localStorage.setItem('rootd_quiz_answers', JSON.stringify(answers))
  }, [answers])

  function answer(val) { setAnswers(a => ({ ...a, [q.id]: val })) }

  function toggleMulti(opt) {
    const cur = answers[q.id] ?? []
    const next = cur.includes(opt) ? cur.filter(x => x !== opt) : [...cur, opt]
    answer(next)
  }

  function next() {
    if (current < QUESTIONS.length - 1) { setCurrent(c => c + 1) }
    else { setCompleted(true); localStorage.removeItem('rootd_quiz_answers') }
  }

  function prev() { if (current > 0) setCurrent(c => c - 1) }

  const score = calcScore(answers)

  if (completed) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${palette.pine}, ${palette.pineDark})`, padding: '32px' }}>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          style={{ background: '#fff', borderRadius: '20px', padding: '48px', maxWidth: '480px', width: '100%', textAlign: 'center', boxShadow: '0 8px 40px rgba(0,0,0,0.2)' }}>
          <div style={{ width: '100px', height: '100px', margin: '0 auto 24px', position: 'relative' }}>
            {(() => {
              const r = 44, circ = 2 * Math.PI * r, filled = (score / 100) * circ
              const color = score >= 80 ? '#15803d' : score >= 60 ? '#d97706' : '#dc2626'
              return (
                <svg width="100" height="100" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="50" cy="50" r={r} fill="none" stroke="#e5e7eb" strokeWidth="8" />
                  <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="8" strokeDasharray={`${filled} ${circ - filled}`} strokeLinecap="round" />
                  <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" style={{ transform: 'rotate(90deg)', transformOrigin: '50px 50px', fontSize: '22px', fontWeight: 700, fill: color }}>{score}</text>
                </svg>
              )
            })()}
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px', fontFamily: 'Space Grotesk, sans-serif' }}>Your Rootd Score</h2>
          <p style={{ color: palette.charcoalMuted, marginBottom: '32px' }}>
            {score >= 80 ? 'Exceptional NIL readiness! Brands will love your profile.' : score >= 60 ? 'Strong profile with great potential.' : 'Good start — your profile will grow with experience.'}
          </p>
          <Button size="lg" fullWidth onClick={() => navigate('/signin')}>View My Matches</Button>
          <button onClick={() => { setCurrent(0); setAnswers({}); setCompleted(false) }} style={{ marginTop: '12px', background: 'none', border: 'none', color: palette.charcoalMuted, fontSize: '14px', cursor: 'pointer' }}>Retake Quiz</button>
        </motion.div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: `linear-gradient(135deg, ${palette.pine}, ${palette.pineDark})`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
      {showResume && (
        <div style={{ background: '#fef9c3', border: '1px solid #fde68a', borderRadius: '10px', padding: '12px 20px', marginBottom: '20px', display: 'flex', gap: '12px', alignItems: 'center', maxWidth: '560px', width: '100%' }}>
          <span style={{ fontSize: '13px', color: '#854d0e', flex: 1 }}>You have a quiz in progress. Resume where you left off?</span>
          <button onClick={() => setShowResume(false)} style={{ background: palette.pine, color: '#fff', border: 'none', borderRadius: '6px', padding: '4px 12px', fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit' }}>Resume</button>
          <button onClick={() => { setAnswers({}); setShowResume(false) }} style={{ background: 'none', border: 'none', fontSize: '12px', color: '#854d0e', cursor: 'pointer', fontFamily: 'inherit' }}>Start over</button>
        </div>
      )}

      <div style={{ width: '100%', maxWidth: '560px', marginBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
          <span>{q.dim}</span><span>{current + 1} / {QUESTIONS.length}</span>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '999px', height: '6px', overflow: 'hidden' }}>
          <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }}
            style={{ height: '100%', background: '#a3c97a', borderRadius: '999px' }} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={q.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
          style={{ background: '#fff', borderRadius: '20px', padding: '40px', maxWidth: '560px', width: '100%', boxShadow: '0 8px 40px rgba(0,0,0,0.2)' }}>
          <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: palette.pine, marginBottom: '12px' }}>{q.dim}</p>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: palette.charcoal, marginBottom: '28px', lineHeight: 1.4 }}>{q.text}</h2>

          {q.type === 'likert' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {LIKERT.map((label, i) => {
                const isSelected = answers[q.id] === i
                return (
                  <div key={i} onClick={() => answer(i)}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', border: `2px solid ${isSelected ? palette.pine : '#e5e7eb'}`, background: isSelected ? palette.sage : '#fff', cursor: 'pointer', transition: 'all 0.12s' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: `2px solid ${isSelected ? palette.pine : '#d1d5db'}`, background: isSelected ? palette.pine : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {isSelected && <Check size={12} color="#fff" />}
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: isSelected ? 600 : 400, color: palette.charcoal }}>{label}</span>
                  </div>
                )
              })}
            </div>
          )}

          {(q.type === 'single_select') && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {q.options.map(opt => {
                const isSelected = answers[q.id] === opt
                return (
                  <div key={opt} onClick={() => answer(opt)}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', border: `2px solid ${isSelected ? palette.pine : '#e5e7eb'}`, background: isSelected ? palette.sage : '#fff', cursor: 'pointer', transition: 'all 0.12s' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: `2px solid ${isSelected ? palette.pine : '#d1d5db'}`, background: isSelected ? palette.pine : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {isSelected && <Check size={12} color="#fff" />}
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: isSelected ? 600 : 400, color: palette.charcoal }}>{opt}</span>
                  </div>
                )
              })}
            </div>
          )}

          {q.type === 'multi_select' && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {q.options.map(opt => {
                const isSelected = (answers[q.id] ?? []).includes(opt)
                return (
                  <div key={opt} onClick={() => toggleMulti(opt)}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '999px', border: `2px solid ${isSelected ? palette.pine : '#e5e7eb'}`, background: isSelected ? palette.pine : '#fff', cursor: 'pointer', transition: 'all 0.12s' }}>
                    {isSelected && <Check size={13} color="#fff" />}
                    <span style={{ fontSize: '14px', fontWeight: 500, color: isSelected ? '#fff' : palette.charcoal }}>{opt}</span>
                  </div>
                )
              })}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
            <Button variant="ghost" onClick={prev} disabled={current === 0}>Back</Button>
            <Button onClick={next} disabled={!hasAnswer}>
              {current === QUESTIONS.length - 1 ? 'See My Score' : 'Next'}
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
