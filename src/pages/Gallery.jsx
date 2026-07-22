import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tag, Clock, CheckCircle, Flame, Gift } from 'lucide-react';
import { GalleryCard } from '../components/GalleryCard';
import ProgressiveImage from '../components/ProgressiveImage';

const galleryImages = [
  { id: 1, src: '/images/hero_features.webp', heading: 'Our Process', description: 'Fresh ingredients prepped daily for the ultimate shawarma experience.' },
  { id: 2, src: '/images/menu/menu_chicken.webp', heading: 'The Classic', description: 'Flame-grilled chicken wrapped in warm, toasted flatbread.' },
  { id: 3, src: '/images/menu/grill_goat.webp', heading: 'Nyama Choma', description: 'Authentic Kenyan style grilled goat, tender and flavorful.' },
  { id: 4, src: '/images/menu/plate_mixed.webp', heading: 'Mixed Platter', description: 'A massive feast perfect for sharing with friends and family.' },
];

const offers = [
  {
    title: 'Lunch Hour Rush',
    desc: 'Get a free side of Classic Chips & Garlic Dip with every Shawarma Plate ordered between 12 PM and 2 PM.',
    code: 'LUNCH2026',
    expiry: 'Daily 12 PM - 2 PM',
    tag: 'Popular',
    icon: Flame
  },
  {
    title: 'Family Friday Feast',
    desc: '1Kg Nyama Choma, 2 Family Fries, 4 Soft Drinks, and Mezze for only KES 2,200. Save KES 500!',
    code: 'FRIDAYCHOMA',
    expiry: 'Fridays Only',
    tag: 'Best Value',
    icon: Gift
  },
  {
    title: 'Weekend Combo Deal',
    desc: 'Buy 2 Jumbo Mixed Shawarmas & get 2 Signature Hibiscus Iced Teas completely free!',
    code: 'WEEKENDSHAKE',
    expiry: 'Sat & Sun Only',
    tag: 'Limited Deal',
    icon: Tag
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
          style={{ textAlign: 'center', marginBottom: 40 }}
        >
          <h1 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(40px, 6vw, 64px)', color: 'var(--cream)', lineHeight: 1.1, marginBottom: 16 }}>
            VISUALS & <span style={{ color: 'var(--orange)' }}>OFFERS</span>
          </h1>
          <p style={{ color: 'var(--cream-dim)', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto' }}>
            A feast for your eyes. Check out our latest food photography, customer moments, and limited-time deals.
          </p>
        </motion.div>

        {/* Featured Offers Photorealistic Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="offers-featured-banner"
        >
          <ProgressiveImage 
            src="/images/gallery_offers_new.webp"
            alt="Photorealistic Shawarma Special Offers Feast" 
            style={{ width: '100%', height: '100%' }}
            objectPosition="center 58%"
            priority
          />
          <div className="offers-featured-overlay">
            <span className="badge-orange">🔥 EXCLUSIVE DEALS</span>
            <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: 'var(--cream)', margin: '8px 0', lineHeight: 1.1 }}>
              SAVOR MORE FOR LESS
            </h2>
            <p style={{ color: 'var(--cream-dim)', fontSize: '0.98rem', maxWidth: 520, lineHeight: 1.5 }}>
              Claim special meal combos, lunch hour bundles, and family feasts. Show promo code at pickup or order directly via WhatsApp!
            </p>
          </div>
        </motion.div>

        {/* Offers Section */}
        <div style={{ marginBottom: 64 }}>
          <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: '2rem', color: 'var(--cream)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
            <Tag color="var(--orange)" /> CURRENT OFFERS & DEALS
          </h2>
          
          <div className="offers-grid">
            {offers.map((offer, i) => {
              const IconComp = offer.icon;
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="offer-card-enhanced"
                >
                  <div>
                    {/* Top Row: Badge & Expiry */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                      <span style={{ 
                        background: 'rgba(255, 107, 53, 0.15)', 
                        border: '1px solid rgba(255, 107, 53, 0.4)', 
                        color: 'var(--orange)', 
                        padding: '4px 10px', 
                        borderRadius: 20, 
                        fontSize: '0.75rem', 
                        fontWeight: 700, 
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4
                      }}>
                        <IconComp size={13} /> {offer.tag}
                      </span>
                      <div style={{ color: 'var(--cream-dim)', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Clock size={13} color="var(--orange)" /> {offer.expiry}
                      </div>
                    </div>

                    <h3 style={{ fontSize: '1.45rem', color: 'var(--cream)', marginBottom: 10, fontFamily: "'Anton', sans-serif", letterSpacing: '0.02em' }}>
                      {offer.title}
                    </h3>
                    <p style={{ color: 'var(--cream-dim)', fontSize: '0.95rem', lineHeight: 1.55, marginBottom: 24 }}>
                      {offer.desc}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="offer-code-box">
                      {offer.code}
                    </div>
                    <a 
                      href={`https://wa.me/254700000000?text=Hi%20Shawarma%20House,%20I%20would%20like%20to%20claim%20offer%20${offer.code}`} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="btn btn-primary btn-sm"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      Claim Offer
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        <div style={{ marginTop: 48 }}>
          <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: '2rem', color: 'var(--cream)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
            <CheckCircle color="var(--orange)" /> FRESH FROM THE GRILL
          </h2>
          <div className="mx-auto grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
            {galleryImages.map((img) => (
              <GalleryCard 
                key={img.id}
                heading={img.heading}
                description={img.description}
                imgSrc={img.src}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

