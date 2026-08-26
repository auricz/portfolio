import type { Metadata } from "next";
import ArtSection from "@/components/art/ArtSection";
import { siteData } from "@/lib/data";

export const metadata: Metadata = {
  title: `Art Gallery — ${siteData.profile.name}`,
};

export default function ArtPage() {
  return <ArtSection pieces={siteData.artPieces} artIntro={siteData.artIntro} />;
}
