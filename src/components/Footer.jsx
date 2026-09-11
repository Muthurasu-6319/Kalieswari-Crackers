import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ShieldCheck, Truck, CreditCard, Award, ArrowRight } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Footer() {
  return (
    <footer style={{ background: '#0b1641', color: '#e2e8f0', position: 'relative', marginTop: '4rem' }}>
      
      {/* SVG Wave Divider */}
      <div style={{ position: 'absolute', top: '-1px', left: 0, width: '100%', overflow: 'hidden', transform: 'translateY(-100%)' }}>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '60px' }}>
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C50.29,19.38,102.72,39.69,155,49.19,209.61,59.18,266.36,66.61,321.39,56.44Z" fill="#0b1641"></path>
        </svg>
      </div>

      {/* Trust Badges Row */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container" style={{ padding: '2rem 1rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ShieldCheck size={28} color="#ffd700" />
            <span style={{ fontWeight: 600, color: 'white' }}>100% Genuine</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Truck size={28} color="#ffd700" />
            <span style={{ fontWeight: 600, color: 'white' }}>Safe Transport</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <CreditCard size={28} color="#ffd700" />
            <span style={{ fontWeight: 600, color: 'white' }}>Secure Payments</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Award size={28} color="#ffd700" />
            <span style={{ fontWeight: 600, color: 'white' }}>PESO Approved</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', padding: '4rem 1rem 3rem 1rem' }}>
        
        {/* Company Info */}
        <div>
          <img src={logo} alt="Sri Kalieswaari Crackers" style={{ height: '60px', marginBottom: '1.5rem', filter: 'brightness(0) invert(1)' }} />
          <p style={{ color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            We provide 100% authentic Sivakasi crackers with premium quality and safe delivery directly to your doorstep.
          </p>
          
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h4 style={{ color: 'white', fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.5rem' }}>Unlock Secret Offers 🎁</h4>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input type="text" placeholder="WhatsApp Number" style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: 'none', outline: 'none', fontSize: '0.875rem' }} />
              <button style={{ background: '#ffd700', color: '#0b1641', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', fontWeight: 800, cursor: 'pointer' }}><ArrowRight size={16} /></button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#" className="social-icon-bounce" style={{ color: '#e2e8f0', background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '20px', display: 'flex', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none' }}>Follow Us</a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white', marginBottom: '1.5rem' }}>Quick Links</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li><Link to="/about" style={{ color: '#94a3b8', textDecoration: 'none' }}>About Us</Link></li>
            <li><Link to="/shop" style={{ color: '#94a3b8', textDecoration: 'none' }}>Shop Online</Link></li>
            <li><Link to="/#family-packs" style={{ color: '#94a3b8', textDecoration: 'none' }}>Combo Packages</Link></li>
            <li><Link to="/offers" style={{ color: '#94a3b8', textDecoration: 'none' }}>Special Offers</Link></li>
            <li><Link to="/contact" style={{ color: '#94a3b8', textDecoration: 'none' }}>Contact Us</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white', marginBottom: '1.5rem' }}>Categories</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li><Link to="/shop" style={{ color: '#94a3b8', textDecoration: 'none' }}>Sparklers</Link></li>
            <li><Link to="/shop" style={{ color: '#94a3b8', textDecoration: 'none' }}>Ground Chakkars</Link></li>
            <li><Link to="/shop" style={{ color: '#94a3b8', textDecoration: 'none' }}>Flower Pots</Link></li>
            <li><Link to="/shop" style={{ color: '#94a3b8', textDecoration: 'none' }}>Night Sky Shots</Link></li>
            <li><Link to="/shop" style={{ color: '#94a3b8', textDecoration: 'none' }}>Kids Special</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white', marginBottom: '1.5rem' }}>Contact Us</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <MapPin size={20} color="#d32f2f" style={{ flexShrink: 0, marginTop: '4px' }} />
              <span style={{ color: '#94a3b8' }}>123 Main Bazaar, Sivakasi, Tamil Nadu - 626123, India.</span>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Phone size={20} color="#d32f2f" style={{ flexShrink: 0 }} />
              <span style={{ color: '#94a3b8' }}>+91 63801 16372</span>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Mail size={20} color="#d32f2f" style={{ flexShrink: 0 }} />
              <span style={{ color: '#94a3b8' }}>harishponraj901@gmail.com</span>
            </div>
          </div>
        </div>

      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', textAlign: 'center', color: '#64748b', fontSize: '0.875rem' }}>
        <p>&copy; {new Date().getFullYear()} Sri Kalieswaari Crackers. All rights reserved.</p>
        <p style={{ marginTop: '0.5rem' }}>Designed for Diwali 2026. Sale of crackers is subject to Supreme Court guidelines.</p>
      </div>
    </footer>
  );
}
