import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.cryptofoot98.me",
        pathname: "/britzen/**",
      },
    ],
  },
};

export default nextConfig;
