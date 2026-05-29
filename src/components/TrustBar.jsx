import React from 'react';
import { Star, ShieldCheck, Clock } from 'lucide-react';

export default function TrustBar() {
  return (
    <div style={{
      backgroundColor: '#111',
      color: 'white',
      padding: '24px 16px',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '40px',
      position: 'relative',
      zIndex: 10
    }}>
      {/* Social Proof */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', color: '#fbbf24' }}>
          {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" strokeWidth={0} />)}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontWeight: 700, fontSize: '15px', lineHeight: 1.2 }}>4.9/5 Rating</span>
          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>Based on 2,000+ Reviews</span>
        </div>
      </div>

      {/* Halal Guarantee */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <ShieldCheck size={28} color="#10b981" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontWeight: 700, fontSize: '15px', lineHeight: 1.2 }}>100% Halal Certified</span>
          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>Premium Quality Meats</span>
        </div>
      </div>

      {/* Delivery Guarantee */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Clock size={28} color="#f97316" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontWeight: 700, fontSize: '15px', lineHeight: 1.2 }}>Fast CBD Delivery</span>
          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>Piping hot in 30 mins</span>
        </div>
      </div>
    </div>
  );
}
