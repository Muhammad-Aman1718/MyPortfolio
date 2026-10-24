import type { MetadataRoute } from "next";
import { SITE } from "@/constants/constant";
import { absoluteUrl } from "@/utils/content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE.url,
  };
}
