import { useContext } from 'react';
import { CartContext } from '../App';
import ProductCard from '../components/ProductCard';
import { HeartCrack, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  const { wishlist } = useContext(CartContext);

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#f8fafc', width: '100px', height: '100px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
          <HeartCrack size={48} color="#cbd5e1" />
        </div>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>Your Wishlist is Empty</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', marginBottom: '2rem', maxWidth: '500px' }}>
          Explore our wide range of premium crackers and save your favorites here for quick access later!
        </p>
        <Link to="/shop" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 2rem', fontSize: '1.125rem', textDecoration: 'none' }}>
          <ShoppingBag size={20} /> Browse Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem', minHeight: '60vh' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-main)', margin: 0 }}>My Wishlist</h1>
        <div style={{ background: '#fef2f2', color: '#dc2626', padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: 700 }}>
          {wishlist.length} Items Saved
        </div>
      </div>
      
      <div className="products-grid">
        {wishlist.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
