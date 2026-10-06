import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { hero } from './src/data/content.js';
import { coverSizes, imageMeta } from './src/lib/images.js';

// Preload the first hero slide (the LCP image) so the browser fetches it
// before the JS bundle has rendered the <picture>. Same srcset and sizes as
// the <source> in Hero.jsx, so it is the file the page goes on to use.
function preloadHeroImage() {
  return {
    name: 'preload-hero-image',
    transformIndexHtml() {
      const src = hero.slides[0].image;
      const avif = imageMeta(src)?.sources.find((s) => s.type === 'image/avif');
      if (!avif) return [];
      return [
        {
          tag: 'link',
          attrs: {
            rel: 'preload',
            as: 'image',
            type: 'image/avif',
            imagesrcset: avif.srcset,
            imagesizes: coverSizes(src),
            fetchpriority: 'high',
          },
          injectTo: 'head',
        },
      ];
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), preloadHeroImage()],
});
