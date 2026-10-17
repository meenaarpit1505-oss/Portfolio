import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = site.metadata.title;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#0B0B0C",
          backgroundImage:
            "radial-gradient(circle at 80% 10%, rgba(124, 156, 255, 0.28) 0%, transparent 42%)",
          color: "#F4F4F5",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, color: "#A1A1AA" }}>
          <span>{site.name}</span>
          <span>{site.availability}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 920 }}>
          <div style={{ fontSize: 22, color: "#7C9CFF", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {site.role}
          </div>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.03em" }}>
            Fast, beautiful websites that convert.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, color: "#A1A1AA" }}>
          <span>Figma to Framer · CMS · SEO-ready</span>
          <span>{site.email}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
