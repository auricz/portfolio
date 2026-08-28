"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { TabId } from "@/lib/data";

interface TabsNavProps {
  tabs: { id: TabId; label: string; }[];
}

export default function TabsNav({ tabs }: TabsNavProps) {
  const pathname = usePathname();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);

  // Sentinel sits just above the sticky nav; once it scrolls out of view
  // the nav has reached the top of the viewport, i.e. it's "stuck".
  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setStuck(!entry.isIntersecting));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} />
      {/* z-40: stays below modals (z-50). Solid bg only once stuck, so
          content doesn't show through/scroll behind it. */}
      <div
        className={`sticky top-0 z-40 px-6 transition-colors sm:px-10 ${
          stuck ? "bg-white dark:bg-neutral-950" : ""
        }`}
      >
        <nav aria-label="Portfolio sections" className="mx-auto grid w-full max-w-7xl grid-cols-3 gap-4">
          {tabs.map((tab) => {
            const href = `/${tab.id}`;
            const active = pathname === href;
            return (
              <Link
                key={tab.id}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex-1 rounded-t-md border px-2 text-center  transition-colors duration-100 py-3
                  ${stuck ? "border-neutral-300 dark:border-neutral-700" : "border-transparent"} 
                  ${active
                    ? "text-md md:text-xl bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50 font-bold"
                    : "text-sm md:text-lg bg-neutral-200/65 text-neutral-500 hover:bg-neutral-300/80 hover:text-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800/75 dark:hover:text-neutral-200"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}