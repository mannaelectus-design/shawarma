import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const IMAGE_DIRS = [
  'public/images',
  'public/images/menu',
];

let converted = 0;
let totalSaved = 0;

for (const dir of IMAGE_DIRS) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));

  for (const file of files) {
    const inputPath = path.join(dir, file);
    const outputPath = path.join(dir, file.replace('.png', '.webp'));

    const inputSize = fs.statSync(inputPath).size;

    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);

    const outputSize = fs.statSync(outputPath).size;
    const saved = inputSize - outputSize;
    totalSaved += saved;
    converted++;

    console.log(`✅ ${file} → ${file.replace('.png', '.webp')} | ${(inputSize / 1024).toFixed(0)}KB → ${(outputSize / 1024).toFixed(0)}KB (saved ${(saved / 1024).toFixed(0)}KB)`);
  }
}

console.log(`\n🎉 Done! Converted ${converted} images. Total saved: ${(totalSaved / 1024 / 1024).toFixed(1)}MB`);
