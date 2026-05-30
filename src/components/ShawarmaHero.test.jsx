import { render, screen, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ShawarmaHero from './ShawarmaHero';
import { CartProvider } from '../context/CartContext';

// Mock window.matchMedia since Framer Motion might use it or other things might need it
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock Image
global.Image = class {
  constructor() {
    setTimeout(() => {
      if (this.onload) this.onload();
    }, 10);
  }
};

describe('ShawarmaHero Carousel', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  const renderHero = () => {
    return render(
      <CartProvider>
        <ShawarmaHero />
      </CartProvider>
    );
  };

  it('should initialize with the first figurine as active (Classic Chicken Shawarma)', () => {
    renderHero();
    expect(screen.getByText('Classic Chicken Shawarma')).toBeInTheDocument();
  });

  it('should auto-rotate to the next item after 5 seconds', () => {
    renderHero();
    expect(screen.getByText('Classic Chicken Shawarma')).toBeInTheDocument();
    
    // Fast-forward 5000ms
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    
    expect(screen.getByText('Premium Beef Shawarma')).toBeInTheDocument();
  });

  it('should ignore rapid clicks while isAnimating is true', () => {
    renderHero();
    expect(screen.getByText('Classic Chicken Shawarma')).toBeInTheDocument();

    const nextButton = screen.getByLabelText('Next');
    
    act(() => {
      // Click next multiple times quickly
      fireEvent.click(nextButton);
      fireEvent.click(nextButton);
      fireEvent.click(nextButton);
    });

    // Should only navigate once to the second item
    expect(screen.getByText('Premium Beef Shawarma')).toBeInTheDocument();

    act(() => {
      // Advance by 100ms, still animating
      vi.advanceTimersByTime(100);
      fireEvent.click(nextButton);
    });

    // Still should be on the second item because it's animating
    expect(screen.getByText('Premium Beef Shawarma')).toBeInTheDocument();
    
    act(() => {
      // Finish the animation (650ms)
      vi.advanceTimersByTime(600);
    });
    
    act(() => {
      // Now another click should work
      fireEvent.click(nextButton);
    });
    
    expect(screen.getByText('Mixed Shawarma')).toBeInTheDocument();
  });

  it('should clear interval and reset auto-scroll on manual navigation', () => {
    renderHero();
    const nextButton = screen.getByLabelText('Next');
    
    act(() => {
      // Manually click next
      fireEvent.click(nextButton);
    });
    
    expect(screen.getByText('Premium Beef Shawarma')).toBeInTheDocument();
    
    act(() => {
      // Finish animation
      vi.advanceTimersByTime(650);
    });
    
    act(() => {
      // Fast forward almost 5000ms, should NOT have auto-navigated yet
      vi.advanceTimersByTime(4999 - 650);
    });
    
    expect(screen.getByText('Premium Beef Shawarma')).toBeInTheDocument();
    
    act(() => {
      // Fast forward the remaining 1ms
      vi.advanceTimersByTime(1);
    });
    
    // Now it should auto-navigate to the next one
    expect(screen.getByText('Mixed Shawarma')).toBeInTheDocument();
  });
});
