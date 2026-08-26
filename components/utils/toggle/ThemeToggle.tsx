"use client";

import { useEffect, useState } from "react";
import Toggle from "@/components/utils/toggle/Toggle";
import { THEME_STORAGE_KEY } from "@/lib/theme-script";


export default function ThemeToggle() {
  // Mirrors the class already applied by the blocking init script so the
  // client and server render agree after hydration.
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.style.colorScheme = next ? "dark" : "light";
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light");
    } catch {
      // localStorage may be unavailable (e.g. private mode) — theme still
      // works for the current session via the DOM class.
    }
  }

  return (
    <Toggle
      toggleData={{ label: "Theme", onLabel: "Dark", offLabel: "Light" }}
      checked={isDark ?? false}
      onChange={toggle}
      ariaLabel={`Toggle themes. Currently selected theme is: ${isDark ? "dark" : "light"}`}
      visible={isDark !== null}
      themeDesign
    />
  );
}