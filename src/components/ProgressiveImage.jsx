import { useState, useRef, useEffect, memo } from 'react';

/**
 * ProgressiveImage — loads images with a smooth fade-in effect.
 * Shows a subtle shimmer placeholder while loading, then fades in the real image.
 */
const ProgressiveImage = memo(function ProgressiveImage({
  src,
  alt,
  style = {},
  className = '',
  width,
  height,
  priority = false,
  objectPosition = 'center',
  ...rest
}) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  // If the image is already cached by the browser, mark loaded immediately
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current?.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src]);

  return (
    <div
      className={`progressive-image-wrapper ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        background: 'var(--charcoal-light, #242424)',
        ...style,
      }}
    >
      {/* Shimmer placeholder */}
      <div
        className="shimmer"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          opacity: loaded ? 0 : 1,
          transition: 'opacity 0.5s ease-out',
          pointerEvents: 'none'
        }}
      />

      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoad={() => setLoaded(true)}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: objectPosition,
          display: 'block',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s ease-out',
        }}
        {...rest}
      />
    </div>
  );
});

export default ProgressiveImage;
