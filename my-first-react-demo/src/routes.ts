import { lazy } from 'react'
import type { ComponentType, LazyExoticComponent } from 'react'

const Login = lazy(() => import('./pages/login'))
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const MUIDemo = lazy(() => import('./pages/muiDemo'))
const TestDemo = lazy(() => import('./pages/testDemo'))
const VideoDemo = lazy(() => import('./pages/videoDemo'))
const StateComposeDemo = lazy(() => import('./pages/stateComposeDemo'))

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
    label: '棣栭〉',
    path: '/home',
  },
  {
    access: 'protected',
    component: About,
    icon: 'about',
    label: '鍏充簬',
    path: '/about',
  },
  {
    access: 'protected',
    component: Contact,
    icon: 'contact',
    label: '鑱旂郴',
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
  {
    access: 'protected',
    component: StateComposeDemo,
    icon: 'state',
    label: 'Compose Demo',
    path: '/stateComposeDemo',
  },
]
