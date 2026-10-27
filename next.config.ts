import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Cloudflare Workers has no built-in Next.js image optimiser; serve images as-is
  // (supply pre-optimised WebP/AVIF in /public).
  images: { unoptimized: true },
};

export default nextConfig;

// Gives `next dev` access to Cloudflare bindings
initOpenNextCloudflareForDev();
