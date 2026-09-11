import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LayoutDashboard, Users, Package, FileText, Settings, Image, LogOut, ChevronDown } from 'lucide-react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isBannersOpen, setIsBannersOpen] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Customer', path: '/admin/customers', icon: <Users size={20} /> },
    { name: 'Orders', path: '/admin/orders', icon: <Package size={20} /> },
    { name: 'Categories', path: '/admin/categories', icon: <Package size={20} /> },
    { name: 'Products', path: '/admin/products', icon: <Package size={20} /> },
    { name: 'Blogs', path: '/admin/blogs', icon: <FileText size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f4f6f8' }}>
      
      {/* Sidebar */}
      <aside style={{ width: '260px', background: 'var(--purple-bg)', color: 'white', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1.5rem', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--gold-text)' }}>Admin Panel</h2>
        </div>
        
        <nav style={{ flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              style={{ 
                display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', 
                color: location.pathname === item.path ? 'var(--gold-text)' : '#cbd5e1', 
                textDecoration: 'none', borderRadius: 'var(--radius-sm)',
                background: location.pathname === item.path ? 'rgba(255,255,255,0.1)' : 'transparent',
                fontWeight: 600
              }}
            >
              {item.icon} {item.name}
            </Link>
          ))}

          {/* Banners Dropdown */}
          <div>
            <div 
              onClick={() => setIsBannersOpen(!isBannersOpen)}
              style={{ 
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', 
                color: '#cbd5e1', cursor: 'pointer', borderRadius: 'var(--radius-sm)', fontWeight: 600
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Image size={20} /> Banners
              </div>
              <ChevronDown size={16} style={{ transform: isBannersOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
            </div>
            
            {isBannersOpen && (
              <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '2.5rem', marginTop: '0.25rem', gap: '0.25rem' }}>
                <Link to="/admin/banners/home" style={{ color: '#94a3b8', textDecoration: 'none', padding: '0.5rem', fontSize: '0.875rem' }}>- Home</Link>
                <Link to="/admin/banners/shop" style={{ color: '#94a3b8', textDecoration: 'none', padding: '0.5rem', fontSize: '0.875rem' }}>- Shop</Link>
                <Link to="/admin/banners/offer" style={{ color: '#94a3b8', textDecoration: 'none', padding: '0.5rem', fontSize: '0.875rem' }}>- Offer</Link>
              </div>
            )}
          </div>
        </nav>

        <div style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button onClick={handleLogout} style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ background: 'white', padding: '1.25rem 2rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>Welcome, Admin</div>
        </header>
        <div style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
          <Outlet />
        </div>
      </main>
      
    </div>
  );
}
