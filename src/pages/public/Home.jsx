import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Sparkles, Shield, TrendingUp, Users, ArrowRight,
  CheckCircle, Trophy, Building2, Zap, MapPin, Star
} from 'lucide-react'
import { Button } from '../../components/shared/UI.jsx'
import { palette } from '../../lib/theme.js'

const STATS = [
  { value: '500+', label: 'Athletes Matched' },
  { value: '200+', label: 'Local Businesses' },
  { value: '50+',  label: 'Universities' },
  { value: '$2M+', label: 'NIL Value Tracked' },
]

const PERSONAS = [
  {
    label: 'College Athlete',
    icon: Trophy,
    color: palette.pine,
    bg: '#f0f4e8',
    border: '#c8d8a8',
    desc: 'Build your NIL portfolio, get matched to local brands, and track deals — all in one place.',
    cta: 'Start as Athlete',
    route: '/signup',
    perks: ['AI-powered brand matching', 'Outreach email generator', 'Deal & payment tracking'],
  },
  {
    label: 'Athletic Director',
    icon: Shield,
    color: '#1d4ed8',
    bg: '#eff6ff',
    border: '#bfdbfe',
    desc: 'Full roster visibility, compliance monitoring, and institutional reporting built for your workflow.',
    cta: 'Request School Demo',
    route: '/demo',
    perks: ['Roster-wide NIL dashboard', 'Compliance reporting', 'Policy management tools'],
  },
  {
    label: 'Local Business',
    icon: Building2,
    color: '#7e22ce',
    bg: '#f5f3ff',
    border: '#ddd6fe',
    desc: 'Discover athletes near you who align with your brand. Launch authentic campaigns that convert.',
    cta: 'Find Athletes',
    route: '/signup',
    perks: ['Location-based discovery', 'RootdMatchScore filtering', 'Campaign ROI tracking'],
  },
]

const FEATURES = [
  { icon: Sparkles, title: 'AI-Powered Matching',   desc: 'A 30-dimension personality quiz creates your RootdMatchScore — ranked compatibility with local businesses.' },
  { icon: MapPin,   title: 'Local-First Discovery', desc: 'Google Places integration surfaces real businesses within your radius. No cold outreach into the void.' },
  { icon: Zap,      title: 'Instant Outreach Tools',desc: 'AI-generated emails, pitch templates, and campaign ideas — ready to send in minutes, not days.' },
  { icon: Shield,   title: 'Compliance-First',      desc: 'Every deal flows through a compliance layer built for NCAA and institutional policies from day one.' },
]

const STEPS = [
  { num: '01', title: 'Complete Your Profile',  desc: 'Answer 30 questions about your brand, interests, and audience. Takes under 10 minutes.' },
  { num: '02', title: 'Get Your Matches',        desc: 'Rootd surfaces 10–20 local businesses ranked by RootdMatchScore compatibility.' },
  { num: '03', title: 'Reach Out Instantly',     desc: 'Use AI-generated outreach emails tailored to each business. Send directly from the platform.' },
  { num: '04', title: 'Manage Your Deals',       desc: 'Track deliverables, payments, and compliance in one organised dashboard.' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* ── Hero ── */}
      <section style={{
        background: `linear-gradient(135deg, ${palette.pine} 0%, ${palette.pineDark} 55%, #1e2a12 100%)`,
        color: '#fff',
        padding: 'clamp(80px,10vw,120px) 32px 100px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
          <div style={{ position:'absolute', top:'-80px', right:'-80px', width:'500px', height:'500px', background:'radial-gradient(circle, rgba(163,201,122,0.12) 0%, transparent 70%)', borderRadius:'50%' }} />
          <div style={{ position:'absolute', bottom:'-60px', left:'-60px', width:'400px', height:'400px', background:'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)', borderRadius:'50%' }} />
        </div>

        <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
          style={{ maxWidth:'820px', margin:'0 auto', position:'relative' }}>

          <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(163,201,122,0.18)', border:'1px solid rgba(163,201,122,0.35)', borderRadius:'999px', padding:'6px 18px', marginBottom:'28px', fontSize:'13px', fontWeight:500 }}>
            <span style={{ width:'7px', height:'7px', background:'#4ade80', borderRadius:'50%', boxShadow:'0 0 8px #4ade80', display:'inline-block' }} />
            Now in beta — free for pilot schools
          </div>

          <h1 style={{ fontSize:'clamp(40px,6vw,68px)', fontWeight:800, lineHeight:1.05, marginBottom:'24px', fontFamily:'Space Grotesk, sans-serif', letterSpacing:'-0.02em' }}>
            NIL Management,<br />
            <span style={{ color:'#a3c97a' }}>Rootd in Community</span>
          </h1>

          <p style={{ fontSize:'clamp(16px,2vw,20px)', color:'rgba(255,255,255,0.80)', lineHeight:1.65, maxWidth:'580px', margin:'0 auto 40px' }}>
            The compliance-first platform connecting college athletes to local businesses through AI-powered matching and transparent deal management.
          </p>

          <div style={{ display:'flex', gap:'14px', justifyContent:'center', flexWrap:'wrap' }}>
            <motion.div whileHover={{ scale:1.03 }} whileTap={{ scale:0.98 }}>
              <Button size="lg" onClick={() => navigate('/signup')}
                style={{ background:'#fff', color:palette.pine, fontWeight:700, boxShadow:'0 4px 24px rgba(0,0,0,0.18)' }}>
                Get Started Free
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale:1.03 }} whileTap={{ scale:0.98 }}>
              <Button size="lg" variant="outline" onClick={() => navigate('/demo')} icon={ArrowRight}
                style={{ borderColor:'rgba(255,255,255,0.45)', color:'#fff' }}>
                View Live Demo
              </Button>
            </motion.div>
          </div>

          <p style={{ marginTop:'20px', fontSize:'13px', color:'rgba(255,255,255,0.40)' }}>
            No credit card required · NCAA-compliant · Free pilot for universities
          </p>
        </motion.div>
      </section>

      {/* ── Stats Bar ── */}
      <section style={{ background:palette.cream, borderBottom:'1px solid #e0d9cc' }}>
        <div style={{ maxWidth:'900px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', textAlign:'center' }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{ padding:'28px 16px', borderRight: i < 3 ? '1px solid #e0d9cc' : 'none' }}>
              <p style={{ fontSize:'30px', fontWeight:800, color:palette.pine, fontFamily:'Space Grotesk, sans-serif', lineHeight:1 }}>{s.value}</p>
              <p style={{ fontSize:'13px', color:palette.charcoalMuted, marginTop:'6px', fontWeight:500 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Persona Cards ── */}
      <section style={{ padding:'80px 32px', background:'#fff' }}>
        <div style={{ maxWidth:'1140px', margin:'0 auto' }}>
          <p style={{ textAlign:'center', fontSize:'13px', fontWeight:600, color:palette.pine, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'12px' }}>Who It's For</p>
          <h2 style={{ textAlign:'center', fontSize:'clamp(28px,4vw,38px)', fontWeight:800, marginBottom:'8px', color:palette.charcoal, fontFamily:'Space Grotesk, sans-serif', letterSpacing:'-0.01em' }}>
            Built for Every Stakeholder
          </h2>
          <p style={{ textAlign:'center', color:palette.charcoalMuted, marginBottom:'52px', fontSize:'16px', maxWidth:'560px', margin:'0 auto 52px' }}>
            One platform, three purpose-built portals — each designed around how you actually work.
          </p>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px,1fr))', gap:'24px' }}>
            {PERSONAS.map((p, i) => (
              <motion.div key={p.label}
                initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay: i * 0.1 }}
                whileHover={{ y:-6 }}
                style={{ background:p.bg, border:`1.5px solid ${p.border}`, borderRadius:'20px', padding:'32px', cursor:'pointer', transition:'box-shadow 0.2s' }}
                onClick={() => navigate(p.route)}>
                <div style={{ width:'48px', height:'48px', background:p.color, borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'20px', boxShadow:`0 4px 16px ${p.color}44` }}>
                  <p.icon size={24} color="#fff" />
                </div>
                <h3 style={{ fontSize:'19px', fontWeight:700, color:palette.charcoal, marginBottom:'10px', fontFamily:'Space Grotesk, sans-serif' }}>{p.label}</h3>
                <p style={{ fontSize:'14px', color:palette.charcoalMuted, lineHeight:1.65, marginBottom:'20px' }}>{p.desc}</p>
                <ul style={{ listStyle:'none', padding:0, margin:'0 0 24px', display:'flex', flexDirection:'column', gap:'8px' }}>
                  {p.perks.map(perk => (
                    <li key={perk} style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'13px', color:palette.charcoal }}>
                      <CheckCircle size={14} color={p.color} style={{ flexShrink:0 }} />
                      {perk}
                    </li>
                  ))}
                </ul>
                <div style={{ display:'inline-flex', alignItems:'center', gap:'6px', fontSize:'14px', fontWeight:600, color:p.color }}>
                  {p.cta} <ArrowRight size={15} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section style={{ padding:'80px 32px', background:palette.cream }}>
        <div style={{ maxWidth:'1000px', margin:'0 auto' }}>
          <p style={{ textAlign:'center', fontSize:'13px', fontWeight:600, color:palette.pine, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'12px' }}>The Process</p>
          <h2 style={{ textAlign:'center', fontSize:'clamp(28px,4vw,38px)', fontWeight:800, marginBottom:'52px', color:palette.charcoal, fontFamily:'Space Grotesk, sans-serif', letterSpacing:'-0.01em' }}>
            From Profile to Paid Deal in 4 Steps
          </h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px,1fr))', gap:'36px' }}>
            {STEPS.map((step, i) => (
              <motion.div key={step.num}
                initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay: i * 0.12 }}>
                <div style={{ fontSize:'13px', fontWeight:700, color:palette.pine, letterSpacing:'0.06em', marginBottom:'12px', fontFamily:'Space Grotesk, sans-serif' }}>{step.num}</div>
                <div style={{ width:'100%', height:'2px', background:`linear-gradient(90deg, ${palette.pine}, transparent)`, marginBottom:'16px', borderRadius:'2px' }} />
                <h3 style={{ fontSize:'16px', fontWeight:700, color:palette.charcoal, marginBottom:'8px' }}>{step.title}</h3>
                <p style={{ fontSize:'14px', color:palette.charcoalMuted, lineHeight:1.65 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ padding:'80px 32px', background:'#fff' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <p style={{ textAlign:'center', fontSize:'13px', fontWeight:600, color:palette.pine, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'12px' }}>Platform Capabilities</p>
          <h2 style={{ textAlign:'center', fontSize:'clamp(28px,4vw,38px)', fontWeight:800, marginBottom:'52px', color:palette.charcoal, fontFamily:'Space Grotesk, sans-serif', letterSpacing:'-0.01em' }}>
            Everything You Need to Win at NIL
          </h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px,1fr))', gap:'24px' }}>
            {FEATURES.map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay: i * 0.1 }}
                whileHover={{ borderColor:`${palette.pine}55` }}
                style={{ padding:'28px', border:'1px solid #e8eed8', borderRadius:'16px', background:palette.cream, transition:'border-color 0.2s' }}>
                <div style={{ background:palette.sage, borderRadius:'12px', width:'48px', height:'48px', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'18px' }}>
                  <f.icon size={22} color={palette.pine} />
                </div>
                <h3 style={{ fontSize:'16px', fontWeight:700, marginBottom:'10px', color:palette.charcoal }}>{f.title}</h3>
                <p style={{ fontSize:'14px', color:palette.charcoalMuted, lineHeight:1.65 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        background:`linear-gradient(135deg, ${palette.pine} 0%, ${palette.pineDark} 100%)`,
        color:'#fff', padding:'80px 32px', textAlign:'center', position:'relative', overflow:'hidden',
      }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle at 20% 50%, rgba(163,201,122,0.12) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.04) 0%, transparent 50%)', pointerEvents:'none' }} />
        <div style={{ maxWidth:'640px', margin:'0 auto', position:'relative' }}>
          <Star size={28} color="#a3c97a" style={{ marginBottom:'16px' }} />
          <h2 style={{ fontSize:'clamp(28px,4vw,44px)', fontWeight:800, marginBottom:'16px', fontFamily:'Space Grotesk, sans-serif', letterSpacing:'-0.02em' }}>
            Ready to get Rootd?
          </h2>
          <p style={{ fontSize:'17px', color:'rgba(255,255,255,0.78)', marginBottom:'36px', lineHeight:1.6 }}>
            Join the NIL platform built for real communities. Free for pilot schools — no contracts, no commitment.
          </p>
          <div style={{ display:'flex', gap:'14px', justifyContent:'center', flexWrap:'wrap' }}>
            <motion.div whileHover={{ scale:1.03 }} whileTap={{ scale:0.98 }}>
              <Button size="lg" onClick={() => navigate('/signup')}
                style={{ background:'#fff', color:palette.pine, fontWeight:700, boxShadow:'0 4px 20px rgba(0,0,0,0.2)' }}>
                Create Free Account
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale:1.03 }} whileTap={{ scale:0.98 }}>
              <Button size="lg" onClick={() => navigate('/quiz')}
                style={{ background:'rgba(255,255,255,0.12)', color:'#fff', border:'1px solid rgba(255,255,255,0.3)' }}>
                Take the Personality Quiz
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
