import ThemeToggle from "@/components/ThemeToggle";
import type { SiteData } from "@/lib/data";

interface HeaderProps {
  profile: SiteData["profile"];
  theme: SiteData["theme"];
}

export default function Header({ profile, theme }: HeaderProps) {
  return (
    <header className="relative overflow-hidden px-6 pt-12 pb-8 text-center sm:px-10 sm:pt-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 hidden md:block">
        <img
          src="/header_code.png"
          alt=""
          aria-hidden="true"
          className="absolute left-0 top-0 w-[clamp(110px,15vw,230px)] max-w-[30vw] object-contain"
        />
        <img
          src="/header_art.png"
          alt=""
          aria-hidden="true"
          className="absolute right-0 top-0 w-[clamp(110px,15vw,230px)] max-w-[30vw] object-contain"
        />
      </div>

      <div className="relative z-10">
        <h1 className="font-display text-5xl leading-none text-neutral-900 sm:text-6xl dark:text-neutral-50 font-bold">
          {profile.name}
        </h1>

        <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-8 text-left sm:grid-cols-2 sm:gap-8">
          <div>
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-neutral-500/90 dark:text-neutral-500">
              {profile.aboutLabel}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">
              {profile.about}
            </p>
          </div>
          <div>
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-neutral-500/90 dark:text-neutral-500">
              {profile.currentlyLabel}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">
              {profile.currently}
            </p>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <ThemeToggle lightLabel={theme.lightLabel} darkLabel={theme.darkLabel} />
        </div>

        <div className="mt-6 flex items-center justify-center gap-3 md:hidden">
          <img
            src="/header_code.png"
            alt=""
            aria-hidden="true"
            className="h-12 w-auto max-w-[35vw] object-contain"
          />
          <img
            src="/header_art.png"
            alt=""
            aria-hidden="true"
            className="h-12 w-auto max-w-[35vw] object-contain"
          />
        </div>
      </div>
    </header>
  );
}
