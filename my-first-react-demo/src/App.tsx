import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Login from './pages/login'
import './App.css'

type AnimatedRoutesProps = {
  isAuthenticated: boolean
  onLogin: () => void
}

const AnimatedRoutes = ({ isAuthenticated, onLogin }: AnimatedRoutesProps) => {
  const location = useLocation()

  return (
    <div className="route-transition" key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={isAuthenticated ? <Navigate replace to="/home" /> : <Login onLogin={onLogin} />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate replace to="/" />} />
        <Route path="/about" element={isAuthenticated ? <About /> : <Navigate replace to="/" />} />
        <Route path="/contact" element={isAuthenticated ? <Contact /> : <Navigate replace to="/" />} />
      </Routes>
    </div>
  )
}

const AppShell = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const location = useLocation()
  const shouldShowNavbar = isAuthenticated && location.pathname !== '/'

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  return (
    <>
      {shouldShowNavbar ? <Navbar /> : null}
      <AnimatedRoutes isAuthenticated={isAuthenticated} onLogin={handleLogin} />
    </>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}

export default App
