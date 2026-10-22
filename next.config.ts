import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a phone on the same Wi-Fi load dev JS/HMR when opening the dev server by LAN IP.
  // Without it Next blocks the chunks: nothing hydrates (dead menu, content hidden until the 4s failsafe).
  allowedDevOrigins: ["192.168.100.71", "192.168.*.*"],
};

export default nextConfig;
