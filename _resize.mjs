// Resize and compress images to .webp.
// Usage: node resize-images.mjs photo.jpg   |   node resize-images.mjs "*"

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// ---- Settings ----
const IMAGE_DIR = "./public/art"; // relative to where you run the script
const MAX_DIMENSION = 1200; // max width or height in pixels
const QUALITY = 80; // 1–100, 100 = best quality

const SUPPORTED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".tif", ".tiff", ".avif"];

function isSupportedImage(fileName) {
  const extension = path.extname(fileName).toLowerCase();
  return SUPPORTED_EXTENSIONS.includes(extension);
}

async function getAllImageFiles() {
  const fileNames = await fs.readdir(IMAGE_DIR);
  return fileNames.filter(isSupportedImage);
}

async function convertImage(fileName) {
  const inputPath = path.join(IMAGE_DIR, fileName);
  const baseName = path.parse(fileName).name;
  const outputPath = path.join(IMAGE_DIR, `${baseName}.webp`);

  // "inside" keeps the aspect ratio; withoutEnlargement skips upscaling.
  // rotate() applies EXIF orientation so phone photos aren't sideways.
  const info = await sharp(inputPath)
    .rotate()
    .resize({
      width: MAX_DIMENSION,
      height: MAX_DIMENSION,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: QUALITY })
    .toFile(outputPath);

  console.log(`✔ ${fileName} → ${baseName}.webp (${info.width}x${info.height})`);
}

async function main() {
  const fileArgument = process.argv[2];

  if (!fileArgument) {
    console.error('Usage: node resize-images.mjs <file name> | "*"');
    process.exit(1);
  }

  let filesToConvert;

  if (fileArgument === "*") {
    filesToConvert = await getAllImageFiles();
  } else if (isSupportedImage(fileArgument)) {
    filesToConvert = [fileArgument];
  } else {
    console.error(`Unsupported file type: ${fileArgument}`);
    process.exit(1);
  }

  if (filesToConvert.length === 0) {
    console.log(`No images found in ${IMAGE_DIR}`);
    return;
  }

  for (const fileName of filesToConvert) {
    try {
      await convertImage(fileName);
    } catch (error) {
      console.error(`✖ ${fileName}: ${error.message}`);
    }
  }
}

main();
