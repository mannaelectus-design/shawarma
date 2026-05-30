import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MessageCircle, UtensilsCrossed, MapPin, Star, Leaf, Zap, ShieldCheck, Truck } from 'lucide-react';
import { CircularTestimonials } from '../components/CircularTestimonials';
import ProgressiveImage from '../components/ProgressiveImage';
import { featuredItems, menuItems } from '../data/menu';
import MenuCard from '../components/MenuCard';
import ShawarmaHero from '../components/ShawarmaHero';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function Home() {
  useEffect(() => {
    document.title = "Shawarma, Chips & Nyama Choma Done Fresh | Shawarma House";
  }, []);

  const parallaxRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"]
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const testimonials = [
    { text: "Best shawarma in town. The meat is so tender and the sauce is incredible.", author: "David K." },
    { text: "Fast service and great portions. I order from here every Friday.", author: "Sarah M." },
    { text: "The family combo meals are totally worth it. Flame-grilled perfection.", author: "John O." },
  ];

  const combos = menuItems.filter(item => item.category === 'combos');

  return (
    <div className="page-wrapper">

      {/* ══════════════════ HERO ══════════════════ */}
      <ShawarmaHero />

      {/* ══════════════════ FEATURES STRIP ══════════════════ */}
      <div className="features-strip">
        <div className="container">
          <div className="features-inner">
            {[
              { icon: <Leaf size={18} />, label: 'Fresh Daily' },
              { icon: <Zap size={18} />, label: 'Ready in 8 mins' },
              { icon: <ShieldCheck size={18} />, label: 'Halal Certified' },
              { icon: <Truck size={18} />, label: 'Delivery Available' },
              { icon: <Star size={18} />, label: '4.9★ Rated' },
            ].map(f => (
              <div className="feature-item" key={f.label}>
                <span className="feature-icon">{f.icon}</span>
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════ FEATURED MENU ══════════════════ */}
      <section className="section" style={{ background: 'var(--charcoal-light)' }}>
        <div className="container">
          <motion.div
            className="section-header text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2, margin: "0px 0px -50px 0px" }}
            variants={stagger}
          >
            <motion.span className="overline" variants={fadeUp}>From Our Kitchen</motion.span>
            <motion.h2 className="section-title" variants={fadeUp}>
              Customer <span className="text-orange">Favourites</span>
            </motion.h2>
            <div className="divider divider-center" />
            <motion.p className="section-subtitle" style={{ margin: '0 auto' }} variants={fadeUp}>
              The dishes Nairobi keeps coming back for — tried, tested, and absolutely irresistible.
            </motion.p>
          </motion.div>

          <div className="grid-3" style={{ marginBottom: 40 }}>
            {featuredItems.map((item, i) => (
              <MenuCard key={item.id} item={item} index={i} useMask={true} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/menu" className="btn btn-primary btn-lg" viewTransition>
              <UtensilsCrossed size={18} />
              See Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════ WHY CHOOSE US ══════════════════ */}
      <section ref={parallaxRef} className="section" style={{ position: 'relative', overflow: 'hidden' }}>
        <motion.div style={{ position: 'absolute', top: '-20%', bottom: '-20%', left: 0, right: 0, y: backgroundY }}>
          <ProgressiveImage
            src="/images/why_different_flames.webp"
            alt="Chef carving shawarma from a vertical spit with flames in the background"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </motion.div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(16, 8, 5, 0.95) 0%, rgba(16, 8, 5, 0.7) 50%, rgba(16, 8, 5, 0.2) 100%)', zIndex: 1 }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2, margin: "0px 0px -50px 0px" }}
            variants={stagger}
            style={{ textAlign: 'left', marginBottom: 48 }}
          >
            <motion.span className="overline" variants={fadeUp}>Why We're Different</motion.span>
            <motion.h2 className="section-title" variants={fadeUp}>
              Real Food. <span className="text-orange">Real Flavour.</span>
            </motion.h2>
            <div className="divider" style={{ marginLeft: 0 }} />
            <p style={{ color: 'var(--cream-dim)', maxWidth: 600, fontSize: '1.1rem' }}>
              We don't cut corners. From our overnight marinades to our blazing grills, everything is designed for maximum flavor.
            </p>
          </motion.div>

          <div style={{ maxWidth: '600px' }}>
            <div className="why-grid" style={{ gridTemplateColumns: '1fr', display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {[
                {
                  icon: <Leaf size={26} />, title: 'Fresh Ingredients',
                  desc: 'Crisp veggies, daily-baked pita, and premium cuts of meat.',
                },
                {
                  icon: <UtensilsCrossed size={26} />, title: 'Flame-Grilled',
                  desc: 'Authentic roasting methods for that unbeatable smoky taste.',
                },
                {
                  icon: <Truck size={26} />, title: 'Fast Delivery',
                  desc: "Hot and fresh to your door, exactly when you crave it.",
                },
              ].map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}
                >
                  <div className="why-icon" style={{ flexShrink: 0, marginBottom: 0 }}>{card.icon}</div>
                  <div>
                    <h3 className="why-title" style={{ color: 'var(--white)' }}>{card.title}</h3>
                    <p className="why-desc" style={{ color: 'rgba(255,255,255,0.8)' }}>{card.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ COMBO HIGHLIGHTS ══════════════════ */}
      <section className="section" style={{ background: 'var(--charcoal-light)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 24 }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
              <h2 className="section-title">COMBO <span className="text-orange">HIGHLIGHTS</span></h2>
              <p style={{ color: 'var(--cream-dim)', fontSize: '1.1rem' }}>The best value for your hunger.</p>
            </motion.div>
            <Link to="/menu" className="btn btn-outline" viewTransition>View All Combos</Link>
          </div>
          <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {combos.map((combo, i) => (
              <MenuCard key={combo.id} item={combo} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ TESTIMONIALS ══════════════════ */}
      <section className="section" style={{ background: 'var(--orange)', padding: '80px 0' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(40px, 6vw, 64px)', color: 'var(--charcoal)', textTransform: 'uppercase', lineHeight: 1.1 }}>WHAT THEY SAY</h2>
          </motion.div>
          <CircularTestimonials
            testimonials={[
              {
                quote: "Honestly, this is the best shawarma I've had in Nairobi. The meat is so tender, and that house-made garlic sauce hits the spot perfectly every single time!",
                name: "Kevin M.",
                designation: "Local Foodie",
                src: "/images/testimonials/test_1.png",
              },
              {
                quote: "The vibe here is just unmatched! My friends and I come here every Friday night. Amazing flame-grilled platters, great music, and the staff always treat us like family.",
                name: "Amina J.",
                designation: "Weekend Regular",
                src: "/images/testimonials/test_2.png",
              },
              {
                quote: "I've been eating roasted meat for decades, and the nyama choma wrap here is something special. Proper seasoning, hot off the grill, and no shortcuts. Fantastic.",
                name: "Mzee Omondi",
                designation: "Neighborhood Legend",
                src: "/images/testimonials/test_3.png",
              },
            ]}
            autoplay={true}
            colors={{
              name: "var(--charcoal)",
              designation: "var(--charcoal)",
              testimony: "var(--charcoal)",
              arrowBackground: "var(--charcoal)",
              arrowForeground: "var(--cream)",
              arrowHoverBackground: "var(--cream)",
            }}
            fontSizes={{
              name: "28px",
              designation: "18px",
              quote: "22px",
            }}
          />
        </div>
      </section>

      {/* ══════════════════ BOTTOM CTA STRIP ══════════════════ */}
      <section style={{ padding: '80px 0', background: 'var(--charcoal-light)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(32px, 5vw, 56px)', color: 'var(--cream)', marginBottom: 24 }}>
            READY TO <span className="text-orange">ORDER?</span>
          </h2>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="https://wa.me/254700000000" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.2rem' }}>
              <MessageCircle size={20} /> Order on WhatsApp
            </a>
            <Link to="/menu" className="btn btn-outline" style={{ padding: '16px 32px', fontSize: '1.2rem' }} viewTransition>
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
