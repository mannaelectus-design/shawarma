import { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProgressiveImage from './ProgressiveImage';

const letterVariants = {
  hover: {
    y: "-50%",
  },
};

const AnimatedLetter = ({ letter }) => {
  return (
    <div style={{ display: 'inline-block', height: '1.2em', overflow: 'hidden' }}>
      <motion.span
        style={{ display: 'flex', flexDirection: 'column', y: "0%" }}
        variants={letterVariants}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <span style={{ lineHeight: '1.2em' }}>{letter === ' ' ? '\u00A0' : letter}</span>
        <span style={{ lineHeight: '1.2em' }}>{letter === ' ' ? '\u00A0' : letter}</span>
      </motion.span>
    </div>
  );
};

export const GalleryCard = memo(function GalleryCard({ heading, description, imgSrc }) {
  return (
    <motion.div
      transition={{ staggerChildren: 0.035 }}
      whileHover="hover"
      className="gallery-card"
    >
      <div className="gallery-card-bg">
        <ProgressiveImage
          src={imgSrc}
          alt={heading}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      
      <div className="gallery-card-content">
        <ArrowRight className="gallery-card-icon" />
        
        <div>
          <h4 className="gallery-card-title" style={{ display: 'flex', flexWrap: 'wrap' }}>
            {heading.split("").map((letter, index) => (
              <AnimatedLetter letter={letter} key={index} />
            ))}
          </h4>
          <p className="gallery-card-desc">{description}</p>
        </div>
      </div>
    </motion.div>
  );
});
