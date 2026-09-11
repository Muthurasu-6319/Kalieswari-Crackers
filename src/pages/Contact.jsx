import { MapPin, Phone, Mail, Clock, MessageSquare, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      question: "What is the minimum order value for wholesale pricing?",
      answer: "To avail our wholesale pricing, the minimum order value is ₹3,000. Orders above ₹5,000 are eligible for exciting free gifts!"
    },
    {
      question: "Do you deliver crackers to my state/city?",
      answer: "We dispatch crackers through verified transport agencies across Tamil Nadu, Karnataka, Kerala, Andhra Pradesh, and Telangana. Delivery depends on the transporter's serviceability in your specific pincode."
    },
    {
      question: "How long does delivery take?",
      answer: "Once dispatched from our Sivakasi godown, delivery usually takes 2 to 5 business days depending on your location."
    },
    {
      question: "Is cash on delivery (COD) available?",
      answer: "Currently, we do not offer Cash on Delivery. All orders must be prepaid through secure banking channels before dispatch from Sivakasi."
    }
  ];

  return (
    <div style={{ paddingBottom: '4rem', background: '#fafafa' }}>
      
      {/* 1. Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #0b1641, #1e3a8a)',
        padding: '5rem 2rem',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '1rem' }}>
            Get in <span style={{ color: '#ffd700' }}>Touch</span>
          </h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto', color: '#cbd5e1' }}>
            Have a question about bulk orders, pricing, or delivery? We are here to help you make your celebrations brighter.
          </p>
        </div>
      </section>

      {/* 2. Contact Information Cards */}
      <section style={{ padding: '4rem 1rem', marginTop: '-3rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            
            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', background: '#fff5f5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                <MapPin size={28} color="#d32f2f" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>Our Godown</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>123 Main Bazaar Road,<br/>Sivakasi, Tamil Nadu - 626123</p>
            </div>

            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', background: '#fff5f5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                <Phone size={28} color="#d32f2f" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>Call / WhatsApp</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>+91 63801 16372</p>
            </div>

            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', background: '#fff5f5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                <Mail size={28} color="#d32f2f" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>Email Us</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>harishponraj901@gmail.com</p>
            </div>

            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', background: '#fff5f5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                <Clock size={28} color="#d32f2f" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>Working Hours</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Monday - Saturday<br/>9:00 AM to 8:00 PM</p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Form & Map Section */}
      <section style={{ padding: '2rem 1rem 5rem 1rem' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          {/* Contact Form */}
          <div style={{ background: 'white', padding: '3rem', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', border: '1px solid var(--border-color)' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '0.5rem' }}>Send an Enquiry</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Fill out the form below and our sales team will get back to you with the best wholesale prices.</p>
            
            <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem' }}>First Name</label>
                  <input type="text" placeholder="John" style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem' }}>Last Name</label>
                  <input type="text" placeholder="Doe" style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }} />
                </div>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem' }}>Phone / WhatsApp Number</label>
                <input type="tel" placeholder="+91 63801 16372" style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }} />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem' }}>Your Message</label>
                <textarea rows="4" placeholder="I would like to know the bulk pricing for..." style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none', resize: 'vertical' }}></textarea>
              </div>
              
              <button className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.125rem', marginTop: '0.5rem' }}>
                <Send size={20} /> Send Message
              </button>
            </form>
          </div>

          {/* Google Map */}
          <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', border: '1px solid var(--border-color)', height: '100%', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '1.5rem', background: '#0b1641', color: 'white' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={20} color="#ffd700" /> Locate Us in Sivakasi
              </h3>
            </div>
            {/* Embedded Google Map (Sivakasi coordinates) */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62957.51478142838!2d77.7554904!3d9.4533036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06cee43b812f2d%3A0x8ce12e9dcdaa2a2c!2sSivakasi%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0, flex: 1 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>

        </div>
      </section>

      {/* 4. FAQ Section */}
      <section style={{ padding: '4rem 1rem', background: 'white' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <MessageSquare size={48} color="var(--primary-color)" style={{ margin: '0 auto 1rem auto' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '0.5rem' }}>Frequently Asked Questions</h2>
            <div style={{ width: '60px', height: '4px', background: 'var(--primary-color)', borderRadius: '2px', margin: '0 auto' }}></div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, idx) => (
              <div key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden' }}>
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  style={{ width: '100%', padding: '1.5rem', background: activeFaq === idx ? '#fff5f5' : 'white', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}
                >
                  <span style={{ fontSize: '1.125rem', fontWeight: 700, color: activeFaq === idx ? 'var(--primary-color)' : 'var(--text-main)' }}>
                    {faq.question}
                  </span>
                  {activeFaq === idx ? <ChevronUp size={20} color="var(--primary-color)" /> : <ChevronDown size={20} color="var(--text-muted)" />}
                </button>
                {activeFaq === idx && (
                  <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', background: '#fff5f5', color: 'var(--text-muted)', lineHeight: 1.6, borderTop: '1px solid rgba(211, 47, 47, 0.1)' }}>
                    <div style={{ paddingTop: '1rem' }}>{faq.answer}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
