import { Suspense, lazy } from 'react'
import type { ComponentType } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { appRoutes } from './routes'
import { useAuthStore } from './stores/auth'
import './App.css'

const Navbar = lazy(() => import('./components/Navbar/index'))

type RouteAccess = 'guest-only' | 'protected'

const renderRouteElement = (
  access: RouteAccess,
  isAuthenticated: boolean,
  RouteComponent: ComponentType,
) => {
  if (access === 'guest-only') {
    return isAuthenticated ? <Navigate replace to="/home" /> : <RouteComponent />
  }

  return isAuthenticated ? <RouteComponent /> : <Navigate replace to="/" />
}

const AnimatedRoutes = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const location = useLocation()

  return (
    <div className="route-transition" key={location.pathname}>
      <Suspense fallback={<div className="route-loading">Loading page...</div>}>
        <Routes location={location}>
          {appRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={renderRouteElement(route.access, isAuthenticated, route.component)}
            />
          ))}
          <Route path="*" element={<Navigate replace to={isAuthenticated ? '/home' : '/'} />} />
        </Routes>
      </Suspense>
    </div>
  )
}

const AppShell = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const location = useLocation()
  const shouldShowNavbar = isAuthenticated && location.pathname !== '/'

  return (
    <div className="app-shell">
      {shouldShowNavbar ? (
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
      ) : null}
      <div className="app-shell__content">
        <AnimatedRoutes />
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
