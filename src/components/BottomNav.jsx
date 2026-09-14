import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Grid, ShoppingCart, MessageCircle, User } from 'lucide-react';
import { useCart } from '../App';

const BottomNav = () => {
  const location = useLocation();
  const { totalItems } = useCart();
  
  const navItems = [
    { path: '/home', icon: <Home size={24} />, label: 'Home' },
    { path: '/categories', icon: <Grid size={24} />, label: 'Categories' },
    { path: '/cart', icon: <ShoppingCart size={24} />, label: 'Cart', badge: totalItems > 0 ? totalItems : null },
    { path: 'whatsapp', icon: <MessageCircle size={24} />, label: 'WhatsApp', isExternal: true }
  ];

  const handleWhatsApp = (e) => {
    e.preventDefault();
    window.open(`https://wa.me/916380116372?text=Hello`, '_blank');
  };

  return (
    <>
      {/* Spacer to prevent content from hiding behind the fixed nav */}
      <div className="mobile-nav-spacer" style={{ height: '70px', display: 'none' }}></div>
      
      <div className="mobile-bottom-nav" style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'white',
        boxShadow: '0 -4px 15px rgba(0,0,0,0.05)',
        display: 'none',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '0.5rem 0',
        paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom))',
        zIndex: 1000,
        borderTop: '1px solid var(--border-color)'
      }}>
        <style>
          {`
            @media (max-width: 768px) {
              .mobile-bottom-nav { display: flex !important; }
              .mobile-nav-spacer { display: block !important; }
              /* Hide the desktop whatsapp fab on mobile if we have it in bottom nav */
              .whatsapp-fab { display: none !important; }
            }
          `}
        </style>
        
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          
          if (item.isExternal) {
            return (
              <a 
                key={index}
                href="#"
                onClick={handleWhatsApp}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  color: '#22c55e',
                  textDecoration: 'none',
                  flex: 1
                }}
              >
                <div style={{ position: 'relative' }}>
                  {item.icon}
                </div>
                <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>{item.label}</span>
              </a>
            );
          }
          
          return (
            <Link 
              key={index}
              to={item.path}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                color: isActive ? 'var(--primary-color)' : 'var(--text-muted)',
                textDecoration: 'none',
                flex: 1,
                transition: 'all 0.2s'
              }}
            >
              <div style={{ 
                position: 'relative',
                transform: isActive ? 'translateY(-2px)' : 'none'
              }}>
                {item.icon}
                {item.badge && (
                  <span style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-8px',
                    background: 'var(--primary-color)',
                    color: 'white',
                    fontSize: '0.65rem',
                    fontWeight: 'bold',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {item.badge}
                  </span>
                )}
              </div>
              <span style={{ 
                fontSize: '0.7rem', 
                fontWeight: isActive ? 700 : 500 
              }}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default BottomNav;
