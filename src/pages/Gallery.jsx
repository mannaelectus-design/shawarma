import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tag, Clock, CheckCircle } from 'lucide-react';

const galleryImages = [
  { id: 1, src: '/images/hero_shawarma.webp', alt: 'Fresh Shawarma Wrap', span: 'col-span-2 row-span-2' },
  { id: 2, src: '/images/shawarma_spit.webp', alt: 'Roasting Shawarma Spit', span: 'col-span-1 row-span-1' },
  { id: 3, src: '/images/hummus_falafel.webp', alt: 'Hummus & Falafel', span: 'col-span-1 row-span-1' },
  { id: 4, src: '/images/shawarma_plate.webp', alt: 'Shawarma Platter', span: 'col-span-2 row-span-1' },
];

const offers = [
  {
    title: 'Lunch Hour Rush',
    desc: 'Get a free side of Classic Chips with every Shawarma Plate ordered between 12 PM and 2 PM.',
    code: 'LUNCH2026',
    expiry: 'Ends in 3 hours',
  },
  {
    title: 'Family Friday Feast',
    desc: '1Kg Nyama Choma, 2 Family Fries, and a 2L Soda for only KES 2,200. Save KES 400!',
    code: 'FRIDAYCHOMA',
    expiry: 'Valid on Fridays',
  }
];

export default function Gallery() {
  useEffect(() => {
    document.title = "Gallery & Offers | Shawarma House Kenya";
  }, []);

  return (
    <div className="page-wrapper" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
      <div className="container">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-header"
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <h1 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(40px, 6vw, 64px)', color: 'var(--cream)', lineHeight: 1.1, marginBottom: 16 }}>
            VISUALS & <span style={{ color: 'var(--orange)' }}>OFFERS</span>
          </h1>
          <p style={{ color: 'var(--cream-dim)', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto' }}>
            A feast for your eyes. Check out our latest food photography, customer moments, and limited-time deals.
          </p>
        </motion.div>

        {/* Offers Section */}
        <div style={{ marginBottom: 64 }}>
          <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: '2rem', color: 'var(--cream)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
            <Tag color="var(--orange)" /> CURRENT OFFERS
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {offers.map((offer, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 16,
                  padding: 24,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--orange)', color: 'white', padding: '4px 12px', borderBottomLeftRadius: 16, fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Clock size={14} /> {offer.expiry}
                </div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--cream)', marginBottom: 12, marginTop: 12 }}>{offer.title}</h3>
                <p style={{ color: 'var(--cream-dim)', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: 20 }}>{offer.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '8px 16px', borderRadius: 8, fontFamily: 'monospace', color: 'var(--orange)', fontWeight: 700 }}>
                    {offer.code}
                  </div>
                  <a href="https://wa.me/254700000000" target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                    Claim Offer
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div>
          <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: '2rem', color: 'var(--cream)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
            <CheckCircle color="var(--orange)" /> FRESH FROM THE GRILL
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gridAutoRows: '250px',
            gap: 16
          }}>
            {galleryImages.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  borderRadius: 16,
                  overflow: 'hidden',
                  background: 'rgba(255,255,255,0.05)',
                }}
                className={img.span} // Note: This requires specific tailwind-like grid classes, but standard CSS grid auto-fit handles it gracefully as fallback
              >
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  width={800}
                  height={600}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
