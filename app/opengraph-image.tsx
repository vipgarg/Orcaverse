import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = "OrcaVerse — Dominating Every Screen, App & Algorithm";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#080D16",
          backgroundImage:
            "radial-gradient(circle at 80% 30%, rgba(25,200,242,0.30), rgba(8,13,22,0) 50%), radial-gradient(circle at 95% 95%, rgba(139,92,246,0.35), rgba(8,13,22,0) 45%)",
          color: "#F4F7FB",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700 }}>
          Orca<span style={{ color: "#19C8F2" }}>Verse</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 22, letterSpacing: 4, color: "#8BE9FA", textTransform: "uppercase" }}>
            Performance · Programmatic · App Growth
          </div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, marginTop: 20, maxWidth: 980 }}>{site.tagline}</div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#96A5B8" }}>{site.supportingLine}</div>
      </div>
    ),
    size,
  );
}
