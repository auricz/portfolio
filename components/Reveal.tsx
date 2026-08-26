"use client";

import { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  variant: "right" | "up";
  className?: string;
  style?: object;
}

// Adds the "visible" class the first time this element scrolls into view,
// then stops observing — it won't replay on scroll up/down, only on a
// fresh mount (i.e. switching tabs, since each tab is its own page).
export default function Reveal({ children, variant, className = "", style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal-${variant} ${visible ? "reveal-visible" : ""} ${className}`} style={style}>
      {children}
    </div>
  );
}