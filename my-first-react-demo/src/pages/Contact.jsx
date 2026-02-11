import React from 'react';

const Contact = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#6366f1' }}>📞 联系我们</h1>
      <div style={{ fontSize: '18px', lineHeight: '1.8' }}>
        <p>
          如果您有任何问题或建议，请随时联系我们。
        </p>
        <div style={{ marginTop: '30px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 250px', padding: '20px', backgroundColor: '#f0f9ff', borderRadius: '8px' }}>
            <h3 style={{ color: '#374151' }}>📧 邮箱</h3>
            <p>contact@example.com</p>
          </div>
          <div style={{ flex: '1 1 250px', padding: '20px', backgroundColor: '#f0f9ff', borderRadius: '8px' }}>
            <h3 style={{ color: '#374151' }}>📱 电话</h3>
            <p>+1 (555) 123-4567</p>
          </div>
          <div style={{ flex: '1 1 250px', padding: '20px', backgroundColor: '#f0f9ff', borderRadius: '8px' }}>
            <h3 style={{ color: '#374151' }}>📍 地址</h3>
            <p>北京市朝阳区科技园区</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;