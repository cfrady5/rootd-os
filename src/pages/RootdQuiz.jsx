import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../components/shared/UI.jsx'
import { palette } from '../lib/theme.js'
import { Check, MapPin, Loader2, Star, ArrowRight, ExternalLink } from 'lucide-react'

// ── 30-question bank ─────────────────────────────────────────────────────────
const QUESTIONS = [
  { id: 'q1',  dim: 'Professionalism',   type: 'likert',        text: 'I always respond to messages and emails within 24 hours.' },
  { id: 'q2',  dim: 'Professionalism',   type: 'likert',        text: 'I take pride in being punctual and prepared for commitments.' },
  { id: 'q3',  dim: 'Professionalism',   type: 'likert',        text: 'I regularly update my social media profiles with quality content.' },
  { id: 'q4',  dim: 'Professionalism',   type: 'likert',        text: 'I feel comfortable representing a brand in public settings.' },
  { id: 'q5',  dim: 'Content Quality',   type: 'likert',        text: 'I invest time in creating visually appealing social media posts.' },
  { id: 'q6',  dim: 'Content Quality',   type: 'likert',        text: 'I have a consistent aesthetic or theme across my social platforms.' },
  { id: 'q7',  dim: 'Content Quality',   type: 'likert',        text: 'I enjoy making videos or reels showcasing my daily life.' },
  { id: 'q8',  dim: 'Content Quality',   type: 'single_select', text: 'How often do you post on social media?', options: ['Daily', '3-4x per week', '1-2x per week', 'Rarely'] },
  { id: 'q9',  dim: 'Local Influence',   type: 'likert',        text: 'My followers are mostly from my college town or home city.' },
  { id: 'q10', dim: 'Local Influence',   type: 'likert',        text: 'I frequently visit and promote local businesses.' },
  { id: 'q11', dim: 'Local Influence',   type: 'likert',        text: 'Community involvement is important to my personal brand.' },
  { id: 'q12', dim: 'Local Influence',   type: 'single_select', text: 'Where is most of your social media audience located?', options: ['Local/same city', 'Regional/same state', 'National', 'Mixed'] },
  { id: 'q13', dim: 'Food & Drink',      type: 'likert',        text: 'I post about restaurants, cafes, or food brands regularly.' },
  { id: 'q14', dim: 'Food & Drink',      type: 'likert',        text: 'I follow a specific diet (vegan, protein-focused, etc.) publicly.' },
  { id: 'q15', dim: 'Food & Drink',      type: 'likert',        text: "I'd be comfortable doing a meal review or taste test on camera." },
  { id: 'q16', dim: 'Food & Drink',      type: 'multi_select',  text: 'Which food/drink categories interest you? (Select all that apply)', options: ['Coffee shops', 'Restaurants', 'Meal prep/nutrition', 'Beverages', 'Snacks', 'None'] },
  { id: 'q17', dim: 'Lifestyle',         type: 'likert',        text: 'I regularly share outfit posts or fashion content.' },
  { id: 'q18', dim: 'Lifestyle',         type: 'likert',        text: 'I use and recommend fitness or athletic gear on social media.' },
  { id: 'q19', dim: 'Lifestyle',         type: 'likert',        text: "I'd enjoy being a brand ambassador for a local retail store." },
  { id: 'q20', dim: 'Lifestyle',         type: 'multi_select',  text: 'Which lifestyle categories fit your brand? (Select all)', options: ['Athleisure/Sports', 'Fashion', 'Beauty/Skincare', 'Tech/Gadgets', 'Home/Dorm', 'None'] },
  { id: 'q21', dim: 'Activation',        type: 'multi_select',  text: 'Which types of brand activations interest you?', options: ['Social posts', 'Event appearances', 'Video content', 'Product giveaways', 'Podcast/interviews', 'Store openings'] },
  { id: 'q22', dim: 'Activation',        type: 'single_select', text: 'How many brand partnerships are you comfortable managing at once?', options: ['1-2', '3-5', '5-10', '10+'] },
  { id: 'q23', dim: 'Activation',        type: 'likert',        text: 'I would be comfortable sharing sponsored content clearly labeled as such.' },
  { id: 'q24', dim: 'Activation',        type: 'likert',        text: 'I enjoy attending community events and being a public face.' },
  { id: 'q25', dim: 'Values',            type: 'multi_select',  text: 'Which values are most important to your personal brand?', options: ['Sustainability', 'Diversity & Inclusion', 'Mental Health', 'Community Service', 'Faith', 'Entrepreneurship'] },
  { id: 'q26', dim: 'Values',            type: 'likert',        text: 'I want brand partners that align with my personal values.' },
  { id: 'q27', dim: 'Values',            type: 'likert',        text: 'I would decline a deal if it conflicted with my beliefs.' },
  { id: 'q28', dim: 'Values',            type: 'likert',        text: 'I actively support causes or charities in my community.' },
  { id: 'q29', dim: 'Values',            type: 'single_select', text: 'What matters most to you in a brand partnership?', options: ['Compensation', 'Brand alignment', 'Creative freedom', 'Community impact'] },
  { id: 'q30', dim: 'Values',            type: 'likert',        text: 'I see my NIL journey as a way to grow as a leader and entrepreneur.' },
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

// ── Score ring ────────────────────────────────────────────────────────────────
function ScoreRing({ score, size = 120 }) {
  const r = size / 2 - 10
  const circ = 2 * Math.PI * r
  const filled = (score / 100) * circ
  const color = score >= 80 ? '#15803d' : score >= 60 ? '#d97706' : '#dc2626'
  return (
    <div style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={size < 80 ? 6 : 9} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={size < 80 ? 6 : 9}
          strokeDasharray={`${filled} ${circ - filled}`} strokeLinecap="round" />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: size < 80 ? '14px' : '28px', fontWeight: 800, color, lineHeight: 1 }}>{score}</span>
        {size >= 100 && <span style={{ fontSize: '10px', color: '#6b7280', fontWeight: 500, marginTop: '2px' }}>/ 100</span>}
      </div>
    </div>
  )
}

// ── Match card ────────────────────────────────────────────────────────────────
function MatchCard({ match, rank }) {
  const scoreColor = match.score >= 80 ? '#15803d' : match.score >= 65 ? '#d97706' : '#6b7280'
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: rank * 0.06 }}
      style={{ background: '#fff', border: '1px solid #e8eed8', borderRadius: '16px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
      {/* Rank */}
      <div style={{ width: '28px', height: '28px', background: rank === 0 ? palette.pine : '#f3f4f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span style={{ fontSize: '12px', fontWeight: 700, color: rank === 0 ? '#fff' : '#6b7280' }}>#{rank + 1}</span>
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: palette.charcoal, margin: 0 }}>{match.name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: `${scoreColor}15`, border: `1px solid ${scoreColor}40`, borderRadius: '8px', padding: '2px 8px', flexShrink: 0 }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: scoreColor }}>{match.score}</span>
            <span style={{ fontSize: '10px', color: scoreColor }}>match</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', color: palette.charcoalMuted, background: '#f3f4f6', padding: '2px 8px', borderRadius: '999px' }}>{match.category}</span>
          {match.rating && (
            <span style={{ fontSize: '12px', color: '#d97706', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <Star size={11} fill="#d97706" /> {match.rating} ({match.reviewCount ?? '?'})
            </span>
          )}
        </div>
        {match.address && (
          <p style={{ fontSize: '12px', color: palette.charcoalMuted, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={11} /> {match.address}
          </p>
        )}
        {match.matchReason && (
          <p style={{ fontSize: '13px', color: palette.charcoal, lineHeight: 1.5, fontStyle: 'italic', borderLeft: `3px solid ${palette.sage}`, paddingLeft: '10px', margin: '8px 0 0' }}>
            "{match.matchReason}"
          </p>
        )}
      </div>

      {/* Link */}
      {match.googleMapsUrl && (
        <a href={match.googleMapsUrl} target="_blank" rel="noopener noreferrer"
          style={{ color: palette.pine, flexShrink: 0, marginTop: '2px' }}>
          <ExternalLink size={16} />
        </a>
      )}
    </motion.div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function RootdQuiz() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState(() => {
    try { return JSON.parse(localStorage.getItem('rootd_quiz_answers') || '{}') } catch { return {} }
  })
  const [showResume, setShowResume] = useState(false)

  // Completion stages: 'quiz' | 'location' | 'loading' | 'results'
  const [stage, setStage] = useState('quiz')
  const [location, setLocation] = useState('')
  const [locationError, setLocationError] = useState('')
  const [matches, setMatches] = useState([])
  const [loadingMsg, setLoadingMsg] = useState('Analysing your profile…')

  const q = QUESTIONS[current]
  const progress = (current / QUESTIONS.length) * 100
  const hasAnswer = answers[q?.id] !== undefined &&
    (Array.isArray(answers[q?.id]) ? answers[q?.id].length > 0 : answers[q?.id] !== null)
  const score = calcScore(answers)

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
    answer(cur.includes(opt) ? cur.filter(x => x !== opt) : [...cur, opt])
  }

  function next() {
    if (current < QUESTIONS.length - 1) setCurrent(c => c + 1)
    else {
      localStorage.removeItem('rootd_quiz_answers')
      setStage('location')
    }
  }

  function prev() { if (current > 0) setCurrent(c => c - 1) }

  async function findMatches() {
    if (!location.trim()) { setLocationError('Please enter your city or university.'); return }
    setLocationError('')
    setStage('loading')

    const messages = [
      'Analysing your personality profile…',
      'Searching for local businesses nearby…',
      'Calculating RootdMatchScores…',
      'Generating personalised insights…',
    ]
    let i = 0
    const interval = setInterval(() => {
      i = (i + 1) % messages.length
      setLoadingMsg(messages[i])
    }, 2000)

    try {
      const res = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, location: location.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Matching failed')
      setMatches(data.matches || [])
      setStage('results')
    } catch (err) {
      setLocationError(err.message || 'Could not generate matches. Please try again.')
      setStage('location')
    } finally {
      clearInterval(interval)
    }
  }

  // ── Stages ──────────────────────────────────────────────────────────────────

  if (stage === 'loading') {
    return (
      <div style={{ minHeight: '100vh', background: `linear-gradient(135deg, ${palette.pine}, ${palette.pineDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          style={{ background: '#fff', borderRadius: '24px', padding: '56px 48px', maxWidth: '440px', width: '100%', textAlign: 'center', boxShadow: '0 8px 40px rgba(0,0,0,0.2)' }}>
          <div style={{ width: '64px', height: '64px', margin: '0 auto 28px', background: palette.sage, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Loader2 size={30} color={palette.pine} style={{ animation: 'spin 1s linear infinite' }} />
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif', color: palette.charcoal, marginBottom: '12px' }}>
            Finding your matches
          </h2>
          <AnimatePresence mode="wait">
            <motion.p key={loadingMsg} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
              style={{ fontSize: '15px', color: palette.charcoalMuted, lineHeight: 1.6 }}>
              {loadingMsg}
            </motion.p>
          </AnimatePresence>
          <div style={{ marginTop: '28px', background: '#f3f4f6', borderRadius: '999px', height: '4px', overflow: 'hidden' }}>
            <motion.div animate={{ width: ['0%', '95%'] }} transition={{ duration: 12, ease: 'easeInOut' }}
              style={{ height: '100%', background: `linear-gradient(90deg, ${palette.pine}, #a3c97a)`, borderRadius: '999px' }} />
          </div>
        </motion.div>
      </div>
    )
  }

  if (stage === 'results') {
    return (
      <div style={{ minHeight: '100vh', background: `linear-gradient(135deg, ${palette.pine}, ${palette.pineDark})`, padding: '48px 32px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          {/* Score card */}
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
            style={{ background: '#fff', borderRadius: '20px', padding: '36px', textAlign: 'center', marginBottom: '24px', boxShadow: '0 8px 40px rgba(0,0,0,0.15)' }}>
            <p style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: palette.pine, marginBottom: '16px' }}>Your RootdMatchScore™</p>
            <ScoreRing score={score} size={120} />
            <h2 style={{ fontSize: '24px', fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif', color: palette.charcoal, marginTop: '20px', marginBottom: '8px' }}>
              {score >= 80 ? 'Exceptional NIL Readiness! 🔥' : score >= 60 ? 'Strong Profile — Ready to Match' : 'Good Start — Keep Building'}
            </h2>
            <p style={{ fontSize: '15px', color: palette.charcoalMuted, maxWidth: '460px', margin: '0 auto' }}>
              {score >= 80
                ? "You're in the top tier. Local brands will love your community presence and content quality."
                : score >= 60
                ? 'Your profile is solid. A few more partnerships will boost your score significantly.'
                : 'Great foundation. Fill in your social profiles to unlock higher-scoring matches.'}
            </p>
          </motion.div>

          {/* Matches */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', fontFamily: 'Space Grotesk, sans-serif' }}>
                {matches.length} Local Matches Found
              </h3>
              <button onClick={() => navigate('/signup')}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', borderRadius: '999px', padding: '6px 16px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                Save & Reach Out <ArrowRight size={14} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              {matches.map((m, i) => <MatchCard key={m.id || i} match={m} rank={i} />)}
            </div>

            <div style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '8px', fontFamily: 'Space Grotesk, sans-serif' }}>Ready to reach out?</h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', marginBottom: '20px' }}>
                Create a free account to unlock AI-generated outreach emails and deal tracking.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={() => navigate('/signup')}
                  style={{ background: '#fff', color: palette.pine, border: 'none', borderRadius: '10px', padding: '11px 28px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                  Create Free Account
                </button>
                <button onClick={() => { setStage('quiz'); setCurrent(0); setAnswers({}) }}
                  style={{ background: 'transparent', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '10px', padding: '11px 20px', fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit' }}>
                  Retake Quiz
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  if (stage === 'location') {
    return (
      <div style={{ minHeight: '100vh', background: `linear-gradient(135deg, ${palette.pine}, ${palette.pineDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          style={{ background: '#fff', borderRadius: '24px', padding: '48px 40px', maxWidth: '480px', width: '100%', textAlign: 'center', boxShadow: '0 8px 40px rgba(0,0,0,0.2)' }}>

          <div style={{ width: '56px', height: '56px', background: palette.sage, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <MapPin size={26} color={palette.pine} />
          </div>

          <ScoreRing score={score} size={80} />

          <h2 style={{ fontSize: '24px', fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif', color: palette.charcoal, margin: '20px 0 8px' }}>
            Almost there!
          </h2>
          <p style={{ fontSize: '15px', color: palette.charcoalMuted, lineHeight: 1.6, marginBottom: '28px' }}>
            Enter your city or university to find local businesses in your area that match your profile.
          </p>

          <div style={{ textAlign: 'left', marginBottom: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: palette.charcoal, display: 'block', marginBottom: '6px' }}>
              Your Location
            </label>
            <input
              value={location}
              onChange={e => setLocation(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && findMatches()}
              placeholder="e.g. West Lafayette, IN"
              style={{ width: '100%', padding: '11px 14px', fontSize: '15px', border: `2px solid ${locationError ? '#fca5a5' : '#e5e7eb'}`, borderRadius: '10px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s' }}
              onFocus={e => e.target.style.borderColor = palette.pine}
              onBlur={e => e.target.style.borderColor = locationError ? '#fca5a5' : '#e5e7eb'}
            />
            {locationError && <p style={{ color: '#dc2626', fontSize: '13px', marginTop: '6px' }}>{locationError}</p>}
          </div>

          <button onClick={findMatches}
            style={{ width: '100%', background: palette.pine, color: '#fff', border: 'none', borderRadius: '10px', padding: '13px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginTop: '16px', transition: 'background 0.15s' }}
            onMouseEnter={e => e.target.style.background = palette.pineDark}
            onMouseLeave={e => e.target.style.background = palette.pine}>
            Find My Matches →
          </button>
        </motion.div>
      </div>
    )
  }

  // ── Quiz stage ──────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: `linear-gradient(135deg, ${palette.pine}, ${palette.pineDark})`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
      {showResume && (
        <div style={{ background: '#fef9c3', border: '1px solid #fde68a', borderRadius: '10px', padding: '12px 20px', marginBottom: '20px', display: 'flex', gap: '12px', alignItems: 'center', maxWidth: '560px', width: '100%' }}>
          <span style={{ fontSize: '13px', color: '#854d0e', flex: 1 }}>You have a quiz in progress. Resume where you left off?</span>
          <button onClick={() => setShowResume(false)} style={{ background: palette.pine, color: '#fff', border: 'none', borderRadius: '6px', padding: '4px 12px', fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit' }}>Resume</button>
          <button onClick={() => { setAnswers({}); setShowResume(false) }} style={{ background: 'none', border: 'none', fontSize: '12px', color: '#854d0e', cursor: 'pointer', fontFamily: 'inherit' }}>Start over</button>
        </div>
      )}

      {/* Progress header */}
      <div style={{ width: '100%', maxWidth: '560px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px', fontWeight: 500 }}>
          <span style={{ background: 'rgba(255,255,255,0.15)', padding: '3px 10px', borderRadius: '999px' }}>{q.dim}</span>
          <span>{current + 1} / {QUESTIONS.length}</span>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '999px', height: '6px', overflow: 'hidden' }}>
          <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }}
            style={{ height: '100%', background: '#a3c97a', borderRadius: '999px' }} />
        </div>
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div key={q.id} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
          style={{ background: '#fff', borderRadius: '20px', padding: '40px', maxWidth: '560px', width: '100%', boxShadow: '0 8px 40px rgba(0,0,0,0.2)' }}>

          <h2 style={{ fontSize: '20px', fontWeight: 700, color: palette.charcoal, marginBottom: '28px', lineHeight: 1.45 }}>{q.text}</h2>

          {q.type === 'likert' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {LIKERT.map((label, i) => {
                const sel = answers[q.id] === i
                return (
                  <div key={i} onClick={() => answer(i)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', border: `2px solid ${sel ? palette.pine : '#e5e7eb'}`, background: sel ? palette.sage : '#fff', cursor: 'pointer', transition: 'all 0.12s' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: `2px solid ${sel ? palette.pine : '#d1d5db'}`, background: sel ? palette.pine : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {sel && <Check size={12} color="#fff" />}
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: sel ? 600 : 400, color: palette.charcoal }}>{label}</span>
                  </div>
                )
              })}
            </div>
          )}

          {q.type === 'single_select' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {q.options.map(opt => {
                const sel = answers[q.id] === opt
                return (
                  <div key={opt} onClick={() => answer(opt)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', border: `2px solid ${sel ? palette.pine : '#e5e7eb'}`, background: sel ? palette.sage : '#fff', cursor: 'pointer', transition: 'all 0.12s' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: `2px solid ${sel ? palette.pine : '#d1d5db'}`, background: sel ? palette.pine : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {sel && <Check size={12} color="#fff" />}
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: sel ? 600 : 400, color: palette.charcoal }}>{opt}</span>
                  </div>
                )
              })}
            </div>
          )}

          {q.type === 'multi_select' && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {q.options.map(opt => {
                const sel = (answers[q.id] ?? []).includes(opt)
                return (
                  <div key={opt} onClick={() => toggleMulti(opt)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 16px', borderRadius: '999px', border: `2px solid ${sel ? palette.pine : '#e5e7eb'}`, background: sel ? palette.pine : '#fff', cursor: 'pointer', transition: 'all 0.12s' }}>
                    {sel && <Check size={13} color="#fff" />}
                    <span style={{ fontSize: '14px', fontWeight: 500, color: sel ? '#fff' : palette.charcoal }}>{opt}</span>
                  </div>
                )
              })}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
            <Button variant="ghost" onClick={prev} disabled={current === 0}>Back</Button>
            <Button onClick={next} disabled={!hasAnswer}>
              {current === QUESTIONS.length - 1 ? 'See My Matches →' : 'Next'}
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
