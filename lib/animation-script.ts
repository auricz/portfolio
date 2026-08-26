// Same pattern as theme-script.ts: injected as a blocking <script> so the
// "no-animations" class is applied before first paint, no flash of motion
// for users who have it disabled or prefer reduced motion.
export const ANIMATIONS_STORAGE_KEY = "portfolio-animations";

export function animationInitScript(): string {
  return `
(function () {
  try {
    var key = ${JSON.stringify(ANIMATIONS_STORAGE_KEY)};
    var stored = localStorage.getItem(key);
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var disabled = stored === "off" || (stored === null && reduced);
    if (disabled) {
      document.documentElement.classList.add("no-animations");
    }
  } catch (e) {}
})();
`;
}