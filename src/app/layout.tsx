import type { Metadata } from "next";
import Link from "next/link";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-sans/700.css";
import "@fontsource/ibm-plex-mono/400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "System Design - 100 dars",
  description: "System design bo'yicha o'zbek tilidagi 100 darslik chuqur kurs",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="uz" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <header className="sticky top-0 z-10 border-b border-rule bg-paper/90 backdrop-blur">
          <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
            <Link href="/" className="font-semibold tracking-tight">
              System Design <span className="text-muted font-normal">/ 100 dars</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/#xarita" className="text-sm text-muted hover:text-ink">
                Xarita
              </Link>
              {/* Hub lives in another zone, so a plain <a> (hard navigation), not <Link>. */}
              <a href="/" className="text-sm text-muted hover:text-ink">
                Kurslar
              </a>
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
