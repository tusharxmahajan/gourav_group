// Turns the raw images in assets-src/ into web-ready files in public/images/
// and writes src/data/images.json (intrinsic sizes + srcsets) for the
// ResponsiveImage component. Run with `npm run images` after changing assets.
import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { clients, hero } from '../src/data/content.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fromRoot = (...p) => path.join(root, ...p);

const HERO_WIDTHS = [640, 960, 1280, 1920, 2560];
const HERO_FALLBACK_WIDTH = 1600;
const LOGO_DENSITY = 2;

const manifest = {};
const kb = (info) => `${Math.round(info.size / 1024)}kB`;

async function heroImage(publicPath) {
  const name = path.basename(publicPath, '.webp');
  const input = fromRoot('assets-src/hero', `${name}.png`);
  const outDir = fromRoot('public/images/hero');
  const { width } = await sharp(input).metadata();

  // Never upscale: the largest variant is the source width (capped).
  const widths = [...new Set([...HERO_WIDTHS.filter((w) => w < width), Math.min(width, HERO_WIDTHS.at(-1))])];
  const srcset = { avif: [], webp: [] };
  for (const w of widths) {
    const resized = sharp(input).resize({ width: w });
    await resized.clone().avif({ quality: 50, effort: 6 }).toFile(path.join(outDir, `${name}-${w}.avif`));
    await resized.clone().webp({ quality: 78, effort: 6 }).toFile(path.join(outDir, `${name}-${w}.webp`));
    srcset.avif.push(`/images/hero/${name}-${w}.avif ${w}w`);
    srcset.webp.push(`/images/hero/${name}-${w}.webp ${w}w`);
  }

  const fallback = await sharp(input)
    .resize({ width: Math.min(width, HERO_FALLBACK_WIDTH) })
    .webp({ quality: 78, effort: 6 })
    .toFile(fromRoot('public', publicPath));

  manifest[publicPath] = {
    width: fallback.width,
    height: fallback.height,
    sources: [
      { type: 'image/avif', srcset: srcset.avif.join(', ') },
      { type: 'image/webp', srcset: srcset.webp.join(', ') },
    ],
  };
  console.log(`${publicPath}  ${widths.join('/')}w  fallback ${kb(fallback)}`);
}

async function logo({ src, h }) {
  const name = path.basename(src, '.png');
  const input = fromRoot('assets-src/clients', `${name}.png`);
  const meta = await sharp(input).metadata();
  const height = Math.min(meta.height, Math.round(h * LOGO_DENSITY));
  // Flat-colour logos: a 2x PNG is as small as WebP here (often smaller),
  // so the logos ship as PNG only.
  const png = await sharp(input).resize({ height }).png({ compressionLevel: 9, effort: 10 }).toFile(fromRoot('public', src));

  manifest[src] = { width: png.width, height: png.height, sources: [] };
  console.log(`${src}  ${png.width}x${png.height}  ${kb(png)}`);
}

await rm(fromRoot('public/images'), { recursive: true, force: true });
await mkdir(fromRoot('public/images/hero'), { recursive: true });
await mkdir(fromRoot('public/images/clients'), { recursive: true });

for (const slide of hero.slides) await heroImage(slide.image);
for (const client of clients) await logo(client);

await writeFile(fromRoot('src/data/images.json'), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Wrote src/data/images.json (${Object.keys(manifest).length} images)`);
