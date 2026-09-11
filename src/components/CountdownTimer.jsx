import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const CountdownTimer = () => {
  const { saleEndDate } = useData();
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    // If saleEndDate is not set, default to returning immediately
    if (!saleEndDate) return;

    const targetDate = new Date(saleEndDate);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
        return;
      }

      const d = Math.floor(distance / (1000 * 60 * 60 * 24));
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ d, h, m, s });
    }, 1000);

    return () => clearInterval(interval);
  }, [saleEndDate]);

  return (
    <div style={{
      background: 'linear-gradient(90deg, #ea580c, #dc2626, #ea580c)',
      backgroundSize: '200% auto',
      animation: 'gradient-slide 3s linear infinite',
      color: 'white',
      padding: '0.75rem',
      textAlign: 'center',
      fontSize: '0.875rem',
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.5rem',
      boxShadow: '0 4px 10px rgba(220, 38, 38, 0.3)',
      position: 'relative',
      zIndex: 100,
      flexWrap: 'wrap'
    }}>
      <style>
        {`
          @keyframes gradient-slide {
            0% { background-position: 0% center; }
            100% { background-position: 200% center; }
          }
          @keyframes pulse-glow {
            0% { opacity: 0.8; text-shadow: 0 0 5px rgba(254, 240, 138, 0.5); }
            50% { opacity: 1; text-shadow: 0 0 20px rgba(254, 240, 138, 1); }
            100% { opacity: 0.8; text-shadow: 0 0 5px rgba(254, 240, 138, 0.5); }
          }
        `}
      </style>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', letterSpacing: '1px' }}>
        <span style={{ fontSize: '1.25rem', animation: 'bounce 2s infinite' }}>🎆</span> 
        DIWALI MEGA SALE: FLAT 90% OFF
      </div>
      
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.75rem', 
        background: 'rgba(0,0,0,0.25)', 
        padding: '0.25rem 1rem', 
        borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        <Timer size={16} color="#fef08a" /> 
        <span style={{ color: '#fef08a' }}>Ends In:</span>
        <div style={{ 
          fontFamily: 'monospace', 
          fontSize: '1.125rem', 
          color: 'white',
          animation: 'pulse-glow 2s infinite',
          display: 'flex',
          gap: '0.25rem'
        }}>
          <span>{String(timeLeft.d).padStart(2, '0')}d</span>
          <span>{String(timeLeft.h).padStart(2, '0')}h</span>
          <span>{String(timeLeft.m).padStart(2, '0')}m</span>
          <span>{String(timeLeft.s).padStart(2, '0')}s</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
