import { SiteData } from "@/lib/data";
import SocialLinks from "@/components/utils/SocialLinks";

interface FooterProps {
  footer: SiteData["footer"];
  links: SiteData["links"]
}

export default function Footer({ footer, links }: FooterProps) {
  return (
    <footer className="px-6 py-10 text-center sm:px-10 bg-neutral-200 dark:bg-neutral-800">
      <p 
        className="mx-auto max-w-3xl text-sm leading-relaxed text-neutral-500 dark:text-neutral-400" 
        dangerouslySetInnerHTML={{ __html: footer }} 
      />
      <SocialLinks links={links} size={30} className="mt-4 justify-center" />
      <p className="mt-4 text-xs text-neutral-500/85 dark:text-neutral-500">
        © This year
      </p>
    </footer>
  );
}
