"use client";

import { useEffect, useState } from "react";
import Toggle from "@/components/Toggle";
import { THEME_STORAGE_KEY } from "@/lib/theme-script";
import { ToggleData } from "@/lib/data";

interface ThemeToggleProps {
  toggleData: ToggleData;
}

export default function ThemeToggle({ toggleData }: ThemeToggleProps) {
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
      toggleData={toggleData}
      checked={isDark ?? false}
      onChange={toggle}
      ariaLabel="Toggle color theme"
      visible={isDark !== null}
      themeDesign
    />
  );
}