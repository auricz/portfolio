"use client";

import { useEffect, useState } from "react";
import Toggle from "@/components/utils/toggle/Toggle";
import { ANIMATIONS_STORAGE_KEY } from "@/lib/animation-script";


export default function AnimationToggle() {
  // "checked" (knob on the right) means animations are disabled, matching
  // the blocking init script's "no-animations" class on <html>.
  const [enabled, setEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(!document.documentElement.classList.contains("no-animations"));
  }, []);

  function toggle() {
    const next = !enabled;
    setEnabled(next);
    document.documentElement.classList.toggle("no-animations", enabled ?? false);
    try {
      localStorage.setItem(ANIMATIONS_STORAGE_KEY, enabled ? "off" : "on");
    } catch {
      // localStorage may be unavailable — setting still works for the
      // current session via the DOM class.
    }
  }

  return (
    <Toggle
      toggleData={{ label: "Animations", onLabel: "On", offLabel: "Off" }}
      checked={enabled ?? false}
      onChange={toggle}
      ariaLabel={`Toggle animations. Currently selected option is: ${enabled ? "on" : "off"}`}
      visible={enabled !== null}
    />
  );
}