import { useData } from '../../contexts/DataContext';
import { IndianRupee, Package, Clock, CheckCircle } from 'lucide-react';

export default function Dashboard() {
  const { orders, products } = useData();

  const totalSales = orders
    .filter(o => o.status === 'Confirmed')
    .reduce((sum, o) => sum + (Number(o.totalValue) || 0), 0);

  const confirmedOrders = orders.filter(o => o.status === 'Confirmed').length;
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const activeProducts = products.filter(p => p.isActive !== false).length;

  const cards = [
    { title: 'Total Sales (Confirmed)', value: `₹${totalSales.toLocaleString('en-IN')}`, icon: <IndianRupee size={24} color="var(--primary-color)" /> },
    { title: 'Confirmed Orders', value: confirmedOrders, icon: <CheckCircle size={24} color="#10B981" /> },
    { title: 'Pending Orders', value: pendingOrders, icon: <Clock size={24} color="#F59E0B" /> },
    { title: 'Active Products', value: activeProducts, icon: <Package size={24} color="var(--text-main)" /> }
  ];

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-main)' }}>Dashboard</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {cards.map((card, idx) => (
          <div key={idx} style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-surface)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.5rem' }}>{card.title}</p>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>{card.value}</h2>
            </div>
            <div>
              {card.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
