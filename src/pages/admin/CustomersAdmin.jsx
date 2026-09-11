import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Users, Trash2, Edit2, Search, Check, X } from 'lucide-react';

export default function CustomersAdmin() {
  const { users, updateUser, deleteUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '' });

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (user) => {
    setEditingId(user.id);
    setEditForm({ name: user.name, email: user.email });
  };

  const handleSave = (id) => {
    updateUser(id, editForm);
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to completely remove ${name}'s account? This action cannot be undone.`)) {
      deleteUser(id);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Users size={32} /> Customers
        </h1>

        <div style={{ position: 'relative', width: '300px' }}>
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }}
          />
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--border-color)', overflowX: 'auto', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
          <thead style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
            <tr>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Customer Name</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Email Address</th>
              <th style={{ padding: '1rem', fontWeight: 600, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No customers found.
                </td>
              </tr>
            ) : filteredUsers.map(user => (
              <tr key={user.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1rem' }}>
                  {editingId === user.id ? (
                    <input 
                      type="text"
                      value={editForm.name}
                      onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                      style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--primary-color)', width: '100%' }}
                    />
                  ) : (
                    <div style={{ fontWeight: 600 }}>{user.name}</div>
                  )}
                </td>
                <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>
                  {editingId === user.id ? (
                    <input 
                      type="email"
                      value={editForm.email}
                      onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                      style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--primary-color)', width: '100%' }}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  {editingId === user.id ? (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <button onClick={() => handleSave(user.id)} style={{ background: '#22c55e', color: 'white', border: 'none', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} title="Save">
                        <Check size={16} />
                      </button>
                      <button onClick={handleCancel} style={{ background: '#94a3b8', color: 'white', border: 'none', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} title="Cancel">
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <button 
                        onClick={() => handleEdit(user)}
                        style={{ background: '#f1f5f9', color: '#475569', border: 'none', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                        title="Edit Customer"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id, user.name)}
                        style={{ background: '#fee2e2', color: '#ef4444', border: 'none', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                        title="Delete Customer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
