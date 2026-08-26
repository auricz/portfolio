"use client";

import { useState } from "react";

interface AnimateOnMountProps {
  children: React.ReactNode;
  variant: "left" | "right";
  className?: string;
}

// Plays the slide-in-{variant} animation once on mount. Once it finishes,
// the animate class is dropped so toggling Animations off then back on
// later doesn't replay it (mirrors Reveal's "once only" behavior).
export default function AnimateOnMount({ children, variant, className = "" }: AnimateOnMountProps) {
  const [animated, setAnimated] = useState(false);

  return (
    <div
      className={`${animated ? "" : `animate-slide-in-${variant}`} ${className}`}
      onAnimationEnd={() => setAnimated(true)}
    >
      {children}
    </div>
  );
}