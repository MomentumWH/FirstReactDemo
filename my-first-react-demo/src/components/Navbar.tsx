import { NavLink } from 'react-router-dom'
import './Navbar.css'

type NavItem = {
  label: string
  path: string
  icon: string
}

const navItems: NavItem[] = [
  { label: '登录', path: '/', icon: '🔐' },
  { label: '首页', path: '/home', icon: '🏠' },
  { label: '关于', path: '/about', icon: '✨' },
  { label: '联系', path: '/contact', icon: '📮' },
]

const Navbar = () => {
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="主导航">
        <NavLink className="site-brand" to="/" aria-label="返回首页">
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
      </nav>
    </header>
  )
}

export default Navbar
