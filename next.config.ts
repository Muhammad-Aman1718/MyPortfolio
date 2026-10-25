import type { NextConfig } from "next";

// Optional Cloudflare R2 custom domain for article images (host only, e.g. images.example.com).
// When unset, articles use local images from /public and remote images are shown unoptimised.
const imageHost = process.env.NEXT_PUBLIC_IMAGE_HOST?.trim();

const nextConfig: NextConfig = {
  // Lets a phone on the same Wi-Fi load dev JS/HMR when opening the dev server by LAN IP.
  // Without it Next blocks the chunks: nothing hydrates (dead menu, content hidden until the 4s failsafe).
  allowedDevOrigins: ["192.168.100.71", "192.168.*.*"],
  images: {
    remotePatterns: imageHost ? [{ protocol: "https", hostname: imageHost, pathname: "/**" }] : [],
  },
};

export default nextConfig;
