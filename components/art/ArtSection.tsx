import ArtGrid from "@/components/art/ArtGrid";
import type { ArtPiece, SiteData } from "@/lib/data";
import SectionIntro from "@/components/utils/SectionIntro";

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
        <SectionIntro intro={artIntro} />
        <ArtGrid pieces={pieces} />
      </div>
    </div>
  );
}
