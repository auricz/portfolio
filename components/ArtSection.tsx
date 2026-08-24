import ArtGrid from "@/components/ArtGrid";
import type { ArtPiece, SiteData } from "@/lib/data";

interface ArtSectionProps {
  pieces: ArtPiece[];
  copy: SiteData["art"];
}

// Server component boundary: data is resolved here and handed to the
// client-side grid, which needs interactivity for search, sorting, and the
// image modal.
export default function ArtSection({ pieces, copy }: ArtSectionProps) {
  return <ArtGrid pieces={pieces} copy={copy} />;
}
