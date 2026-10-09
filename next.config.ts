import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages için statik HTML çıktısı (out/ klasörü).
  output: "export",
  images: {
    // Görseller Unsplash CDN'i üzerinden boyutlandırılır (bkz. src/lib/image-loader.ts).
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
