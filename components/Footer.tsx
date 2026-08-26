interface FooterProps {
  footer: string;
}

export default function Footer({ footer }: FooterProps) {
  return (
    <footer className="px-6 py-10 text-center sm:px-10 bg-neutral-200 dark:bg-neutral-800">
      <p 
        className="mx-auto max-w-3xl text-sm leading-relaxed text-neutral-500 dark:text-neutral-400" 
        dangerouslySetInnerHTML={{ __html: footer }} 
      />
      <p className="mt-4 text-xs text-neutral-500/85 dark:text-neutral-500">
        © This year
      </p>
    </footer>
  );
}
