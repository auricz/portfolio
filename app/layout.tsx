import "./globals.css";
import Header from "@/components/Header";
import TabsNav from "@/components/TabsNav";
import Footer from "@/components/Footer";
import { getSiteData, SiteData } from "@/lib/data";
import { themeInitScript } from "@/lib/theme-script";
import { animationInitScript } from "@/lib/animation-script";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Auric Z. — Portfolio`,
  description: "My portfolio website for my professional experiences, software projects, and art drawings."
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const siteData: SiteData = await getSiteData();
  return (
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Blocking scripts: apply the persisted theme and animation
            preference before first paint to avoid any flash/flicker. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
        <script dangerouslySetInnerHTML={{ __html: animationInitScript() }} />
      </head>
      <body className="flex min-h-full flex-col bg-white text-neutral-900 transition-colors dark:bg-neutral-950 dark:text-neutral-50">
        <Header
          links={siteData.links}
          name={siteData.staticData.name}
          about={siteData.staticData.about}
          currently={siteData.staticData.currently}
        />
        <TabsNav tabs={siteData.tabs} />
        <main className="flex-1 bg-neutral-200 dark:bg-neutral-800">{children}</main>
        <Footer footer={siteData.staticData.footer ?? ""} links={siteData.links} />
      </body>
    </html>
  );
}