import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Prevent Next from inferring the wrong workspace root on Windows.
    root: __dirname,
  },
};

export default nextConfig;
