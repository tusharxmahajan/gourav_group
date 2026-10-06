import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EASE = 'power3.out';
// clamp() keeps triggers on the last screen (e.g. the footer) reachable.
const START = 'clamp(top 88%)';
// Leave no inline styles behind once an element has arrived.
const CLEAR = 'opacity,visibility,transform';

/*
 * Markup hooks (all animation is skipped under prefers-reduced-motion):
 *
 *   data-intro="header" | data-intro   hero entrance on load, in DOM order
 *   data-reveal                        children fade up when it scrolls in
 *   data-reveal-cell                   a grid cell: the cell (borders, fill)
 *                                      stays put and its children rise in;
 *                                      cells entering together stagger
 *   data-reveal-media                  (in a cell) image wipes down from the top
 *   data-reveal-bar                    (in a cell) bar grows from the left
 */

function intro(root, delay) {
  const header = root.querySelectorAll('[data-intro="header"]');
  const items = root.querySelectorAll('[data-intro]:not([data-intro="header"])');

  gsap
    .timeline({ delay, defaults: { ease: EASE } })
    .from(header, { autoAlpha: 0, y: -16, duration: 0.8, clearProps: CLEAR }, 0.2)
    .from(items, { autoAlpha: 0, y: 36, duration: 1, stagger: 0.12, clearProps: CLEAR }, 0.3);
}

function groups(root) {
  root.querySelectorAll('[data-reveal]').forEach((group) => {
    gsap.from(group.children, {
      autoAlpha: 0,
      y: 32,
      duration: 0.9,
      ease: EASE,
      stagger: 0.1,
      clearProps: CLEAR,
      scrollTrigger: { trigger: group, start: START, once: true },
    });
  });
}

function cellParts(cell) {
  const children = [...cell.children];
  return {
    media: children.filter((c) => c.hasAttribute('data-reveal-media')),
    bars: [...cell.querySelectorAll('[data-reveal-bar]')],
    parts: children.filter((c) => !c.hasAttribute('data-reveal-media') && !c.hasAttribute('data-reveal-bar')),
  };
}

function revealCell(cell, delay) {
  const { media, bars, parts } = cellParts(cell);
  const tl = gsap.timeline({ delay, defaults: { ease: EASE } });
  if (media.length) {
    tl.to(media, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power3.inOut', clearProps: 'clipPath' }, 0);
    tl.to(media.map((m) => m.querySelector('img')), { scale: 1, duration: 1.6, clearProps: 'transform' }, 0);
  }
  tl.to(parts, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.07, clearProps: CLEAR }, media.length ? 0.35 : 0);
  if (bars.length) tl.to(bars, { scaleX: 1, duration: 0.9, ease: 'power2.inOut', clearProps: 'transform,transformOrigin' }, 0.3);
}

function cells(root) {
  const all = gsap.utils.toArray(root.querySelectorAll('[data-reveal-cell]'));
  if (!all.length) return;

  all.forEach((cell) => {
    const { media, bars, parts } = cellParts(cell);
    gsap.set(parts, { autoAlpha: 0, y: 24 });
    gsap.set(media, { clipPath: 'inset(0% 0% 100% 0%)' });
    gsap.set(media.map((m) => m.querySelector('img')), { scale: 1.15 });
    gsap.set(bars, { scaleX: 0, transformOrigin: 'left center' });
  });

  // Cells that enter together (a row) stagger left to right; on mobile,
  // where they stack, each one reveals as it arrives.
  ScrollTrigger.batch(all, {
    start: START,
    once: true,
    onEnter: (batch) => batch.forEach((cell, i) => revealCell(cell, i * 0.12)),
  });
}

/** Hero entrance (after `introDelay` seconds) + scroll reveals for everything inside `scope`. */
export default function useRevealAnimations(scope, { introDelay = 0 } = {}) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const root = scope.current;
        intro(root, introDelay);
        groups(root);
        cells(root);
        // Web fonts can change section heights; re-measure trigger points.
        document.fonts?.ready.then(() => ScrollTrigger.refresh());
      });
    },
    { scope },
  );
}
