import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { divisions, ui } from '../data/content';
import { PRELOADER } from '../lib/preloader';
import styles from './Preloader.module.css';

gsap.registerPlugin(useGSAP);

/**
 * Full-screen intro shown for PRELOADER.total seconds: the division bars grow
 * in, a counter and gridline run to 100, then the panel wipes up to uncover
 * the hero. Calls `onDone` when finished so the app can unmount it.
 */
export default function Preloader({ onDone }) {
  const root = useRef(null);
  const count = useRef(null);

  // While it's showing, the page underneath can't take focus or clicks.
  useEffect(() => {
    const siblings = [...root.current.parentElement.children].filter((el) => el !== root.current);
    siblings.forEach((el) => (el.inert = true));
    return () => siblings.forEach((el) => (el.inert = false));
  }, []);

  // The exit runs on the compositor (Web Animations, transform only) so it
  // stays smooth while the main thread starts the hero entrance underneath.
  const exit = () => {
    const ms = (PRELOADER.total - PRELOADER.exitAt) * 1000;
    const ease = 'cubic-bezier(0.76, 0, 0.24, 1)';
    root.current
      .querySelector('[data-content]')
      .animate([{ transform: 'none', opacity: 1 }, { transform: 'translateY(-48px)', opacity: 0 }], {
        duration: ms * 0.6,
        easing: 'cubic-bezier(0.5, 0, 0.75, 0)',
        fill: 'forwards',
      });
    root.current
      .animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-100%)' }], { duration: ms, easing: ease, fill: 'forwards' })
      .finished.then(onDone, () => {});
  };

  useGSAP(
    () => {
      const counter = { value: 0 };
      const { exitAt } = PRELOADER;
      gsap
        .timeline()
        .from('[data-bar]', { scaleY: 0, transformOrigin: 'bottom', duration: 0.6, stagger: 0.12, ease: 'power3.out' }, 0)
        .from('[data-word]', { autoAlpha: 0, y: 24, duration: 0.6, ease: 'power3.out' }, 0.3)
        .from('[data-meta]', { autoAlpha: 0, duration: 0.4 }, 0.1)
        .to(counter, {
          value: 100,
          duration: exitAt,
          ease: 'power2.inOut',
          onUpdate: () => {
            count.current.textContent = String(Math.round(counter.value)).padStart(3, '0');
          },
        }, 0)
        .fromTo('[data-progress]', { scaleX: 0 }, { scaleX: 1, duration: exitAt, ease: 'power2.inOut' }, 0)
        .call(exit, null, exitAt);
    },
    { scope: root },
  );

  return (
    <div ref={root} className={styles.preloader} aria-hidden="true">
      <div className={styles.content} data-content>
        <div className={styles.mark}>
          <span className={styles.bars}>
            {Object.values(divisions).map((d) => (
              <span key={d.name} data-bar style={{ background: d.color }} />
            ))}
          </span>
          <span className={styles.wordmark} data-word>
            {ui.brand}
          </span>
        </div>
        <div className={styles.meta} data-meta>
          <span ref={count}>000</span>
          <span>{ui.loading}</span>
        </div>
        <div className={styles.track}>
          <span className={styles.progress} data-progress />
        </div>
      </div>
    </div>
  );
}
