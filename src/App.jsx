import { Routes, Route, Navigate } from 'react-router-dom'

// Layouts
import { AppShell } from './components/layout/AppShell.jsx'
import { ProtectedRoute } from './components/routing/ProtectedRoute.jsx'
import { DashboardShell } from './layouts/DashboardShell.jsx'
import { DirectorLayout } from './layouts/DirectorLayout.jsx'
import { AthleteLayout } from './layouts/AthleteLayout.jsx'

// Public Pages
import Home from './pages/public/Home.jsx'
import About from './pages/public/About.jsx'
import Demo from './pages/public/Demo.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import Onboarding from './pages/Onboarding.jsx'
import RootdQuiz from './pages/RootdQuiz.jsx'

// Athlete Pages
import AthleteOverview from './pages/athlete/AthleteOverview.jsx'
import AthleteMatches from './pages/athlete/AthleteMatches.jsx'
import AthleteEditProfile from './pages/athlete/AthleteEditProfile.jsx'

// Director Pages
import DirectorDashboard from './pages/director/DirectorDashboard.jsx'
import DirectorRoster from './pages/director/DirectorRoster.jsx'
import DirectorDeals from './pages/director/DirectorDeals.jsx'
import DirectorCompliance from './pages/director/DirectorCompliance.jsx'
import DirectorProfile from './pages/director/DirectorProfile.jsx'

// Business Dashboard Pages
import BusinessOverview from './pages/dashboard/Overview.jsx'
import BusinessMatches from './pages/dashboard/Matches.jsx'
import BusinessDeals from './pages/dashboard/Deals.jsx'
import BusinessCompliance from './pages/dashboard/Compliance.jsx'
import BusinessCockpit from './pages/dashboard/Cockpit.jsx'
import BusinessProfile from './pages/dashboard/Profile.jsx'

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route element={<AppShell />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="demo" element={<Demo />} />
      </Route>

      {/* Auth */}
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="quiz" element={<RootdQuiz />} />

      {/* Protected */}
      <Route path="onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />

      {/* Athlete Portal */}
      <Route path="athlete" element={<ProtectedRoute><AthleteLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<AthleteOverview />} />
        <Route path="matches" element={<AthleteMatches />} />
        <Route path="edit-profile" element={<AthleteEditProfile />} />
      </Route>

      {/* Director Portal */}
      <Route path="director" element={<ProtectedRoute><DirectorLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DirectorDashboard />} />
        <Route path="roster" element={<DirectorRoster />} />
        <Route path="deals" element={<DirectorDeals />} />
        <Route path="compliance" element={<DirectorCompliance />} />
        <Route path="profile" element={<DirectorProfile />} />
      </Route>

      {/* Business Portal */}
      <Route path="dashboard" element={<ProtectedRoute><DashboardShell /></ProtectedRoute>}>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<BusinessOverview />} />
        <Route path="matches" element={<BusinessMatches />} />
        <Route path="deals" element={<BusinessDeals />} />
        <Route path="compliance" element={<BusinessCompliance />} />
        <Route path="cockpit" element={<BusinessCockpit />} />
        <Route path="profile" element={<BusinessProfile />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
