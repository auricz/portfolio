import type { Metadata } from "next";
import ExperienceSection from "@/components/ExperienceSection";
import { siteData } from "@/lib/data";

export const metadata: Metadata = {
  title: `Experiences — ${siteData.profile.name}`,
};

export default function ExperiencePage() {
  return <ExperienceSection experiences={siteData.experiences} />;
}