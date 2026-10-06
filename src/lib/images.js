import manifest from '../data/images.json' with { type: 'json' };

// Keep in sync with the hero's height clamp in Hero.module.css.
const HERO_MAX_HEIGHT = 880;

/** Intrinsic size and srcsets written by scripts/optimize-images.mjs. */
export const imageMeta = (src) => manifest[src];

/**
 * `sizes` for an object-fit: cover image in the full-height hero. When the
 * viewport is narrower than the image's aspect ratio (phones, portrait
 * tablets) the image is scaled to the hero's height and renders wider than
 * 100vw: ratio × 100vh, capped by the hero's max height.
 */
export function coverSizes(src) {
  const meta = imageMeta(src);
  if (!meta) return '100vw';
  const ratio = meta.width / meta.height;
  const narrower = `(max-aspect-ratio: ${meta.width}/${meta.height})`;
  return [
    `${narrower} and (max-height: ${HERO_MAX_HEIGHT}px) ${Math.ceil(ratio * 100)}vh`,
    `${narrower} ${Math.ceil(ratio * HERO_MAX_HEIGHT)}px`,
    '100vw',
  ].join(', ');
}
