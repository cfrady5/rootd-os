import { createContext, useContext, useState, useEffect } from 'react'
import { supabase, isDemoMode } from '../lib/supabaseClient.js'
import { getPersonaPortalPath } from '../lib/personaRoutes.js'

const DEMO_USER = {
  id: 'demo',
  email: 'demo@rootd.app',
  persona: 'athlete',
  onboardingComplete: true,
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [persona, setPersona] = useState(null)
  const [onboardingComplete, setOnboardingComplete] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isDemoMode) {
      setUser(DEMO_USER)
      setPersona(DEMO_USER.persona)
      setOnboardingComplete(true)
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const meta = session.user.user_metadata ?? {}
        setUser(session.user)
        setPersona(meta.persona ?? null)
        setOnboardingComplete(Boolean(meta.onboarding_completed))
      }
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const meta = session.user.user_metadata ?? {}
        setUser(session.user)
        setPersona(meta.persona ?? null)
        setOnboardingComplete(Boolean(meta.onboarding_completed))
      } else {
        setUser(null)
        setPersona(null)
        setOnboardingComplete(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function login(email, password) {
    if (isDemoMode) {
      setUser(DEMO_USER)
      setPersona(DEMO_USER.persona)
      setOnboardingComplete(true)
      return { error: null }
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    return { data, error }
  }

  async function logout() {
    if (isDemoMode) {
      setUser(null); setPersona(null); setOnboardingComplete(false)
      return
    }
    await supabase.auth.signOut()
    setUser(null); setPersona(null); setOnboardingComplete(false)
  }

  async function completeOnboarding(selectedPersona) {
    setPersona(selectedPersona)
    setOnboardingComplete(true)
    if (!isDemoMode && supabase) {
      await supabase.auth.updateUser({
        data: { persona: selectedPersona, onboarding_completed: true }
      })
    }
    return getPersonaPortalPath(selectedPersona)
  }

  const value = {
    user, persona, onboardingComplete, loading, isDemoMode,
    login, logout, completeOnboarding, setPersona,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
