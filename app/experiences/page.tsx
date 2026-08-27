import type { Metadata } from "next";
import ExperienceSection from "@/components/experience/ExperienceSection";
import { getSiteData, SiteData } from "@/lib/data";

// export const metadata: Metadata = {
//   title: `Experiences — ${siteData.profile.name}`,
// };

export default async function ExperiencePage() {
  const siteData: SiteData = await getSiteData();
  return <ExperienceSection experiences={siteData.experiences} />;
}