import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
    turbo: process.env.NODE_ENV === 'development' ? {} : undefined
  },
  telemetry: false,
};

export default nextConfig;
