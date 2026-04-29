import '../pages.css'
import './About.css'

type TechItem = {
  name: string
  description: string
  icon: string
}

type WorkflowItem = {
  title: string
  description: string
}

const techStack: TechItem[] = [
  {
    name: 'React 19',
    description: '负责组件化界面与状态驱动渲染',
    icon: '⚛️',
  },
  {
    name: 'React Router 6',
    description: '管理页面路由、导航与地址同步',
    icon: '🧭',
  },
  {
    name: 'Vite',
    description: '提供极速开发服务和高效构建体验',
    icon: '⚡',
  },
  {
    name: 'TypeScript',
    description: '为组件数据、事件和状态增加类型约束',
    icon: '🔷',
  },
]

const workflow: WorkflowItem[] = [
  {
    title: '配置路由入口',
    description: '在 App 中通过 Routes 与 Route 定义页面路径和组件映射。',
  },
  {
    title: '创建页面组件',
    description: '每个页面负责自己的内容结构，保持组件职责清晰。',
  },
  {
    title: '增强类型安全',
    description: '使用 TS 类型描述列表数据，减少字段拼写和结构错误。',
  },
]

const highlights: string[] = [
  '清晰展示 React Router 的基础用法',
  '保持页面结构语义化，便于继续扩展',
  '通过 TypeScript 约束页面数据结构',
]

const About = () => {
  return (
    <main className="page-shell">
      <section className="page-hero" aria-labelledby="about-title">
        <div className="page-hero__content">
          <span className="page-kicker">React Router Demo</span>
          <h1 id="about-title">关于这个示例项目</h1>
          <p>
            这是一个使用 React Router 6 构建的单页应用示例，用简洁的页面切换、清晰的导航状态和现代化组件结构，帮助你快速理解前端路由的基本工作方式。
          </p>
        </div>

        <div className="page-hero__panel" aria-label="项目目标">
          <strong>项目目标</strong>
          <span>展示如何在 React 应用中配置和使用路由，并逐步迁移到 TypeScript 写法。</span>
        </div>
      </section>

      <section className="page-section" aria-labelledby="stack-title">
        <div className="section-header">
          <div>
            <span className="section-kicker">Tech Stack</span>
            <h2 id="stack-title">技术栈</h2>
          </div>
        </div>

        <div className="card-grid card-grid--four">
          {techStack.map((tech) => (
            <article className="info-card" key={tech.name}>
              <span className="info-card__icon" aria-hidden="true">
                {tech.icon}
              </span>
              <div>
                <h3>{tech.name}</h3>
                <p>{tech.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section" aria-labelledby="workflow-title">
        <div className="section-header">
          <div>
            <span className="section-kicker">Workflow</span>
            <h2 id="workflow-title">项目组织方式</h2>
          </div>
        </div>

        <div className="card-grid">
          {workflow.map((item, index) => (
            <article className="workflow-card" key={item.title}>
              <span className="workflow-card__step">{index + 1}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section dark-section" aria-labelledby="value-title">
        <div>
          <span className="section-kicker">Why it matters</span>
          <h2 id="value-title">你可以从这里学到什么？</h2>
        </div>

        <ul className="feature-list">
          {highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default About


