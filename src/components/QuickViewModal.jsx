import React, { useEffect } from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { useCart } from '../App';

const QuickViewModal = ({ product, onClose }) => {
  const { addToCart, setIsCartOpen } = useCart();

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, 1);
    setIsCartOpen(true);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(11, 22, 65, 0.4)',
      backdropFilter: 'blur(8px)',
      zIndex: 99999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      animation: 'fade-in 0.3s ease-out'
    }} onClick={onClose}>
      
      <style>
        {`
          @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slide-up { from { opacity: 0; transform: translateY(20px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
        `}
      </style>

      <div style={{
        background: 'white',
        borderRadius: '24px',
        width: '100%',
        maxWidth: '800px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        animation: 'slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        '@media (min-width: 768px)': { flexDirection: 'row' }
      }} onClick={e => e.stopPropagation()}>
        
        {/* Mobile Close Button */}
        <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'white', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <X size={20} />
        </button>

        {/* Left Side: Image */}
        <div style={{ flex: '1', position: 'relative', background: '#f8fafc', minHeight: '300px' }}>
          <img 
            src={product.image} 
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
          />
          {product.isBestSeller && (
            <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', background: '#eab308', color: 'white', padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: 800, fontSize: '0.75rem', boxShadow: '0 4px 10px rgba(234,179,8,0.3)' }}>
              BEST SELLER
            </div>
          )}
        </div>

        {/* Right Side: Details */}
        <div style={{ flex: '1', padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '0.5rem', lineHeight: 1.1 }}>
            {product.name}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '1.5rem', fontWeight: 500 }}>
            {product.description} • {product.packing}
          </p>

          {/* Pricing Box */}
          <div style={{ background: '#f1f5f9', borderRadius: '16px', padding: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary-color)', lineHeight: 1 }}>
                ₹{product.referencePrice}
              </span>
              <span style={{ fontSize: '1.25rem', color: '#94a3b8', textDecoration: 'line-through', fontWeight: 600, marginBottom: '4px' }}>
                ₹{product.mrp}
              </span>
            </div>
            
            <div style={{ display: 'inline-block', background: 'rgba(34, 197, 94, 0.1)', color: '#16a34a', padding: '0.25rem 0.75rem', borderRadius: '20px', fontWeight: 700, fontSize: '0.875rem' }}>
              You Save: ₹{(product.mrp - product.referencePrice).toFixed(2)} (90% OFF)
            </div>
          </div>

          <button 
            className="btn btn-primary"
            onClick={handleAddToCart}
            style={{ width: '100%', padding: '1.25rem', fontSize: '1.125rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: 'auto', borderRadius: '12px', boxShadow: '0 10px 20px rgba(220, 38, 38, 0.2)' }}
          >
            <ShoppingBag size={22} />
            Add to Enquiry Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
