import { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Edit2, Trash2, Plus } from 'lucide-react';
import IconRenderer from '../../components/IconRenderer';

export default function CategoriesAdmin() {
  const { categories, addCategory, editCategory, deleteCategory } = useData();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: '', icon: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      editCategory(editingId, newCategory);
    } else {
      addCategory(newCategory);
    }
    setIsAdding(false);
    setEditingId(null);
    setNewCategory({ name: '', icon: '' });
  };

  const handleEdit = (category) => {
    setNewCategory({
      name: category.name,
      icon: category.icon
    });
    setEditingId(category.id);
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Manage Categories</h1>
        <button onClick={() => { setIsAdding(!isAdding); setEditingId(null); setNewCategory({ name: '', icon: '' }); }} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={18} /> {isAdding ? 'Cancel' : 'Add New Category'}
        </button>
      </div>

      {isAdding && (
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>{editingId ? 'Edit Category' : 'Add Category Details'}</h2>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem' }}>Category Name</label>
              <input type="text" required value={newCategory.name} onChange={e => setNewCategory({...newCategory, name: e.target.value})} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="e.g. Sparklers" />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Icon (Lucide Name)</label>
              <input type="text" value={newCategory.icon} onChange={e => setNewCategory({...newCategory, icon: e.target.value})} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="e.g. Sparkles" />
            </div>
            <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
              <button type="submit" className="btn btn-primary">{editingId ? 'Update Category' : 'Save Category'}</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: '#f8f9fa', borderBottom: '1px solid var(--border-color)' }}>
            <tr>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Icon</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Category Name</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1rem' }}><IconRenderer name={category.icon} size={24} color="#333" /></td>
                <td style={{ padding: '1rem', fontWeight: 600 }}>{category.name}</td>
                <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => handleEdit(category)} style={{ background: '#f0f9ff', color: '#0ea5e9', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => deleteCategory(category.id)} style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
