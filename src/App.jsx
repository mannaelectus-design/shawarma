import { Suspense, lazy, useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom';
import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/CartDrawer';
import './marquee.css';

const Menu = lazy(() => import('./pages/Menu'));
const About = lazy(() => import('./pages/About'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const Catering = lazy(() => import('./pages/Catering'));
const PosterMaker = lazy(() => import('./pages/PosterMaker'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppLayout() {
  const [prefersReduced, setPrefersReduced] = useState(false);
  
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const handler = (e) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <CartProvider>
      <MotionConfig reducedMotion={prefersReduced ? "always" : "never"}>
        <LazyMotion features={domAnimation}>
          <a href="#main-content" style={{
            position: 'absolute', left: '-9999px', zIndex: 9999,
            padding: '12px 24px', background: 'var(--orange)', color: 'white',
            fontWeight: 700, borderRadius: '0 0 8px 0', fontSize: '0.9rem',
          }} onFocus={e => e.target.style.left = '0'} onBlur={e => e.target.style.left = '-9999px'}>
            Skip to main content
          </a>
          <ScrollToTop />
          <Navbar />
          <CartDrawer />
          <Suspense fallback={
          <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--orange)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, border: '3px solid var(--orange)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              <span style={{ fontFamily: "'Anton', sans-serif", fontSize: '1.2rem', letterSpacing: '0.05em' }}>LOADING...</span>
            </div>
          </div>
        }>
          <main id="main-content">
            <Outlet />
          </main>
        </Suspense>
        <Footer />
        </LazyMotion>
      </MotionConfig>
    </CartProvider>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "menu", element: <Menu /> },
      { path: "about", element: <About /> },
      { path: "gallery", element: <Gallery /> },
      { path: "contact", element: <Contact /> },
      { path: "catering", element: <Catering /> },
      { path: "poster-maker", element: <PosterMaker /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

