import '../pages.css'
import './Home.css'

type Feature = {
  icon: string
  title: string
  description: string
}

type Metric = {
  value: string
  label: string
}

const features: Feature[] = [
  {
    icon: '🧭',
    title: '路由导航',
    description: '使用 React Router 6 管理页面切换，并保持地址栏与视图状态同步。',
  },
  {
    icon: '🎨',
    title: '现代界面',
    description: '统一卡片、留白、渐变与响应式布局，让示例项目更接近真实应用。',
  },
  {
    icon: '🧩',
    title: '组件拆分',
    description: '将导航、页面内容和样式拆开维护，后续扩展页面更加轻松。',
  },
]

const metrics: Metric[] = [
  { value: '3', label: '核心页面' },
  { value: 'TS', label: '类型安全写法' },
  { value: 'Vite', label: '快速开发体验' },
]

const Home = () => {
  return (
    <main className="page-shell">
      <section className="page-hero" aria-labelledby="home-title">
        <div className="page-hero__content">
          <span className="page-kicker">Welcome</span>
          <h1 id="home-title">构建一个更清爽的 React 路由示例</h1>
          <p>
            这个项目展示了 React、React Router 与 TypeScript 的基础组合方式。你可以从这里继续扩展页面、组件、表单和接口请求。
          </p>

          <div className="metric-strip" aria-label="项目概览数据">
            {metrics.map((metric) => (
              <div className="metric-card" key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="page-hero__visual home-orbit" aria-hidden="true">
          <div className="home-orbit__ring">
            <span className="home-orbit__core">⚛️</span>
            <span className="home-orbit__node">TS</span>
            <span className="home-orbit__node">⚡</span>
            <span className="home-orbit__node">🧭</span>
          </div>
        </div>
      </section>

      <section className="page-section" aria-labelledby="feature-title">
        <div className="section-header">
          <div>
            <span className="section-kicker">Features</span>
            <h2 id="feature-title">功能亮点</h2>
          </div>
        </div>

        <div className="card-grid">
          {features.map((feature) => (
            <article className="info-card" key={feature.title}>
              <span className="info-card__icon" aria-hidden="true">
                {feature.icon}
              </span>
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Home


