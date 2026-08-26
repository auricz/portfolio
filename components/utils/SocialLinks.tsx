import Image from "next/image";
import type { SocialLink } from "@/lib/data";

interface SocialLinksProps {
  links: SocialLink[];
  size: number;
  className?: string;
}

// Reusable row of icon links, shared by the Header (larger) and Footer
// (smaller) so adding a new link only means adding an entry to siteData.links.
export default function SocialLinks({ links, size, className = "" }: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="opacity-70 transition-opacity hover:opacity-100"
        >
          <Image
            src={`/links/${link.fileName}`}
            alt={link.label}
            aria-hidden
            width={size}
            height={size}
            className="dark:invert-100"
          />
        </a>
      ))}
    </div>
  );
}