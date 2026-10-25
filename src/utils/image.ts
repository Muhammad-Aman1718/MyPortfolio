/** True for absolute http(s) URLs. */
export const isExternalUrl = (url: string): boolean => /^https?:\/\//.test(url);

/**
 * Whether next/image may resize this image: local files under /public, or the
 * one approved remote host (NEXT_PUBLIC_IMAGE_HOST, e.g. a Cloudflare R2 custom
 * domain, mirrored in next.config's images.remotePatterns). Anything else is
 * shown as-is rather than failing the page.
 */
export function canOptimizeImage(src: string): boolean {
  if (src.startsWith("/")) return true;
  const host = process.env.NEXT_PUBLIC_IMAGE_HOST;
  if (!host) return false;
  try {
    const url = new URL(src);
    return url.protocol === "https:" && url.hostname === host;
  } catch {
    return false;
  }
}
