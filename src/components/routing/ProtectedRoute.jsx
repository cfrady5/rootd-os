import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { LoadingSpinner } from '../shared/UI.jsx'

export function ProtectedRoute({ children }) {
  const { user, onboardingComplete, loading } = useAuth()
  if (loading) return <LoadingSpinner />
  if (!user) return <Navigate to="/signin" replace />
  if (!onboardingComplete) return <Navigate to="/onboarding" replace />
  return children
}
