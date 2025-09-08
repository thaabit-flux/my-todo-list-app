import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
    turbo: process.env.NODE_ENV === 'development' ? {} : undefined
  },
    eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
