import type { Metadata } from "next";
import ArtSection from "@/components/art/ArtSection";
import { getSiteData, SiteData } from "@/lib/data";

export const metadata: Metadata = {
  title: `Auric Z. — Art Gallery`,
  description: "An image gallery of all the artworks I have created throughout the years."
};


export default async function ArtPage() {
  const siteData: SiteData = await getSiteData();
  return <ArtSection pieces={siteData.artPieces} artIntro={siteData.staticData.artIntro} />;
}
