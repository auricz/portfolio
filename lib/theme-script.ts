// Returned as a string and injected via a blocking <script> tag in the root
// layout so the correct theme class is applied before first paint (no
// flash of incorrect theme). Reads the persisted choice from localStorage
// and falls back to the OS preference on first visit.
export const THEME_STORAGE_KEY = "portfolio-theme";

export function themeInitScript(): string {
  return `
(function () {
  try {
    var key = ${JSON.stringify(THEME_STORAGE_KEY)};
    var stored = localStorage.getItem(key);
    var theme = stored === "light" || stored === "dark"
      ? stored
      : (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    document.documentElement.style.colorScheme = theme;
  } catch (e) {}
})();
`;
}
