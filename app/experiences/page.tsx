import type { Metadata } from "next";
import ExperienceSection from "@/components/experience/ExperienceSection";
import { getSiteData, SiteData } from "@/lib/data";

export const metadata: Metadata = {
  title: `Auric Z. — Experiences`,
  description: "My professional experiences throughout my academic and professional career."
};


export default async function ExperiencePage() {
  const siteData: SiteData = await getSiteData();
  return <ExperienceSection experiences={siteData.experiences} />;
}