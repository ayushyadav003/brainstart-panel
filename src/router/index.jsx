import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from '../pages/login/Login'
import LoginLayout from '../layouts/LoginLayout'
import TeacherLayout from '../layouts/TeacherLayout'
import Dashboard from '../pages/dashboard'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <LoginLayout>
              <Login />
            </LoginLayout>
          }
        />
        <Route
          path="/"
          element={
            <TeacherLayout>
              <Dashboard />
            </TeacherLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
