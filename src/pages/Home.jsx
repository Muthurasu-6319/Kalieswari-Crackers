import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { MessageCircle, ShieldCheck, Truck, ThumbsUp, Gift, Sparkles, Clock, Star, CreditCard, Award, ChevronRight } from 'lucide-react';
import heroBg from '../assets/Slider1.png';
import ProductCard from '../components/ProductCard';
import IconRenderer from '../components/IconRenderer';

export default function Home() {
  const { categories, products } = useData();
  const shopPhoneNumber = "916380116372"; // WhatsApp Number

  const handleWhatsApp = (text) => {
    window.open(`https://wa.me/${shopPhoneNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const bestSellers = products.filter(p => p.isBestSeller);

  return (
    <div style={{ paddingBottom: '6rem', backgroundColor: '#fafafa' }}>
      
      {/* 1. Hero Section - Custom Split Layout using Generated Image */}
      <section style={{ 
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '6rem 2rem',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        margin: '1rem',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
      }}>
        <div className="container" style={{ width: '100%', margin: 0 }}>
          <div style={{ maxWidth: '600px', padding: '2rem', background: 'rgba(255,255,255,0.9)', borderRadius: '12px', backdropFilter: 'blur(5px)' }}>
            
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#0b1641', color: 'white', padding: '0.25rem 1rem', fontSize: '0.875rem', fontWeight: 800, letterSpacing: '1px', marginBottom: '1.5rem', borderRadius: '4px' }}>
              <Sparkles size={16} color="var(--gold-text)" /> DIWALI 2026 <Sparkles size={16} color="var(--gold-text)" />
            </div>
            
            <p style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#333' }}>
              Celebrate Big. Save More.
            </p>
            
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '0.5rem', lineHeight: 1.1, color: '#d32f2f' }}>
              SPECIAL <br/>
              <span style={{ color: '#b78b27' }}>FAMILY PACKS</span>
            </h1>
            
            <h2 style={{ fontSize: '2rem', color: '#0b1641', fontWeight: 800, marginBottom: '2rem' }}>
              Sri Kalieswari Crackers
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '1.125rem', marginBottom: '2.5rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f8f4e6', padding: '0.5rem 1rem', borderRadius: '8px', width: 'fit-content', fontWeight: 600 }}>
                <Gift size={20} color="#d32f2f" /> Exciting Gifts on Bulk Orders
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f8f4e6', padding: '0.5rem 1rem', borderRadius: '8px', width: 'fit-content', fontWeight: 600 }}>
                <Clock size={20} color="#d32f2f" /> Offer Valid Till 10.10.2026
              </span>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={() => document.getElementById('family-packs').scrollIntoView({ behavior: 'smooth' })} style={{ background: '#a10808', color: 'white', border: '2px solid #ffcc00', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 800, fontSize: '1.125rem', cursor: 'pointer' }}>
                [ View Family Packs ]
              </button>
              <button onClick={() => handleWhatsApp("Hello Sri Kalieswari Crackers, I would like to enquire about bulk orders and offers.")} className="btn btn-whatsapp" style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', fontSize: '1.125rem', fontWeight: 800, border: '2px solid transparent' }}>
                <MessageCircle size={20} /> WhatsApp Enquiry
              </button>
            </div>
            
          </div>
        </div>
      </section>

      {/* 2. Offer Cards */}
      <section style={{ marginTop: '-2rem', position: 'relative', zIndex: 20, padding: '0 1rem' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', paddingBottom: '1rem' }}>
            {[
              { amount: "₹5,000+", gift: "Free 30 Shots Gift" },
              { amount: "₹10,000+", gift: "Free 60 Shots Gift" },
              { amount: "₹25,000+", gift: "Free 120 Shots Gift" },
              { amount: "₹50,000+", gift: "Free 120 Shots + Peacock" },
            ].map((offer, idx) => (
              <div key={idx} style={{ 
                minWidth: '220px', background: 'white', borderRadius: '12px', padding: '1.5rem', 
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid var(--border-color)',
                textAlign: 'center'
              }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Purchase above</div>
                <div style={{ color: '#d32f2f', fontSize: '2rem', fontWeight: 900, marginBottom: '1rem' }}>{offer.amount}</div>
                <div style={{ background: '#fff9e6', color: '#b78b27', padding: '0.5rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <Gift size={16} /> {offer.gift}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Family Pack Section */}
      <section id="family-packs" style={{ padding: '6rem 0', background: '#0b1641', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle background glow */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '80%', background: 'radial-gradient(circle, rgba(255,215,0,0.05) 0%, rgba(11,22,65,0) 70%)', pointerEvents: 'none' }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white' }}>🎇 Diwali Special Family Packs</h2>
            <p style={{ color: '#cbd5e1', fontSize: '1.125rem' }}>Carefully curated combos for every budget. Maximum joy, zero hassle.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem', alignItems: 'center' }}>
            {[
              { name: "PREMIUM", price: 3000, items: "35+ Items", origPrice: 3766, icon: "Star" },
              { name: "GOLD", price: 5000, items: "45+ Items", origPrice: 5623, icon: "Shield" },
              { name: "DIAMOND", price: 7000, items: "55+ Items", origPrice: 7388, icon: "Gem", popular: true },
              { name: "LUXURY", price: 10000, items: "70+ Items", origPrice: 11378, icon: "Crown" },
            ].map((pack, i) => {
              const savings = pack.origPrice - pack.price;
              
              return (
                <div key={i} className="premium-card-hover" style={{ 
                  background: pack.popular ? 'linear-gradient(145deg, #1e3a8a, #0b1641)' : 'white', 
                  border: pack.popular ? '2px solid #ffd700' : '2px solid transparent', 
                  borderRadius: '16px', 
                  padding: '2.5rem 1.5rem', 
                  textAlign: 'center', 
                  position: 'relative', 
                  overflow: 'hidden',
                  transform: pack.popular ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: pack.popular ? '0 20px 40px rgba(0,0,0,0.3)' : '0 10px 25px rgba(0,0,0,0.1)',
                  zIndex: pack.popular ? 2 : 1
                }}>
                  {pack.popular && <div className="best-value-ribbon">BEST VALUE</div>}
                  
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: pack.popular ? 'rgba(255, 215, 0, 0.2)' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                    <IconRenderer name={pack.icon} size={32} color={pack.popular ? '#ffd700' : 'var(--primary-color)'} />
                  </div>
                  
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: pack.popular ? '#ffd700' : 'var(--purple-bg)', marginBottom: '0.5rem' }}>{pack.name}</h3>
                  <p style={{ color: pack.popular ? '#cbd5e1' : 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem', fontWeight: 600 }}>Approx {pack.items} inside</p>
                  
                  <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ textDecoration: 'line-through', color: pack.popular ? '#94a3b8' : '#9e9e9e', fontSize: '1.125rem' }}>₹{pack.origPrice.toLocaleString()}</span>
                      <span style={{ background: '#22c55e', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>SAVE ₹{savings.toLocaleString()}</span>
                    </div>
                    <span style={{ fontSize: '2.5rem', fontWeight: 900, color: pack.popular ? 'white' : 'var(--primary-color)' }}>₹{pack.price.toLocaleString()}</span>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <button onClick={() => handleWhatsApp(`Hi, I want to order the ${pack.name} Family Pack for ₹${pack.price}.`)} className="btn btn-whatsapp" style={{ width: '100%', padding: '1rem', fontSize: '1rem', background: pack.popular ? '#ffd700' : '#25d366', color: pack.popular ? '#0b1641' : 'white' }}>
                      <MessageCircle size={20} /> Order via WhatsApp
                    </button>
                    <Link to="/shop" className="btn btn-outline" style={{ width: '100%', borderColor: pack.popular ? 'rgba(255,255,255,0.3)' : 'var(--border-color)', color: pack.popular ? 'white' : 'var(--text-main)' }}>
                      View Full Items List
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Product Categories Preview */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-main)' }}>Shop By Category</h2>
              <p style={{ color: 'var(--text-muted)' }}>Explore our wide range of individual crackers.</p>
            </div>
            <Link to="/shop" style={{ color: 'var(--primary-color)', fontWeight: 700, textDecoration: 'none' }}>View All →</Link>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
            {categories.slice(0, 6).map(category => (
              <Link to="/shop" key={category.id} className="premium-card-hover" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ padding: '2rem 1rem', background: 'white', border: '1px solid var(--border-color)', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', height: '100%' }}>
                  <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#fff5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconRenderer name={category.icon} size={32} color="var(--primary-color)" />
                  </div>
                  <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-main)', textAlign: 'center' }}>{category.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us */}
      <section style={{ padding: '4rem 0', background: 'var(--purple-bg)', color: 'white' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', fontWeight: 900, textAlign: 'center', marginBottom: '3rem', color: 'var(--gold-text)' }}>Why Choose Us?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            <div>
              <ShieldCheck size={48} color="var(--primary-color)" style={{ margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Genuine Sivakasi Products</h3>
              <p style={{ color: '#ccc', fontSize: '0.875rem' }}>100% authentic crackers direct from manufacturers.</p>
            </div>
            <div>
              <Truck size={48} color="var(--primary-color)" style={{ margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Safe & Secure Packing</h3>
              <p style={{ color: '#ccc', fontSize: '0.875rem' }}>Multi-layer packing ensures safety during transport.</p>
            </div>
            <div>
              <ThumbsUp size={48} color="var(--primary-color)" style={{ margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Wholesale Pricing</h3>
              <p style={{ color: '#ccc', fontSize: '0.875rem' }}>Best competitive prices for retail and bulk orders.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Footer / CTA */}
      <section style={{ padding: '3rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Ready to light up your celebrations?</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Get in touch with us for special bulk orders and corporate gifting.</p>
          <button onClick={() => handleWhatsApp("Hello, I have an enquiry regarding Diwali crackers.")} className="btn btn-whatsapp" style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}>
            <MessageCircle size={24} /> Enquire Now on WhatsApp
          </button>
        </div>
      </section>

      {/* 4. Best Sellers */}
      {bestSellers.length > 0 && (
        <section style={{ padding: '4rem 1rem', background: 'white' }}>
          <div className="container">
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '0.5rem', textAlign: 'center' }}>Best Selling Crackers</h2>
            <div style={{ width: '60px', height: '4px', background: 'var(--primary-color)', borderRadius: '2px', margin: '0 auto 3rem auto' }}></div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
              {bestSellers.slice(0, 8).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Exclusive Combo Packages */}
      <section id="family-packs" style={{ padding: '5rem 1rem', background: '#0b1641', color: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem', color: 'white' }}>Exclusive Combo Packages</h2>
            <p style={{ color: '#cbd5e1', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>Get the best value for your money with our carefully curated family combo packs. Perfect for a grand Diwali celebration.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'center' }}>
            {[
              { name: "Premium Pack", items: 35, oldPrice: "4,000", newPrice: "3,000", color: "#1e293b", highlight: false },
              { name: "Diamond Pack", items: 45, oldPrice: "7,000", newPrice: "5,000", color: "#d32f2f", highlight: true },
              { name: "Luxury Pack", items: 55, oldPrice: "14,000", newPrice: "10,000", color: "#1e293b", highlight: false }
            ].map((pack, idx) => (
              <div key={idx} style={{ 
                background: pack.color, borderRadius: '16px', padding: '2.5rem 2rem', textAlign: 'center',
                transform: pack.highlight ? 'scale(1.05)' : 'scale(1)',
                border: pack.highlight ? '2px solid #ffd700' : '1px solid rgba(255,255,255,0.1)',
                boxShadow: pack.highlight ? '0 20px 40px rgba(0,0,0,0.4)' : 'none',
                position: 'relative'
              }}>
                {pack.highlight && <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: '#ffd700', color: '#0b1641', padding: '0.25rem 1rem', borderRadius: '20px', fontWeight: 800, fontSize: '0.875rem' }}>MOST POPULAR</div>}
                
                <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem', color: pack.highlight ? '#ffd700' : 'white' }}>{pack.name}</h3>
                <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>{pack.items} Unique Items</p>
                
                <div style={{ marginBottom: '2rem' }}>
                  <span style={{ fontSize: '1.25rem', color: '#94a3b8', textDecoration: 'line-through', marginRight: '0.5rem' }}>₹{pack.oldPrice}</span>
                  <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white' }}>₹{pack.newPrice}</span>
                </div>
                
                <button className="btn" style={{ width: '100%', background: pack.highlight ? '#ffd700' : 'white', color: '#0b1641', padding: '1rem', fontSize: '1.125rem', fontWeight: 800 }}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why Choose Us (Trust Badges) */}
      <section style={{ padding: '4rem 1rem', background: '#fff9e6' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '80px', height: '80px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                <ShieldCheck size={40} color="#d32f2f" />
              </div>
              <h4 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>100% Authentic</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Genuine Sivakasi Crackers</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '80px', height: '80px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                <Truck size={40} color="#d32f2f" />
              </div>
              <h4 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>Fast Delivery</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Safe & secure packaging</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '80px', height: '80px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                <CreditCard size={40} color="#d32f2f" />
              </div>
              <h4 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>Secure Payment</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Multiple payment options</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '80px', height: '80px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                <Award size={40} color="#d32f2f" />
              </div>
              <h4 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>Premium Quality</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Tested & certified products</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Customer Testimonials */}
      <section style={{ padding: '5rem 1rem', background: 'white' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '0.5rem', textAlign: 'center' }}>What Our Customers Say</h2>
          <div style={{ width: '60px', height: '4px', background: 'var(--primary-color)', borderRadius: '2px', margin: '0 auto 3rem auto' }}></div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              { name: "Ramesh K.", review: "Ordered the Diamond pack for Diwali. Excellent quality and very safe packaging. The free peacock gift was a nice surprise!" },
              { name: "Priya S.", review: "Best crackers in the market. The sparklers lasted very long and the night sky shots were brilliant. Highly recommended." },
              { name: "Vijay M.", review: "Very fast delivery and the WhatsApp customer support was very helpful in tracking my order. Will buy again next year." }
            ].map((test, idx) => (
              <div key={idx} style={{ background: '#f8f9fa', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
                  {[1,2,3,4,5].map(star => <Star key={star} size={18} fill="#ffcc00" color="#ffcc00" />)}
                </div>
                <p style={{ color: 'var(--text-main)', fontSize: '1rem', fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: 1.6 }}>"{test.review}"</p>
                <div style={{ fontWeight: 800, color: '#d32f2f' }}>— {test.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
