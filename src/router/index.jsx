import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from '../pages/login/Login'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}
