import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext.jsx'
import { getAthleteProfile, getDirectorProfile, getBusinessProfile } from '../lib/api/index.js'

const ProfileContext = createContext(null)

export function ProfileProvider({ children }) {
  const { user, persona } = useAuth()
  const [profile, setProfile] = useState(null)
  const [profileLoading, setProfileLoading] = useState(false)

  useEffect(() => {
    if (!user || !persona) { setProfile(null); return }

    setProfileLoading(true)
    const fetchers = {
      athlete: () => getAthleteProfile(user.id),
      director: () => getDirectorProfile(user.id),
      business: () => getBusinessProfile(user.id),
    }
    const fetch = fetchers[persona]
    if (!fetch) { setProfileLoading(false); return }

    fetch().then(data => { setProfile(data); setProfileLoading(false) })
  }, [user, persona])

  return (
    <ProfileContext.Provider value={{ profile, setProfile, profileLoading }}>
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfile = () => useContext(ProfileContext)
