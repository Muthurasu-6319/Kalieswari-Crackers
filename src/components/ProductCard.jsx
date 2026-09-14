import { useContext } from 'react';
import { CartContext, useQuickView } from '../App';
import { Eye, Heart } from 'lucide-react';
import { useData } from '../contexts/DataContext';

export default function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist } = useContext(CartContext);
  const isWishlisted = wishlist?.some(item => item.id === product.id);
  const { setQuickViewProduct } = useQuickView();
  const { showGlobalOffer } = useData();

  return (
    <div className="product-card">
      <div 
        style={{ position: 'relative', height: '200px', cursor: 'pointer', overflow: 'hidden' }}
        onClick={() => setQuickViewProduct(product)}
        className="quick-view-container"
      >
        <style>
          {`
            .quick-view-container .quick-view-overlay { opacity: 0; transition: opacity 0.3s; }
            .quick-view-container:hover .quick-view-overlay { opacity: 1; }
            .quick-view-container img { transition: transform 0.3s; }
            .quick-view-container:hover img { transform: scale(1.05); }
          `}
        </style>
        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        
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

        <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
          <button 
            className="btn btn-primary" 
            onClick={() => addToCart(product)}
          >
            Add to Enquiry
          </button>
        </div>
      </div>
    </div>
  );
}
