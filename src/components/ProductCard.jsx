import { useContext, useState } from 'react';
import { CartContext, useQuickView } from '../App';
import { Eye, Heart } from 'lucide-react';
import { useData } from '../contexts/DataContext';

export default function ProductCard({ product }) {
  const { cart, addToCart, removeFromCart, updateQuantity, wishlist, toggleWishlist } = useContext(CartContext);
  const isWishlisted = wishlist?.some(item => item.id === product.id);
  const { setQuickViewProduct } = useQuickView();
  const { showGlobalOffer } = useData();

  const cartItem = cart?.find(item => item.id === product.id);
  const currentQty = cartItem ? cartItem.quantity : 0;
  const [localQty, setLocalQty] = useState(1);

  const handleIncrease = (e) => {
    e.stopPropagation();
    if (cartItem) {
      // If already in cart, update cart quantity directly
      updateQuantity(product.id, currentQty + 1);
    } else {
      setLocalQty(prev => prev + 1);
    }
  };

  const handleDecrease = (e) => {
    e.stopPropagation();
    if (cartItem) {
      if (currentQty > 1) {
        updateQuantity(product.id, currentQty - 1);
      } else {
        removeFromCart(product.id);
      }
    } else {
      if (localQty > 1) {
        setLocalQty(prev => prev - 1);
      }
    }
  };

  const handleOrderNow = (e) => {
    e.stopPropagation();
    if (!cartItem) {
      addToCart(product, localQty);
      setLocalQty(1); // Reset local qty after adding
    }
  };

  return (
    <div className="product-card">
      <div 
        onClick={() => setQuickViewProduct(product)}
        className="product-image-container quick-view-container"
      >
        <style>
          {`
            .quick-view-container .quick-view-overlay { opacity: 0; transition: opacity 0.3s; }
            .quick-view-container:hover .quick-view-overlay { opacity: 1; }
            @media (max-width: 640px) {
              .quick-view-container:hover .quick-view-overlay { display: none; }
            }
          `}
        </style>
        <img src={product.image} alt={product.name} className="product-image" />
        
        {/* Quick View Overlay on Hover */}
        <div className="quick-view-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(11,22,65,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'white', color: 'var(--primary-color)', padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
            <Eye size={16} /> Quick View
          </div>
        </div>
        
        {/* Wishlist Button / 90% Offer Badge */}
        {showGlobalOffer ? (
          <div className="offer-badge">
            90% OFF
          </div>
        ) : (
          <button 
            onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
            style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.2)', zIndex: 10, color: isWishlisted ? '#f43f5e' : '#94a3b8' }}
          >
            <Heart size={18} fill={isWishlisted ? '#f43f5e' : 'none'} strokeWidth={isWishlisted ? 0 : 2} />
          </button>
        )}
      </div>
      <div className="product-content">
        <h3 className="product-title">{product.id.replace('p', '')}. {product.name}</h3>
        <p className="product-packing">Packing: {product.packing}</p>
        
        <div className="product-pricing">
          <span className="price-ref">₹{product.referencePrice}</span>
          {product.mrp && product.mrp > product.referencePrice && (
            <span className="price-mrp" style={{ textDecoration: 'line-through', color: '#9ca3af', marginLeft: '0.5rem', fontSize: '0.875rem' }}>₹{product.mrp}</span>
          )}
        </div>

        <div className="product-actions" style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {/* Quantity Selector */}
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '4px', overflow: 'hidden', height: '36px' }}>
            <button 
              onClick={handleDecrease}
              style={{ background: 'transparent', border: 'none', color: '#dc2626', width: '30px', height: '100%', cursor: 'pointer', fontWeight: 800 }}
            >
              -
            </button>
            <div style={{ width: '35px', textAlign: 'center', fontSize: '0.875rem', fontWeight: 600, color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: '1px solid #cbd5e1', borderRight: '1px solid #cbd5e1', height: '100%' }}>
              {cartItem ? currentQty : localQty}
            </div>
            <button 
              onClick={handleIncrease}
              style={{ background: 'transparent', border: 'none', color: '#dc2626', width: '30px', height: '100%', cursor: 'pointer', fontWeight: 800 }}
            >
              +
            </button>
          </div>
          
          {/* Order Now Button */}
          <button 
            onClick={handleOrderNow}
            style={{ 
              flex: 1, 
              background: cartItem ? '#22c55e' : '#b91c1c', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              height: '36px',
              fontWeight: 800, 
              fontSize: '0.875rem',
              cursor: cartItem ? 'default' : 'pointer',
              transition: 'background 0.2s'
            }}
          >
            {cartItem ? 'ADDED' : 'ORDER NOW'}
          </button>
        </div>
      </div>
    </div>
  );
}
