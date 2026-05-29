import { NavLink } from 'react-router-dom';
import { Instagram, Facebook, Twitter, MapPin, Phone, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">🌯 Shawarma <span>House</span></div>
            <p>Fresh, hot, and unstoppable. Serving Nairobi's best shawarma since 2019 — made with love, real ingredients, and bold spice.</p>
            <div className="social-links">
              <a href="https://instagram.com/shawarmahouse" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram"><Instagram size={16} /></a>
              <a href="https://facebook.com/shawarmahouse" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook"><Facebook size={16} /></a>
              <a href="https://twitter.com/shawarmahouse" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter"><Twitter size={16} /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><NavLink to="/" viewTransition>Home</NavLink></li>
              <li><NavLink to="/menu" viewTransition>Full Menu</NavLink></li>
              <li><NavLink to="/about" viewTransition>Our Story</NavLink></li>
              <li><NavLink to="/gallery">Gallery & Offers</NavLink></li>
              <li><NavLink to="/contact" viewTransition>Contact</NavLink></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Menu</h4>
            <ul>
              <li><NavLink to="/menu?category=wraps" viewTransition>Shawarma Wraps</NavLink></li>
              <li><NavLink to="/menu?category=plates" viewTransition>Plates</NavLink></li>
              <li><NavLink to="/menu?category=choma" viewTransition>Nyama Choma</NavLink></li>
              <li><NavLink to="/menu?category=combos" viewTransition>Combo Deals</NavLink></li>
              <li><NavLink to="/menu?category=drinks" viewTransition>Drinks & Sides</NavLink></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <MapPin size={15} style={{ color: 'var(--orange)', flexShrink: 0, marginTop: 3 }} />
                <span style={{ color: 'var(--cream-dim)', fontSize: '0.9rem' }}>Kimathi St, Nairobi CBD</span>
              </li>
              <li style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Phone size={15} style={{ color: 'var(--orange)', flexShrink: 0 }} />
                <a href="tel:+254700000000" style={{ color: 'var(--cream-dim)', fontSize: '0.9rem' }}>+254 700 000 000</a>
              </li>
              <li style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Clock size={15} style={{ color: 'var(--orange)', flexShrink: 0 }} />
                <span style={{ color: 'var(--cream-dim)', fontSize: '0.9rem' }}>Daily 10AM – 11PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Shawarma House Kenya. All rights reserved. 🌯</p>
          <div className="halal-badge">✓ Halal Certified</div>
        </div>
      </div>
    </footer>
  );
}
