import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Droplets, MapPin, CheckCircle } from 'lucide-react';

export default function About() {
  useEffect(() => {
    document.title = "Our Story | Shawarma House Kenya";
  }, []);

  return (
    <div className="page-wrapper" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
      <div className="container">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-header"
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <h1 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(40px, 6vw, 64px)', color: 'var(--cream)', lineHeight: 1.1, marginBottom: 16 }}>
            OUR <span style={{ color: 'var(--orange)' }}>STORY</span>
          </h1>
          <p style={{ color: 'var(--cream-dim)', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto', marginBottom: 48 }}>
            Born from a passion for authentic Middle Eastern flavors and Kenyan hospitality.
          </p>
          <div style={{ width: '100%', height: '400px', borderRadius: '16px', overflow: 'hidden', marginBottom: '64px' }}>
            <img src="https://loremflickr.com/1600/900/shawarma,restaurant?lock=101" alt="Chef grilling meat" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, marginBottom: 80 }}>
          
          {/* Brand Story */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: '2rem', color: 'var(--cream)', marginBottom: 20 }}>BORN IN NAIROBI</h2>
            <p style={{ color: 'var(--cream-dim)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: 16 }}>
              It started with a simple craving. We wanted shawarma that actually tasted like the ones we grew up with — meat that was marinated overnight, stacked fresh, and slowly flame-grilled to perfection. No dry chicken. No bland sauces.
            </p>
            <p style={{ color: 'var(--cream-dim)', fontSize: '1.05rem', lineHeight: 1.7 }}>
              Today, Shawarma House is a local staple. We combined authentic Middle Eastern preparation methods with Kenyan ingredients to create a menu that hits the spot every single time. 
            </p>
          </motion.div>

          {/* Quality Promises */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ background: 'rgba(255,255,255,0.03)', padding: 24, borderRadius: 16 }}>
              <Flame size={28} color="var(--orange)" style={{ marginBottom: 12 }} />
              <h3 style={{ color: 'var(--cream)', fontSize: '1.2rem', marginBottom: 8 }}>Flame-Grilled Flavor</h3>
              <p style={{ color: 'var(--cream-dim)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                Whether it's our signature shawarma rotisserie or our juicy Nyama Choma grill, fire is our secret ingredient.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} style={{ background: 'rgba(255,255,255,0.03)', padding: 24, borderRadius: 16 }}>
              <Droplets size={28} color="var(--orange)" style={{ marginBottom: 12 }} />
              <h3 style={{ color: 'var(--cream)', fontSize: '1.2rem', marginBottom: 8 }}>Hygiene & Freshness</h3>
              <p style={{ color: 'var(--cream-dim)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                Our open kitchens are spotless. We source our produce daily from local Kenyan farmers and never freeze our meats.
              </p>
            </motion.div>
          </div>

        </div>

      </div>
    </div>
  );
}
