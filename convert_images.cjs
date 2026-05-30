const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public/images');

const files = [
  'our_story_kitchen.png',
  'why_different_flames.png'
];

async function convert() {
  for (const file of files) {
    const inputPath = path.join(dir, file);
    if (!fs.existsSync(inputPath)) {
      console.log(`Skipping ${file}, not found`);
      continue;
    }
    const outputPath = path.join(dir, file.replace('.png', '.webp'));
    
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);
      
    console.log(`Converted ${file} to WebP.`);
    // fs.unlinkSync(inputPath); // keep for now or delete? Delete later if successful.
  }
}

convert().catch(console.error);
