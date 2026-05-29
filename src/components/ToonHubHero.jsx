import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────
const MENU_ITEMS = [
  {
    src: '/images/chicken_shawarma_mascot.png',
    bg: '#D4440A',      // deeper orange-red (brand)
    panel: '#E85F28',
    name: 'Classic Chicken',
    tag: 'Most Popular',
    price: 'KES 280',
    message: "Hi! I'd like to order the Classic Chicken Shawarma (KES 280)"
  },
  {
    src: '/images/beef_shawarma_mascot.png',
    bg: '#1A6B2F',
    panel: '#2E8B44',
    name: 'Beef Shawarma',
    tag: "Chef's Pick",
    price: 'KES 320',
    message: "Hi! I'd like to order the Beef Shawarma (KES 320)"
  },
  {
    src: '/images/mixed_shawarma_mascot.png',
    bg: '#8B1A5C',
    panel: '#B0266F',
    name: 'Mixed Shawarma',
    tag: 'New Arrival',
    price: 'KES 350',
    message: "Hi! I'd like to order the Mixed Shawarma (KES 350)"
  },
  {
    src: '/images/spicy_shawarma_mascot.png',
    bg: '#1A4A8B',
    panel: '#2260B5',
    name: 'Spicy Harissa',
    tag: 'Fan Favourite',
    price: 'KES 300',
    message: "Hi! I'd like to order the Spicy Harissa (KES 300)"
  },
];

// ─── Grain SVG noise overlay ─────────────────────────────────────
const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`;

const TRANSITION = '650ms cubic-bezier(0.4,0,0.2,1)';
const ITEM_TRANSITION = `transform ${TRANSITION}, filter ${TRANSITION}, opacity ${TRANSITION}, left ${TRANSITION}, bottom ${TRANSITION}, height ${TRANSITION}`;

export default function ToonHubHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const timerRef = useRef(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => navigate('next'), 5000);
    return () => clearInterval(timerRef.current);
  }, [activeIndex]);

  const navigate = useCallback((dir) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex(prev =>
      dir === 'next' ? (prev + 1) % 4 : (prev + 3) % 4
    );
    setTimeout(() => setIsAnimating(false), 650);
  }, [isAnimating]);

  const handleNav = (dir) => {
    clearInterval(timerRef.current);
    navigate(dir);
  };

  const center = activeIndex;
  const left   = (activeIndex + 3) % 4;
  const right  = (activeIndex + 1) % 4;
  const back   = (activeIndex + 2) % 4;

  const getRoleStyle = (idx) => {
    if (idx === center) return {
      left: '50%',
      transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
      filter: 'blur(0px)',
      opacity: 1,
      zIndex: 20,
      height: isMobile ? '60%' : '92%',
      bottom: isMobile ? '22%' : '0',
    };
    if (idx === left) return {
      left: isMobile ? '20%' : '30%',
      transform: 'translateX(-50%) scale(1)',
      filter: 'blur(2px)',
      opacity: 0.85,
      zIndex: 10,
      height: isMobile ? '16%' : '28%',
      bottom: isMobile ? '32%' : '12%',
    };
    if (idx === right) return {
      left: isMobile ? '80%' : '70%',
      transform: 'translateX(-50%) scale(1)',
      filter: 'blur(2px)',
      opacity: 0.85,
      zIndex: 10,
      height: isMobile ? '16%' : '28%',
      bottom: isMobile ? '32%' : '12%',
    };
    // back
    return {
      left: '50%',
      transform: 'translateX(-50%) scale(1)',
      filter: 'blur(4px)',
      opacity: 0,
      zIndex: 5,
      height: isMobile ? '13%' : '22%',
      bottom: isMobile ? '32%' : '12%',
    };
  };

  const active = MENU_ITEMS[activeIndex];
  const orderUrl = `https://wa.me/254700000000?text=${encodeURIComponent(active.message)}`;

  return (
    <div
      style={{
        backgroundColor: active.bg,
        transition: `background-color ${TRANSITION}`,
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

      {/* ── 2. Giant Ghost Text ── */}
      <div style={{
        position: 'absolute', inset: '0 0 auto 0', top: '18%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 2, pointerEvents: 'none', userSelect: 'none',
      }}>
        <span style={{
          fontFamily: "'Anton', sans-serif",
          fontSize: 'clamp(90px, 28vw, 380px)',
          fontWeight: 900,
          color: 'white',
          opacity: 0.12,
          lineHeight: 1,
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
          whiteSpace: 'nowrap',
          transition: `opacity ${TRANSITION}`,
        }}>
          SHAWARMA
        </span>
      </div>

      {/* ── 3. Top-left Brand ── */}
      <div style={{
        position: 'absolute', top: 24, left: isMobile ? 16 : 32,
        zIndex: 60,
        fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.18em',
        textTransform: 'uppercase', color: 'white', opacity: 0.9,
      }}>
        SHAWARMA HOUSE
      </div>

      {/* Top-right: active item tag + price */}
      <div style={{
        position: 'absolute', top: 20, right: isMobile ? 16 : 32,
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
          transition: `opacity ${TRANSITION}`,
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

      {/* ── 4. Carousel (Premium Images) ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
        {MENU_ITEMS.map((item, idx) => {
          const roleStyle = getRoleStyle(idx);
          return (
            <div
              key={idx}
              style={{
                position: 'absolute',
                aspectRatio: '0.6 / 1',
                transition: ITEM_TRANSITION,
                willChange: 'transform, filter, opacity',
                ...roleStyle,
              }}
            >
              <img
                src={item.src}
                alt={item.name}
                draggable={false}
                fetchPriority={idx === activeIndex ? "high" : "auto"}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'bottom center',
                }}
              />
            </div>
          );
        })}
      </div>

      {/* ── 5. Bottom-left: Label + Description + Buttons ── */}
      <div style={{
        position: 'absolute',
        bottom: isMobile ? 24 : 80,
        left: isMobile ? 16 : 96,
        zIndex: 60,
        maxWidth: 320,
      }}>
        {/* Active item name */}
        <p style={{
          fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.02em',
          fontSize: isMobile ? '1rem' : '22px',
          color: 'white', opacity: 0.95,
          marginBottom: isMobile ? 8 : 12,
          transition: `opacity ${TRANSITION}`,
        }}>
          {active.name}
        </p>

        {/* Description — hidden on mobile */}
        {!isMobile && (
          <p style={{
            fontSize: '0.875rem', color: 'white', opacity: 0.85,
            lineHeight: 1.6, marginBottom: 20,
          }}>
            Fresh, bold, and made to order. Our signature shawarma is marinated overnight with 12 spices and slow-roasted until perfect.
          </p>
        )}

        {/* Dot indicators */}
        <div style={{ display: 'flex', gap: 6, marginBottom: isMobile ? 14 : 20 }}>
          {MENU_ITEMS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (!isAnimating && i !== activeIndex) {
                  clearInterval(timerRef.current);
                  setIsAnimating(true);
                  setActiveIndex(i);
                  setTimeout(() => setIsAnimating(false), 650);
                }
              }}
              style={{
                width: i === activeIndex ? 24 : 8,
                height: 8, borderRadius: 4,
                background: i === activeIndex ? 'white' : 'rgba(255,255,255,0.4)',
                border: 'none', cursor: 'pointer', padding: 0,
                transition: `all ${TRANSITION}`,
              }}
              aria-label={`Go to item ${i + 1}`}
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

      {/* ── 6. Bottom-right: Discover link ── */}
      <div style={{
        position: 'absolute',
        bottom: isMobile ? 24 : 80,
        right: isMobile ? 16 : 40,
        zIndex: 60,
      }}>
        <a
          href={orderUrl}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(20px, 4vw, 56px)',
            fontWeight: 400,
            color: 'white', opacity: 0.95,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'opacity 200ms',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = 1}
          onMouseLeave={e => e.currentTarget.style.opacity = 0.95}
        >
          ORDER NOW
          <ArrowRight
            style={{ width: isMobile ? 20 : 32, height: isMobile ? 20 : 32 }}
            strokeWidth={2.25}
          />
        </a>
      </div>

    </div>
  );
}

// ─── Circular nav button ─────────────────────────────────────────
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
