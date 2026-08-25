import ArtGrid from "@/components/ArtGrid";
import type { ArtPiece, SiteData } from "@/lib/data";

interface ArtSectionProps {
  pieces: ArtPiece[];
  artIntro: SiteData["artIntro"];
}

// Server component boundary: data is resolved here and handed to the
// client-side grid, which needs interactivity for search, sorting, and the
// image modal.
export default function ArtSection({ pieces, artIntro }: ArtSectionProps) {
  return (
    <div className="bg-neutral-200 p-6 dark:bg-neutral-800 sm:px-10">
      <div className="mx-auto max-w-7xl flex flex-col">
        {artIntro && 
          <div className="flex flex-col pb-6 border-b border-neutral-300 dark:border-neutral-600">
            <p className="text-sm max-w-2xl text-center self-center text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">
              {artIntro}
            </p>
          </div>
        }
        <ArtGrid pieces={pieces} />
      </div>
    </div>
  );
}
