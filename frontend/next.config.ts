import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Permite que o deploy continue mesmo com erros de lint
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
