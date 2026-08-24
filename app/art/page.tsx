import type { Metadata } from "next";
import ArtSection from "@/components/ArtSection";
import { siteData } from "@/lib/data";

export const metadata: Metadata = {
  title: `Art — ${siteData.profile.name}`,
};

export default function ArtPage() {
  return <ArtSection pieces={siteData.artPieces} copy={siteData.art} />;
}
