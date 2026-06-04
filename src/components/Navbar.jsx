import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, ShoppingBag, Flame } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount, toggleCart } = useCart();

  useEffect(() => {
    const onScroll = () => {
      // Trigger color change when scrolled past 90% of the viewport height (the Hero section)
      setScrolled(window.scrollY > window.innerHeight * 0.9);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/menu', label: 'Menu' },
    { to: '/catering', label: 'Catering' },
    { to: '/about', label: 'Our Story' },
    { to: '/gallery', label: 'Gallery & Offers' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <NavLink to="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }} viewTransition>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 36, height: 36, borderRadius: 8,
              background: 'linear-gradient(135deg, var(--orange), #FF4444)',
              color: 'white',
              boxShadow: '0 4px 12px rgba(255,107,53,0.4)'
            }}>
              <Flame size={22} strokeWidth={2.5} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, marginTop: 2 }}>
              <span style={{ fontSize: '1.25rem', color: 'var(--cream)', fontWeight: 800, letterSpacing: '-0.02em' }}>SHAWARMA</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.18em', fontWeight: 700, marginTop: 3 }}>House</span>
            </div>
          </NavLink>

          <ul className="nav-links">
            {links.map(l => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.to === '/'} className={({ isActive }) => isActive ? 'active' : ''} viewTransition>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              onClick={toggleCart}
              className="btn btn-primary btn-sm"
              style={{ display: 'flex', gap: 6, position: 'relative' }}
            >
              <ShoppingBag size={15} /> Cart
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: -6,
                  right: -6,
                  background: 'white',
                  color: 'var(--orange)',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  borderRadius: '50%',
                  width: 18,
                  height: 18,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}>
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="nav-mobile-btn"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`} style={{ position: 'fixed', top: 72, left: 0, right: 0, zIndex: 999 }}>
        {links.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/'}
            className={({ isActive }) => isActive ? 'active' : ''}
            onClick={() => setMobileOpen(false)}
            viewTransition
          >
            {l.label}
          </NavLink>
        ))}
        <button
          onClick={() => { setMobileOpen(false); toggleCart(); }}
          className="btn btn-primary"
          style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: 8, marginTop: '1rem', position: 'relative' }}
        >
          <ShoppingBag size={18} /> View Cart ({cartCount})
        </button>
      </div>
    </>
  );
}
