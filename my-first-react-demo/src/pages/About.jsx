import React from 'react';

const About = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#6366f1' }}>ℹ️ 关于我们</h1>
      <div style={{ fontSize: '18px', lineHeight: '1.8' }}>
        <p>
          这是一个使用 React Router 6 构建的单页应用示例。
        </p>
        <h3 style={{ color: '#374151', marginTop: '30px' }}>技术栈</h3>
        <ul style={{ listStyle: 'disc', paddingLeft: '20px' }}>
          <li>React 19 - 用户界面库</li>
          <li>React Router 6 - 路由管理</li>
          <li>Vite - 构建工具</li>
          <li>JavaScript - 编程语言</li>
        </ul>
        <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f0f9ff', borderRadius: '8px' }}>
          <p style={{ fontWeight: 'bold' }}>
            项目目标：展示如何在 React 应用中配置和使用路由
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;