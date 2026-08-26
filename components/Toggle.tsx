"use client";

interface ToggleProps {
  groupLabel: string;
  activeLabel: string;
  checked: boolean;
  onChange: () => void;
  ariaLabel: string;
}

// Shared switch UI used by ThemeToggle and AnimationToggle so both stay
// visually consistent; each caller owns its own state and persistence.
export default function Toggle({ groupLabel, activeLabel, checked, onChange, ariaLabel }: ToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] font-medium uppercase tracking-widest text-neutral-500/85 dark:text-neutral-500">
        {groupLabel}
      </span>
      <span className="text-[11px] font-medium uppercase tracking-widest text-neutral-500/85 dark:text-neutral-500">
        {activeLabel}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={ariaLabel}
        onClick={onChange}
        className="inline-flex h-5 w-9 shrink-0 items-center rounded-full bg-neutral-300 p-0.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 dark:bg-neutral-600 cursor-pointer"
      >
        <span
          className={`h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${
            checked ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}