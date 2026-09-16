import { Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import logo from './assets/logo.png';
import priceListPdf from './assets/kaleswari crackers price lsit 2026.pdf FINAL.pdf';
import { Home as HomeIcon, Grid, Search, ShoppingCart, User, MessageCircle, ChevronDown, ShoppingBag, Download, LogOut, Heart } from 'lucide-react';
import { useState, createContext, useContext, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { useData } from './contexts/DataContext';
import { useAuth } from './contexts/AuthContext';
import IconRenderer from './components/IconRenderer';

// --- CONTEXT: Enquiry Cart ---
export const CartContext = createContext();
export const useCart = () => useContext(CartContext);

// --- CONTEXT: Quick View ---
export const QuickViewContext = createContext();
export const useQuickView = () => useContext(QuickViewContext);

export const CartProvider = ({ children }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem('app_wishlist') || '[]');
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    localStorage.setItem('app_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return removeFromCart(id);
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const totalValue = cart.reduce((acc, item) => acc + (item.referencePrice * item.quantity), 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const prevTotalRef = useRef(0);
  useEffect(() => {
    if (prevTotalRef.current < 2500 && totalValue >= 2500) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ea580c', '#dc2626', '#fef08a'],
        zIndex: 9999
      });
    }
    prevTotalRef.current = totalValue;
  }, [totalValue]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, totalValue, totalItems, isCartOpen, setIsCartOpen, wishlist, toggleWishlist }}>
      <QuickViewContext.Provider value={{ quickViewProduct, setQuickViewProduct }}>
        {children}
      </QuickViewContext.Provider>
    </CartContext.Provider>
  );
};

// --- COMPONENTS ---
const TopNotice = () => (
  <div style={{ background: 'var(--primary-color)', color: 'white', fontSize: '0.75rem', padding: '0.5rem', textAlign: 'center', fontWeight: 600 }}>
    As per the 2018 Supreme Court guidelines, online sale of firecrackers is not permitted - Sri Kalieswaari Crackers values its customers.
  </div>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { cart, totalItems, setIsCartOpen } = useContext(CartContext);
  const { categories, products } = useData();

  const searchResults = searchQuery.trim() === '' 
    ? [] 
    : products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5);

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="marquee-container">
        <div className="marquee-content">
          🔥 DIWALI MEGA SALE! FLAT 50% OFF WHOLESALE PRICES | FREE SHIPPING ON ORDERS OVER ₹10,000 | LIMITED TIME OFFER 🔥 &nbsp;&nbsp;&nbsp;&nbsp; 🔥 DIWALI MEGA SALE! FLAT 50% OFF WHOLESALE PRICES | FREE SHIPPING ON ORDERS OVER ₹10,000 | LIMITED TIME OFFER 🔥
        </div>
      </div>

      <header className="sticky-glass-header" style={{ padding: '1rem 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Left: Logo */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Sri Kalieswaari" style={{ height: '60px', objectFit: 'contain' }} />
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="desktop-nav">
          <Link to="/home" style={{ textDecoration: 'none', color: '#d32f2f', fontWeight: 700 }}>Home</Link>
          <Link to="/about" style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: 600 }}>About</Link>
          <Link to="/shop" style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: 600 }}>Shop</Link>
          
          {/* Mega Menu Trigger */}
          <div className="desktop-nav mega-menu-trigger" style={{ position: 'relative' }}>
            <div style={{ textDecoration: 'none', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600, cursor: 'pointer', padding: '0.5rem 0' }}>
              Categories <ChevronDown size={16} />
            </div>
            
            {/* Mega Menu Panel */}
            <div className="mega-menu">
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.5rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '0.5rem' }}>Shop by Category</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                  {categories.slice(0, 10).map(cat => (
                    <Link key={cat.id} to={`/shop`} className="mega-menu-item">
                      <div style={{ width: '40px', height: '40px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                        <IconRenderer name={cat.icon} size={20} color="var(--primary-color)" />
                      </div>
                      <span style={{ fontWeight: 600 }}>{cat.name}</span>
                    </Link>
                  ))}
                </div>
                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                  <Link to="/shop" style={{ color: 'var(--primary-color)', fontWeight: 700, textDecoration: 'none' }}>View All Categories &rarr;</Link>
                </div>
              </div>
              <div style={{ background: 'linear-gradient(135deg, #0b1641, #1e3a8a)', borderRadius: '12px', padding: '2rem', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ background: '#ffd700', color: '#0b1641', padding: '0.25rem 1rem', borderRadius: '20px', fontWeight: 800, fontSize: '0.75rem', marginBottom: '1rem' }}>DEAL OF THE DAY</div>
                <h4 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>Diamond Pack</h4>
                <p style={{ color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '1.5rem' }}>45 Unique Items • Save 40%</p>
                <Link to="/home#family-packs" className="btn" style={{ background: 'white', color: '#0b1641', width: '100%', padding: '0.75rem' }}>View Offer</Link>
              </div>
            </div>
          </div>

          <Link to="/contact" style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: 600 }}>Contact</Link>
        </nav>

        {/* Right: Search, Cart, WhatsApp & Mobile Toggle */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          
          {/* Live Search Box */}
          <div style={{ position: 'relative' }} className="desktop-nav">
            <div style={{ display: 'flex', alignItems: 'center', background: '#f8f9fa', borderRadius: 'var(--radius-full)', padding: '0.25rem 0.75rem', border: isSearchFocused ? '1px solid var(--primary-color)' : '1px solid transparent', transition: 'all 0.3s' }}>
              <Search size={18} color="var(--text-muted)" />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="expandable-search"
                style={{ border: 'none', background: 'transparent', outline: 'none', padding: '0.5rem', fontSize: '0.875rem' }}
              />
            </div>
            
            {/* Search Results Dropdown */}
            {isSearchFocused && searchResults.length > 0 && (
              <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '0.5rem', width: '250px', background: 'white', border: '1px solid var(--border-color)', borderRadius: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', zIndex: 100, maxHeight: '300px', overflowY: 'auto' }}>
                {searchResults.map(product => (
                  <Link key={product.id} to={`/shop`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', textDecoration: 'none', borderBottom: '1px solid #f1f5f9' }}>
                    <img src={product.image} alt={product.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                    <div>
                      <div style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '0.875rem' }}>{product.name}</div>
                      <div style={{ color: 'var(--primary-color)', fontWeight: 700, fontSize: '0.75rem' }}>₹{product.price}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            
            {isSearchFocused && searchQuery.trim() !== '' && searchResults.length === 0 && (
               <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '0.5rem', width: '250px', background: 'white', border: '1px solid var(--border-color)', borderRadius: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', zIndex: 100, padding: '1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                 No products found.
               </div>
            )}
          </div>

          {/* Cart Icon */}
          <button onClick={() => setIsCartOpen(true)} style={{ position: 'relative', color: '#2d3748', display: 'flex', alignItems: 'center', marginRight: '0.5rem', background: 'none', border: 'none', cursor: 'pointer' }}>
            <ShoppingCart size={24} strokeWidth={2} />
            {totalItems > 0 && (
              <span style={{ position: 'absolute', top: -8, right: -10, background: '#f5365c', color: 'white', fontSize: '0.75rem', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-full)', fontWeight: 'bold' }}>
                {totalItems}
              </span>
            )}
          </button>

          <a href={priceListPdf} download="Kaleeswari_Crackers_Price_List_2026.pdf" className="btn btn-outline" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, textDecoration: 'none' }}>
            <Download size={18} /> <span className="desktop-nav">Price List</span>
          </a>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)' }} className="mobile-only">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
        </div>
      </header>

      {/* Sidebar Overlay (Mobile Menu) */}
      {isMenuOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1001 }} onClick={() => setIsMenuOpen(false)}>
          <div style={{ width: '300px', height: '100%', background: 'white', display: 'flex', flexDirection: 'column', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff5f5' }}>
              <span style={{ fontWeight: 800 }}>MENU</span>
              <button onClick={() => setIsMenuOpen(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.25rem' }}>✖</button>
            </div>
            
            {/* Main Links */}
            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', borderBottom: '4px solid #f1f5f9' }}>
              <Link to="/home" style={{ textDecoration: 'none', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 600 }} onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/about" style={{ textDecoration: 'none', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 600 }} onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link to="/shop" style={{ textDecoration: 'none', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 600 }} onClick={() => setIsMenuOpen(false)}>Shop</Link>
              <Link to="/contact" style={{ textDecoration: 'none', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 600 }} onClick={() => setIsMenuOpen(false)}>Contact</Link>
            </div>

            {/* Categories Section */}
            <div style={{ padding: '1rem', flex: 1 }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase' }}>Categories</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {categories.map(cat => (
                  <Link key={cat.id} to={`/shop`} onClick={() => setIsMenuOpen(false)} style={{ padding: '0.5rem 0', textDecoration: 'none', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 500 }}>
                    <IconRenderer name={cat.icon} size={24} color="var(--primary-color)" /> {cat.name}
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};


import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ProductsAdmin from './pages/admin/ProductsAdmin';
import CategoriesAdmin from './pages/admin/CategoriesAdmin';
import OrdersAdmin from './pages/admin/OrdersAdmin';
import CustomersAdmin from './pages/admin/CustomersAdmin';
import SettingsAdmin from './pages/admin/SettingsAdmin';
import BannersAdmin from './pages/admin/BannersAdmin';
import Footer from './components/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import CartDrawer from './components/CartDrawer';
import WhatsAppFab from './components/WhatsAppFab';
import CategoriesPage from './pages/Categories';
import CountdownTimer from './components/CountdownTimer';
import BottomNav from './components/BottomNav';
import QuickViewModal from './components/QuickViewModal';
import WishlistPage from './pages/Wishlist';
import MyOrders from './pages/MyOrders';
import StickyCartBar from './components/StickyCartBar';
import { Package } from 'lucide-react';

const SearchPage = () => <div className="container" style={{ paddingTop: '2rem' }}><h2>Search</h2></div>;
const MorePage = () => <div className="container" style={{ paddingTop: '2rem' }}><h2>More Info</h2></div>;

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- APP LAYOUT ---
function App() {
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const { quickViewProduct, setQuickViewProduct } = useQuickView();

  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          {/* Placeholder nested routes */}
          <Route path="customers" element={<CustomersAdmin />} />
          <Route path="orders" element={<OrdersAdmin />} />
          <Route path="categories" element={<CategoriesAdmin />} />
          <Route path="products" element={<ProductsAdmin />} />
          <Route path="blogs" element={<div>Blogs Page</div>} />
          <Route path="settings" element={<SettingsAdmin />} />
          <Route path="banners" element={<BannersAdmin />} />
        </Route>
      </Routes>
    );
  }

  return (
    <>
      <ScrollToTop />
      <CountdownTimer />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/shop" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/more" element={<MorePage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/my-orders" element={<MyOrders />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
      <StickyCartBar />
      <WhatsAppFab />
      <BottomNav />
      {quickViewProduct && (
        <QuickViewModal 
          product={quickViewProduct} 
          onClose={() => setQuickViewProduct(null)} 
        />
      )}
    </>
  );
}

const AppWrapper = () => (
  <CartProvider>
    <App />
  </CartProvider>
);

export default AppWrapper;
