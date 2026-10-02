import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  images: {
    qualities: [55, 65, 75],
    deviceSizes: [384, 480, 640, 750, 828, 1080, 1200, 1920],
  },
};

export default nextConfig;
