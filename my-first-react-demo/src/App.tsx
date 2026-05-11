import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar/index'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Login from './pages/login'
import MUIDemo from './pages/muiDemo'
import TestDemo from "./pages/testDemo";
import VideoDemo from './pages/videoDemo'
import { useAuthStore } from './stores/auth'
import './App.css'

type AnimatedRoutesProps = {
  isAuthenticated: boolean
}

const AnimatedRoutes = ({ isAuthenticated }: AnimatedRoutesProps) => {
  const location = useLocation()

  return (
    <div className="route-transition" key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={isAuthenticated ? <Navigate replace to="/home" /> : <Login />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate replace to="/" />} />
        <Route path="/about" element={isAuthenticated ? <About /> : <Navigate replace to="/" />} />
        <Route path="/contact" element={isAuthenticated ? <Contact /> : <Navigate replace to="/" />} />
        <Route path="/mui-demo" element={isAuthenticated ? <MUIDemo /> : <Navigate replace to="/" />} />
        <Route path="/testDemo" element={isAuthenticated ? <TestDemo /> : <Navigate replace to="/" />} />
        <Route path="/videoDemo" element={isAuthenticated ? <VideoDemo /> : <Navigate replace to="/" />} />
      </Routes>
    </div>
  )
}

const AppShell = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const location = useLocation()
  const shouldShowNavbar = isAuthenticated && location.pathname !== '/'

  return (
    <div className="app-shell">
      {shouldShowNavbar ? <Navbar /> : null}
      <div className="app-shell__content">
        <AnimatedRoutes isAuthenticated={isAuthenticated} />
      </div>
    </div>
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
