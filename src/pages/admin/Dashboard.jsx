export default function Dashboard() {
  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-main)' }}>Dashboard</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-surface)', border: '1px solid var(--border-color)' }}>
          <p style={{ color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.5rem' }}>Total Sales</p>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-color)' }}>₹0</h2>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-surface)', border: '1px solid var(--border-color)' }}>
          <p style={{ color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.5rem' }}>Total Orders</p>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>0</h2>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-surface)', border: '1px solid var(--border-color)' }}>
          <p style={{ color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.5rem' }}>Active Products</p>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>0</h2>
        </div>
      </div>
    </div>
  );
}
