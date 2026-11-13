import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getSearchItems } from "@/lib/data";
import "./globals.css";

const instrument = localFont({
  src: "./fonts/instrument-serif.woff2",
  weight: "400",
  variable: "--font-instrument",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const inter = localFont({
  src: "./fonts/inter.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Cineverse — Where Every Frame Matters",
    template: "%s — Cineverse",
  },
  description:
    "Cineverse is an independent film and television journal. Discover curated reviews, rankings, and the stories behind the frames.",
  applicationName: "Cineverse",
  keywords: [
    "cinema",
    "film reviews",
    "series",
    "top ten",
    "movie rankings",
  ],
  authors: [{ name: "Cineverse Editorial" }],
  openGraph: {
    title: "Cineverse — Where Every Frame Matters",
    description:
      "Curated reviews, rankings, and the stories behind the frames.",
    type: "website",
    siteName: "Cineverse",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrument.variable} ${inter.variable}`}>
      <body className="site-body">
        <Suspense fallback={<header className="navbar" />}>
          <Navbar items={getSearchItems()} />
        </Suspense>
        <main className="site-main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
