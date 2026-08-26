"use client";

import { useEffect, useState } from "react";
import Toggle from "@/components/Toggle";
import { ANIMATIONS_STORAGE_KEY } from "@/lib/animation-script";

interface AnimationToggleProps {
  groupLabel: string;
  onLabel: string;
  offLabel: string;
}

export default function AnimationToggle({ groupLabel, onLabel, offLabel }: AnimationToggleProps) {
  // "checked" (knob on the right) means animations are disabled, matching
  // the blocking init script's "no-animations" class on <html>.
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(!document.documentElement.classList.contains("no-animations"));
  }, []);

  function toggle() {
    const next = !enabled;
    setEnabled(next);
    document.documentElement.classList.toggle("no-animations", enabled);
    try {
      localStorage.setItem(ANIMATIONS_STORAGE_KEY, enabled ? "off" : "on");
    } catch {
      // localStorage may be unavailable — setting still works for the
      // current session via the DOM class.
    }
  }

  return (
    <Toggle
      groupLabel={groupLabel}
      activeLabel={enabled ? onLabel : offLabel}
      checked={enabled}
      onChange={toggle}
      ariaLabel="Toggle animations"
    />
  );
}