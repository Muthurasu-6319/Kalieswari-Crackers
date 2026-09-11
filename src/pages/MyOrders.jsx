import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { Package, Clock, CheckCircle, Truck, PackageCheck, AlertCircle, ShoppingBag, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { generateInvoice } from '../utils/generateInvoice';

export default function MyOrders() {
  const { orders, invoiceSettings } = useData();
  const { currentUser } = useAuth();

  const userOrders = orders.filter(o => o.userId === currentUser?.id).sort((a, b) => new Date(b.date) - new Date(a.date));

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Pending': return <Clock size={16} />;
      case 'Confirmed': return <CheckCircle size={16} />;
      case 'Shipped': return <Truck size={16} />;
      case 'Delivered': return <PackageCheck size={16} />;
      case 'Cancelled': return <AlertCircle size={16} />;
      default: return <Package size={16} />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return { bg: '#fef3c7', color: '#d97706' };
      case 'Confirmed': return { bg: '#dbeafe', color: '#2563eb' };
      case 'Shipped': return { bg: '#f3e8ff', color: '#9333ea' };
      case 'Delivered': return { bg: '#dcfce7', color: '#16a34a' };
      case 'Cancelled': return { bg: '#fee2e2', color: '#dc2626' };
      default: return { bg: '#f1f5f9', color: '#475569' };
    }
  };

  if (!currentUser) {
    return (
      <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
        <h2>Please Sign In</h2>
        <p>You must be signed in to view your orders.</p>
        <Link to="/login" className="btn btn-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>Sign In</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem', minHeight: '60vh' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-main)', margin: 0 }}>My Orders</h1>
      </div>

      {userOrders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', background: 'white', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <Package size={48} color="#cbd5e1" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>No Orders Yet</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>You haven't placed any wholesale enquiries yet.</p>
          <Link to="/shop" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', textDecoration: 'none' }}>
            <ShoppingBag size={18} /> Start Shopping
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {userOrders.map(order => {
            const colors = getStatusColor(order.status);
            return (
              <div key={order.id} style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                
                {/* Order Header */}
                <div style={{ padding: '1.25rem 1.5rem', background: '#f8fafc', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                      Order Placed
                    </div>
                    <div style={{ fontWeight: 600 }}>{new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                      Total Amount
                    </div>
                    <div style={{ fontWeight: 800, color: 'var(--primary-color)' }}>₹{order.totalValue}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                      Order ID
                    </div>
                    <div style={{ fontWeight: 600 }}>#{order.id}</div>
                  </div>
                  
                  {/* Status Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: colors.bg, color: colors.color, padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: 700, fontSize: '0.875rem', marginLeft: 'auto' }}>
                    {getStatusIcon(order.status)} {order.status}
                  </div>
                  
                  {/* Download Invoice Button */}
                  {order.status === 'Confirmed' && (
                    <button 
                      onClick={() => generateInvoice(order, invoiceSettings)}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--primary-color)', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem' }}
                    >
                      <FileText size={16} /> Download Invoice
                    </button>
                  )}
                </div>

                {/* Order Items */}
                <div style={{ padding: '1.5rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Items in this Order</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                    {order.items.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: '#f8fafc', padding: '0.75rem', borderRadius: '8px' }}>
                        <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{item.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Qty: {item.quantity} × ₹{item.referencePrice}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
