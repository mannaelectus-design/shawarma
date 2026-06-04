import { m } from 'framer-motion';

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const pricingPackages = [
  {
    title: "Office Lunch",
    price: "KSh 15,000",
    description: "Perfect for team meetings and small office gatherings. Feeds 10-15 people.",
    features: [
      "15 Mixed Shawarma Wraps",
      "Large portion of Masala Fries",
      "Hummus & Pita sides",
      "15 Soft Drinks",
      "Delivery & Setup Included"
    ],
    popular: false,
    cta: "Book Office Lunch"
  },
  {
    title: "Birthday Bash",
    price: "KSh 35,000",
    description: "The ultimate party package. High energy, unforgettable flavor. Feeds 30-40 people.",
    features: [
      "40 Shawarma Wraps (Chicken & Beef)",
      "Extra Large Masala & Classic Fries",
      "Full Mezze Platter (Hummus, Falafel)",
      "House-made Garlic & Spicy sauces",
      "Premium Delivery & Setup"
    ],
    popular: true,
    cta: "Book Birthday Bash"
  },
  {
    title: "The Big Feast",
    price: "Custom",
    description: "Weddings, corporate events, and massive parties. We bring the heat.",
    features: [
      "Live Shawarma Spit & Chef at event",
      "Unlimited Wraps for 3 hours",
      "Full Mediterranean Buffet",
      "Signature Mocktails",
      "Professional Catering Staff"
    ],
    popular: false,
    cta: "Get a Quote"
  }
];

export default function Catering() {
  return (
    <div className="catering-page" style={{ paddingTop: '120px', paddingBottom: '80px', backgroundColor: 'var(--charcoal)', minHeight: '100vh', color: 'var(--text-light)' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header */}
        <m.div 
          initial="hidden"
          animate="visible"
          variants={pageVariants}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <m.h1 variants={itemVariants} style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontFamily: "'Anton', sans-serif", color: 'var(--yellow)', textTransform: 'uppercase', marginBottom: '24px', letterSpacing: '0.02em' }}>
            Unstoppable Catering
          </m.h1>
          <m.p variants={itemVariants} style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', color: '#a0a0a0', lineHeight: 1.6 }}>
            Bring the heat to your next event. From office lunches to full-blown weddings, we provide the ultimate shawarma experience anywhere in Nairobi.
          </m.p>
        </m.div>

        {/* Pricing Cards */}
        <m.div 
          initial="hidden"
          animate="visible"
          variants={pageVariants}
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '32px',
            alignItems: 'center' 
          }}
        >
          {pricingPackages.map((pkg, idx) => (
            <m.div 
              key={idx}
              variants={itemVariants}
              style={{
                backgroundColor: pkg.popular ? 'var(--charcoal-light)' : '#1a1a1a',
                border: pkg.popular ? '2px solid var(--orange)' : '1px solid #333',
                borderRadius: '16px',
                padding: '40px 32px',
                position: 'relative',
                transform: pkg.popular ? 'scale(1.05)' : 'scale(1)',
                zIndex: pkg.popular ? 2 : 1,
                boxShadow: pkg.popular ? '0 20px 40px rgba(255, 75, 0, 0.15)' : 'none',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
            >
              {pkg.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-15px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'var(--orange)',
                  color: 'var(--charcoal)',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Most Popular
                </div>
              )}

              <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: '2rem', marginBottom: '16px', color: 'var(--text-light)', letterSpacing: '0.02em' }}>
                {pkg.title}
              </h2>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--yellow)', marginBottom: '16px' }}>
                {pkg.price}
              </div>
              <p style={{ color: '#a0a0a0', marginBottom: '32px', lineHeight: 1.5, minHeight: '48px' }}>
                {pkg.description}
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, flexGrow: 1, marginBottom: '40px' }}>
                {pkg.features.map((feat, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '16px', color: '#e0e0e0' }}>
                    <span style={{ color: 'var(--orange)', marginRight: '12px', fontWeight: 'bold' }}>✓</span>
                    {feat}
                  </li>
                ))}
              </ul>

              <button 
                style={{
                  width: '100%',
                  padding: '16px',
                  backgroundColor: pkg.popular ? 'var(--orange)' : 'transparent',
                  color: pkg.popular ? 'var(--charcoal)' : 'var(--orange)',
                  border: `2px solid var(--orange)`,
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
                onMouseOver={(e) => {
                  if (!pkg.popular) {
                    e.currentTarget.style.backgroundColor = 'var(--orange)';
                    e.currentTarget.style.color = 'var(--charcoal)';
                  } else {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(255, 75, 0, 0.3)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!pkg.popular) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--orange)';
                  } else {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                {pkg.cta}
              </button>
            </m.div>
          ))}
        </m.div>

        {/* FAQ Section */}
        <m.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={pageVariants}
          style={{ marginTop: '100px', maxWidth: '800px', margin: '100px auto 0' }}
        >
          <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: '2.5rem', textAlign: 'center', marginBottom: '48px', color: 'var(--text-light)' }}>
            Frequently Asked Questions
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ backgroundColor: 'var(--charcoal-light)', padding: '32px', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--yellow)', marginBottom: '12px' }}>How much notice do you need for a catering order?</h3>
              <p style={{ color: '#a0a0a0', lineHeight: 1.6 }}>For Office Lunches and Birthday Bashes, we require at least 48 hours notice. For The Big Feast (live catering), please book at least 2 weeks in advance.</p>
            </div>
            <div style={{ backgroundColor: 'var(--charcoal-light)', padding: '32px', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--yellow)', marginBottom: '12px' }}>Do you provide vegetarian or vegan options?</h3>
              <p style={{ color: '#a0a0a0', lineHeight: 1.6 }}>Absolutely! We can substitute any portion of your meat wraps for our signature Falafel wraps, and our Mezze platter is 100% vegetarian.</p>
            </div>
            <div style={{ backgroundColor: 'var(--charcoal-light)', padding: '32px', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--yellow)', marginBottom: '12px' }}>Does the live spit catering include plates and cutlery?</h3>
              <p style={{ color: '#a0a0a0', lineHeight: 1.6 }}>Yes, The Big Feast package includes premium disposable plates, napkins, and cutlery. We handle the entire setup and breakdown so you can enjoy the party.</p>
            </div>
          </div>
        </m.div>

      </div>
    </div>
  );
}
