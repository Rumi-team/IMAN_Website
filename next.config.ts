import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "iman.org",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
