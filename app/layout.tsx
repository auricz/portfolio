import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import TabsNav from "@/components/TabsNav";
import Footer from "@/components/Footer";
import { siteData } from "@/lib/data";
import { themeInitScript } from "@/lib/theme-script";
import { animationInitScript } from "@/lib/animation-script";

export const metadata: Metadata = {
  title: siteData.meta.siteTitle,
  description: siteData.meta.siteDescription,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Blocking scripts: apply the persisted theme and animation
            preference before first paint to avoid any flash/flicker. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
        <script dangerouslySetInnerHTML={{ __html: animationInitScript() }} />
      </head>
      <body className="flex min-h-full flex-col bg-white text-neutral-900 transition-colors dark:bg-neutral-950 dark:text-neutral-50">
        <Header profile={siteData.profile} theme={siteData.theme} animations={siteData.animations} />
        <div className="px-6 sm:px-10">
          <div className="mx-auto max-w-7xl">
            <TabsNav tabs={siteData.tabs} />
          </div>
        </div>
        <main className="flex-1 bg-neutral-200 dark:bg-neutral-800">{children}</main>
        <Footer footer={siteData.footer} />
      </body>
    </html>
  );
}