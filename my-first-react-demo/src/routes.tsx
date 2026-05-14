import { lazy } from 'react'
import type { ComponentType, LazyExoticComponent } from 'react'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Login from './pages/login'

const MUIDemo = lazy(() => import('./pages/muiDemo'))
const TestDemo = lazy(() => import('./pages/testDemo'))
const VideoDemo = lazy(() => import('./pages/videoDemo'))

type RouteComponent = ComponentType | LazyExoticComponent<ComponentType>

export type AppRouteConfig = {
  access: 'guest-only' | 'protected'
  component: RouteComponent
  hideInNav?: boolean
  icon?: string
  label?: string
  path: string
}

export const appRoutes: AppRouteConfig[] = [
  {
    access: 'guest-only',
    component: Login,
    hideInNav: true,
    path: '/',
  },
  {
    access: 'protected',
    component: Home,
    icon: 'home',
    label: '首页',
    path: '/home',
  },
  {
    access: 'protected',
    component: About,
    icon: 'about',
    label: '关于',
    path: '/about',
  },
  {
    access: 'protected',
    component: Contact,
    icon: 'contact',
    label: '联系',
    path: '/contact',
  },
  {
    access: 'protected',
    component: MUIDemo,
    icon: 'mui',
    label: 'MUI Demo',
    path: '/mui-demo',
  },
  {
    access: 'protected',
    component: TestDemo,
    icon: 'starter',
    label: 'Starter Demo',
    path: '/testDemo',
  },
  {
    access: 'protected',
    component: VideoDemo,
    icon: 'video',
    label: 'Video Demo',
    path: '/videoDemo',
  },
]
