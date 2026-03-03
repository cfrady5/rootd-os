import { supabase } from '../supabaseClient.js'
import {
  DEMO_ATHLETE, DEMO_MATCHES, DEMO_DEALS, DEMO_DIRECTOR,
  DEMO_ROSTER, DEMO_BUSINESS, DEMO_DIRECTOR_STATS, DEMO_BUSINESS_STATS,
  DEMO_COMPLIANCE, DEMO_ACTIVITY,
} from './mockData.js'

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms))

// ─── Auth ─────────────────────────────────────────────────────────────────────
export async function signIn(email, password) {
  if (!supabase) return { user: { id: 'demo', email }, error: null }
  return supabase.auth.signInWithPassword({ email, password })
}

export async function signUp(email, password) {
  if (!supabase) return { user: { id: 'demo', email }, error: null }
  return supabase.auth.signUp({ email, password })
}

export async function signOut() {
  if (!supabase) return
  return supabase.auth.signOut()
}

// ─── Athlete ──────────────────────────────────────────────────────────────────
export async function getAthleteProfile(userId) {
  if (!supabase) { await delay(); return DEMO_ATHLETE }
  const { data } = await supabase.from('athletes').select('*').eq('user_id', userId).single()
  return data
}

export async function getAthleteMatches(athleteId) {
  if (!supabase) { await delay(); return DEMO_MATCHES }
  const { data } = await supabase.from('matches').select('*').eq('athlete_id', athleteId)
  return data ?? []
}

export async function getAthleteActivity(athleteId) {
  if (!supabase) { await delay(); return DEMO_ACTIVITY }
  const { data } = await supabase.from('activity').select('*').eq('athlete_id', athleteId).order('created_at', { ascending: false }).limit(10)
  return data ?? []
}

// ─── Director ─────────────────────────────────────────────────────────────────
export async function getDirectorProfile(userId) {
  if (!supabase) { await delay(); return DEMO_DIRECTOR }
  const { data } = await supabase.from('directors').select('*').eq('user_id', userId).single()
  return data
}

export async function getRoster(institutionId) {
  if (!supabase) { await delay(); return DEMO_ROSTER }
  const { data } = await supabase.from('athletes').select('*').eq('institution_id', institutionId)
  return data ?? []
}

export async function getDirectorStats(institutionId) {
  if (!supabase) { await delay(); return DEMO_DIRECTOR_STATS }
  return DEMO_DIRECTOR_STATS
}

export async function getComplianceItems(institutionId) {
  if (!supabase) { await delay(); return DEMO_COMPLIANCE }
  const { data } = await supabase.from('compliance').select('*').eq('institution_id', institutionId)
  return data ?? []
}

// ─── Business ─────────────────────────────────────────────────────────────────
export async function getBusinessProfile(userId) {
  if (!supabase) { await delay(); return DEMO_BUSINESS }
  const { data } = await supabase.from('businesses').select('*').eq('user_id', userId).single()
  return data
}

export async function getBusinessMatches(businessId) {
  if (!supabase) { await delay(); return DEMO_MATCHES }
  const { data } = await supabase.from('matches').select('*').eq('business_id', businessId).order('score', { ascending: false })
  return data ?? []
}

export async function getDeals(entityId, role) {
  if (!supabase) { await delay(); return DEMO_DEALS }
  const field = role === 'business' ? 'business_id' : role === 'director' ? 'institution_id' : 'athlete_id'
  const { data } = await supabase.from('deals').select('*').eq(field, entityId)
  return data ?? []
}

export async function getBusinessStats(businessId) {
  if (!supabase) { await delay(); return DEMO_BUSINESS_STATS }
  return DEMO_BUSINESS_STATS
}
