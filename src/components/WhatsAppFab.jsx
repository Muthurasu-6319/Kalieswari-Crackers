import { MessageCircle } from 'lucide-react';

export default function WhatsAppFab() {
  const phoneNumber = "916380116372";
  const defaultMessage = "Hello Sri Kalieswaari Crackers! I am interested in placing a wholesale order.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <a 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab"
      style={{
        position: 'fixed',
        bottom: '5.5rem', /* Lifted to clear mobile bottom nav */
        right: '1.5rem',
        background: '#25d366',
        color: 'white',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 10px 25px rgba(37, 211, 102, 0.4)',
        zIndex: 1000,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1) translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 15px 35px rgba(37, 211, 102, 0.6)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1) translateY(0)';
        e.currentTarget.style.boxShadow = '0 10px 25px rgba(37, 211, 102, 0.4)';
      }}
    >
      <MessageCircle size={32} />
      {/* Pulse animation is handled in index.css */}
    </a>
  );
}
