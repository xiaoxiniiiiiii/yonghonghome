import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = 'C:/Users/Administrator/.codex/generated_images/01a0841b-e5be-75f3-99a2-5f37fbe9b415';
const output = path.resolve('public/assets');
const sourceMap = [
  ['furniture', 'exec-bb0d97bd-39ff-408a-8445-4a0aa1d7b095.png'],
  ['soft-furnishings', 'exec-03dc4d48-3ff0-4293-ae3d-5d42cf2eff3c.png'],
  ['essentials', 'exec-dff90463-8f63-44a7-b639-57d1bc36da1a.png'],
  ['lighting-decor', 'exec-2387361c-db76-4013-a601-cefd962cf832.png'],
  ['kitchen-bath', 'exec-617f8073-8434-4682-8d75-e824303be821.png']
];
const xs = [14, 373, 732, 1091];
const ys = [8, 366, 706];
await fs.mkdir(output, { recursive: true });
for (const [slug, file] of sourceMap) {
  for (let i = 0; i < 12; i++) {
    const destination = path.join(output, `${slug}-${String(i + 1).padStart(2, '0')}.webp`);
    await sharp(path.join(root, file)).extract({ left: xs[i % 4], top: ys[Math.floor(i / 4)], width: 344, height: 344 }).resize(640, 640).webp({ quality: 84 }).toFile(destination);
  }
}
await sharp(path.join(root, 'exec-d2bb8881-cfa7-4ebe-9339-0f3247b96005.png')).resize(640, 640).webp({ quality: 84 }).toFile(path.join(output, 'furniture-05.webp'));
await sharp(path.join(root, 'exec-b7b2fa95-67eb-4ed7-8686-d9987d3332f9.png')).resize(640, 640).webp({ quality: 84 }).toFile(path.join(output, 'furniture-11.webp'));
console.log(`Created ${sourceMap.length * 12} unique WebP product images in ${output}`);
