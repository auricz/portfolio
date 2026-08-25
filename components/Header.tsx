import ThemeToggle from "@/components/ThemeToggle";
import type { SiteData } from "@/lib/data";
import Image from "next/image";

interface HeaderProps {
  profile: SiteData["profile"];
  theme: SiteData["theme"];
}

export default function Header({ profile, theme }: HeaderProps) {
  return (
    // Allow images to size the header (avoid clipping) and keep layout flow
    <header className="relative overflow-visible px-6 pt-12 pb-8 text-center md:px-10 md:pt-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start md:flex md:justify-around md:gap-8">
          {/* Left image column (only visible on md+). Images are in the same flow as
              the header content so they don't overlap the text. */}
          <div className="hidden md:flex md:items-start md:justify-start">
            <Image
              src="/header_code.png"
              alt=""
              width={250}
              height={500}
              aria-hidden="true"
              className="w-[clamp(110px,15vw,200px)] max-w-[30vw] object-contain dark:invert-100"
              priority
            />
          </div>

          {/* Main content column */}
          <div className="relative px-4 text-center flex-1">
            <h1 className="font-display text-5xl leading-none text-neutral-900 md:text-6xl dark:text-neutral-50 font-bold">
              {profile.name}
            </h1>

            <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-8 text-left">
              <div>
                <h2 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-neutral-500/90 dark:text-neutral-500">
                  About
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {profile.about}
                </p>
              </div>
              <div>
                <h2 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-neutral-500/90 dark:text-neutral-500">
                  Currently
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {profile.currently}
                </p>
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <ThemeToggle lightLabel={theme.lightLabel} darkLabel={theme.darkLabel} />
            </div>

            {/* Mobile images (unchanged) */}
            <div className="mt-6 flex items-center justify-around gap-3 md:hidden">
              <Image
                src="/header_code.png"
                alt=""
                aria-hidden="true"
                width={250}
                height={500}
                className="max-h-80 object-contain dark:invert-100"
                priority
              />
              <Image
                src="/header_art.png"
                alt=""
                aria-hidden="true"
                width={250}
                height={500}
                className="max-h-80 object-contain dark:invert-100"
                priority
              />
            </div>
          </div>

          {/* Right image column (only visible on md+). */}
          <div className="hidden md:flex md:items-start md:justify-end">
            <Image
              src="/header_art.png"
              alt=""
              width={250}
              height={500}
              aria-hidden="true"
              className="w-[clamp(110px,15vw,200px)] max-w-[30vw] object-contain dark:invert-100"
              priority
            />
          </div>
        </div>
      </div>
    </header>
  );
}
