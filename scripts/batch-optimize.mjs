import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function optimizeImage(inputPath, outputPath, options) {
  const { maxWidth, quality, format } = options;
  const beforeStats = fs.statSync(inputPath);
  
  let pipeline = sharp(inputPath);
  if (maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }

  if (format === 'webp') {
    pipeline = pipeline.webp({ quality: quality || 80, effort: 6 });
  } else if (format === 'jpeg' || format === 'jpg') {
    pipeline = pipeline.jpeg({ quality: quality || 82, progressive: true, mozjpeg: true });
  }

  await pipeline.toFile(outputPath);
  const afterStats = fs.statSync(outputPath);
  
  const savedPercent = ((1 - afterStats.size / beforeStats.size) * 100).toFixed(1);
  console.log(`[${format.toUpperCase()}] ${path.basename(inputPath)} -> ${path.basename(outputPath)}: ${(beforeStats.size/1024).toFixed(0)}KB -> ${(afterStats.size/1024).toFixed(0)}KB (${savedPercent}% saved)`);
  return { before: beforeStats.size, after: afterStats.size };
}

async function run() {
  console.log('=== RYANKY STUDIOS IMAGE OPTIMIZATION PIPELINE ===\n');

  let totalBefore = 0;
  let totalAfter = 0;

  // 1. Process public/gallery
  console.log('--- Optimizing public/gallery ---');
  const galleryDir = 'public/gallery';
  const galleryFiles = fs.readdirSync(galleryDir).filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg'));

  for (const file of galleryFiles) {
    const input = path.join(galleryDir, file);
    const baseName = path.parse(file).name;
    const outWebp = path.join(galleryDir, `${baseName}.webp`);
    
    // Generate WebP
    const webpRes = await optimizeImage(input, outWebp, { maxWidth: 1200, quality: 80, format: 'webp' });
    totalBefore += webpRes.before;
    totalAfter += webpRes.after;

    // Also optimize the JPG in-place so legacy/fallback requests are tiny too!
    const tempJpg = path.join(galleryDir, `${baseName}.tmp.jpg`);
    await optimizeImage(input, tempJpg, { maxWidth: 1200, quality: 82, format: 'jpeg' });
    fs.renameSync(tempJpg, input);
  }

  // 2. Process src/assets heroes & pages
  console.log('\n--- Optimizing src/assets (Preserving original raw hero-image.jpg) ---');
  const assetHeroes = [
    { file: 'hero-image.jpg', max: 1920, quality: 82 },
    { file: 'gallery-hero.jpg', max: 1920, quality: 82 },
    { file: 'portfolio-hero.jpg', max: 1920, quality: 82 },
    { file: 'pricing-hero.jpg', max: 1920, quality: 82 },
    { file: 'services-hero.jpg', max: 1920, quality: 82 },
    { file: 'about-hero.jpeg', max: 1920, quality: 82 },
    { file: 'ceo-brian.jpg', max: 1000, quality: 82 },
    { file: 'testimonials-bg.png', max: 1920, quality: 80 }
  ];

  for (const item of assetHeroes) {
    const input = path.join('src/assets', item.file);
    if (!fs.existsSync(input)) continue;

    const baseName = path.parse(item.file).name;
    const outWebp = path.join('src/assets', `${baseName}.webp`);

    const res = await optimizeImage(input, outWebp, {
      maxWidth: item.max,
      quality: item.quality,
      format: 'webp'
    });
    totalBefore += res.before;
    totalAfter += res.after;
  }

  console.log('\n=================================================');
  console.log(`TOTAL PAYLOAD BEFORE: ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);
  console.log(`TOTAL PAYLOAD AFTER:  ${(totalAfter / 1024 / 1024).toFixed(2)} MB`);
  console.log(`BANDWIDTH SAVED:      ${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%`);
  console.log('=================================================');
}

run().catch(console.error);
