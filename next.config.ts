import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Next.js 16
  cacheComponents: true,

  images: {    
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;