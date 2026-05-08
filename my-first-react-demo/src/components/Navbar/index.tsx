import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/auth'
import './Navbar.css'

type NavItem = {
  label: string
  path: string
  icon: string
}

const navItems: NavItem[] = [
  { label: '\u9996\u9875', path: '/home', icon: '\ud83c\udfe0' },
  { label: '\u5173\u4e8e', path: '/about', icon: '\u2139\ufe0f' },
  { label: '\u8054\u7cfb', path: '/contact', icon: '\ud83d\udce7' },
  { label: 'testDemo', path: '/testDemo', icon: '\ud83d\udce0' },
]

const Navbar = () => {
  const navigate = useNavigate()
  const userInfo = useAuthStore((state) => state.userInfo)
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = () => {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label={'\u4e3b\u5bfc\u822a'}>
        <NavLink className="site-brand" to="/home" aria-label={'\u8fd4\u56de\u9996\u9875'}>
          <span className="site-brand__mark">R</span>
          <span>
            <strong>Router Lab</strong>
            <small>React + TypeScript</small>
          </span>
        </NavLink>

        <div className="site-nav__links">
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) => `site-nav__link${isActive ? ' site-nav__link--active' : ''}`}
              end={item.path === '/'}
              key={item.path}
              to={item.path}
            >
              <span aria-hidden="true">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="site-nav__actions">
          <span className="site-user-chip">
            {userInfo?.user || '\u7528\u6237'}
          </span>
          <button className="site-logout-button" onClick={handleLogout} type="button">
            {'\u9000\u51fa\u767b\u5f55'}
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
