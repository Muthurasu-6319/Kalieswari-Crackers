import { useContext, useState } from 'react';
import { CartContext } from '../App';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { Trash2, MessageCircle, ArrowRight } from 'lucide-react';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalValue, totalItems, setIsCartOpen } = useContext(CartContext);
  const { addOrder } = useData();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({ name: '', location: '', phone: '' });

  const handleWhatsApp = () => {
    if (totalValue < 2500) {
      alert("Minimum order value is ₹2500. Please add more items to your enquiry.");
      return;
    }

    if (!formData.name || !formData.location || !formData.phone) {
      alert("Please enter your Name, Phone Number, and Location before sending.");
      return;
    }

    let message = `Hello Sri Kalieswaari Crackers 👋\n\nI would like to enquire about the following products:\n\n`;
    
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - Qty: ${item.quantity}\n`;
    });

    message += `\nEstimated Total: ₹${totalValue}\n\n`;
    message += `Name: ${formData.name}\nPhone: ${formData.phone}\nLocation: ${formData.location}\n\nPlease confirm availability and final price.\nThank you.`;

    const encodedMessage = encodeURIComponent(message);
    const shopPhoneNumber = "916380116372"; // WhatsApp Number
    
    const newOrder = {
      id: Date.now().toString(),
      userId: currentUser ? currentUser.id : 'guest',
      customerName: formData.name,
      customerPhone: formData.phone,
      customerLocation: formData.location,
      items: cart,
      totalValue: totalValue,
      status: 'Pending',
      date: new Date().toISOString()
    };
    addOrder(newOrder);
    
    // Clear cart by setting quantities to 0 via removeFromCart in a loop, or just open WhatsApp for now.
    // We'll leave the cart alone as they might want to come back if WhatsApp failed, or we can just open it.
    window.open(`https://wa.me/${shopPhoneNumber}?text=${encodedMessage}`, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
        <h2>Your Enquiry List is Empty</h2>
        <p className="text-muted" style={{ marginTop: '1rem' }}>Add some products from the catalogue to enquire.</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingBottom: '6rem', paddingTop: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>My Enquiry List</h2>
      
      <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr', '@media (minWidth: 768px)': { gridTemplateColumns: '2fr 1fr' } }}>
        
        {/* Cart Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {cart.map(item => (
            <div key={item.id} className="bg-surface" style={{ display: 'flex', gap: '1rem', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
              <div style={{ flex: 1 }}>
                <h4 style={{ fontWeight: 600 }}>{item.name}</h4>
                <p className="text-muted" style={{ fontSize: '0.875rem' }}>₹{item.referencePrice} / {item.packing}</p>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: '0.25rem 0.75rem', background: 'transparent', color: 'white', border: 'none', cursor: 'pointer' }}>-</button>
                    <span style={{ padding: '0 0.5rem' }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '0.25rem 0.75rem', background: 'transparent', color: 'white', border: 'none', cursor: 'pointer' }}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} style={{ background: 'transparent', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div style={{ fontWeight: 800, color: 'var(--secondary-color)' }}>
                ₹{item.referencePrice * item.quantity}
              </div>
            </div>
          ))}
        </div>

        {/* Summary & Form */}
        <div className="bg-surface" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', height: 'fit-content' }}>
          <h3 style={{ marginBottom: '1rem' }}>Enquiry Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span className="text-muted">Total Items</span>
            <span>{totalItems}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontWeight: 800, fontSize: '1.25rem', color: 'var(--secondary-color)' }}>
            <span>Estimated Total</span>
            <span>₹{totalValue}</span>
          </div>
          
          <div style={{ padding: '1rem', background: 'rgba(255, 183, 3, 0.1)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255, 183, 3, 0.3)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
            ⚠️ Final price & availability will be confirmed by our team via WhatsApp.
          </div>

          {totalValue < 2500 && (
            <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--primary-color)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(239, 68, 68, 0.3)', marginBottom: '1.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
              ⚠️ Minimum order value is ₹2500. Add ₹{2500 - totalValue} more to checkout.
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Your Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)' }} 
                placeholder="Enter your name" 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Phone Number (WhatsApp)</label>
              <input 
                type="tel" 
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)' }} 
                placeholder="Enter your WhatsApp number" 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Location / City</label>
              <input 
                type="text" 
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)' }} 
                placeholder="Enter your location" 
              />
            </div>
          </div>

          <button 
            className="btn btn-whatsapp" 
            style={{ 
              width: '100%', 
              opacity: totalValue < 2500 ? 0.5 : 1, 
              cursor: totalValue < 2500 ? 'not-allowed' : 'pointer' 
            }} 
            onClick={handleWhatsApp}
            disabled={totalValue < 2500}
          >
            <MessageCircle size={20} /> Send Enquiry on WhatsApp <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}
