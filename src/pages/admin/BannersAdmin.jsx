import { useState, useRef } from 'react';
import { useData } from '../../contexts/DataContext';
import { Upload, Trash2, Loader2, Image as ImageIcon } from 'lucide-react';

export default function BannersAdmin() {
  const { shopBanners = [], setShopBanners } = useData();
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const API_URL = import.meta.env.DEV ? `http://${window.location.hostname}:3001/api` : '/api';
      const res = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        const isAbsolute = data.url.startsWith('http');
        const imageUrl = import.meta.env.DEV && !isAbsolute ? `http://${window.location.hostname}:3001${data.url}` : data.url;
        
        // Add to banners
        const newBanners = [...shopBanners, imageUrl];
        setShopBanners(newBanners);
      }
    } catch (err) {
      console.error('Banner upload failed', err);
      alert('Failed to upload banner.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const deleteBanner = (indexToRemove) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      const newBanners = shopBanners.filter((_, index) => index !== indexToRemove);
      setShopBanners(newBanners);
    }
  };

  return (
    <div style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Manage Shop Banners</h1>
        
        <label style={{ 
          background: 'var(--primary-color)', color: 'white', border: 'none', 
          padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-md)', cursor: 'pointer', 
          display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600
        }}>
          {uploading ? <Loader2 className="spin" size={20} style={{ animation: 'spin 1s linear infinite' }} /> : <Upload size={20} />}
          {uploading ? 'Uploading...' : 'Upload Banner'}
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef}
            onChange={handleImageUpload} 
            style={{ display: 'none' }} 
            disabled={uploading}
          />
        </label>
      </div>

      <div style={{ background: 'white', borderRadius: 'var(--radius-md)', padding: '2rem', border: '1px solid var(--border-color)' }}>
        {!shopBanners || shopBanners.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            <ImageIcon size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
            <p>No banners uploaded yet.</p>
            <p style={{ fontSize: '0.875rem' }}>The default local banners will be used on the shop page.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2">
            {shopBanners.map((bannerUrl, index) => (
              <div key={index} style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                <img src={bannerUrl} alt={`Banner ${index + 1}`} style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
                
                <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '0.5rem' }}>
                  <span style={{ background: 'rgba(0,0,0,0.5)', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.875rem' }}>
                    Banner {index + 1}
                  </span>
                  <button 
                    onClick={() => deleteBanner(index)}
                    style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer' }}
                    title="Delete Banner"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
