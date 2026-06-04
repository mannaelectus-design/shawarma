import { useState, useRef, useEffect } from 'react';
import { m } from 'framer-motion';
import { Upload, Download, RefreshCw, Type, AlignLeft, LayoutGrid, Image as ImageIcon } from 'lucide-react';

const bgPresets = [
  { 
    id: 'fries', 
    name: 'Loaded Fries', 
    path: '/images/poster_bg_fries.png',
    headline: 'THE ULTIMATE SIDELINE',
    subheading: 'Masala spiced, cheese loaded, beef topped fries.',
    cta: 'CRUNCH NOW: 0700-SHAWARMA'
  },
  { 
    id: 'beef', 
    name: 'Beef Shawarma', 
    path: '/images/poster_bg_beef_shawarma.png',
    headline: 'JUICY TO THE CORE',
    subheading: 'Slow-grilled seasoned beef wrapped in warm pita.',
    cta: 'GRAB A BITE IN BIO'
  },
  { 
    id: 'chicken', 
    name: 'Chicken Shawarma', 
    path: '/images/poster_bg_chicken_shawarma.png',
    headline: 'CRISPY & PERFECT',
    subheading: 'Tender chicken thigh with signature house garlic paste.',
    cta: 'ORDER CHICKEN JUMBO'
  },
  { 
    id: 'carving', 
    name: 'Sizzling Spit', 
    path: '/images/poster_bg_meat_slice.png',
    headline: 'MASTERFULLY SLICED',
    subheading: 'Sizzling meat cut at the perfect angle for maximum juice.',
    cta: 'VISIT OUR NGONG ROAD HUB'
  },
  { 
    id: 'platter', 
    name: 'Saffron Platter', 
    path: '/images/poster_bg_platter.png',
    headline: 'THE FULL FEAST',
    subheading: 'Spiced meats over saffron rice with creamy house hummus.',
    cta: 'CATER YOUR NEXT EVENT'
  },
  { 
    id: 'spices', 
    name: 'Morning Spices', 
    path: '/images/poster_bg_spices.png',
    headline: '14 SPICES. NO SHORTCUTS.',
    subheading: 'Freshly ground daily for flavor that hits different.',
    cta: 'TASTE AUTHENTICITY TODAY'
  }
];

export default function PosterMaker() {
  const [selectedBg, setSelectedBg] = useState(bgPresets[0].path);
  const [aspectRatio, setAspectRatio] = useState('9:16'); // 9:16 | 1:1 | 4:5
  
  // Text layers state
  const [headline, setHeadline] = useState(bgPresets[0].headline);
  const [headlineSize, setHeadlineSize] = useState(48);
  const [headlineColor, setHeadlineColor] = useState('#FF4B00'); // Harissa Orange
  const [headlineY, setHeadlineY] = useState(30); // percentage from top

  const [subheading, setSubheading] = useState(bgPresets[0].subheading);
  const [subheadingSize, setSubheadingSize] = useState(24);
  const [subheadingColor, setSubheadingColor] = useState('#FFC700'); // Saffron Yellow
  const [subheadingY, setSubheadingY] = useState(42);

  const [cta, setCta] = useState(bgPresets[0].cta);
  const [ctaSize, setCtaSize] = useState(18);
  const [ctaColor, setCtaColor] = useState('#FFFFFF');
  const [ctaY, setCtaY] = useState(85);

  const [textShadow, setTextShadow] = useState(true);
  const [showLogo, setShowLogo] = useState(true);
  
  const fileInputRef = useRef(null);
  const previewRef = useRef(null);

  // Handle custom background upload
  const handleBgUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedBg(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper to determine canvas dimensions based on aspect ratio
  const getCanvasDimensions = () => {
    switch (aspectRatio) {
      case '1:1':
        return { width: 1080, height: 1080 };
      case '4:5':
        return { width: 1080, height: 1350 };
      case '9:16':
      default:
        return { width: 1080, height: 1920 };
    }
  };

  // Export engine
  const handleExport = () => {
    const { width, height } = getCanvasDimensions();
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const bgImg = new Image();
    bgImg.crossOrigin = 'anonymous';
    bgImg.src = selectedBg;

    bgImg.onload = () => {
      // Draw background image using object-fit cover logic on canvas
      const imgRatio = bgImg.width / bgImg.height;
      const canvasRatio = width / height;
      let drawWidth, drawHeight, offsetX, offsetY;

      if (imgRatio > canvasRatio) {
        drawHeight = height;
        drawWidth = height * imgRatio;
        offsetX = (width - drawWidth) / 2;
        offsetY = 0;
      } else {
        drawWidth = width;
        drawHeight = width / imgRatio;
        offsetX = 0;
        offsetY = (height - drawHeight) / 2;
      }

      ctx.drawImage(bgImg, offsetX, offsetY, drawWidth, drawHeight);

      // Draw subtle dark vignette overlay for readability
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.4)');
      grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.1)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0.7)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw logo if toggled
      if (showLogo) {
        ctx.save();
        ctx.fillStyle = '#FFC700'; // Saffron Yellow
        ctx.font = 'bold 36px "Anton", sans-serif';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.shadowBlur = 10;
        ctx.fillText('SHAWARMA HOUSE', width / 2, 120);

        ctx.fillStyle = '#FF4B00';
        ctx.font = 'bold 18px "Inter", sans-serif';
        ctx.fillText('FRESH • HOT • UNSTOPPABLE', width / 2, 160);
        ctx.restore();
      }

      // Draw text helper function
      const drawText = (text, size, color, yPercent, isTitle = false) => {
        ctx.save();
        ctx.textAlign = 'center';
        ctx.fillStyle = color;
        
        if (isTitle) {
          ctx.font = `${size * 2}px "Anton", sans-serif`;
        } else {
          ctx.font = `bold ${size * 2}px "Inter", sans-serif`;
        }

        if (textShadow) {
          ctx.shadowColor = 'rgba(0,0,0,0.9)';
          ctx.shadowBlur = 15;
          ctx.shadowOffsetX = 4;
          ctx.shadowOffsetY = 4;
        }

        const yPos = (yPercent / 100) * height;
        ctx.fillText(text.toUpperCase(), width / 2, yPos);
        ctx.restore();
      };

      // Draw text layers
      drawText(headline, headlineSize, headlineColor, headlineY, true);
      drawText(subheading, subheadingSize, subheadingColor, subheadingY, false);
      drawText(cta, ctaSize, ctaColor, ctaY, false);

      // Trigger download
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `shawarma-house-poster-${aspectRatio.replace(':', 'x')}.png`;
      link.href = dataUrl;
      link.click();
    };
  };

  return (
    <div className="poster-maker-page" style={{ paddingTop: '100px', minHeight: '100vh', backgroundColor: 'var(--charcoal)', color: 'var(--text-light)', paddingBottom: '50px' }}>
      <div className="container" style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontFamily: "'Anton', sans-serif", fontSize: '2.5rem', color: 'var(--yellow)', textTransform: 'uppercase', marginBottom: '8px' }}>
            Brand Poster Creator
          </h1>
          <p style={{ color: '#a0a0a0' }}>Customize and download marketing posters in high resolution.</p>
        </div>

        {/* Workspace Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '40px', alignItems: 'start' }}>
          
          {/* Canvas Preview Column */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#161616', borderRadius: '16px', padding: '40px', border: '1px solid #333' }}>
            
            {/* The Poster Preview Box */}
            <div 
              ref={previewRef}
              style={{
                width: '100%',
                maxWidth: aspectRatio === '9:16' ? '360px' : aspectRatio === '4:5' ? '400px' : '450px',
                aspectRatio: aspectRatio === '9:16' ? '9/16' : aspectRatio === '4:5' ? '4/5' : '1/1',
                backgroundImage: `url(${selectedBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '8px',
                position: 'relative',
                boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
                overflow: 'hidden',
                border: '4px solid #222',
                transition: 'all 0.3s ease'
              }}
            >
              {/* Gradient Vignette overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.75) 100%)',
                pointerEvents: 'none',
                zIndex: 1
              }} />

              {/* Branding Header */}
              {showLogo && (
                <div style={{ position: 'absolute', top: '24px', width: '100%', textAlign: 'center', zIndex: 2 }}>
                  <div style={{ fontFamily: "'Anton', sans-serif", fontSize: '1.4rem', color: 'var(--yellow)', textShadow: '0 2px 8px rgba(0,0,0,0.8)', letterSpacing: '0.02em', lineHeight: 1.1 }}>
                    SHAWARMA HOUSE
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--orange)', textShadow: '0 2px 4px rgba(0,0,0,0.8)', letterSpacing: '0.15em', fontWeight: 800 }}>
                    FRESH • HOT • UNSTOPPABLE
                  </div>
                </div>
              )}

              {/* Dynamic Headline Text */}
              <div 
                style={{
                  position: 'absolute',
                  top: `${headlineY}%`,
                  left: '5%',
                  right: '5%',
                  textAlign: 'center',
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                  pointerEvents: 'none'
                }}
              >
                <span 
                  style={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: `${headlineSize / 20}rem`,
                    color: headlineColor,
                    lineHeight: 1,
                    textTransform: 'uppercase',
                    wordBreak: 'break-word',
                    textShadow: textShadow ? '0 4px 12px rgba(0,0,0,0.9)' : 'none'
                  }}
                >
                  {headline}
                </span>
              </div>

              {/* Dynamic Subheading Text */}
              <div 
                style={{
                  position: 'absolute',
                  top: `${subheadingY}%`,
                  left: '5%',
                  right: '5%',
                  textAlign: 'center',
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                  pointerEvents: 'none'
                }}
              >
                <span 
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: `${subheadingSize / 20}rem`,
                    color: subheadingColor,
                    lineHeight: 1.2,
                    wordBreak: 'break-word',
                    textShadow: textShadow ? '0 3px 8px rgba(0,0,0,0.9)' : 'none'
                  }}
                >
                  {subheading}
                </span>
              </div>

              {/* Dynamic Call to Action Text */}
              <div 
                style={{
                  position: 'absolute',
                  top: `${ctaY}%`,
                  left: '5%',
                  right: '5%',
                  textAlign: 'center',
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                  pointerEvents: 'none'
                }}
              >
                <span 
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 800,
                    fontSize: `${ctaSize / 20}rem`,
                    color: ctaColor,
                    lineHeight: 1.2,
                    textTransform: 'uppercase',
                    wordBreak: 'break-word',
                    textShadow: textShadow ? '0 3px 8px rgba(0,0,0,0.9)' : 'none'
                  }}
                >
                  {cta}
                </span>
              </div>
            </div>
          </div>

          {/* Controls Panel Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Aspect Ratio Box */}
            <div style={{ backgroundColor: 'var(--charcoal-light)', borderRadius: '12px', padding: '20px', border: '1px solid #333' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--yellow)' }}>
                <LayoutGrid size={18} />
                <span style={{ fontWeight: 600 }}>1. Aspect Ratio</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['9:16', '1:1', '4:5'].map(ratio => (
                  <button
                    key={ratio}
                    onClick={() => setAspectRatio(ratio)}
                    style={{
                      flex: 1,
                      padding: '10px',
                      backgroundColor: aspectRatio === ratio ? 'var(--orange)' : '#222',
                      color: aspectRatio === ratio ? 'var(--charcoal)' : 'var(--text-light)',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 600,
                      transition: 'all 0.2s'
                    }}
                  >
                    {ratio === '9:16' ? 'Story (9:16)' : ratio === '1:1' ? 'Square (1:1)' : 'Portrait (4:5)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Background Selection Box */}
            <div style={{ backgroundColor: 'var(--charcoal-light)', borderRadius: '12px', padding: '20px', border: '1px solid #333' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--yellow)' }}>
                <ImageIcon size={18} />
                <span style={{ fontWeight: 600 }}>2. Background Graphic</span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px' }}>
                {bgPresets.map(preset => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setSelectedBg(preset.path);
                      setHeadline(preset.headline);
                      setSubheading(preset.subheading);
                      setCta(preset.cta);
                    }}
                    style={{
                      aspectRatio: '1',
                      backgroundImage: `url(${preset.path})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      border: selectedBg === preset.path ? '3px solid var(--orange)' : '2px solid transparent',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      transition: 'border 0.2s'
                    }}
                    title={preset.name}
                  />
                ))}
              </div>

              {/* Upload Custom BG */}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleBgUpload} 
                accept="image/*" 
                style={{ display: 'none' }} 
              />
              <button
                onClick={() => fileInputRef.current.click()}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#222',
                  border: '1px dashed #555',
                  borderRadius: '6px',
                  color: '#ccc',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontWeight: 500,
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = '#2a2a2a'}
                onMouseOut={e => e.currentTarget.style.backgroundColor = '#222'}
              >
                <Upload size={16} /> Upload Custom Image
              </button>
            </div>

            {/* Typography Configuration Box */}
            <div style={{ backgroundColor: 'var(--charcoal-light)', borderRadius: '12px', padding: '20px', border: '1px solid #333', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--yellow)' }}>
                <Type size={18} />
                <span style={{ fontWeight: 600 }}>3. Headline & Copy Settings</span>
              </div>

              {/* Headline Controls */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#aaa', marginBottom: '6px' }}>Headline</label>
                <input 
                  type="text" 
                  value={headline} 
                  onChange={e => setHeadline(e.target.value)}
                  style={{ width: '100%', padding: '10px', backgroundColor: '#222', border: '1px solid #444', borderRadius: '6px', color: 'white', marginBottom: '10px' }}
                />
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#888' }}>Size ({headlineSize}px)</label>
                    <input type="range" min="20" max="100" value={headlineSize} onChange={e => setHeadlineSize(parseInt(e.target.value))} style={{ width: '100%' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#888' }}>Y Position ({headlineY}%)</label>
                    <input type="range" min="10" max="90" value={headlineY} onChange={e => setHeadlineY(parseInt(e.target.value))} style={{ width: '100%' }} />
                  </div>
                </div>
                <div style={{ marginTop: '8px' }}>
                  <label style={{ fontSize: '0.75rem', color: '#888', marginRight: '10px' }}>Color:</label>
                  {['#FF4B00', '#FFC700', '#FFFFFF', '#000000'].map(c => (
                    <button key={c} onClick={() => setHeadlineColor(c)} style={{ width: '20px', height: '20px', backgroundColor: c, border: headlineColor === c ? '2px solid white' : '1px solid #555', borderRadius: '50%', marginRight: '6px', cursor: 'pointer' }} />
                  ))}
                </div>
              </div>

              <hr style={{ border: '0', height: '1px', backgroundColor: '#333' }} />

              {/* Subheading Controls */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#aaa', marginBottom: '6px' }}>Subheading</label>
                <input 
                  type="text" 
                  value={subheading} 
                  onChange={e => setSubheading(e.target.value)}
                  style={{ width: '100%', padding: '10px', backgroundColor: '#222', border: '1px solid #444', borderRadius: '6px', color: 'white', marginBottom: '10px' }}
                />
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#888' }}>Size ({subheadingSize}px)</label>
                    <input type="range" min="12" max="60" value={subheadingSize} onChange={e => setSubheadingSize(parseInt(e.target.value))} style={{ width: '100%' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#888' }}>Y Position ({subheadingY}%)</label>
                    <input type="range" min="10" max="90" value={subheadingY} onChange={e => setSubheadingY(parseInt(e.target.value))} style={{ width: '100%' }} />
                  </div>
                </div>
                <div style={{ marginTop: '8px' }}>
                  <label style={{ fontSize: '0.75rem', color: '#888', marginRight: '10px' }}>Color:</label>
                  {['#FFC700', '#FF4B00', '#FFFFFF', '#000000'].map(c => (
                    <button key={c} onClick={() => setSubheadingColor(c)} style={{ width: '20px', height: '20px', backgroundColor: c, border: subheadingColor === c ? '2px solid white' : '1px solid #555', borderRadius: '50%', marginRight: '6px', cursor: 'pointer' }} />
                  ))}
                </div>
              </div>

              <hr style={{ border: '0', height: '1px', backgroundColor: '#333' }} />

              {/* Call to Action Controls */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#aaa', marginBottom: '6px' }}>Call to Action (CTA)</label>
                <input 
                  type="text" 
                  value={cta} 
                  onChange={e => setCta(e.target.value)}
                  style={{ width: '100%', padding: '10px', backgroundColor: '#222', border: '1px solid #444', borderRadius: '6px', color: 'white', marginBottom: '10px' }}
                />
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#888' }}>Size ({ctaSize}px)</label>
                    <input type="range" min="10" max="40" value={ctaSize} onChange={e => setCtaSize(parseInt(e.target.value))} style={{ width: '100%' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#888' }}>Y Position ({ctaY}%)</label>
                    <input type="range" min="10" max="95" value={ctaY} onChange={e => setCtaY(parseInt(e.target.value))} style={{ width: '100%' }} />
                  </div>
                </div>
                <div style={{ marginTop: '8px' }}>
                  <label style={{ fontSize: '0.75rem', color: '#888', marginRight: '10px' }}>Color:</label>
                  {['#FFFFFF', '#FFC700', '#FF4B00', '#000000'].map(c => (
                    <button key={c} onClick={() => setCtaColor(c)} style={{ width: '20px', height: '20px', backgroundColor: c, border: ctaColor === c ? '2px solid white' : '1px solid #555', borderRadius: '50%', marginRight: '6px', cursor: 'pointer' }} />
                  ))}
                </div>
              </div>
            </div>

            {/* Toggle Switch Toggles */}
            <div style={{ backgroundColor: 'var(--charcoal-light)', borderRadius: '12px', padding: '20px', border: '1px solid #333', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                <span>Overlay Brand Logo</span>
                <input 
                  type="checkbox" 
                  checked={showLogo} 
                  onChange={e => setShowLogo(e.target.checked)}
                  style={{ width: '20px', height: '20px', accentColor: 'var(--orange)' }} 
                />
              </label>
              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                <span>Enable Premium Shadow</span>
                <input 
                  type="checkbox" 
                  checked={textShadow} 
                  onChange={e => setTextShadow(e.target.checked)}
                  style={{ width: '20px', height: '20px', accentColor: 'var(--orange)' }} 
                />
              </label>
            </div>

            {/* Export trigger */}
            <button
              onClick={handleExport}
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: 'var(--orange)',
                color: 'var(--charcoal)',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.2rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                transition: 'all 0.2s'
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(255, 75, 0, 0.3)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Download size={20} /> Download PNG Poster
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}
