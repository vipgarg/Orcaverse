import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Cloudflare Workers has no built-in Next.js image optimiser; serve images as-is
  // (supply pre-optimised WebP/AVIF in /public).
  images: { unoptimized: true },
  // One canonical host: send www traffic to the bare domain
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.orcaverse.in" }],
        destination: "https://orcaverse.in/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

// Gives `next dev` access to Cloudflare bindings
initOpenNextCloudflareForDev();
