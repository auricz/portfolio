"use client";

interface ToggleProps {
  toggleData: { 
    label: string; 
    onLabel: string; 
    offLabel: string; 
  };
  checked: boolean;
  onChange: () => void;
  ariaLabel: string;
  visible?: boolean;
  themeDesign?: boolean;
}

const sharedBtnClass: string = `
  px-4 py-2 
  border-4 border-neutral-300 dark:border-neutral-700
  text-sm font-medium uppercase tracking-widest
  text-neutral-600 dark:text-neutral-300
  focus-visible:outline-2 focus-visible:outline-offset-1
  transition-colors duration-200
  cursor-pointer
`;

const selectedClass: string = "bg-white dark:bg-black";
const notSelectedClass: string = "bg-neutral-300 dark:bg-neutral-700"

// Shared switch UI used by ThemeToggle and AnimationToggle so both stay
// visually consistent; each caller owns its own state and persistence.
export default function Toggle({ toggleData, checked, onChange, ariaLabel, visible = true, themeDesign = false }: ToggleProps) {
  return (
    <div className={`flex flex-col items-center gap-2 transition-opacity duration-270 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <span className="text-sm font-medium uppercase tracking-widest text-neutral-500">
        {toggleData.label}
      </span>
      {themeDesign ?
        // For binary options that isn't ON or OFF, likeLLight or Dark theme
        <div className="grid grid-cols-2" onClick={onChange}>
          <button className={`${sharedBtnClass} border-r-0 rounded-l-full ${checked ? notSelectedClass : selectedClass}`}>
            {toggleData.offLabel}
          </button>
          <button className={`${sharedBtnClass} border-l-0 rounded-r-full ${checked ? selectedClass : notSelectedClass}`}>
            {toggleData.onLabel}
          </button>
        </div>
        :
        // ON/OFF switch
        <>
          <div className="flex justify-between gap-2">
            <span className="text-sm font-medium uppercase tracking-widest text-neutral-500">
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
                className={`h-4 w-4 rounded-full bg-white shadow transition-transform duration-80 ${checked ? "translate-x-4" : "translate-x-0"
                  }`}
              />
            </button>
            <span className="text-sm font-medium uppercase tracking-widest text-neutral-500">
              {toggleData.onLabel}
            </span>
          </div>
        </>
      }
    </div>
  );
}