import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// lerp 0.09: the scroll eases out over roughly half a second, smooth without
// feeling detached on a long page. wheelMultiplier 0.9: trims each wheel
// notch slightly so the glide doesn't overshoot sections. Touch scrolling
// stays native (syncTouch off).
const OPTIONS = {
  lerp: 0.09,
  wheelMultiplier: 0.9,
  autoRaf: false,
  stopInertiaOnNavigate: true,
};

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger reads the
 * same scroll position on every frame. In-page links (#products, the skip
 * link, the mobile menu) glide via Lenis, and focus moves to the target.
 */
export default function useSmoothScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined;

    const lenis = new Lenis(OPTIONS);
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target.closest?.('a[href^="#"]');
      const id = link?.getAttribute('href').slice(1);
      const target = id && document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target);
      window.history.pushState(null, '', `#${id}`);
      // Keyboard and screen-reader users continue from the target.
      if (!target.matches('a, button, input, select, textarea, [tabindex]')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, [enabled]);
}
