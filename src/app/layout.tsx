import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Sidebar } from "@/components/sidebar";
import { siteConfig } from "@/data/site.config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} · Software, Applied AI and Research`, template: `%s · ${siteConfig.name}` },
  description: siteConfig.description,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  keywords: ["Hritwik Varma", "software engineer", "applied AI", "machine learning", "RAG", "BIT Mesra", "portfolio"],
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    url: "/",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: siteConfig.name, description: siteConfig.description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f5f1" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1013" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-dvh bg-bg text-ink">
        <Providers>
          <a
            href="#main"
            className="fixed left-3 top-3 z-[60] -translate-y-20 rounded-lg bg-ink px-3 py-2 text-sm text-bg focus:translate-y-0"
          >
            Skip to content
          </a>
          <Sidebar />
          <div className="lg:pl-64">
            <main id="main" tabIndex={-1} className="pb-24 pt-10 focus:outline-none sm:pt-16 lg:pt-24">
              {children}
            </main>
            <footer className="border-t border-line">
              <div className="mx-auto flex max-w-[68rem] flex-col gap-2 px-5 py-8 text-[13px] text-muted sm:flex-row sm:justify-between sm:px-8">
                <p>© {new Date().getFullYear()} {siteConfig.name}</p>
                <p>Built with Next.js and Tailwind CSS.</p>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
