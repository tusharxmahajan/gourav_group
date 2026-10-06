import { useEffect, useRef, useState } from 'react';
import { divisions, hero, ui } from '../data/content';
import useCarousel from '../hooks/useCarousel';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';
import { coverSizes } from '../lib/images';
import ResponsiveImage from './ResponsiveImage';
import Rule from './Rule';
import styles from './Hero.module.css';

const INTERVAL = 6000;
// The active photo eases from this scale down to 1 over the slide's interval.
const ZOOM_FROM = 1.1;
const twoDigits = (n) => String(n).padStart(2, '0');

function isFocusVisible(el) {
  try {
    return el.matches(':focus-visible');
  } catch {
    return true;
  }
}

export default function Hero({ covered = false }) {
  const { slides } = hero;
  const reducedMotion = usePrefersReducedMotion();
  const [keyboardInside, setKeyboardInside] = useState(false);
  const { index, go, next, prev, cycle, running } = useCarousel(slides.length, INTERVAL, {
    autoplay: !reducedMotion,
    // Also paused while the page has scrolled over the pinned hero.
    paused: keyboardInside || covered,
  });
  const tabs = useRef([]);
  const slideEls = useRef([]);
  const zooms = useRef([]);

  // Slow zoom-out on the active photo, restarted on every slide change and
  // kept in step with the progress bar (paused whenever autoplay is).
  useEffect(() => {
    if (reducedMotion) {
      zooms.current.forEach((a) => a?.cancel());
      zooms.current = [];
      return;
    }
    // Outgoing photos freeze where they are while they fade out.
    zooms.current.forEach((a, i) => i !== index && a?.pause());
    const img = slideEls.current[index]?.querySelector('img');
    zooms.current[index]?.cancel();
    zooms.current[index] = img?.animate([{ transform: `scale(${ZOOM_FROM})` }, { transform: 'scale(1)' }], {
      duration: INTERVAL,
      easing: 'linear',
      fill: 'forwards',
    });
  }, [index, cycle, reducedMotion]);

  useEffect(() => {
    const zoom = zooms.current[index];
    if (!zoom) return;
    if (running) zoom.play();
    else zoom.pause();
  }, [index, cycle, running]);

  // Pause while keyboard focus is inside the hero. A mouse click also moves
  // focus, but it only restarts the timer, so autoplay keeps going.
  const onFocus = (e) => setKeyboardInside(isFocusVisible(e.target));
  const onBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setKeyboardInside(false);
  };

  const onTabKeyDown = (e, i) => {
    const target = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: slides.length - 1 }[e.key];
    if (target === undefined) return;
    e.preventDefault();
    const n = (target + slides.length) % slides.length;
    go(n);
    tabs.current[n]?.focus();
  };

  return (
    <section
      className={styles.hero}
      aria-roledescription="carousel"
      aria-labelledby="hero-title"
      data-pinned
      onFocus={onFocus}
      onBlur={onBlur}
      style={{ '--interval': `${INTERVAL}ms` }}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.image}
          ref={(el) => {
            slideEls.current[i] = el;
          }}
          id={`hero-slide-${i}`}
          className={styles.slide}
          role="tabpanel"
          aria-roledescription={ui.slide}
          aria-labelledby={`hero-tab-${i}`}
          aria-hidden={i !== index || undefined}
          data-active={i === index}
        >
          <ResponsiveImage
            src={slide.image}
            alt={slide.alt}
            sizes={coverSizes(slide.image)}
            className={styles.slideImage}
            loading={i === 0 ? 'eager' : 'lazy'}
            fetchPriority={i === 0 ? 'high' : 'low'}
          />
        </div>
      ))}
      <div className={styles.scrim} aria-hidden="true" />
      <div className={styles.scrimTop} aria-hidden="true" />

      <div className={styles.content}>
        <Rule variant="hero" marks={false} className={styles.topRule} />

        <h1 id="hero-title" className={styles.title}>
          {hero.headline.map((line) => (
            <span key={line} className={styles.line} data-intro>
              {line}
            </span>
          ))}
        </h1>

        <div className={styles.taglineRow} data-intro>
          <p className={styles.tagline} aria-live={running ? 'off' : 'polite'}>
            {slides[index].tag}
          </p>
          <div className={styles.arrows}>
            <button type="button" className={styles.arrow} onClick={prev} aria-label={ui.prev}>
              <span aria-hidden="true">←</span>
            </button>
            <button type="button" className={styles.arrow} onClick={next} aria-label={ui.next}>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <Rule variant="hero" className={styles.bottomRule} />

        <div className={styles.tabs} role="tablist" aria-label={ui.carousel} data-intro>
          {slides.map((slide, i) => {
            const active = i === index;
            return (
              <button
                key={slide.image}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`hero-tab-${i}`}
                aria-selected={active}
                aria-controls={`hero-slide-${i}`}
                tabIndex={active ? 0 : -1}
                className={styles.tab}
                onClick={() => go(i)}
                onKeyDown={(e) => onTabKeyDown(e, i)}
              >
                <span className={styles.track} aria-hidden="true">
                  {active && <span key={cycle} className={styles.fill} data-running={running} />}
                </span>
                <span className={styles.tabText}>
                  <span className={styles.tabNumber} aria-hidden="true">
                    {twoDigits(i + 1)}
                  </span>
                  <span className={styles.tabName}>{divisions[slide.division].name}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
