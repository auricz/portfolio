"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { TabId } from "@/lib/data";

interface TabsNavProps {
  tabs: { id: TabId; label: string }[];
}

export default function TabsNav({ tabs }: TabsNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Portfolio sections" className="grid grid-cols-3 w-full gap-4 break-all">
      {tabs.map((tab) => {
        const href = `/${tab.id}`;
        const active = pathname === href;
        return (
          <Link
            key={tab.id}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex-1 rounded-t-md px-4 py-2.5 text-center text-lg transition-colors  ${
              active
                ? // Matches the panel background directly below, so the
                  // active tab reads as physically attached to its section.
                  "bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50 font-bold"
                : // A distinct shade (lighter than the page, darker than the
                  // active tab / panel) signals "different section, still
                  // clickable" without looking connected to the panel.
                  "bg-neutral-200/65 text-neutral-500 hover:bg-neutral-300/80 hover:text-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800/75 dark:hover:text-neutral-200"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
