import { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Edit2, Plus, Trash2 } from 'lucide-react';

export default function ProductsAdmin() {
  const { products, categories, addProduct, editProduct, deleteProduct } = useData();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '', referencePrice: '', mrp: '', categoryId: '', packing: '', isBestSeller: false, image: ''
  });

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
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem' }}>Image URL</label>
              <input type="text" value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="https://..." />
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

      <div style={{ background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: '#f8f9fa', borderBottom: '1px solid var(--border-color)' }}>
            <tr>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Image</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Product Name</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Category</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>MRP</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Selling Price</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Discount</th>
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
                  <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
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
