# Gourav Group — homepage

Marketing homepage for Gourav Group (Gourav Industries, Gourav Engineers, Gourav Process Solutions), built from the "Gridline" design handoff (option 3a). React + Vite, plain CSS (tokens + CSS Modules), no UI framework.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | oxlint |
| `npm run images` | Regenerate optimized images from `assets-src/` (see below) |

## Structure

```
src/
  data/content.js        all copy and data; components only map over it
  data/images.json       generated: intrinsic sizes + srcsets for every image
  styles/tokens.css      colours, fonts, grid tokens, breakpoints
  styles/base.css        reset, focus rings, shared type utilities
  components/            one component + CSS Module each
  hooks/useCarousel.js   hero timer (pause keeps time left, `cycle` restarts the progress bar)
  hooks/usePrefersReducedMotion.js
  lib/images.js          manifest lookup + `sizes` for the full-height hero
scripts/optimize-images.mjs
assets-src/              original images (not served)
public/images/           generated, served images
design/screenshots/      the handoff's desktop screenshots, for reference
```

## Layout rules

The layout uses flex and grid only. Nothing is `position: absolute/fixed` and nothing floats. `position: relative` is used only with `z-index`.

- **Bleed grid.** Every section is a grid with `grid-template-columns: var(--bleed)`, i.e. `gutter | container | gutter`. Content goes in `grid-column: content`; full-width layers go in `full`.
- **Layers** (hero slides, scrims, guides, hatching, the header over the hero) are stacked with grid stacking: the same `grid-row`/`grid-column`, in paint order.
- **Column guides.** `GridGuides` is a background layer on the container column, 1px wider so the last line lands on the container's right edge. The hero has none; only its tab-strip dividers are drawn.
- **Pinned hero.** The hero and the header over it are `position: sticky` (top `--hero-pin`). Everything after the hero sits in one opaque layer (`.overlay`, `z-index: 3`) that scrolls up over them. `<main>` is a flex column rather than a grid, because a sticky grid item only sticks within its own grid area. `usePinnedHero` pauses the carousel once the hero is fully covered, and scrolls back up if keyboard focus lands in the covered header or hero.
- **Shared cell borders.** A row of cells is `width: calc(100% + 1px)` with `border-right`. Each cell draws `border-left` (and `border-bottom` where rows wrap). Grids with cells that must sit on guides size their columns in guide units (`--col`).
- **`Rule`.** A 13px element with `margin-block: -6px` (net 1px), `z-index: 1`. The line and crosshairs are background gradients.

Grid tokens per breakpoint: desktop ≥1024 → 12 cols / 40px gutter; tablet 768–1023 → 6 cols / 24px; mobile <768 → 4 cols / 16px.

## Motion

Both pieces of motion are off entirely under `prefers-reduced-motion`. Users who set it get native scrolling and see all content immediately.

**Smooth scroll: Lenis.** Set up in `hooks/useSmoothScroll.js`.

- **`lerp: 0.09`:** the scroll eases out over roughly half a second.
- **`wheelMultiplier: 0.9`:** each wheel notch travels a little less, so the glide doesn't overshoot the large sections.
- **GSAP's ticker drives Lenis,** so ScrollTrigger sees the same position every frame.
- **Touch scrolling stays native.**
- **In-page links glide via Lenis** (nav, skip link, mobile menu), and focus moves to the target.

**Preloader** (`components/Preloader.jsx`, timings in `lib/preloader.js`). A 2.75s full-screen panel:

- the division bars grow in, the wordmark rises, and a counter and gridline run to 100 over 1.75s;
- the panel then slides up over 1s to uncover the hero, and the hero entrance starts as it lifts;
- while it shows, the page underneath is `inert`, Lenis is stopped and the carousel is held;
- it's skipped under reduced motion.

**Hero photo zoom.** The active photo scales from 1.1 down to 1 over its 6s slide, restarting on each tab change and pausing with the progress bar (Web Animations API, in `Hero.jsx`).

**Reveals: GSAP + ScrollTrigger.** Set up in `hooks/useRevealAnimations.js`. Components opt in with data attributes:

| Attribute | Effect |
|---|---|
| `data-intro` / `data-intro="header"` | Hero entrance on load: header drops in, headline lines, tagline and tabs rise in sequence |
| `data-reveal` | The element's children fade up, staggered, when it scrolls into view (section headers, footer CTA) |
| `data-reveal-cell` | A grid cell's children rise in while the cell itself (fill, borders) stays put. Cells entering together stagger as a row (`ScrollTrigger.batch`) |
| `data-reveal-media` | Inside a cell: the image wipes down from the top while easing out of a zoom |
| `data-reveal-bar` | Inside a cell: the bar grows from the left (process steps) |

Each reveal plays once and then removes its inline styles. Trigger points use `clamp()`, so content on the last screen still plays.

## Images

`npm run images` reads `assets-src/` and writes `public/images/`:

- **Hero photos:** AVIF + WebP at 640–2560w (never upscaled), plus the `.webp` fallback that `content.js` points at.
- **Client logos:** 2× PNGs. WebP was no smaller for these flat logos.
- **Manifest:** `src/data/images.json`. `ResponsiveImage` reads it for `srcset` and width/height.

The first hero slide is preloaded from `index.html` by a small plugin in `vite.config.js`, using the same srcset and sizes as the page. To change an image, replace the file in `assets-src/` (keeping the name) and re-run `npm run images`.

## Where the build departs from the handoff

- **Tablet uses 6 guide columns, not 8.** The 3-up rows (hero tabs, process steps, offices) can't land on 8 columns; 6 fits both the 3-up and 2-up rows. To go back, set `--cols: 8` in `tokens.css`.
- **Card CTAs use the `--c-*-text` shade** for the label and the hover fill. The base process teal on white is 4.25:1, below WCAG AA for 14px text.
- **Hero autoplay pauses for keyboard focus only.** Focus that comes from a mouse click doesn't pause it, so a clicked arrow restarts the 6s timer as the handoff describes, rather than freezing the carousel.
- **Product card image bar is 2px**, per the HTML reference (the README text said 4px).
- **The hero has no column guides, and pins while the page scrolls over it.** Both were requested after the handoff.
- **Vertical spacing tightens below 1024px** (section padding 104 → 88 → 72px). The handoff didn't specify this.

## Known gaps / content to supply

- Most links are `#` placeholders: nav (except Products/Contact), the catalogue, product items, CTAs, "More testimonials", "Send enquiry", and the social links.
- Hero photos 1 and 2 are only 1024px wide, so they soften on large or retina screens. Supply larger originals and re-run `npm run images`.
- Hero photo 2 has an AI-generator sparkle watermark in its bottom-right corner, which also shows on the Engineers card.
