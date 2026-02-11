import React from 'react';

const Home = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#6366f1' }}>🏠 首页</h1>
      <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
        欢迎来到React路由示例项目!!!!
      </p>
      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f0f9ff', borderRadius: '8px' ,color:'#6366f1'}}>
        <h3>功能特性</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ margin: '10px 0', padding: '10px', backgroundColor: '#e0f2fe', borderRadius: '4px' ,color:'#6366f1'}}>
            📦 使用 React Router 6 实现路由管理
          </li>
          <li style={{ margin: '10px 0', padding: '10px', backgroundColor: '#e0f2fe', borderRadius: '4px' ,color:'#6366f1'}}>
            🎨 现代化的页面设计
          </li>
          <li style={{ margin: '10px 0', padding: '10px', backgroundColor: '#e0f2fe', borderRadius: '4px' ,color:'#6366f1'}}>
            🔗 导航栏支持页面切换
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;