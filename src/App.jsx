import { useRef, useState } from 'react';
import ClientMarquee from './components/ClientMarquee';
import Footer from './components/Footer';
import GridGuides from './components/GridGuides';
import Header from './components/Header';
import Hero from './components/Hero';
import Preloader from './components/Preloader';
import Process from './components/Process';
import Products from './components/Products';
import Testimonial from './components/Testimonial';
import WhyGourav from './components/WhyGourav';
import { ui } from './data/content';
import { PRELOADER } from './lib/preloader';
import usePinnedHero from './hooks/usePinnedHero';
import usePrefersReducedMotion from './hooks/usePrefersReducedMotion';
import useRevealAnimations from './hooks/useRevealAnimations';
import useSmoothScroll from './hooks/useSmoothScroll';
import styles from './App.module.css';

export default function App() {
  const page = useRef(null);
  const overlayTop = useRef(null);
  const heroCovered = usePinnedHero(overlayTop);
  const reducedMotion = usePrefersReducedMotion();
  // The preloader is motion, so reduced-motion visitors go straight in.
  const [loading, setLoading] = useState(!reducedMotion);
  useSmoothScroll(!reducedMotion, loading);
  useRevealAnimations(page, { introDelay: loading ? PRELOADER.heroIntroAt : 0 });

  return (
    <div ref={page} className={styles.page}>
      {loading && <Preloader onDone={() => setLoading(false)} />}
      <a className={styles.skip} href="#main">
        {ui.skip}
      </a>
      <Header />
      <main id="main" className={styles.main}>
        <Hero paused={heroCovered || loading} />
        {/* Everything after the hero scrolls up over the pinned hero. */}
        <div className={styles.overlay}>
          <div ref={overlayTop} className={styles.overlayTop} aria-hidden="true" />
          <GridGuides tone="light" />
          <div className={styles.sections}>
            <ClientMarquee />
            <Products />
            <WhyGourav />
            <Process />
            <Testimonial />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
