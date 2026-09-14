import React, { useState, useEffect } from 'react';
import { useData } from '../../contexts/DataContext';
import { Save, Settings, Calendar, FileText } from 'lucide-react';

export default function SettingsAdmin() {
  const { saleEndDate, setSaleEndDate, invoiceSettings, updateInvoiceSettings, showGlobalOffer, setShowGlobalOffer } = useData();
  
  // --- Timer Settings State ---
  const formatForInput = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0, 16);
  };
  const [dateInput, setDateInput] = useState(formatForInput(saleEndDate));
  const [isTimerSaved, setIsTimerSaved] = useState(false);

  // --- Invoice Settings State ---
  const [invoiceForm, setInvoiceForm] = useState(invoiceSettings);
  const [isInvoiceSaved, setIsInvoiceSaved] = useState(false);

  useEffect(() => {
    setInvoiceForm(invoiceSettings);
  }, [invoiceSettings]);

  // Handlers
  const handleSaveTimer = () => {
    const newDate = new Date(dateInput);
    setSaleEndDate(newDate.toISOString());
    setIsTimerSaved(true);
    setTimeout(() => setIsTimerSaved(false), 3000);
  };

  const handleInvoiceChange = (e) => {
    setInvoiceForm({ ...invoiceForm, [e.target.name]: e.target.value });
  };

  const handleTermChange = (index, value) => {
    const newTerms = [...invoiceForm.terms];
    newTerms[index] = value;
    setInvoiceForm({ ...invoiceForm, terms: newTerms });
  };

  const handleSaveInvoice = (e) => {
    e.preventDefault();
    updateInvoiceSettings(invoiceForm);
    setIsInvoiceSaved(true);
    setTimeout(() => setIsInvoiceSaved(false), 3000);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Settings size={28} /> Store Settings
      </h1>

      {/* Timer Settings Section */}
      <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Calendar size={20} className="text-primary" />
          Countdown Timer Settings
        </h2>
        
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
          Set the date and time when the "Diwali Mega Sale" offer ends. The banner at the top of the website will count down to this exact moment.
        </p>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Sale End Date & Time</label>
          <input 
            type="datetime-local" 
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '0.75rem', 
              borderRadius: 'var(--radius-sm)', 
              border: '1px solid var(--border-color)',
              background: '#f8fafc',
              fontSize: '1rem',
              outline: 'none'
            }}
          />
        </div>

        <button 
          onClick={handleSaveTimer}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem' }}
        >
          <Save size={18} /> {isTimerSaved ? 'Saved!' : 'Save Timer'}
        </button>
      </div>

      {/* Global Offer Settings Section */}
      <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Settings size={20} className="text-primary" />
          Global Offer Settings
        </h2>
        
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
          Enable or disable the animated "90% Offer" badge on all products in the shop.
        </p>

        <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', userSelect: 'none' }}>
          <input 
            type="checkbox" 
            checked={showGlobalOffer}
            onChange={(e) => setShowGlobalOffer(e.target.checked)}
            style={{ width: '20px', height: '20px', accentColor: 'var(--primary-color)' }}
          />
          <span style={{ fontWeight: 600, fontSize: '1rem' }}>Show 90% Offer Badge on Products</span>
        </label>
      </div>

      {/* Invoice Settings Section */}
      <form onSubmit={handleSaveInvoice} style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileText size={20} className="text-primary" />
          PDF Invoice Settings
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.875rem' }}>Company Name</label>
            <input 
              type="text" 
              name="companyName"
              value={invoiceForm.companyName}
              onChange={handleInvoiceChange}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }} 
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.875rem' }}>Address / Location</label>
            <input 
              type="text" 
              name="address"
              value={invoiceForm.address}
              onChange={handleInvoiceChange}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }} 
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.875rem' }}>Contact Phone</label>
              <input 
                type="text" 
                name="phone"
                value={invoiceForm.phone}
                onChange={handleInvoiceChange}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }} 
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.875rem' }}>Contact Email</label>
              <input 
                type="email" 
                name="email"
                value={invoiceForm.email}
                onChange={handleInvoiceChange}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }} 
                required
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.875rem' }}>Terms & Conditions</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[0, 1, 2].map(index => (
                <input 
                  key={index}
                  type="text" 
                  value={invoiceForm.terms[index] || ''}
                  onChange={(e) => handleTermChange(index, e.target.value)}
                  placeholder={`Term ${index + 1}`}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }} 
                />
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
            <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem' }}>
              <Save size={18} /> Save Invoice Settings
            </button>
            {isInvoiceSaved && <span style={{ color: '#16a34a', fontWeight: 600 }}>Invoice settings updated!</span>}
          </div>
        </div>
      </form>
    </div>
  );
}
