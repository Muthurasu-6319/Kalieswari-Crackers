import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useContext } from 'react';
import { CartContext } from '../App';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen } = useContext(CartContext);

  const cartTotal = cart.reduce((total, item) => total + (item.referencePrice * item.quantity), 0);
  
  // Free gift threshold logic
  const giftThreshold = 5000;
  const amountToGift = Math.max(0, giftThreshold - cartTotal);
  const progressPercent = Math.min(100, (cartTotal / giftThreshold) * 100);

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 2000, backdropFilter: 'blur(4px)' }}
        onClick={() => setIsCartOpen(false)}
      ></div>
      
      {/* Drawer Panel */}
      <div 
        className="cart-drawer slide-in-right"
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: '400px',
          background: 'white', zIndex: 2001, display: 'flex', flexDirection: 'column',
          boxShadow: '-10px 0 40px rgba(0,0,0,0.1)'
        }}
      >
        {/* Header */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShoppingBag size={24} color="var(--primary-color)" /> Your Cart
          </h2>
          <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%', display: 'flex' }}>
            <X size={24} color="var(--text-muted)" />
          </button>
        </div>

        {/* Progress Bar for Free Gift */}
        <div style={{ padding: '1.5rem', background: '#fff9e6', borderBottom: '1px solid #ffeeba' }}>
          {amountToGift > 0 ? (
            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#b45309', marginBottom: '0.75rem', textAlign: 'center' }}>
              Add ₹{amountToGift} more to get a <strong style={{ color: '#d32f2f' }}>Free Peacock Gift Box!</strong>
            </p>
          ) : (
            <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#15803d', marginBottom: '0.75rem', textAlign: 'center' }}>
              🎉 You have unlocked the Free Peacock Gift Box!
            </p>
          )}
          <div style={{ width: '100%', height: '8px', background: '#fde68a', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${progressPercent}%`, height: '100%', background: amountToGift > 0 ? '#f59e0b' : '#22c55e', transition: 'width 0.3s ease' }}></div>
          </div>
        </div>

        {/* Cart Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '4rem' }}>
              <ShoppingBag size={48} style={{ opacity: 0.2, margin: '0 auto 1rem auto' }} />
              <p style={{ fontSize: '1.125rem' }}>Your cart is empty</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, border: '1px solid var(--border-color)' }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem', fontSize: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.name}</h4>
                    <div style={{ color: 'var(--primary-color)', fontWeight: 800, marginBottom: '0.5rem' }}>₹{item.referencePrice}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: '0.25rem 0.75rem', background: '#f8f9fa', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 600 }}>-</button>
                        <span style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem', fontWeight: 600 }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '0.25rem 0.75rem', background: '#f8f9fa', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 600 }}>+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.25rem' }}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Checkout */}
        {cart.length > 0 && (
          <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-color)', background: '#fafafa' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.25rem' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Estimated Total</span>
              <span style={{ fontWeight: 900, color: 'var(--text-main)' }}>₹{cartTotal}</span>
            </div>
            
            {cartTotal < 3000 && (
              <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--primary-color)', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontSize: '0.75rem', fontWeight: 600, textAlign: 'center' }}>
                ⚠️ Minimum order is ₹3000. (Add ₹{3000 - cartTotal} more)
              </div>
            )}

            <Link 
              to="/cart" 
              onClick={() => setIsCartOpen(false)}
              className="btn btn-primary" 
              style={{ width: '100%', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', fontSize: '1.125rem' }}
            >
              Proceed to Enquiry <ArrowRight size={20} />
            </Link>
            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1rem' }}>Taxes & transport calculated at final invoice.</p>
          </div>
        )}
      </div>
    </>
  );
}
