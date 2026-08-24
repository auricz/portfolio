import type { Metadata } from "next";
import SoftwareSection from "@/components/SoftwareSection";
import { siteData } from "@/lib/data";

export const metadata: Metadata = {
  title: `Software — ${siteData.profile.name}`,
};

export default function SoftwarePage() {
  return <SoftwareSection projects={siteData.softwareProjects} />;
}
