import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { menuItems, menuCategories } from '../data/menu';
import MenuCard from '../components/MenuCard';
import SEO from '../components/SEO';
import { FlipReveal, FlipRevealItem } from '../components/FlipReveal';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('all');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      setActiveCategory(category);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.search]);



  return (
    <div className="page-wrapper" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
      <SEO 
        title="Full Menu | Shawarma House Kenya" 
        description="Browse our full menu of authentic shawarma wraps, flame-grilled plates, nyama choma, and delicious combo deals." 
      />
      <div className="container">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-header"
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <h1 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(40px, 6vw, 64px)', color: 'var(--cream)', lineHeight: 1.1, marginBottom: 16 }}>
            OUR <span style={{ color: 'var(--orange)' }}>MENU</span>
          </h1>
          <p style={{ color: 'var(--cream-dim)', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto' }}>
            Freshly prepared, flame-grilled goodness. Find your craving below and hit the order button when you're ready.
          </p>
        </motion.div>

        {/* Category Filters for Mobile Scanning */}
        <div className="category-tabs" style={{ paddingBottom: 24, marginBottom: 32 }}>
          <button 
            className={`tab-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All Items
          </button>
          {menuCategories.map(cat => (
            <button 
              key={cat.id}
              className={`tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span>{cat.emoji}</span> {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <FlipReveal 
          activeCategory={activeCategory} 
          className="menu-grid" 
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}
        >
          {menuItems.map((item, i) => (
            <FlipRevealItem key={item.id} flipKey={item.category} style={{ height: '100%' }}>
              <MenuCard item={item} index={i} style={{ height: '100%' }} />
            </FlipRevealItem>
          ))}
        </FlipReveal>

        {/* CTA */}
        <div style={{ marginTop: 64, textAlign: 'center', background: 'rgba(212,68,10,0.1)', padding: 48, borderRadius: 16 }}>
          <h3 style={{ fontFamily: "'Anton', sans-serif", fontSize: '2rem', color: 'var(--cream)', marginBottom: 16 }}>KNOW WHAT YOU WANT?</h3>
          <a href="https://wa.me/254700000000" target="_blank" rel="noreferrer" className="btn btn-primary btn-lg">
            Order Now on WhatsApp
          </a>
        </div>

      </div>
    </div>
  );
}
