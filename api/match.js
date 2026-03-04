/**
 * Rootd Match Engine — Vercel Serverless Function
 * POST /api/match
 * Body: { answers: Record<string,any>, location: string }
 * Returns: { matches: MatchResult[], coords: {lat,lng} }
 */

const GOOGLE_KEY = process.env.GOOGLE_PLACES_API_KEY
const OPENAI_KEY = process.env.OPENAI_API_KEY

// ── Business type → interest dimension mapping ───────────────────────────────
const TYPE_DIMS = {
  restaurant: 'food', meal_delivery: 'food', meal_takeaway: 'food',
  bakery: 'food', bar: 'food', food: 'food',
  cafe: 'food', coffee_shop: 'food',
  gym: 'fitness', fitness_center: 'fitness',
  health: 'health', pharmacy: 'health', doctor: 'health',
  spa: 'wellness', hair_care: 'wellness', beauty_salon: 'wellness',
  clothing_store: 'fashion', shoe_store: 'fashion',
  jewelry_store: 'fashion', department_store: 'fashion',
  shopping_mall: 'retail', store: 'retail', book_store: 'retail',
  night_club: 'entertainment', movie_theater: 'entertainment',
}

// ── Extract interest profile from quiz answers ───────────────────────────────
function extractProfile(answers) {
  const likert = (id) => {
    const v = answers[id]
    return v !== undefined ? (Number(v) / 4) * 100 : 50
  }

  const professionalism = avg([likert('q1'), likert('q2'), likert('q3'), likert('q4')])
  const contentQuality  = avg([likert('q5'), likert('q6'), likert('q7')])
  const localInfluence  = avg([likert('q9'), likert('q10'), likert('q11')])
  const foodInterest    = avg([likert('q13'), likert('q14'), likert('q15')])
  const lifestyleInt    = avg([likert('q17'), likert('q18'), likert('q19')])

  const foodBonus    = ((answers.q16 || []).filter(x => x !== 'None').length) * 12
  const fashionBonus = ((answers.q20 || []).filter(x => ['Fashion', 'Athleisure/Sports'].includes(x))).length * 20
  const beautyBonus  = ((answers.q20 || []).filter(x => x === 'Beauty/Skincare')).length * 30
  const eventBonus   = ((answers.q21 || []).filter(x => x === 'Event appearances')).length * 20

  return {
    professionalism,
    contentQuality,
    localInfluence,
    food:        cap(foodInterest + foodBonus),
    fitness:     cap(lifestyleInt + 10),
    wellness:    cap(lifestyleInt + beautyBonus),
    health:      cap(lifestyleInt),
    fashion:     cap(lifestyleInt + fashionBonus),
    retail:      cap(lifestyleInt),
    entertainment: cap(avg([likert('q24')]) + eventBonus),
    rootdScore: Math.round(avg([professionalism, contentQuality, localInfluence, foodInterest, lifestyleInt])),
  }
}

// ── Determine which Google Places types to search ────────────────────────────
function searchTypes(profile) {
  const order = [
    { dim: 'food',          type: 'restaurant' },
    { dim: 'food',          type: 'cafe' },
    { dim: 'fitness',       type: 'gym' },
    { dim: 'fashion',       type: 'clothing_store' },
    { dim: 'wellness',      type: 'beauty_salon' },
    { dim: 'wellness',      type: 'spa' },
    { dim: 'health',        type: 'pharmacy' },
    { dim: 'retail',        type: 'store' },
    { dim: 'entertainment', type: 'night_club' },
  ]
  return order
    .sort((a, b) => (profile[b.dim] ?? 0) - (profile[a.dim] ?? 0))
    .slice(0, 5)
    .map(x => x.type)
}

// ── Score a business against the athlete profile ─────────────────────────────
function scoreBusiness(biz, profile) {
  const types = biz.types || []
  let dimTotal = 0, dimCount = 0

  for (const t of types) {
    const dim = TYPE_DIMS[t]
    if (dim && profile[dim] !== undefined) {
      dimTotal += profile[dim]
      dimCount++
    }
  }

  const dimScore   = dimCount > 0 ? dimTotal / dimCount : 50
  const localBonus = profile.localInfluence * 0.15
  const qualBonus  = profile.contentQuality * 0.10
  const proBonus   = profile.professionalism * 0.10

  // Rating bonus (Google rating 1-5 → small bonus)
  const ratingBonus = biz.rating ? (biz.rating - 3) * 3 : 0

  const raw = dimScore * 0.65 + localBonus + qualBonus + proBonus + ratingBonus
  // Clamp to 45–97 with minor jitter for realism
  return Math.round(Math.min(97, Math.max(45, raw + (Math.random() * 6 - 3))))
}

// ── Generate match reasons via OpenAI ────────────────────────────────────────
async function generateReasons(businesses, profile, answers) {
  if (!OPENAI_KEY || businesses.length === 0) {
    return businesses.map(b => ({ ...b, matchReason: defaultReason(b) }))
  }

  const athleteProfile = {
    rootdScore:     profile.rootdScore,
    topInterests:   topInterestLabels(profile),
    postingFreq:    answers.q8  || 'Regular',
    audience:       answers.q12 || 'Local',
    activations:    (answers.q21 || []).join(', ') || 'Social posts',
    values:         (answers.q25 || []).join(', ') || 'Community',
  }

  const bizList = businesses.slice(0, 12).map((b, i) =>
    `${i + 1}. ${b.name} (${b.types?.slice(0, 2).join(', ') || 'local business'}) – Google rating: ${b.rating ?? 'N/A'}`
  ).join('\n')

  try {
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.7,
        max_tokens: 800,
        messages: [
          {
            role: 'system',
            content: 'You are Rootd, an NIL matching platform. Write a single short sentence (max 18 words) explaining why each local business is a good NIL match for this college athlete. Be specific and enthusiastic. Return JSON array of strings, one per business.',
          },
          {
            role: 'user',
            content: `Athlete profile: RootdScore ${athleteProfile.rootdScore}, interests: ${athleteProfile.topInterests}, posts ${athleteProfile.postingFreq}, ${athleteProfile.audience} audience, values: ${athleteProfile.values}.\n\nBusinesses:\n${bizList}\n\nReturn a JSON array of ${Math.min(businesses.length, 12)} reason strings.`,
          },
        ],
      }),
    })

    const data = await r.json()
    const text = data.choices?.[0]?.message?.content?.trim() || '[]'
    // Strip markdown code fences if present
    const clean = text.replace(/```json\n?|\n?```/g, '').trim()
    const reasons = JSON.parse(clean)

    return businesses.map((b, i) => ({
      ...b,
      matchReason: reasons[i] || defaultReason(b),
    }))
  } catch {
    return businesses.map(b => ({ ...b, matchReason: defaultReason(b) }))
  }
}

function defaultReason(biz) {
  const type = (biz.types || [])[0] || 'business'
  const map = {
    restaurant: 'Great local brand alignment for food-forward content partnerships.',
    cafe: 'Perfect for authentic lifestyle content and community engagement.',
    gym: 'Strong fit for athlete-authentic fitness and wellness campaigns.',
    clothing_store: 'Ideal for fashion and lifestyle brand ambassador opportunities.',
    beauty_salon: 'Excellent match for beauty and wellness sponsored content.',
    store: 'Solid local retail partner for community-focused promotions.',
  }
  return map[type] || 'Strong local presence and authentic community connection.'
}

function topInterestLabels(profile) {
  return Object.entries(profile)
    .filter(([k]) => ['food', 'fitness', 'wellness', 'fashion', 'retail', 'entertainment'].includes(k))
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([k]) => k)
    .join(', ')
}

// ── Utility ───────────────────────────────────────────────────────────────────
const avg = arr => arr.reduce((s, v) => s + v, 0) / arr.length
const cap = v => Math.min(100, Math.max(0, v))

// ── Main handler ─────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { answers = {}, location = '' } = req.body || {}

  if (!location) return res.status(400).json({ error: 'Location required' })

  // ── Geocode ──────────────────────────────────────────────────────────────
  let lat, lng, formattedLocation
  try {
    const geo = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${GOOGLE_KEY}`
    )
    const geoData = await geo.json()
    if (!geoData.results?.length) throw new Error('No geocode results')
    lat = geoData.results[0].geometry.location.lat
    lng = geoData.results[0].geometry.location.lng
    formattedLocation = geoData.results[0].formatted_address
  } catch {
    return res.status(400).json({ error: 'Could not find that location. Try a city name like "West Lafayette, IN".' })
  }

  // ── Extract profile & determine search types ─────────────────────────────
  const profile = extractProfile(answers)
  const types = searchTypes(profile)

  // ── Fetch businesses from Google Places ──────────────────────────────────
  const allPlaces = []
  const seen = new Set()

  await Promise.all(types.map(async (type) => {
    try {
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=25000&type=${type}&key=${GOOGLE_KEY}`
      const r = await fetch(url)
      const d = await r.json()
      for (const place of (d.results || [])) {
        if (!seen.has(place.place_id)) {
          seen.add(place.place_id)
          allPlaces.push({
            id: place.place_id,
            name: place.name,
            category: formatCategory(place.types),
            address: place.vicinity,
            rating: place.rating,
            reviewCount: place.user_ratings_total,
            types: place.types,
            photo: place.photos?.[0]?.photo_reference
              ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${place.photos[0].photo_reference}&key=${GOOGLE_KEY}`
              : null,
            location: place.geometry?.location,
            googleMapsUrl: `https://www.google.com/maps/place/?q=place_id:${place.place_id}`,
          })
        }
      }
    } catch { /* skip failed type */ }
  }))

  // Filter out types unlikely to do NIL deals
  const filtered = allPlaces.filter(p =>
    !p.types?.some(t => ['hospital', 'police', 'school', 'church', 'embassy', 'government'].includes(t))
  )

  // ── Score & rank ──────────────────────────────────────────────────────────
  const scored = filtered
    .map(biz => ({ ...biz, score: scoreBusiness(biz, profile) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 20)

  // ── AI match reasons ──────────────────────────────────────────────────────
  const withReasons = await generateReasons(scored, profile, answers)

  return res.status(200).json({
    matches: withReasons,
    coords: { lat, lng },
    location: formattedLocation,
    profile,
  })
}

function formatCategory(types = []) {
  const labels = {
    restaurant: 'Restaurant', cafe: 'Café', gym: 'Gym & Fitness',
    clothing_store: 'Fashion', beauty_salon: 'Beauty', spa: 'Wellness',
    pharmacy: 'Health', store: 'Retail', food: 'Food & Drink',
    night_club: 'Entertainment', bar: 'Bar & Social', bakery: 'Bakery',
  }
  for (const t of types) if (labels[t]) return labels[t]
  return 'Local Business'
}
