import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Shared preview card for every page that doesn't define its own
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#111112",
        color: "#fafafa",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontSize: 30,
          color: "#b8b8b8",
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 999,
            background: "#ea0044",
          }}
        />
        {site.url.replace("https://", "")}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 132,
          fontWeight: 700,
          lineHeight: 0.9,
          letterSpacing: -5,
        }}
      >
        <span>MUHAMMAD</span>
        <span style={{ color: "#ea0044" }}>AMAN.</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          fontSize: 34,
          color: "#b8b8b8",
        }}
      >
        <span>{site.role}</span>
        <span>
          {site.location.city}, {site.location.countryCode}
        </span>
      </div>
    </div>,
    size,
  );
}
