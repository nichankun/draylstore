import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Tanda bintang dua ini artinya "IZINKAN SEMUA WEBSITE HTTPS"
      },
    ],
  },
};

export default nextConfig;
