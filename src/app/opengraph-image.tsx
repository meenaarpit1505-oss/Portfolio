import { ImageResponse } from "next/og";

export const alt = "Arpit Meena — Framer Developer";
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
          justifyContent: "center",
          padding: "80px 88px",
          backgroundColor: "#0B1426",
          color: "#FFFFFF",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          Arpit Meena
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 16,
            fontSize: 40,
            fontWeight: 500,
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            color: "rgba(255, 255, 255, 0.92)",
          }}
        >
          Framer Developer
        </div>
        <div
          style={{
            display: "flex",
            width: 168,
            height: 4,
            marginTop: 32,
            backgroundColor: "#FF6F61",
            borderRadius: 2,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
