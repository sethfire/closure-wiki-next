import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en/home',
        permanent: false,
      },
      {
        source: '/en',
        destination: '/en/home',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
