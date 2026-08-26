"use client";

import { ToggleData } from "@/lib/data";

interface ToggleProps {
  toggleData: ToggleData;
  checked: boolean;
  onChange: () => void;
  ariaLabel: string;
  visible?: boolean;
}

// Shared switch UI used by ThemeToggle and AnimationToggle so both stay
// visually consistent; each caller owns its own state and persistence.
export default function Toggle({ toggleData, checked, onChange, ariaLabel, visible = true }: ToggleProps) {
  return (
    <div className={`flex flex-col items-center gap-2 transition-opacity duration-270 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <span className="text-[11px] font-medium uppercase tracking-widest text-neutral-500/85 dark:text-neutral-500">
        {toggleData.label}
      </span>
      <div className="flex justify-between gap-2">
        <span className="text-[11px] font-medium uppercase tracking-widest text-neutral-500/85 dark:text-neutral-500">
          {toggleData.offLabel}
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          aria-label={ariaLabel}
          onClick={onChange}
          className={`
            inline-flex shrink-0 items-center
            h-5 w-9 p-0.5
            rounded-full 
            ${checked ? "bg-green-700 dark:bg-green-600" : "bg-neutral-300 dark:bg-neutral-600"}
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400
            transition-colors 
            cursor-pointer
          `}
        >
          <span
            className={`h-4 w-4 rounded-full bg-white shadow transition-transform duration-80 ${
              checked ? "translate-x-4" : "translate-x-0"
            }`}
          />
        </button>
        <span className="text-[11px] font-medium uppercase tracking-widest text-neutral-500/85 dark:text-neutral-500">
          {toggleData.onLabel}
        </span>
      </div>
    </div>
  );
}