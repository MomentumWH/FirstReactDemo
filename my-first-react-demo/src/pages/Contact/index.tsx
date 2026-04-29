import '../pages.css'
import './Contact.css'

type ContactMethod = {
  icon: string
  title: string
  value: string
  href?: string
}

type ServicePromise = {
  title: string
  description: string
  icon: string
}

const contactMethods: ContactMethod[] = [
  {
    icon: '📧',
    title: '邮箱',
    value: 'contact@example.com',
    href: 'mailto:contact@example.com',
  },
  {
    icon: '📱',
    title: '电话',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
  {
    icon: '📍',
    title: '地址',
    value: '北京市朝阳区科技园区',
  },
]

const servicePromises: ServicePromise[] = [
  {
    icon: '⚡',
    title: '快速反馈',
    description: '收到消息后尽快确认需求，并给出清晰的下一步建议。',
  },
  {
    icon: '🧠',
    title: '聚焦问题',
    description: '优先理解你的真实目标，而不是只停留在表面修改。',
  },
  {
    icon: '🛠️',
    title: '持续优化',
    description: '根据使用反馈迭代页面结构、交互体验和代码质量。',
  },
]

const Contact = () => {
  return (
    <main className="page-shell">
      <section className="page-hero" aria-labelledby="contact-title">
        <div className="page-hero__content">
          <span className="page-kicker">Contact</span>
          <h1 id="contact-title">有问题或建议？欢迎联系</h1>
          <p>
            如果你正在学习 React Router、TypeScript 或 Vite，可以通过下面的方式联系我们。我们会尽量用清晰、可执行的方式给你反馈。
          </p>

          <div className="contact-actions">
            <a className="contact-action contact-action--primary" href="mailto:contact@example.com">
              📧 发送邮件
            </a>
            <a className="contact-action contact-action--secondary" href="tel:+15551234567">
              📱 拨打电话
            </a>
          </div>
        </div>

        <div className="page-hero__panel" aria-label="联系提示">
          <strong>建议附上</strong>
          <span>问题描述、期望效果、当前截图或报错信息，这样能更快定位问题。</span>
        </div>
      </section>

      <section className="page-section" aria-labelledby="contact-methods-title">
        <div className="section-header">
          <div>
            <span className="section-kicker">Reach us</span>
            <h2 id="contact-methods-title">联系方式</h2>
          </div>
        </div>

        <div className="card-grid">
          {contactMethods.map((method) => (
            <article className="info-card" key={method.title}>
              <span className="info-card__icon" aria-hidden="true">
                {method.icon}
              </span>
              <div>
                <h3>{method.title}</h3>
                <p>
                  {method.href ? <a href={method.href}>{method.value}</a> : method.value}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section" aria-labelledby="service-title">
        <div className="section-header">
          <div>
            <span className="section-kicker">Service</span>
            <h2 id="service-title">我们如何处理反馈</h2>
          </div>
        </div>

        <div className="card-grid">
          {servicePromises.map((service) => (
            <article className="info-card" key={service.title}>
              <span className="info-card__icon" aria-hidden="true">
                {service.icon}
              </span>
              <div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Contact


