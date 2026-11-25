import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site.config";
import { hero } from "@/data/profile";

export const alt = `${siteConfig.name}, ${siteConfig.positioning}`;
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
          padding: "72px 80px",
          background: "#f6f5f1",
          backgroundImage:
            "linear-gradient(rgba(43,59,209,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(43,59,209,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          color: "#16171b",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              background: "#16171b",
              color: "#f6f5f1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
            }}
          >
            {siteConfig.initials}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontWeight: 600 }}>{siteConfig.name}</div>
            <div style={{ fontSize: 22, color: "#5c6170" }}>{siteConfig.positioning}</div>
          </div>
        </div>
        <div style={{ fontSize: 66, fontWeight: 700, letterSpacing: -2.5, lineHeight: 1.08, maxWidth: 980 }}>{hero.headline}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, color: "#2b3bd1" }}>
          <div style={{ width: 40, height: 3, background: "#2b3bd1" }} />
          RAG systems · NLP pipelines · Reservoir computing
        </div>
      </div>
    ),
    size,
  );
}
