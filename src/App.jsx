import { useRef } from 'react';
import ClientMarquee from './components/ClientMarquee';
import Footer from './components/Footer';
import GridGuides from './components/GridGuides';
import Header from './components/Header';
import Hero from './components/Hero';
import Process from './components/Process';
import Products from './components/Products';
import Testimonial from './components/Testimonial';
import WhyGourav from './components/WhyGourav';
import { ui } from './data/content';
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
  useSmoothScroll(!reducedMotion);
  useRevealAnimations(page);

  return (
    <div ref={page} className={styles.page}>
      <a className={styles.skip} href="#main">
        {ui.skip}
      </a>
      <Header />
      <main id="main" className={styles.main}>
        <Hero covered={heroCovered} />
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
