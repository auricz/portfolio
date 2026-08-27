import type { Metadata } from "next";
import SoftwareSection from "@/components/project/ProjectSection";
import { getSiteData, SiteData } from "@/lib/data";

// export const metadata: Metadata = {
//   title: `Projects — ${siteData.profile.name}`,
// };

export default async function SoftwarePage() {
  const siteData: SiteData = await getSiteData();
  return <SoftwareSection projects={siteData.softwareProjects} projectIntro={siteData.staticData.projectIntro}/>;
}
