import { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Package, Clock, CheckCircle, Truck, PackageCheck, AlertCircle, Eye, Search, MessageCircle, Trash2, FileText, Loader2 } from 'lucide-react';
import { generateInvoice } from '../../utils/generateInvoice';

export default function OrdersAdmin() {
  const { orders, updateOrderStatus, deleteOrder, invoiceSettings } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [processingOrder, setProcessingOrder] = useState(null);

  const filteredOrders = orders
    .filter(o => 
      (filterStatus === 'All' || o.status === filterStatus) &&
      (o.id.includes(searchQuery) || o.customerName.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));

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

  const handleSendInvoice = async (order) => {
    if (!order.customerPhone) {
      alert("No phone number recorded for this customer.");
      return;
    }
    
    setProcessingOrder(order.id);
    
    try {
      const rawBlob = generateInvoice(order, invoiceSettings, true);
      const pdfBlob = new Blob([rawBlob], { type: 'application/pdf' });
      const formData = new FormData();
      formData.append('image', pdfBlob, `Invoice_${order.id}.pdf`);
      
      const API_URL = import.meta.env.DEV ? `http://${window.location.hostname}:3001/api` : '/api';
      const res = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData
      });
      
      const data = await res.json();
      
      if (data.invoiceId) {
        // Set production URL to the official domain so customers always see the branded link
        let backendBaseUrl = 'https://www.srikalieswaricrackers.in';
        if (import.meta.env.DEV) {
           backendBaseUrl = `http://${window.location.hostname}:3001`;
        }
        const invoiceUrl = `${backendBaseUrl}/api/invoice/${data.invoiceId}`;
        
        const message = `Hello ${order.customerName},\n\nGreat news! Your order #${order.id} has been successfully confirmed. 🎊\n\nTotal Amount: ₹${order.totalValue}\n\nYour official invoice has been generated. You can view and download your invoice directly here:\n${invoiceUrl}\n\nWe will notify you again once your order is shipped. Thank you for shopping with Sri Kalieswaari Crackers!`;
        const encodedMessage = encodeURIComponent(message);
        
        let phone = order.customerPhone.replace(/[^0-9]/g, '');
        if (phone.length === 10) phone = '91' + phone; 
        
        window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
      } else if (data.url) {
        // Fallback just in case Cloudinary uploads happen
        const message = `Hello ${order.customerName},\n\nGreat news! Your order #${order.id} has been successfully confirmed. 🎊\n\nTotal Amount: ₹${order.totalValue}\n\nYour official invoice has been generated. You can view and download your invoice directly here:\n${data.url}\n\nWe will notify you again once your order is shipped. Thank you for shopping with Sri Kalieswaari Crackers!`;
        const encodedMessage = encodeURIComponent(message);
        
        let phone = order.customerPhone.replace(/[^0-9]/g, '');
        if (phone.length === 10) phone = '91' + phone; 
        
        window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
      } else {
        alert(data.error || "Failed to upload invoice to Backblaze B2.");
      }
    } catch (err) {
      console.error(err);
      alert("Error generating or uploading invoice.");
    } finally {
      setProcessingOrder(null);
    }
  };

  const handleSendWhatsApp = async (order) => {
    if (!order.customerPhone) {
      alert("No phone number recorded for this customer.");
      return;
    }

    if (order.status === 'Confirmed') {
      await handleSendInvoice(order);
      return;
    }

    let phone = order.customerPhone.replace(/[^0-9]/g, '');
    if (phone.length === 10) phone = '91' + phone; 

    let message = '';
    if (order.status === 'Shipped') {
      message = `Hello ${order.customerName},\n\nGood news! Your order #${order.id} has been shipped. 🚚\n\nDid you receive your product? Please let us know once it reaches you.\n\nThank you for shopping with Sri Kalieswaari Crackers!`;
    } else if (order.status === 'Delivered') {
      message = `Hello ${order.customerName},\n\nYour order #${order.id} has been successfully delivered. 🎉\n\nWe hope you have a wonderful celebration! Thank you for choosing Sri Kalieswaari Crackers.`;
    } else if (order.status === 'Cancelled') {
      message = `Hello ${order.customerName},\n\nWe regret to inform you that your order #${order.id} has been cancelled. ❌\n\nIf you have any questions or would like to place a new order, please feel free to contact us.\n\nThank you for your understanding.`;
    }

    if (message) {
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
    }
  };

  const handleDelete = (orderId) => {
    if (window.confirm("Are you sure you want to completely delete this order? This action cannot be undone.")) {
      deleteOrder(orderId);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Manage Orders</h1>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: 'white', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.5rem 1rem' }}>
            <Search size={18} color="var(--text-muted)" />
            <input 
              type="text" 
              placeholder="Search ID or Name" 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ border: 'none', outline: 'none', marginLeft: '0.5rem', width: '200px' }}
            />
          </div>
          
          <select 
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            style={{ padding: '0.625rem 1rem', border: '1px solid var(--border-color)', borderRadius: '8px', outline: 'none', background: 'white', fontWeight: 600 }}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="admin-table-container" style={{ background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: '#f8f9fa', borderBottom: '1px solid var(--border-color)' }}>
            <tr>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Order ID</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Customer</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Date</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Total Value</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Status</th>
              <th style={{ padding: '1rem', fontWeight: 600, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No orders found.
                </td>
              </tr>
            ) : filteredOrders.map(order => {
              const colors = getStatusColor(order.status);
              return (
                <tr key={order.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--primary-color)' }}>#{order.id}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 600 }}>{order.customerName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{order.customerLocation}</div>
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>
                    {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 700 }}>₹{order.totalValue}</td>
                  <td style={{ padding: '1rem' }}>
                    <select 
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      style={{ 
                        background: colors.bg, 
                        color: colors.color, 
                        border: 'none', 
                        padding: '0.25rem 0.5rem', 
                        borderRadius: '20px', 
                        fontWeight: 700, 
                        fontSize: '0.75rem',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    {order.status !== 'Pending' && (
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                        <button 
                          onClick={() => handleSendWhatsApp(order)}
                          style={{ background: '#dcfce7', color: '#16a34a', border: 'none', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer' }}
                          title={`Send ${order.status} Message on WhatsApp`}
                          disabled={processingOrder === order.id}
                        >
                          {processingOrder === order.id ? (
                            <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                          ) : (
                            <MessageCircle size={18} />
                          )}
                        </button>
                        
                        {order.status === 'Confirmed' && (
                          <button 
                            onClick={() => generateInvoice(order, invoiceSettings)}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'var(--primary-color)', color: 'white', border: 'none', padding: '0.4rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', width: 'max-content' }}
                          >
                            <FileText size={14} /> PDF
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <button 
                      onClick={() => handleDelete(order.id)}
                      style={{ background: '#fee2e2', color: '#ef4444', border: 'none', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                      title="Delete Order"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
