import type { Metadata, Viewport } from "next";
import "./globals.css";
import { arch, display, sans, serif, tech } from "./fonts";
import SmoothScroll from "@/components/SmoothScroll";
import { studio } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://odyra-studio.vercel.app"),
  title: { default: "Odyra Studio — Cinematic Films & Photography", template: "%s — Odyra Studio" },
  description: `${studio.tagline} Founded by Kunal Nagia, based in ${studio.city}.`,
  openGraph: {
    title: "Odyra Studio",
    description: studio.tagline,
    images: ["/media/video/home-reel-poster.jpg"],
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#0b0a09" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${serif.variable} ${arch.variable} ${tech.variable}`}>
      <body className="grain">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
