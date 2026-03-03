// ─── Demo Athlete ────────────────────────────────────────────────────────────
export const DEMO_ATHLETE = {
  id: 'athlete-001',
  name: 'Ava Thompson',
  sport: "Women's Soccer",
  position: 'Midfielder',
  institution: 'Stanford University',
  year: 'Junior',
  gpa: 3.7,
  hometown: 'Portland, OR',
  avatar: null,
  bio: 'Passionate soccer player and pre-med student. Love connecting with local brands that share my values of health, sustainability, and community.',
  interests: ['Health & Wellness', 'Sustainability', 'Food & Drink', 'Fashion', 'Community'],
  socialFollowers: { instagram: 12400, tiktok: 8200, twitter: 3100 },
  rootdScore: 82,
  onboardingComplete: true,
}

// ─── Demo Matches ─────────────────────────────────────────────────────────────
export const DEMO_MATCHES = [
  { id: 'm1', business: 'Fresh Roots Cafe', category: 'Food & Drink', score: 94, status: 'approved', value: '$400', date: '2024-03-12', notes: 'Excellent brand alignment with health focus' },
  { id: 'm2', business: 'Lume Activewear', category: 'Fashion', score: 88, status: 'pending', value: '$650', date: '2024-03-10', notes: 'Strong social audience overlap' },
  { id: 'm3', business: 'Bay City Coffee', category: 'Food & Drink', score: 81, status: 'negotiation', value: '$300', date: '2024-03-08', notes: 'Local brand, great community presence' },
  { id: 'm4', business: 'Verde Supplements', category: 'Health & Wellness', score: 76, status: 'approved', value: '$750', date: '2024-03-05', notes: 'Values alignment on sustainability' },
  { id: 'm5', business: 'Palo Alto Running Co.', category: 'Lifestyle', score: 71, status: 'pending', value: '$200', date: '2024-03-01', notes: 'Local following overlap' },
]

// ─── Demo Deals ───────────────────────────────────────────────────────────────
export const DEMO_DEALS = [
  { id: 'd1', athlete: 'Ava Thompson', business: 'Fresh Roots Cafe', value: '$400', status: 'completed', type: 'Social Post', created: '2024-02-20', expires: '2024-04-20' },
  { id: 'd2', athlete: 'Marcus Reid', business: 'Lume Activewear', value: '$650', status: 'active', type: 'Brand Ambassador', created: '2024-03-01', expires: '2024-06-01' },
  { id: 'd3', athlete: 'Sofia Reyes', business: 'Bay City Coffee', value: '$300', status: 'pending_payment', type: 'Event Appearance', created: '2024-03-10', expires: '2024-05-10' },
  { id: 'd4', athlete: 'James Carter', business: 'Verde Supplements', value: '$750', status: 'negotiation', type: 'Content Series', created: '2024-03-12', expires: null },
  { id: 'd5', athlete: 'Ava Thompson', business: 'Verde Supplements', value: '$750', status: 'active', type: 'Sponsored Content', created: '2024-03-05', expires: '2024-09-05' },
]

// ─── Demo Director ────────────────────────────────────────────────────────────
export const DEMO_DIRECTOR = {
  id: 'director-001',
  name: 'Dr. Patricia Wells',
  title: 'NIL Director',
  institution: 'Stanford University',
  department: 'Athletics',
  avatar: null,
}

// ─── Demo Roster ─────────────────────────────────────────────────────────────
export const DEMO_ROSTER = [
  { id: 'a1', name: 'Ava Thompson', sport: "Women's Soccer", year: 'Junior', rootdScore: 82, deals: 2, status: 'active', compliance: 'pass' },
  { id: 'a2', name: 'Marcus Reid', sport: "Men's Basketball", year: 'Senior', rootdScore: 91, deals: 4, status: 'active', compliance: 'pass' },
  { id: 'a3', name: 'Sofia Reyes', sport: "Women's Tennis", year: 'Sophomore', rootdScore: 74, deals: 1, status: 'active', compliance: 'warning' },
  { id: 'a4', name: 'James Carter', sport: "Men's Track", year: 'Freshman', rootdScore: 65, deals: 0, status: 'active', compliance: 'pass' },
  { id: 'a5', name: 'Priya Sharma', sport: "Women's Swimming", year: 'Junior', rootdScore: 78, deals: 1, status: 'inactive', compliance: 'pass' },
  { id: 'a6', name: 'Tyler Brooks', sport: "Men's Football", year: 'Senior', rootdScore: 88, deals: 3, status: 'active', compliance: 'pass' },
]

// ─── Demo Business ────────────────────────────────────────────────────────────
export const DEMO_BUSINESS = {
  id: 'biz-001',
  name: 'Fresh Roots Cafe',
  category: 'Food & Drink',
  location: 'Palo Alto, CA',
  budget: '$5,000/mo',
  avatar: null,
  contact: 'Jamie Torres',
}

// ─── Director Stats ───────────────────────────────────────────────────────────
export const DEMO_DIRECTOR_STATS = {
  totalAthletes: 6,
  activeDeals: 4,
  totalValue: '$2,850',
  complianceRate: '92%',
  pendingReview: 2,
  avgRootdScore: 79,
}

// ─── Business Stats ───────────────────────────────────────────────────────────
export const DEMO_BUSINESS_STATS = {
  totalMatches: 5,
  activeDeals: 2,
  totalSpend: '$1,150',
  avgMatchScore: 82,
  pendingDeals: 2,
  completedDeals: 1,
}

// ─── Compliance Items ─────────────────────────────────────────────────────────
export const DEMO_COMPLIANCE = [
  { id: 'c1', athlete: 'Ava Thompson', type: 'Contract Review', status: 'pass', date: '2024-03-12', notes: 'All terms compliant with NCAA guidelines' },
  { id: 'c2', athlete: 'Sofia Reyes', type: 'Disclosure Filing', status: 'warning', date: '2024-03-10', notes: 'Missing social media disclosure tags' },
  { id: 'c3', athlete: 'Marcus Reid', type: 'Brand Review', status: 'pass', date: '2024-03-08', notes: 'Brand category pre-approved' },
  { id: 'c4', athlete: 'James Carter', type: 'Contract Review', status: 'todo', date: null, notes: 'Pending first deal submission' },
  { id: 'c5', athlete: 'Tyler Brooks', type: 'Earnings Report', status: 'pass', date: '2024-03-01', notes: 'Q1 report filed on time' },
]

// ─── Activity Feed ────────────────────────────────────────────────────────────
export const DEMO_ACTIVITY = [
  { id: 'act1', type: 'deal', text: 'New deal activated with Fresh Roots Cafe', time: '2h ago', icon: 'handshake' },
  { id: 'act2', type: 'match', text: 'You matched with Lume Activewear (88% fit)', time: '1d ago', icon: 'sparkles' },
  { id: 'act3', type: 'compliance', text: 'Contract review completed — all clear', time: '2d ago', icon: 'shield' },
  { id: 'act4', type: 'payment', text: 'Payment of $400 received from Fresh Roots', time: '5d ago', icon: 'dollar' },
]
