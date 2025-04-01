import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landingpage from './screens/Landingpage/LandingPage'
import GetStarted from './screens/GetStarted/GetStarted'
import Login from './screens/Login/Login'
import Signup from './screens/Signup/Signup'
import RoleSelect from './screens/RoleSelect/RoleSelect'
import StudentDashboard from './screens/Dashboard/Student/StudentDashboard'
import TeacherDashboard from './screens/Dashboard/Teacher/TeacherDashboard'
import './index.css'

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/get-started" replace />} />
        <Route path="/landing" element={<Landingpage />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/role-select" element={<RoleSelect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/dashboard/student" element={<StudentDashboard />} />
        <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
        <Route path="/dashboard/class/:classId" element={<StudentDashboard />} />
      </Routes>
    </HashRouter>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)


