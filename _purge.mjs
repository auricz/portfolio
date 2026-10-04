// Purge everything in the Cloudflare cache, then re-request every image so
// the cache is warm again.
// Usage: node _purge.mjs
//
// Needs these in the environment or in .env:
//   CLOUDFLARE_API_TOKEN  token with the Zone > Cache Purge permission
//   CLOUDFLARE_ZONE_ID    zone ID of the site's domain
//   SITE_URL              e.g. https://example.com

// ---- Settings ----
const PAGES = ["/projects", "/art", "/experiences"]; // pages crawled for images
const CONCURRENCY = 6; // parallel image requests
const PURGE_SETTLE_MS = 5000; // give the purge time to propagate before warming

// Browser-like Accept header, so the optimizer negotiates the same format
// (AVIF) a real visitor gets.
const IMAGE_ACCEPT = "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8";

// Mirrors vinext's next/image shim (node_modules/vinext/dist/shims/image.js)
// with the default images.deviceSizes / images.imageSizes.
const DEVICE_SIZES = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
const IMAGE_SIZES = [32, 48, 64, 96, 128, 256, 384];
const ALL_WIDTHS = [...DEVICE_SIZES, ...IMAGE_SIZES].sort((a, b) => a - b);

const IMAGE_EXTENSIONS = /\.(webp|png|jpe?g|gif|svg|avif|ico)$/i;

try {
  process.loadEnvFile();
} catch {
  // No .env; rely on the real environment.
}

const { CLOUDFLARE_API_TOKEN, CLOUDFLARE_ZONE_ID, SITE_URL } = process.env;

// 1x/2x widths for a fixed-width image (getImageWidths in the shim).
function imageWidths(width) {
  const pick = (target) => ALL_WIDTHS.find((w) => w >= target) ?? ALL_WIDTHS.at(-1);
  return [...new Set([pick(width), pick(width * 2)])];
}

// Same string the shim builds; the cache key is order-sensitive.
function optimizerUrl(src, width, quality, deploymentId) {
  const dpl = deploymentId ? `&dpl=${deploymentId}` : "";
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}${dpl}`;
}

async function purgeEverything() {
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/purge_cache`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ purge_everything: true }),
    }
  );
  const json = await res.json();
  if (!json.success) {
    const messages = json.errors?.map((e) => `${e.code}: ${e.message}`).join(", ");
    throw new Error(`Purge failed (${res.status}) ${messages}`);
  }
  console.log("✔ Purged everything");
}

function decodeEntities(value) {
  return value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#x27;", "'");
}

function getAttribute(tag, name) {
  const match = tag.match(new RegExp(`\\s${name}="([^"]*)"`, "i"));
  return match ? decodeEntities(match[1]) : null;
}

function srcsetUrls(srcset) {
  return srcset
    .split(",")
    .map((candidate) => candidate.trim().split(/\s+/)[0])
    .filter(Boolean);
}

// Only images served from the site itself; off-site ones (YouTube
// thumbnails) don't go through our Cloudflare cache.
function isImageUrl(url) {
  const { origin, pathname } = new URL(url, SITE_URL);
  if (origin !== new URL(SITE_URL).origin) return false;
  return pathname === "/_next/image" || IMAGE_EXTENSIONS.test(pathname);
}

// Every image URL the page's HTML references, plus the images its modals
// load on click (those never appear in the HTML).
async function collectImageUrls(pagePath) {
  const res = await fetch(new URL(pagePath, SITE_URL));
  if (!res.ok) {
    console.warn(`⚠ ${pagePath}: ${res.status}, skipped`);
    return [];
  }
  const html = await res.text();
  const urls = [];

  // <img> tags, plus <link rel="preload" as="image"> for eager images.
  for (const [tag] of html.matchAll(/<(?:img|link)\b[^>]*>/gi)) {
    const src = getAttribute(tag, "src") ?? getAttribute(tag, "href");
    const srcset = getAttribute(tag, "srcset") ?? getAttribute(tag, "imagesrcset");
    const candidates = [src, ...(srcset ? srcsetUrls(srcset) : [])].filter(Boolean);
    urls.push(...candidates.filter(isImageUrl));

    if (!src || !src.startsWith("/_next/image")) continue;

    // Fill images (tiles) have no srcset; those are the ones that open a modal.
    const params = new URL(src, SITE_URL).searchParams;
    const source = params.get("url");
    const deploymentId = params.get("dpl");
    if (srcset || !source) continue;

    if (source.startsWith("/art/")) {
      // ArtModal: width 2000, quality 100, plus the original for its dimensions.
      for (const w of imageWidths(2000)) urls.push(optimizerUrl(source, w, 100, deploymentId));
      urls.push(source);
    } else if (source.startsWith("/projects/")) {
      // ProjectImageModal: width 1920, quality 100, and its 50px fill thumbnails.
      for (const w of imageWidths(1920)) urls.push(optimizerUrl(source, w, 100, deploymentId));
      urls.push(optimizerUrl(source, DEVICE_SIZES[0], 100, deploymentId));
    }
  }

  return urls;
}

async function warm(url) {
  const res = await fetch(new URL(url, SITE_URL), { headers: { Accept: IMAGE_ACCEPT } });
  await res.arrayBuffer(); // read the whole body so the response gets cached
  const status = res.headers.get("cf-cache-status") ?? "no cf-cache-status";
  return { ok: res.ok, status: res.ok ? status : res.status };
}

async function warmAll(urls) {
  let failures = 0;
  const queue = [...urls];

  async function worker() {
    while (queue.length > 0) {
      const url = queue.shift();
      try {
        const { ok, status } = await warm(url);
        if (!ok) failures++;
        console.log(`${ok ? "✔" : "✖"} [${status}] ${url}`);
      } catch (error) {
        failures++;
        console.error(`✖ ${url}: ${error.message}`);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  return failures;
}

async function main() {
  const missing = Object.entries({ CLOUDFLARE_API_TOKEN, CLOUDFLARE_ZONE_ID, SITE_URL })
    .filter(([, value]) => !value)
    .map(([name]) => name);
  if (missing.length > 0) {
    console.error(`Missing env: ${missing.join(", ")}`);
    process.exit(1);
  }

  await purgeEverything();
  await new Promise((resolve) => setTimeout(resolve, PURGE_SETTLE_MS));

  const urls = new Set();
  for (const page of PAGES) {
    for (const url of await collectImageUrls(page)) urls.add(url);
  }
  console.log(`Warming ${urls.size} images...`);

  const failures = await warmAll(urls);
  console.log(`Done: ${urls.size - failures} warmed, ${failures} failed`);
  if (failures > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(`✖ ${error.message}`);
  process.exit(1);
});
