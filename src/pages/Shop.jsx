import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import slider1 from '../assets/Slider1.png';
import { useData } from '../contexts/DataContext';

export default function Shop() {
  const { categories, products } = useData();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const urlCategory = searchParams.get('category');

  const sliderImages = [
    slider1,
    "https://images.unsplash.com/photo-1513364964177-3e120894c038?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1498622176861-12711680d944?q=80&w=1200&auto=format&fit=crop"
  ];

  const [selectedCategories, setSelectedCategories] = useState(urlCategory ? [urlCategory] : []);
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(18);

  // Reset visible count if filters change
  useEffect(() => {
    setVisibleCount(18);
  }, [selectedCategories, selectedPrice, searchQuery]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const filteredProducts = products.filter(product => {
    // Category Filter
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.categoryId)) {
      return false;
    }
    
    // Price Filter
    if (selectedPrice !== 'all') {
      const price = product.referencePrice;
      if (selectedPrice === 'under-500' && price >= 500) return false;
      if (selectedPrice === '500-1000' && (price < 500 || price > 1000)) return false;
      if (selectedPrice === '1000-2000' && (price < 1000 || price > 2000)) return false;
      if (selectedPrice === 'above-2000' && price <= 2000) return false;
    }
    
    // Search Filter
    if (searchQuery.trim() !== '' && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    return true;
  });

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const progressPercent = filteredProducts.length > 0 ? Math.min((visibleCount / filteredProducts.length) * 100, 100) : 0;
  const currentShowing = Math.min(visibleCount, filteredProducts.length);

  return (
    <div style={{ paddingBottom: '6rem' }}>
      <div className="container" style={{ paddingTop: '1rem' }}>
        
        {/* Slider Section */}
        <section className="slider-container">
          {sliderImages.map((src, index) => (
            <div key={index} className="slider-item">
              <img src={src} alt={`Festival Banner ${index + 1}`} />
            </div>
          ))}
        </section>

        {/* Main Content: Left Filter & Right Products */}
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          
          {/* Left Sidebar: Filters */}
          <aside style={{ flex: '1 1 250px', maxWidth: '300px' }}>
            <div className="bg-surface" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', position: 'sticky', top: '100px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', borderBottom: '2px solid var(--primary-color)', paddingBottom: '0.5rem' }}>
                Filter Options
              </h3>
              
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontWeight: 700, marginBottom: '1rem', color: 'var(--text-muted)' }}>Categories</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {categories.map(category => {
                    const count = products.filter(p => p.categoryId === category.id).length;
                    return (
                      <label key={category.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <input 
                            type="checkbox" 
                            checked={selectedCategories.includes(category.id)}
                            onChange={() => handleCategoryChange(category.id)}
                            style={{ accentColor: 'var(--primary-color)', width: '16px', height: '16px' }} 
                          />
                          <span style={{ fontSize: '0.875rem' }}>{category.name}</span>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--bg-color)', padding: '2px 6px', borderRadius: 'var(--radius-full)' }}>{count}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 style={{ fontWeight: 700, marginBottom: '1rem', color: 'var(--text-muted)' }}>Price Range</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}><input type="radio" name="price" checked={selectedPrice === 'all'} onChange={() => setSelectedPrice('all')} /> All Prices</label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}><input type="radio" name="price" checked={selectedPrice === 'under-500'} onChange={() => setSelectedPrice('under-500')} /> Under ₹500</label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}><input type="radio" name="price" checked={selectedPrice === '500-1000'} onChange={() => setSelectedPrice('500-1000')} /> ₹500 - ₹1000</label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}><input type="radio" name="price" checked={selectedPrice === '1000-2000'} onChange={() => setSelectedPrice('1000-2000')} /> ₹1000 - ₹2000</label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}><input type="radio" name="price" checked={selectedPrice === 'above-2000'} onChange={() => setSelectedPrice('above-2000')} /> Above ₹2000</label>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Area: Products Grid */}
          <main style={{ flex: '3 1 600px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>All Products</h2>
              
              {/* Search Bar */}
              <div style={{ position: 'relative', flex: '1', maxWidth: '350px' }}>
                <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6rem 1rem 0.6rem 2.5rem',
                    borderRadius: '20px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-color)',
                    color: 'white',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-3">
              {displayedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination Component */}
            {filteredProducts.length > visibleCount && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '3rem', marginBottom: '2rem' }}>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  Showing <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>{currentShowing}</span> of <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>{filteredProducts.length}</span> products
                </div>
                
                <div style={{ width: '100%', maxWidth: '300px', height: '6px', background: 'var(--border-color)', borderRadius: '10px', marginBottom: '1.5rem', overflow: 'hidden' }}>
                  <div style={{ width: `${progressPercent}%`, height: '100%', background: 'var(--primary-color)', borderRadius: '10px', transition: 'width 0.3s ease' }}></div>
                </div>

                <button 
                  onClick={() => setVisibleCount(prev => prev + 18)}
                  style={{
                    background: 'var(--primary-color)',
                    color: '#fff',
                    border: 'none',
                    padding: '0.75rem 2rem',
                    borderRadius: '30px',
                    fontWeight: 600,
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    transition: 'transform 0.2s, background 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  Show More Products <ChevronDown size={20} />
                </button>
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
                No products match your filters.
              </div>
            )}
          </main>
          
        </div>
      </div>
    </div>
  );
}
