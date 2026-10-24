import { ImageResponse } from "next/og";
import { OG_IMAGE, SITE, SITE_TITLE, THEME } from "@/constants/constant";
import { displayUrl } from "@/utils/format";

// Shared preview card for every page that doesn't define its own
export const alt = SITE_TITLE;
export const size = { width: OG_IMAGE.width, height: OG_IMAGE.height };
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
        background: THEME.background,
        color: THEME.foreground,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 30, color: THEME.muted }}>
        <div style={{ width: 14, height: 14, borderRadius: 999, background: THEME.primary }} />
        {displayUrl(SITE.url)}
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
        <span>{OG_IMAGE.lead}</span>
        <span style={{ color: THEME.primary }}>{OG_IMAGE.accent}</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          fontSize: 34,
          color: THEME.muted,
        }}
      >
        <span>{SITE.role}</span>
        <span>
          {SITE.location.city}, {SITE.location.countryCode}
        </span>
      </div>
    </div>,
    size,
  );
}
