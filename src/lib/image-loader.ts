"use client";

type LoaderArgs = { src: string; width: number; quality?: number };

// Unsplash görsellerini kendi CDN'inde istenen genişlikte ister; yerel görseller olduğu gibi döner.
export default function imageLoader({ src, width, quality }: LoaderArgs) {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 75));
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    return url.toString();
  }
  return src;
}
