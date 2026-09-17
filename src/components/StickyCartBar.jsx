import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CartContext } from '../App';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { MessageCircle, X } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function StickyCartBar() {
  const location = useLocation();
  const { cart, totalValue, totalItems } = useContext(CartContext);
  const { addOrder } = useData();
  const { currentUser } = useAuth();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', location: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hide on certain pages or if cart is empty
  if (cart.length === 0 || location.pathname.startsWith('/admin') || location.pathname === '/cart') {
    return null;
  }

  const MIN_ORDER = 2500;
  const isEligible = totalValue >= MIN_ORDER;

  const handleWhatsApp = async () => {
    if (!formData.name || !formData.phone || !formData.location) {
      alert("Please fill all the details");
      return;
    }

    setIsSubmitting(true);
    try {
      const doc = new jsPDF();
      
      doc.setFontSize(20);
      doc.text("Sri Kalieswaari Crackers", 14, 22);
      doc.setFontSize(12);
      doc.text("Order Estimate / Enquiry", 14, 30);
      
      doc.setFontSize(10);
      doc.text(`Customer Name: ${formData.name}`, 14, 40);
      doc.text(`Phone: ${formData.phone}`, 14, 46);
      doc.text(`Location: ${formData.location}`, 14, 52);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 58);

      const tableColumn = ["S.No", "Product Name", "Packing", "Qty", "Price", "Total"];
      const tableRows = [];

      cart.forEach((item, index) => {
        tableRows.push([
          index + 1,
          item.name,
          item.packing,
          item.quantity,
          `Rs ${item.referencePrice}`,
          `Rs ${item.referencePrice * item.quantity}`
        ]);
      });

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 65,
        theme: 'grid',
        styles: { fontSize: 9 },
        headStyles: { fillColor: [211, 47, 47] } 
      });

      const finalY = doc.lastAutoTable.finalY || 65;
      
      doc.setFontSize(12);
      doc.text(`Estimated Total: Rs ${totalValue}`, 14, finalY + 10);
      doc.setFontSize(10);
      doc.text("Please confirm availability and final price.", 14, finalY + 20);

      const pdfBlob = doc.output('blob');
      const formDataObj = new FormData();
      formDataObj.append('image', pdfBlob, `Order_${formData.name.replace(/\\s+/g, '_')}.pdf`);
      
      const API_URL = import.meta.env.DEV ? `http://${window.location.hostname}:3001/api` : '/api';
      const baseUrl = import.meta.env.DEV ? `http://${window.location.hostname}:3001` : window.location.origin;

      const uploadRes = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formDataObj
      });
      const uploadData = await uploadRes.json();
      
      if (!uploadData.invoiceId) {
        throw new Error(uploadData.error || "Failed to upload PDF");
      }
      
      const pdfLink = `${baseUrl}/api/invoice/${uploadData.invoiceId}`;
      const message = `Hello Sri Kalieswaari Crackers 👋\n\nI have placed an order for ₹${totalValue}.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nLocation: ${formData.location}\n\nView my order PDF here: ${pdfLink}\n\nPlease check the PDF for product details and confirm availability.\nThank you.`;
      
      const encodedMessage = encodeURIComponent(message);
      const shopPhoneNumber = "916380116372"; 
      
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
      setIsModalOpen(false);
      
      window.open(`https://wa.me/${shopPhoneNumber}?text=${encodedMessage}`, '_blank');
    } catch (error) {
      console.error("Upload error details:", error);
      alert(`Error generating PDF link: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div style={{
        position: 'fixed',
        bottom: 'calc(env(safe-area-inset-bottom) + 70px)', // Above BottomNav on mobile
        left: 0,
        right: 0,
        zIndex: 90,
        padding: '0 10px'
      }} className="sticky-cart-wrapper">
        
        {/* Warning Ribbon */}
        {!isEligible && (
          <div style={{
            background: '#b91c1c',
            color: 'white',
            textAlign: 'center',
            padding: '4px',
            fontSize: '0.75rem',
            fontWeight: 800,
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
            marginBottom: '-5px',
            boxShadow: '0 -2px 10px rgba(0,0,0,0.1)'
          }}>
            🔥 Order value must be at least ₹2,500. 🔥
          </div>
        )}
        
        <div style={{
          background: 'white',
          borderRadius: isEligible ? '12px' : '0 0 12px 12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          padding: '12px',
          border: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          {/* Summary Row */}
          <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
            <div>
              <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 700 }}>PRODUCTS</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>{cart.length}</div>
            </div>
            <div style={{ width: '1px', background: '#f1f5f9' }}></div>
            <div>
              <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 700 }}>TOTAL QTY</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>{totalItems}</div>
            </div>
            <div style={{ width: '1px', background: '#f1f5f9' }}></div>
            <div>
              <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 700 }}>EST. PRICE</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#dc2626' }}>₹{totalValue}</div>
            </div>
          </div>
          
          {/* Action Button */}
          <button 
            onClick={() => isEligible ? setIsModalOpen(true) : alert("Please add more items to reach ₹2,500.")}
            style={{
              background: isEligible ? '#22c55e' : '#94a3b8',
              color: 'white',
              border: 'none',
              padding: '10px',
              borderRadius: '8px',
              fontWeight: 800,
              fontSize: '1rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
              cursor: isEligible ? 'pointer' : 'not-allowed'
            }}
          >
            <MessageCircle size={20} /> ORDER NOW
          </button>
        </div>
      </div>

      {/* Checkout Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 999,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
        }}>
          <div style={{ background: 'white', width: '100%', maxWidth: '400px', borderRadius: '12px', padding: '1.5rem', position: 'relative' }}>
            <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', cursor: 'pointer' }}>
              <X size={24} color="#64748b" />
            </button>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>Complete Order</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Name</label>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} placeholder="Enter your name" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>WhatsApp Number</label>
                <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} placeholder="Enter WhatsApp number" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>City / Location</label>
                <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} placeholder="Enter delivery city" />
              </div>
            </div>

            <button disabled={isSubmitting} onClick={handleWhatsApp} style={{ width: '100%', background: '#25d366', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: 800, fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1 }}>
              {isSubmitting ? 'Generating PDF...' : <><MessageCircle size={20} /> SEND ON WHATSAPP</>}
            </button>
          </div>
        </div>
      )}

      {/* Style overrides for desktop media query */}
      <style>{`
        @media (min-width: 768px) {
          .sticky-cart-wrapper {
            bottom: 20px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: 450px !important;
          }
        }
      `}</style>
    </>
  );
}
