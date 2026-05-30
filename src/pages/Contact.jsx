import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, MessageCircle, Send } from 'lucide-react';
import ProgressiveImage from '../components/ProgressiveImage';
import { useCart } from '../context/CartContext';

export default function Contact() {
  const [formStatus, setFormStatus] = useState('');
  const { generateWhatsAppLink, cartCount } = useCart();

  useEffect(() => {
    document.title = "Contact & Order | Shawarma House Kenya";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('success');
    setTimeout(() => setFormStatus(''), 4000);
    e.target.reset();
  };

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
            GET IN <span style={{ color: 'var(--orange)' }}>TOUCH</span>
          </h1>
          <p style={{ color: 'var(--cream-dim)', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto', marginBottom: 48 }}>
            Ready to order? Use WhatsApp for the fastest response, call us, or drop an inquiry below.
          </p>
          <div style={{ position: 'relative', width: '100%', height: '300px', borderRadius: '16px', overflow: 'hidden', marginBottom: '64px' }}>
            <ProgressiveImage src="/images/shawarma_plate.webp" alt="Restaurant spread" style={{ width: '100%', height: '100%' }} />
          </div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 48 }}>
          
          {/* Left Column: Info & Map */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            
            <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
              <a href={generateWhatsAppLink()} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                <MessageCircle size={20} /> {cartCount > 0 ? `Checkout Cart (${cartCount})` : 'Order via WhatsApp'}
              </a>
              <a href="tel:+254700000000" className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
                <Phone size={20} /> Call Us Directly
              </a>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: 32, borderRadius: 16, marginBottom: 32 }}>
              <h3 style={{ fontFamily: "'Anton', sans-serif", fontSize: '1.5rem', color: 'var(--cream)', marginBottom: 24 }}>NAIROBI CBD BRANCH</h3>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <li style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <MapPin color="var(--orange)" size={20} style={{ flexShrink: 0, marginTop: 4 }} />
                  <div>
                    <strong style={{ color: 'var(--cream)', display: 'block', marginBottom: 4 }}>Location</strong>
                    <span style={{ color: 'var(--cream-dim)' }}>Kimathi Street, Nairobi CBD</span>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <Clock color="var(--orange)" size={20} style={{ flexShrink: 0, marginTop: 4 }} />
                  <div>
                    <strong style={{ color: 'var(--cream)', display: 'block', marginBottom: 4 }}>Opening Hours</strong>
                    <span style={{ color: 'var(--cream-dim)' }}>Monday – Friday: 10:00 AM – 11:00 PM<br/>Weekends: 9:00 AM – 11:30 PM</span>
                  </div>
                </li>
              </ul>
            </div>

            <div style={{ width: '100%', height: 300, borderRadius: 16, overflow: 'hidden', background: '#333' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8199203649987!2d36.8202534!3d-1.2820352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d65b706037%3A0xc316c8052179d630!2sKimathi%20St%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(80%)' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Store Location"
              />
            </div>
          </motion.div>

          {/* Right Column: Order Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div style={{ background: 'var(--charcoal-light)', padding: '40px 32px', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ fontFamily: "'Anton', sans-serif", fontSize: '1.8rem', color: 'var(--cream)', marginBottom: 8 }}>LARGE OR EVENT ORDER?</h3>
              <p style={{ color: 'var(--cream-dim)', marginBottom: 32, fontSize: '0.95rem' }}>Fill out the form below and our catering team will get back to you within 2 hours.</p>
              
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" name="name" autoComplete="name" placeholder="e.g. John Doe…" required />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" name="phone" autoComplete="tel" inputMode="tel" placeholder="e.g. +254 700 000 000…" required />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="inquiry">Order Details / Inquiry</label>
                  <textarea id="inquiry" name="inquiry" rows={5} placeholder="e.g. Details about your event, date, and number of guests…" required />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}>
                  <Send size={18} /> Send Inquiry
                </button>
                {formStatus === 'success' && (
                  <p style={{ color: '#4CAF50', textAlign: 'center', fontSize: '0.9rem', marginTop: 8, fontWeight: 600 }}>Inquiry sent successfully!</p>
                )}
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
