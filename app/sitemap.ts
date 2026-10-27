import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/services", "/approach", "/about", "/contact", "/privacy", "/terms", "/cookies"];
  const url = (p: string) => new URL(p, site.url).toString();
  return [
    ...pages.map((p) => ({ url: url(p), changeFrequency: "monthly" as const, priority: p === "/" ? 1 : 0.7 })),
    ...services.map((s) => ({ url: url(`/services/${s.slug}`), changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
