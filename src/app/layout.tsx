import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import { Preloader } from "@/components/ui/Preloader";
import { Cursor } from "@/components/ui/Cursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { hero, site } from "@/content/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Kişiye Özel Lüks Mobilya & Çelik Kapı`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "lüks mobilya",
    "kişiye özel mobilya",
    "masif ahşap mobilya",
    "marangoz",
    "el işçiliği mobilya",
    "ceviz mobilya",
    "çelik kapı",
    "ahşap kaplamalı çelik kapı",
    "Dağlı Mobilya",
  ],
  openGraph: {
    title: site.name,
    description: site.description,
    locale: "tr_TR",
    type: "website",
    siteName: site.name,
    images: [{ url: `${hero.image}?w=1200&h=630&fit=crop&auto=format&q=75`, width: 1200, height: 630 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0e0b09",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  name: site.name,
  description: site.description,
  founder: site.founders.map((f) => ({ "@type": "Person", name: f.name })),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${cormorant.variable} ${manrope.variable} antialiased`}>
      <body>
        <noscript>
          <style>{`.preloader{display:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          <Preloader />
          <ScrollProgress />
          <Cursor />
          {children}
          <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[70] opacity-[0.07] mix-blend-overlay" />
        </Providers>
      </body>
    </html>
  );
}
