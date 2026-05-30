import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

// ─── Data: 5 Shawarma House Branded Figurines ────────────────────
const FIGURINES = [
  {
    id: 'hero-1',
    src: '/images/figurine-1.webp',
    bg: '#FF6B35',
    panel: '#FF8C61',
    name: 'Classic Chicken Shawarma',
    tag: 'Most Popular',
    price: 'KES 280',
    priceValue: 280,
    desc: 'Classic chicken shawarma — marinated overnight, flame-grilled, wrapped fresh.',
  },
  {
    id: 'hero-2',
    src: '/images/figurine-2.webp',
    bg: '#C1272D',
    panel: '#D8454A',
    name: 'Premium Beef Shawarma',
    tag: "Chef's Pick",
    price: 'KES 320',
    priceValue: 320,
    desc: 'Premium beef shawarma with house-made garlic sauce and pickled turnips.',
  },
  {
    id: 'hero-3',
    src: '/images/figurine-3.webp',
    bg: '#FF6B35',
    panel: '#FF8C61',
    name: 'Mixed Shawarma',
    tag: 'Fan Favourite',
    price: 'KES 350',
    priceValue: 350,
    desc: 'Mixed shawarma sliced fresh off the spit — chicken & beef, double the flavour.',
  },
  {
    id: 'hero-4',
    src: '/images/figurine-4.webp',
    bg: '#C1272D',
    panel: '#D8454A',
    name: 'Combo Platter',
    tag: 'Best Value',
    price: 'KES 550',
    priceValue: 550,
    desc: 'Full combo platter: shawarma, golden fries, fresh salad & mint lemonade.',
  },
  {
    id: 'hero-5',
    src: '/images/figurine-5.webp',
    bg: '#4CAF50',
    panel: '#6BCB77',
    name: 'Spicy Harissa Shawarma',
    tag: 'New',
    price: 'KES 300',
    priceValue: 300,
    desc: 'Hot & fresh to your door in 30 mins. Our delivery riders never keep you waiting.',
  },
];

const COUNT = FIGURINES.length;

// ─── Grain SVG noise overlay ─────────────────────────────────────
const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`;

const EASE = '650ms cubic-bezier(0.4,0,0.2,1)';
const ITEM_TRANSITION = `transform ${EASE}, filter ${EASE}, opacity ${EASE}, left ${EASE}, bottom ${EASE}, height ${EASE}`;

// ─── Main Component ──────────────────────────────────────────────
export default function ShawarmaHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const isAnimatingRef = useRef(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const { addToCart } = useCart();
  const timerRef = useRef(null);

  // Preload only the first figurine on mount to optimize LCP, others naturally load later
  useEffect(() => {
    const img = new Image();
    img.src = FIGURINES[0].src;
  }, []);

  // Responsive breakpoint
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const navigate = useCallback((dir) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsAnimating(true);
    setActiveIndex(prev =>
      dir === 'next' ? (prev + 1) % COUNT : (prev + COUNT - 1) % COUNT
    );
    setTimeout(() => {
      isAnimatingRef.current = false;
      setIsAnimating(false);
    }, 650);
  }, []);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    timerRef.current = setInterval(() => navigate('next'), 5000);
    return () => clearInterval(timerRef.current);
  }, [navigate]);

  const handleNav = useCallback((dir) => {
    clearInterval(timerRef.current);
    navigate(dir);
    timerRef.current = setInterval(() => navigate('next'), 5000);
  }, [navigate]);

  const jumpTo = useCallback((i) => {
    if (isAnimatingRef.current || i === activeIndex) return;
    clearInterval(timerRef.current);
    isAnimatingRef.current = true;
    setIsAnimating(true);
    setActiveIndex(i);
    setTimeout(() => {
      isAnimatingRef.current = false;
      setIsAnimating(false);
    }, 650);
    timerRef.current = setInterval(() => navigate('next'), 5000);
  }, [activeIndex, navigate]);

  // ─── Role calculations for 5 items ────────────────────────────
  const center  = activeIndex;
  const left    = (activeIndex + COUNT - 1) % COUNT;
  const right   = (activeIndex + 1) % COUNT;
  const back    = (activeIndex + COUNT - 2) % COUNT;
  const farBack = (activeIndex + 2) % COUNT;

  const getRole = (idx) => {
    if (idx === center) return 'center';
    if (idx === left) return 'left';
    if (idx === right) return 'right';
    if (idx === back) return 'back';
    return 'farBack';
  };

  const figurineLayoutVariants = {
    center: {
      left: '50%',
      x: '-50%',
      scale: isMobile ? 1.25 : 1.68,
      filter: 'blur(0px) brightness(1)',
      opacity: 1,
      zIndex: 20,
      height: isMobile ? '60%' : '92%',
      bottom: isMobile ? '22%' : '0%',
      transition: { duration: 0.8, type: 'spring', bounce: 0.25 }
    },
    left: {
      left: isMobile ? '20%' : '30%',
      x: '-50%',
      scale: 1,
      filter: 'blur(2px) brightness(0.8)',
      opacity: 0.85,
      zIndex: 10,
      height: isMobile ? '16%' : '28%',
      bottom: isMobile ? '32%' : '12%',
      transition: { duration: 0.8, type: 'spring', bounce: 0.2 }
    },
    right: {
      left: isMobile ? '80%' : '70%',
      x: '-50%',
      scale: 1,
      filter: 'blur(2px) brightness(0.8)',
      opacity: 0.85,
      zIndex: 10,
      height: isMobile ? '16%' : '28%',
      bottom: isMobile ? '32%' : '12%',
      transition: { duration: 0.8, type: 'spring', bounce: 0.2 }
    },
    back: {
      left: isMobile ? '35%' : '40%',
      x: '-50%',
      scale: 0.95,
      filter: isMobile ? 'blur(2px) brightness(0.6)' : 'blur(4px) brightness(0.6)',
      opacity: 0.5,
      zIndex: 5,
      height: isMobile ? '13%' : '22%',
      bottom: isMobile ? '32%' : '12%',
      transition: { duration: 0.8, type: 'spring', bounce: 0.15 }
    },
    farBack: {
      left: isMobile ? '65%' : '60%',
      x: '-50%',
      scale: 0.9,
      filter: isMobile ? 'blur(3px) brightness(0.5)' : 'blur(5px) brightness(0.5)',
      opacity: 0.3,
      zIndex: 3,
      height: isMobile ? '11%' : '19%',
      bottom: isMobile ? '34%' : '14%',
      transition: { duration: 0.8, type: 'spring', bounce: 0.15 }
    }
  };

  const active = FIGURINES[activeIndex];

  return (
    <div
      style={{
        backgroundColor: active.bg,
        transition: `background-color ${EASE}`,
        fontFamily: "'Inter', sans-serif",
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* ── 1. Grain Overlay ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 50, pointerEvents: 'none',
        backgroundImage: GRAIN_SVG,
        backgroundSize: '200px 200px',
        backgroundRepeat: 'repeat',
        opacity: 0.4,
      }} />

      {/* ── 2. Giant Ghost Text (Infinite Marquee) ── */}
      <div
        className="marquee-outer"
        style={{
          position: 'absolute',
          top: '18%',
          left: 0,
          right: 0,
          zIndex: 2,
          pointerEvents: 'none',
          userSelect: 'none',
          lineHeight: 1,
        }}
      >
        <div className="marquee-track">
          {/* Half 1 */}
          <div className="marquee-half">
            {['SHAWARMA', 'SHAWARMA', 'SHAWARMA', 'SHAWARMA'].map((w, i) => (
              <span key={`a${i}`} className="marquee-word">{w}</span>
            ))}
          </div>
          {/* Half 2 — byte-for-byte identical so -50% lands perfectly */}
          <div className="marquee-half" aria-hidden="true">
            {['SHAWARMA', 'SHAWARMA', 'SHAWARMA', 'SHAWARMA'].map((w, i) => (
              <span key={`b${i}`} className="marquee-word">{w}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── NEW LPO HERO COPY & CTAs ── */}
      <div style={{
        position: 'absolute',
        top: isMobile ? 130 : 160,
        left: isMobile ? 16 : 32,
        zIndex: 60,
        maxWidth: 580,
      }}>
        <h1 style={{
          fontFamily: "'Anton', sans-serif",
          fontSize: 'clamp(44px, 6vw, 90px)',
          color: 'white',
          lineHeight: 1.05,
          letterSpacing: '0.01em',
          margin: 0,
          textTransform: 'uppercase',
          textShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}>
          Authentic Arab Shawarma.<br/>
          <span style={{ color: 'var(--orange)' }}>Delivered Piping Hot.</span>
        </h1>
      </div>

      {/* ── 3. Top-left Brand ── */}
      <div style={{
        position: 'absolute', top: isMobile ? 90 : 110, left: isMobile ? 16 : 32,
        zIndex: 60,
        fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.18em',
        textTransform: 'uppercase', color: 'white', opacity: 0.9,
      }}>
        SHAWARMA HOUSE
      </div>

      {/* ── Top-right: Active figurine tag + price ── */}
      <div style={{
        position: 'absolute', top: isMobile ? 86 : 106, right: isMobile ? 16 : 32,
        zIndex: 60,
        display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4,
      }}>
        <span style={{
          background: 'rgba(255,255,255,0.18)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: 999,
          padding: '4px 14px',
          fontSize: '0.7rem', fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '0.12em',
          color: 'white',
          transition: `opacity ${EASE}`,
        }}>
          {active.tag}
        </span>
        <span style={{
          fontFamily: "'Anton', sans-serif",
          fontSize: 'clamp(18px, 3.5vw, 36px)',
          color: 'white', opacity: 0.95,
          letterSpacing: '-0.01em',
        }}>
          {active.price}
        </span>
      </div>

      {/* ── 4. Figurine Carousel ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
        {FIGURINES.map((fig, idx) => {
          const role = getRole(idx);
          const isActive = role === 'center';

          return (
            <motion.div
              key={fig.name}
              initial={false}
              animate={role}
              variants={figurineLayoutVariants}
              style={{
                position: 'absolute',
                aspectRatio: '0.6 / 1',
                willChange: 'transform, filter, opacity, left, bottom, height',
              }}
            >
              <motion.div
                style={{ width: '100%', height: '100%', originY: 1 }}
                animate={isActive ? "idle" : "static"}
                variants={{
                  static: { y: 0, scale: 1 },
                  idle: { 
                    y: [0, -12, 0], 
                    scale: [1, 1.015, 1],
                    transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
                  }
                }}
              >
                <motion.div
                  style={{ width: '100%', height: '100%', originY: 1 }}
                  whileHover={isActive && !isAnimating ? { y: -15, scale: 1.06, filter: 'drop-shadow(0px 25px 30px rgba(0,0,0,0.4))' } : { filter: 'drop-shadow(0px 0px 0px rgba(0,0,0,0))' }}
                  transition={{ type: 'spring', bounce: 0.5, duration: 0.6 }}
                >
                  <img
                    src={fig.src}
                    alt={fig.name}
                    draggable={false}
                    loading={isActive ? "eager" : "lazy"}
                    fetchPriority={isActive ? 'high' : 'auto'}
                    style={{
                      width: '100%', height: '100%',
                      objectFit: 'contain',
                      objectPosition: 'bottom center',
                    }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* ── 5. Bottom-left: Label + Desc + Dots + Nav ── */}
      <div style={{
        position: 'absolute',
        bottom: isMobile ? 24 : 80,
        left: isMobile ? 16 : 96,
        zIndex: 60,
        maxWidth: 340,
      }}>
        {/* Active figurine name */}
        <p 
          aria-live="polite"
          style={{
          fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.02em',
          fontSize: isMobile ? '1rem' : '22px',
          color: 'white', opacity: 0.95,
          marginBottom: isMobile ? 8 : 12,
          transition: `opacity ${EASE}`,
        }}>
          {active.name}
        </p>

        {/* Description — hidden on mobile */}
        {!isMobile && (
          <p style={{
            fontSize: '0.875rem', color: 'white', opacity: 0.85,
            lineHeight: 1.6, marginBottom: 20,
          }}>
            {active.desc}
          </p>
        )}

        {/* Dot indicators */}
        <div style={{ display: 'flex', gap: 6, marginBottom: isMobile ? 14 : 20 }}>
          {FIGURINES.map((_, i) => (
            <button
              key={i}
              onClick={() => jumpTo(i)}
              style={{
                width: i === activeIndex ? 24 : 8,
                height: 8, borderRadius: 4,
                background: i === activeIndex ? 'white' : 'rgba(255,255,255,0.4)',
                border: '10px solid transparent', cursor: 'pointer', padding: 0,
                backgroundClip: 'padding-box',
                transition: `all ${EASE}`,
              }}
              aria-label={`Go to figurine ${i + 1}`}
            />
          ))}
        </div>

        {/* Nav Buttons */}
        <div style={{ display: 'flex', gap: 12 }}>
          {[
            { icon: <ArrowLeft size={26} strokeWidth={2.25} />, dir: 'prev', label: 'Previous' },
            { icon: <ArrowRight size={26} strokeWidth={2.25} />, dir: 'next', label: 'Next' },
          ].map(btn => (
            <NavButton
              key={btn.dir}
              onClick={() => handleNav(btn.dir)}
              label={btn.label}
              isMobile={isMobile}
            >
              {btn.icon}
            </NavButton>
          ))}
        </div>
      </div>

      {/* ── 6. Bottom-right: Order CTA ── */}
      <div style={{
        position: 'absolute',
        bottom: isMobile ? 32 : 64,
        right: isMobile ? 24 : 64,
        zIndex: 60,
      }}>
        <button
          onClick={() => {
            addToCart({
              id: active.id,
              name: active.name,
              price: active.priceValue,
              image: active.src
            });
          }}
          style={{
            display: 'flex', alignItems: 'center', gap: 12,
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(24px, 4vw, 42px)',
            fontWeight: 400,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'white', opacity: 0.95,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'opacity 200ms',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '1'}
          onMouseLeave={e => e.currentTarget.style.opacity = '0.95'}
        >
          ORDER NOW
          <ShoppingBag
            style={{ width: isMobile ? 24 : 32, height: isMobile ? 24 : 32 }}
            strokeWidth={2.25}
          />
        </button>
      </div>

    </div>
  );
}
// ─── Circular nav button with hover interaction ──────────────────
function NavButton({ onClick, label, isMobile, children }) {
  const [hovered, setHovered] = useState(false);
  const size = isMobile ? 48 : 64;

  return (
    <button
      onClick={onClick}
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: size, height: size,
        borderRadius: '50%',
        background: hovered ? 'rgba(255,255,255,0.12)' : 'transparent',
        border: '2px solid white',
        color: 'white',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
        transform: hovered ? 'scale(1.08)' : 'scale(1)',
        transition: 'transform 150ms, background-color 150ms',
        padding: 0,
      }}
    >
      {children}
    </button>
  );
}
