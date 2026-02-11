import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from './MenuIcon';
const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{ 
      backgroundColor: '#6366f1', 
      padding: '15px 20px', 
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      marginBottom: '30px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '20px' }}>
        <Link 
          to="/" 
          style={{ 
            color: isActive('/') ? '#ffffff' : '#e0e7ff',
            textDecoration: 'none',
            fontSize: '18px',
            fontWeight: isActive('/') ? 'bold' : 'normal',
            padding: '8px 16px',
            borderRadius: '4px',
            backgroundColor: isActive('/') ? 'rgba(255,255,255,0.2)' : 'transparent'
          }}
        >
          首页
        </Link>
        <Link 
          to="/about" 
          style={{ 
            color: isActive('/about') ? '#ffffff' : '#e0e7ff',
            textDecoration: 'none',
            fontSize: '18px',
            fontWeight: isActive('/about') ? 'bold' : 'normal',
            padding: '8px 16px',
            borderRadius: '4px',
            backgroundColor: isActive('/about') ? 'rgba(255,255,255,0.2)' : 'transparent'
          }}
        >
          关于
        </Link>
        <Link 
          to="/contact" 
          style={{ 
            color: isActive('/contact') ? '#ffffff' : '#e0e7ff',
            textDecoration: 'none',
            fontSize: '18px',
            fontWeight: isActive('/contact') ? 'bold' : 'normal',
            padding: '8px 16px',
            borderRadius: '4px',
            backgroundColor: isActive('/contact') ? 'rgba(255,255,255,0.2)' : 'transparent'
          }}
        >
          联系
        </Link>
        <MenuIcon />
      </div>
    </nav>
  );
};

export default Navbar;