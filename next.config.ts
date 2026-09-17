import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Type errors fail the build. The project type-checks clean as of this
  // change — keep it that way rather than switching this back on.
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: false,
};

export default nextConfig;
