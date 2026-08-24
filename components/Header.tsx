import ThemeToggle from "@/components/ThemeToggle";
import type { SiteData } from "@/lib/data";

interface HeaderProps {
  profile: SiteData["profile"];
  theme: SiteData["theme"];
}

export default function Header({ profile, theme }: HeaderProps) {
  return (
    <header className="px-6 pt-12 pb-8 text-center sm:px-10 sm:pt-16">
      <h1 className="font-display text-5xl leading-none text-neutral-900 sm:text-6xl dark:text-neutral-50 font-bold">
        {profile.name}
      </h1>

      <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-8 text-left sm:grid-cols-2 sm:gap-8">
        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500/85 dark:text-neutral-500">
            {profile.aboutLabel}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">
            {profile.about}
          </p>
        </div>
        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500/85 dark:text-neutral-500">
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
    </header>
  );
}
