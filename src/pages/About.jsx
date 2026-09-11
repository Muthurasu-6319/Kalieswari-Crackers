import { ShieldCheck, Truck, Award, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import aboutBg from '../assets/about_bg.png';

export default function About() {
  return (
    <div style={{ paddingBottom: '4rem', background: '#fafafa' }}>
      
      {/* 1. Hero Section */}
      <section style={{ 
        backgroundImage: `linear-gradient(to right, rgba(11, 22, 65, 0.9), rgba(11, 22, 65, 0.7)), url(${aboutBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '6rem 2rem',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '1rem' }}>
            About <span style={{ color: '#ffd700' }}>Sri Kalieswaari</span> Crackers
          </h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto', color: '#cbd5e1', lineHeight: 1.6 }}>
            Bringing the authentic light of Sivakasi to every home in India. We are dedicated to providing the safest, brightest, and most premium fireworks for your celebrations.
          </p>
        </div>
      </section>

      {/* 2. Our Story & Vision */}
      <section style={{ padding: '5rem 1rem' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <div style={{ color: 'var(--primary-color)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>Our Legacy</div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '1.5rem', lineHeight: 1.2 }}>Rooted in the Heart of Sivakasi</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              For years, Sivakasi has been the undisputed fireworks capital of India. At Sri Kalieswaari Crackers, we carry forward this proud legacy by sourcing and manufacturing only the finest quality pyrotechnics. 
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', lineHeight: 1.8 }}>
              Our mission is simple: to make every festival memorable, vibrant, and above all, completely safe for you and your family. We bypass the middlemen to bring you direct wholesale pricing without ever compromising on quality.
            </p>
          </div>
          <div style={{ background: 'white', padding: '3rem', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={28} color="var(--primary-color)" /> Our Core Values
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <CheckCircle size={24} color="#25d366" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ display: 'block', color: 'var(--text-main)' }}>Uncompromising Quality</strong>
                  <span style={{ color: 'var(--text-muted)' }}>Every cracker is tested for proper fuse timing and brilliant chemical composition.</span>
                </div>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <CheckCircle size={24} color="#25d366" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ display: 'block', color: 'var(--text-main)' }}>Customer Safety First</strong>
                  <span style={{ color: 'var(--text-muted)' }}>We strictly adhere to the guidelines set by the Supreme Court and PESO.</span>
                </div>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <CheckCircle size={24} color="#25d366" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ display: 'block', color: 'var(--text-main)' }}>Transparent Pricing</strong>
                  <span style={{ color: 'var(--text-muted)' }}>Honest wholesale rates directly from the manufacturing hub to your doorstep.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Why We Stand Out */}
      <section style={{ padding: '5rem 1rem', background: '#0b1641', color: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>Why Choose Us?</h2>
            <div style={{ width: '60px', height: '4px', background: '#ffd700', borderRadius: '2px', margin: '0 auto' }}></div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <ShieldCheck size={48} color="#ffd700" style={{ margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>100% Genuine</h3>
              <p style={{ color: '#94a3b8' }}>We guarantee authentic Sivakasi brands with high bursting reliability.</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Truck size={48} color="#ffd700" style={{ margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>Safe Transit</h3>
              <p style={{ color: '#94a3b8' }}>Our corrugated box packaging ensures zero transit damage to the fireworks.</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Award size={48} color="#ffd700" style={{ margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>Best Offers</h3>
              <p style={{ color: '#94a3b8' }}>Exclusive combo packages and free gifts on high-value bulk purchases.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Safety Guidelines */}
      <section style={{ padding: '5rem 1rem' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <AlertTriangle size={48} color="var(--primary-color)" style={{ margin: '0 auto 1rem auto' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '1rem' }}>Safety Guidelines</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>Your joy is our priority, but your safety is our responsibility. Please follow these essential tips while bursting crackers.</p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              "Always burst crackers in an open area, away from houses and vehicles.",
              "Children must always be supervised by adults when handling fireworks.",
              "Keep a bucket of water and sand nearby for emergencies.",
              "Wear cotton clothes and avoid loose, synthetic garments.",
              "Never attempt to re-ignite a dud or failed cracker.",
              "Store fireworks in a cool, dry place away from children."
            ].map((tip, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.03)', border: '1px solid var(--border-color)' }}>
                <Info size={24} color="var(--primary-color)" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '1.125rem', fontWeight: 500, color: 'var(--text-main)' }}>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section style={{ padding: '0 1rem' }}>
        <div className="container">
          <div style={{ background: 'linear-gradient(135deg, var(--primary-color), #a10808)', padding: '4rem 2rem', borderRadius: '16px', textAlign: 'center', color: 'white', boxShadow: '0 20px 40px rgba(211, 47, 47, 0.3)' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>Ready to Celebrate?</h2>
            <p style={{ fontSize: '1.25rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto', opacity: 0.9 }}>
              Explore our wide range of authentic Sivakasi crackers and secure your order before stocks run out.
            </p>
            <Link to="/shop" className="btn" style={{ background: 'white', color: 'var(--primary-color)', fontSize: '1.125rem', padding: '1rem 2.5rem', borderRadius: '50px' }}>
              Shop Now
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
