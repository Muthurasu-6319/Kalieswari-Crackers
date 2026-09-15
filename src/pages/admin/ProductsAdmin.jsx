import { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Edit2, Plus, Trash2, Upload, Check, Loader2 } from 'lucide-react';

export default function ProductsAdmin() {
  const { products, categories, addProduct, editProduct, deleteProduct } = useData();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploadingId, setUploadingId] = useState(null);
  const [uploadedId, setUploadedId] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '', referencePrice: '', mrp: '', categoryId: '', packing: '', isBestSeller: false, image: ''
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const API_URL = import.meta.env.DEV ? 'http://localhost:3001/api' : '/api';
      const res = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        const isAbsolute = data.url.startsWith('http');
        setNewProduct(prev => ({ ...prev, image: import.meta.env.DEV && !isAbsolute ? `http://localhost:3001${data.url}` : data.url }));
      }
    } catch (err) {
      console.error('Upload failed', err);
    }
  };

  const handleInlineImageUpload = async (e, product) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploadingId(product.id);
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const API_URL = import.meta.env.DEV ? 'http://localhost:3001/api' : '/api';
      const res = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        const isAbsolute = data.url.startsWith('http');
        const imageUrl = import.meta.env.DEV && !isAbsolute ? `http://localhost:3001${data.url}` : data.url;
        
        await editProduct(product.id, { ...product, image: imageUrl });
        
        setUploadingId(null);
        setUploadedId(product.id);
        setTimeout(() => setUploadedId(null), 3000);
      }
    } catch (err) {
      console.error('Inline upload failed', err);
      setUploadingId(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...newProduct,
      referencePrice: Number(newProduct.referencePrice),
      mrp: Number(newProduct.mrp),
      image: newProduct.image || 'https://images.unsplash.com/photo-1544772099-23ce42a191f4?w=500&q=80',
    };

    if (editingId) {
      editProduct(editingId, productData);
    } else {
      addProduct(productData);
    }

    setIsAdding(false);
    setEditingId(null);
    setNewProduct({ name: '', referencePrice: '', mrp: '', categoryId: '', packing: '', isBestSeller: false, image: '' });
  };

  const handleEdit = (product) => {
    setNewProduct({
      name: product.name,
      referencePrice: product.referencePrice,
      mrp: product.mrp,
      categoryId: product.categoryId,
      packing: product.packing,
      isBestSeller: product.isBestSeller,
      image: product.image
    });
    setEditingId(product.id);
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Manage Products</h1>
        <button onClick={() => { setIsAdding(!isAdding); setEditingId(null); setNewProduct({ name: '', referencePrice: '', mrp: '', categoryId: '', packing: '', isBestSeller: false, image: '' }); }} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={18} /> {isAdding ? 'Cancel' : 'Add New Product'}
        </button>
      </div>

      {isAdding && (
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>{editingId ? 'Edit Product' : 'Add Product Details'}</h2>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem' }}>Product Name</label>
              <input type="text" required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem' }}>Category</label>
              <select required value={newProduct.categoryId} onChange={e => setNewProduct({...newProduct, categoryId: e.target.value})} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                <option value="">Select Category...</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem' }}>Selling Price (₹)</label>
              <input type="number" required value={newProduct.referencePrice} onChange={e => setNewProduct({...newProduct, referencePrice: e.target.value})} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem' }}>MRP (₹)</label>
              <input type="number" required value={newProduct.mrp} onChange={e => setNewProduct({...newProduct, mrp: e.target.value})} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem' }}>Packing (e.g., 1 Box)</label>
              <input type="text" required value={newProduct.packing} onChange={e => setNewProduct({...newProduct, packing: e.target.value})} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem' }}>Product Image</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
              {newProduct.image && (
                <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <img src={newProduct.image} alt="Preview" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #eee' }} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Image uploaded</span>
                </div>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 600, marginTop: '1.25rem' }}>
                <input type="checkbox" checked={newProduct.isBestSeller} onChange={e => setNewProduct({...newProduct, isBestSeller: e.target.checked})} style={{ width: '18px', height: '18px', accentColor: 'var(--primary-color)' }} />
                Mark as Best Seller
              </label>
            </div>
            <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
              <button type="submit" className="btn btn-primary">{editingId ? 'Update Product' : 'Save Product'}</button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-table-container" style={{ background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: '#f8f9fa', borderBottom: '1px solid var(--border-color)' }}>
            <tr>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Image</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Product Name</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Category</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>MRP</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Selling Price</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Discount</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Visibility</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => {
              const cat = categories.find(c => c.id === product.categoryId);
              const discount = product.mrp && product.referencePrice ? Math.round(((product.mrp - product.referencePrice) / product.mrp) * 100) : 0;
              return (
                <tr key={product.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem' }}>
                    <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                  </td>
                  <td style={{ padding: '1rem' }}>{product.name} {product.isBestSeller && <span style={{ fontSize: '0.75rem', background: '#fffae6', color: '#b7791f', padding: '2px 6px', borderRadius: '4px', marginLeft: '0.5rem' }}>Best Seller</span>}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{cat ? cat.name : 'Unknown'}</td>
                  <td style={{ padding: '1rem', color: '#9ca3af', textDecoration: 'line-through' }}>₹{product.mrp}</td>
                  <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--primary-color)' }}>₹{product.referencePrice}</td>
                  <td style={{ padding: '1rem', color: 'green', fontWeight: 600 }}>{discount > 0 ? `${discount}% OFF` : '-'}</td>
                  <td style={{ padding: '1rem' }}>
                    <button 
                      onClick={() => editProduct(product.id, { ...product, isActive: product.isActive === false || product.isActive === 0 ? true : false })}
                      style={{ 
                        background: product.isActive !== false && product.isActive !== 0 ? '#dcfce7' : '#fee2e2', 
                        color: product.isActive !== false && product.isActive !== 0 ? '#16a34a' : '#dc2626', 
                        border: 'none', 
                        padding: '0.4rem 0.75rem', 
                        borderRadius: '20px', 
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        width: '60px'
                      }}
                    >
                      {product.isActive !== false && product.isActive !== 0 ? 'ON' : 'OFF'}
                    </button>
                  </td>
                  <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <div style={{ position: 'relative' }}>
                      {uploadingId === product.id ? (
                        <button style={{ background: '#f3f4f6', color: '#6b7280', border: 'none', padding: '0.5rem', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
                          <Loader2 size={16} />
                        </button>
                      ) : uploadedId === product.id ? (
                        <button style={{ background: '#dcfce7', color: '#16a34a', border: 'none', padding: '0.5rem', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
                          <Check size={16} />
                        </button>
                      ) : (
                        <label style={{ background: '#f3e8ff', color: '#9333ea', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', margin: 0 }}>
                          <Upload size={16} />
                          <input type="file" accept="image/*" onChange={(e) => handleInlineImageUpload(e, product)} style={{ display: 'none' }} />
                        </label>
                      )}
                    </div>
                    <button onClick={() => handleEdit(product)} style={{ background: '#f0f9ff', color: '#0ea5e9', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => deleteProduct(product.id)} style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
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
