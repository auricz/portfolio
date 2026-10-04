// Resize and compress images to .webp. Paths are relative to IMAGE_DIR.
// Usage: node _resize.mjs art/photo.jpg   |   node _resize.mjs "art/*"
// A * anywhere in the path converts every non-webp image in that directory.
// -k keeps the original dimensions (still converts and compresses).

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// ---- Settings ----
const IMAGE_DIR = "./public/"; // relative to where you run the script
const MAX_DIMENSION = 1200; // max width or height in pixels
const QUALITY = 80; // 1–100, 100 = best quality

const SUPPORTED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".tif", ".tiff", ".avif"];

function isSupportedImage(fileName) {
  const extension = path.extname(fileName).toLowerCase();
  return SUPPORTED_EXTENSIONS.includes(extension);
}

// Paths (relative to IMAGE_DIR) of every supported image in a directory.
async function getAllImageFiles(directory) {
  const fileNames = await fs.readdir(path.join(IMAGE_DIR, directory));
  return fileNames.filter(isSupportedImage).map((fileName) => path.join(directory, fileName));
}

async function convertImage(filePath, keepSize) {
  const inputPath = path.join(IMAGE_DIR, filePath);
  const { dir, name } = path.parse(filePath);
  const outputFilePath = path.join(dir, `${name}.webp`);
  const outputPath = path.join(IMAGE_DIR, outputFilePath);

  // rotate() applies EXIF orientation so phone photos aren't sideways.
  let image = sharp(inputPath).rotate();

  // "inside" keeps the aspect ratio; withoutEnlargement skips upscaling.
  if (!keepSize) {
    image = image.resize({
      width: MAX_DIMENSION,
      height: MAX_DIMENSION,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  const info = await image.webp({ quality: QUALITY }).toFile(outputPath);

  console.log(`✔ ${filePath} → ${outputFilePath} (${info.width}x${info.height})`);
}

async function main() {
  const args = process.argv.slice(2);
  const keepSize = args.includes("-k");
  const fileArgument = args.find((arg) => arg !== "-k");

  if (!fileArgument) {
    console.error('Usage: node _resize.mjs [-k] <dir/file name> | "<dir>/*"');
    process.exit(1);
  }

  let filesToConvert;

  if (fileArgument.includes("*")) {
    const directory = path.dirname(fileArgument);
    try {
      filesToConvert = await getAllImageFiles(directory);
    } catch (error) {
      console.error(`Can't read ${path.join(IMAGE_DIR, directory)}: ${error.message}`);
      process.exit(1);
    }
  } else if (isSupportedImage(fileArgument)) {
    filesToConvert = [fileArgument];
  } else {
    console.error(`Unsupported file type: ${fileArgument}`);
    process.exit(1);
  }

  if (filesToConvert.length === 0) {
    console.log(`No images found in ${path.join(IMAGE_DIR, path.dirname(fileArgument))}`);
    return;
  }

  for (const filePath of filesToConvert) {
    try {
      await convertImage(filePath, keepSize);
    } catch (error) {
      console.error(`✖ ${filePath}: ${error.message}`);
    }
  }
}

main();
