"use client";

import { useEffect, useState } from "react";
import { THEME_STORAGE_KEY } from "@/lib/theme-script";

interface ThemeToggleProps {
  lightLabel: string;
  darkLabel: string;
}

export default function ThemeToggle({ lightLabel, darkLabel }: ThemeToggleProps) {
  // Mirrors the class already applied by the blocking init script so the
  // client and server render agree after hydration.
  const [isDark, setIsDark] = useState(false);

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

  const label = isDark ? darkLabel : lightLabel;

  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] font-medium uppercase tracking-widest text-neutral-500/85 dark:text-neutral-500">
        {label}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label="Toggle color theme"
        onClick={toggle}
        className="inline-flex h-5 w-9 shrink-0 items-center rounded-full bg-neutral-300 p-0.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 dark:bg-neutral-600 cursor-pointer"
      >
        <span
          className={`h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${
            isDark ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
