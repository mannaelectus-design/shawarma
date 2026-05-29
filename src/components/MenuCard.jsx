import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

import { memo } from 'react';

const badgeMap = {
  popular: { label: 'Popular', cls: 'badge-popular' },
  new: { label: 'New', cls: 'badge-new' },
  chef: { label: "Chef's Pick", cls: 'badge-chef' },
  veggie: { label: 'Veggie', cls: 'badge-veggie' },
  value: { label: 'Best Value', cls: 'badge-value' },
  hot: { label: 'Hot 🌶️', cls: 'badge-hot' },
};

const MenuCard = memo(function MenuCard({ item, index = 0 }) {
  const badge = item.badge ? badgeMap[item.badge] : null;

  const handleOrder = () => {
    const msg = encodeURIComponent(`Hi! I'd like to order: ${item.name} (KES ${item.price.toLocaleString()})`);
    window.open(`https://wa.me/254700000000?text=${msg}`, '_blank');
  };

  return (
    <motion.div
      className="menu-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
    >
      <div style={{ position: 'relative' }}>
        <div className="menu-card-image-placeholder" style={{ padding: 0, overflow: 'hidden' }}>
          {item.image ? (
            <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
          ) : (
            <span>{item.emoji || '🍽️'}</span>
          )}
        </div>
        {badge && (
          <div className="menu-card-badge">
            <span className={`badge ${badge.cls}`}>{badge.label}</span>
          </div>
        )}
      </div>
      <div className="menu-card-body">
        <h3 className="menu-card-name">{item.name}</h3>
        <p className="menu-card-desc">{item.desc}</p>
        <div className="menu-card-footer">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span className="menu-card-price">KES {item.price.toLocaleString()}</span>
            {item.category === 'combos' && (
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--orange)', marginTop: '2px', background: 'rgba(255, 94, 0, 0.1)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(255, 94, 0, 0.3)' }}>
                🔥 Save KES 150
              </span>
            )}
          </div>
          <button className="menu-card-order" onClick={handleOrder} aria-label={`Order ${item.name}`}>
            <MessageCircle size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
});

export default MenuCard;
