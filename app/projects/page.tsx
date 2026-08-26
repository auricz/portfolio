import type { Metadata } from "next";
import SoftwareSection from "@/components/project/ProjectSection";
import { siteData } from "@/lib/data";

export const metadata: Metadata = {
  title: `Projects — ${siteData.profile.name}`,
};

export default function SoftwarePage() {
  return <SoftwareSection projects={siteData.softwareProjects} projectIntro={siteData.projectIntro}/>;
}
