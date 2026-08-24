import type { SiteData } from "@/lib/data";

interface FooterProps {
  footer: SiteData["footer"];
}

export default function Footer({ footer }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 py-10 text-center sm:px-10 bg-neutral-200 dark:bg-neutral-800">
      <p className="mx-auto max-w-3xl text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
        {footer.note}{" "}
        <a
          href={`mailto:${footer.contactEmail}`}
          className="text-neutral-700 underline decoration-neutral-300 underline-offset-2 hover:text-neutral-900 dark:text-neutral-300 dark:decoration-neutral-600 dark:hover:text-neutral-100"
        >
          {footer.contactEmail}
        </a>
        .
      </p>
      <p className="mt-4 text-xs text-neutral-500/85 dark:text-neutral-500">
        © {year} {footer.copyrightName}
      </p>
    </footer>
  );
}
